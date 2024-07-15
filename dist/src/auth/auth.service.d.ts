import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AuthService {
    private readonly jwtService;
    private readonly mailerService;
    private usersRepository;
    constructor(jwtService: JwtService, mailerService: MailerService, usersRepository: Repository<UserEntity>);
    login(email: string, password: string): Promise<string>;
    create(name: string, email: string, password: string): Promise<string>;
    sendEmailToResetPassword(email: string): Promise<{
        success: boolean;
    }>;
    resetPassword(token: string, newPassword: string): Promise<string>;
    createToken(user: UserEntity): Promise<string>;
    checkToken(token: string): Promise<any>;
}
