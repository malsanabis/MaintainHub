/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async getuserById(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }
    async signIn(username: string, password: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { username }
        });
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }
    async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }
    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}
