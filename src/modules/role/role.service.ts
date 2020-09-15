import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { MapperService } from 'src/shared/mapper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor (
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
        private readonly _mapperService: MapperService
    ) {}

    async get(id: number): Promise<Role> {
        if (!id) {
            throw new BadRequestException('id must be sent');
        }

        const role = await this._roleRepository.findOne(id, {
            where: { status: 'ACTIVE' },
        });

        if (!role) {
            throw new NotFoundException();
        }

        return role;
    }

    async getAll(): Promise<Role[]> {
        const roles = await this._roleRepository.find({
            where: { status: 'ACTIVE' },
        });

        return roles;
    }

    async create(role: Role): Promise<Role> {
        const savedRole = await this._roleRepository.save(role);
        return savedRole;
    }

    async update(id: number, role: Role): Promise<Role> {
        const updatedRole = await this._roleRepository.update(id, role);
        return this.get(id);
    }

    async delete(id: number): Promise<void> {
        const roleExists = await this._roleRepository.findOne(id, {
            where: { status: 'ACTIVE' }
        });

        if (!roleExists) {
            throw new NotFoundException();
        }

        await this._roleRepository.update(id, { status: 'INACTIVE' });
    }
}