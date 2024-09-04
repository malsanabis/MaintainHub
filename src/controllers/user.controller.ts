/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Put, Delete, Param, HttpCode, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('signin')
    @HttpCode(200)
    async signIn(@Body() userData: { email: string; password: string }): Promise<User> {
        const user = await this.userService.signIn(userData.email, userData.password);
        if (!user) {
            throw new NotFoundException('Invalid email or password');
        }
        return user;
    }
    @Post()
    @HttpCode(201)
    async createUser(@Body() userData: { name?: string; email: string; password: string }): Promise<User> {
        return this.userService.createUser(userData);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        const user = await this.userService.getuserById({ id: Number(id) });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() userData: { name?: string; email?: string; password?: string }
    ): Promise<User> {
        return this.userService.updateUser({
            where: { id: Number(id) },
            data: userData,
        });
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: string): Promise<void> {
        await this.userService.deleteUser({ id: Number(id) });
    }
}
