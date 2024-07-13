import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { AuthCreateDTO } from './dto/auth-create.dto';
import { AuthResetPasswordDTO } from './dto/auth-reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(@Body() { email, password }: AuthDTO) {
        return this.authService.login(email, password);
    }

    @Post('create')
    async create(@Body() { name, email, password }: AuthCreateDTO) {
        return this.authService.create(name, email, password);
    }

    @Post('reset')
    async resetPassword(@Body() { email }: AuthResetPasswordDTO) {
        return this.authService.resetPassword(email);
    }
}
