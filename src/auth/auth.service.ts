import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async login(email: string, password: string) {}

    async create(name: string, email: string, password: string) {}

    async resetPassword(email: string) {}
}
