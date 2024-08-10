import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/test')
    sinpleTest(): string {
        return this.appService.getHello();
    }

    @UseGuards(AuthGuard)
    @Get('/auth-test')
    sinpleAuthTest(@Request() req): string {
        console.log(req.user);
        return this.appService.getHello();
    }
}
