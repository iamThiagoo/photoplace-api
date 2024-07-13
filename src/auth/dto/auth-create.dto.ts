import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthCreateDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
}
