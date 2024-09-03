/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Prisma, Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    async createTask(@Body() data: Prisma.TaskCreateInput): Promise<Task> {
        return this.tasksService.createTask(data);
    }

    @Get()
    async getTasks(): Promise<Task[]> {
        return this.tasksService.getTasks();
    }

    @Put(':id')
    async updateTask(
        @Param('id') id: number,
        @Body() data: Prisma.TaskUpdateInput,
    ): Promise<Task> {
        return this.tasksService.updateTask({ where: { id }, data });
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: number): Promise<Task> {
        return this.tasksService.deleteTask({ id });
    }
}