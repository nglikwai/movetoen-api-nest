import { ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as bodyParser from 'body-parser';
import RedisStore from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import helmet from 'helmet';
import * as passport from 'passport';
import { createClient } from 'redis';

import { AppModule } from './app.module';
import { SESSION_ID_NAME } from './constants';

// initialize redis client
const redisClient = createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect().catch(console.error);

// initialize redis store
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'wiserjournal:',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
  const env = configService.get('APP_ENV');
  const feBaseUrl = configService.get('FE_BASE_URL');
  const sessionSecret = configService.get('SESSION_SECRET') || '';

  app.use(helmet());

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  app.use(cookieParser(sessionSecret as string));

  app.use(
    session({
      secret: sessionSecret,
      store: redisStore,
      name: SESSION_ID_NAME,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      cookie: {
        maxAge: process.env.COOKIE_MAX_AGE ? Number(process.env.COOKIE_MAX_AGE) : 30 * 24 * 60 * 60 * 1000, // 30 days
        ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {}),
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  app.enableCors({
    origin: [feBaseUrl as string],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'admin-options',
      'x-requested-with',
      'platform',
      'version',
    ],
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, '1.0'],
    prefix: 'v',
  });

  if (!new Set(['production', 'test']).has(env as string)) {
    const config = new DocumentBuilder()
      .setTitle('Triplaner endpoints')
      .setDescription('The API documentation for Triplaner')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
  }

  await app.listen((port as string) || 3001);
}

bootstrap();
