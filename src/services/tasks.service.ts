/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }

    async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({ data });
    }

    async getTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }
    async updateTask(params: { where: Prisma.TaskWhereUniqueInput; data: Prisma.TaskUpdateInput }): Promise<Task> {
        const { where, data } = params;
        return this.prisma.task.update({ where, data });
    }
    async deleteTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
        return this.prisma.task.delete({ where });
    }
}
