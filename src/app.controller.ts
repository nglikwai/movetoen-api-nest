import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('general')
@Controller({
  path: '/',
  version: VERSION_NEUTRAL,
})
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('healthz')
  getHealthz(): string {
    return this.appService.getHealthz();
  }
}
