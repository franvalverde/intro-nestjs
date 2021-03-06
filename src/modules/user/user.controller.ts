import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserDetails } from './userdetails.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise <User> {
        const user = await this._userService.get(id);
        return user;
    }

    @UseGuards(AuthGuard())
    @Get()
    async getUsers(): Promise <User[]> {
        const users = await this._userService.getAll();
        return users;
    }

    @Post('create')
    async createUser(@Body() user: User): Promise <User> {
        const createdUser = await this._userService.create(user);
        return createdUser;
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise <User> {
        const updateUser = await this._userService.update(id, user);
        return updateUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        await this._userService.delete(id);
        return true;
    }

}
