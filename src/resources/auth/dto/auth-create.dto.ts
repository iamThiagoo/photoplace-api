import { IsEmail, IsString } from 'class-validator';

export class AuthCreateDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
