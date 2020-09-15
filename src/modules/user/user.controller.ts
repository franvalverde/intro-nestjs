import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserDetails } from './userdetails.entity';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise <UserDto> {
        const user = await this._userService.get(id);
        return user;
    }

    @Get()
    async getUsers(): Promise <UserDto[]> {
        const users = await this._userService.getAll();
        return users;
    }

    @Post('create')
    async createUser(@Body() user: User): Promise <UserDto> {
        const createdUser = await this._userService.create(user);
        return createdUser;
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise <UserDto> {
        const updateUser = await this._userService.update(id, user);
        return updateUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        await this._userService.delete(id);
        return true;
    }

}