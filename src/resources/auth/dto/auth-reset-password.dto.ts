import { IsEmail, IsString } from 'class-validator';

export class AuthResetPasswordDto {
    @IsString()
    password: string;

    @IsEmail()
    token: string;
}
