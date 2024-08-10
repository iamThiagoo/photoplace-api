import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { AuthCreateDTO } from './dto/auth-create.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(@Body() { email, password }: AuthDTO) {
        return this.authService.login(email, password);
    }

    @Post('create')
    async create(@Body() authCreateDTO: AuthCreateDTO) {
        return this.authService.create(authCreateDTO);
    }

    @Get('send-email-password')
    async sendEmailToPassword(@Query() email: string) {
        return this.authService.sendEmailToResetPassword(email);
    }

    @Post('reset-password')
    async resetPassword(@Body() { password, token }: AuthResetPasswordDto) {
        return this.authService.resetPassword(password, token);
    }
}
