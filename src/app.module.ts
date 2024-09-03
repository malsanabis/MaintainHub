import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { UserService } from './services/user.service';
import { PrismaService } from './services/prisma.service';
import { UserController } from './controllers/user.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [
    TasksController,
    UserController, AppController],
  providers: [
    TasksService,
    UserService,
    PrismaService, AppService],
})
export class AppModule { }
