import { IsNotEmpty } from 'class-validator';
import { RoleType } from 'src/modules/role/roletype.enum';
import { UserDetails } from '../userdetails.entity';

export class UserDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    roles: RoleType[];

    @IsNotEmpty()
    details: UserDetails;

}
