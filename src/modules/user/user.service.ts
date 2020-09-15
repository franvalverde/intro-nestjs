import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MapperService } from 'src/shared/mapper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserDetails } from './userdetails.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        private readonly _mapperService: MapperService
    ) {}

    async get(id: number): Promise<UserDto> {
        if (!id) {
            throw new BadRequestException('id must be sent');
        }

        const user = await this._userRepository.findOne(id, {
            where: { status: 'ACTIVE' },
        });

        if (!user) {
            throw new NotFoundException();
        }

        return this._mapperService.map<User, UserDto>(user, new UserDto());
    }

    async getAll(): Promise<UserDto[]> {
        const users = await this._userRepository.find({
            where: { status: 'ACTIVE' },
        });

        return this._mapperService.mapCollection<User, UserDto>(
            users,
            new UserDto()
        );
    }

    async create(user: User): Promise<UserDto> {
        const details = new UserDetails();
        user.details = details;

        const repo = await getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({ where: { name: 'GENERAL' }});
        user.roles = [defaultRole];

        const savedUser = await this._userRepository.save(user);
        return this._mapperService.map<User, UserDto>(
            savedUser,
            new UserDto()
        );
    }

    async update(id: number, user: User): Promise<UserDto> {
        const updatedUser = await this._userRepository.update(id, user);
        return this.get(id);
    }

    async delete(id: number): Promise<void> {
        const userExists = await this._userRepository.findOne(id, {
            where: { status: 'ACTIVE' }
        });

        if (!userExists) {
            throw new NotFoundException();
        }

        await this._userRepository.update(id, { status: 'INACTIVE' });
    }



}