import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService : JwtService) {}

    async login(email: string, password: string) {

        return this.createToken(user);
    }

    async create(name: string, email: string, password: string) {

        return this.createToken(user);
    }

    async resetPassword(email: string) {}

    async createToken(user : User) {
        return this.jwtService.sign({
            sub: user.uuid,
            name: user.name, 
            email: user.email
        }, {
            expiresIn: process.env.LOGIN_EXPIRES_IN,
            issuer: `${process.env.PROJECT_NAME} - Login`,
            audience: "users"
        });
    } 

    async checkToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                audience: "users",
                issuer: `${process.env.PROJECT_NAME} - Login`,
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
