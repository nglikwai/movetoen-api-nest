import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { OrdersService } from './order.service';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Category, CategorySchema } from './schemas/category.schema';
import { Order, OrderSchema } from './schemas/order.schema';
import { Question, QuestionSchema } from './schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Question.name, schema: QuestionSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [CategoriesController, QuestionsController],
  providers: [CategoriesService, QuestionsService, OrdersService],
  exports: [CategoriesService, QuestionsService, OrdersService],
})
export class NotesModule {}
