import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthResetPasswordDTO {
    @IsEmail()
    email: string;
}
