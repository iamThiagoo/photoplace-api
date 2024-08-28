import {
    BadRequestException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthCreateDTO } from './dto/auth-create.dto';

@Injectable()
export class AuthService {
    /**
     *
     * @param jwtService
     * @param usersRepository
     */
    constructor(
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    async login(email: string, password: string) {
        const user = await this.usersRepository.findOneBy({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('E-mail ou Senha inválidos!');
        }

        return this.createToken(user);
    }

    async create(data: AuthCreateDTO) {
        if (
            await this.usersRepository.findOne({ where: { email: data.email } })
        ) {
            throw new BadRequestException('E-mail já vinculado!');
        }

        console.log(data);

        const password = await bcrypt.hash(
            data.password,
            await bcrypt.genSalt()
        );

        const user = this.usersRepository.create({
            name: data.name,
            email: data.email,
            password
        });

        await this.usersRepository.save(user);
        return this.createToken(user);
    }

    async sendEmailToResetPassword(email: string) {
        const user = await this.usersRepository.findOneBy({ email });

        if (!user) {
            return { success: true };
        }

        const token = this.jwtService.sign(
            {
                sub: user.uuid,
                uuid: user.uuid
            },
            {
                expiresIn: String(process.env.RESET_PASSWORD_EXPIRES_IN),
                issuer: `${process.env.PROJECT_NAME} - Reset Password`,
                audience: 'users'
            }
        );

        await this.mailerService.sendMail({
            subject: 'Recuperação de Senha',
            to: user.email,
            template: 'resetPassword',
            context: {
                name: user.name,
                urlToReset: process.env.APP_FRONTEND_URL + '/reset/' + token
            }
        });

        return {
            success: true
        };
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            const data: any = this.jwtService.verify(token, {
                issuer: `${process.env.PROJECT_NAME} - Reset Password`,
                audience: 'users'
            });

            if (!data.uuid) {
                throw new BadRequestException(
                    'Ocorreu um problema ao salvar a sua nova senha!'
                );
            }

            const password = await bcrypt.hash(
                newPassword,
                await bcrypt.genSalt()
            );
            await this.usersRepository.update(data.uuid, {
                password
            });

            const user = await this.usersRepository.findOneBy({
                uuid: data.uuid
            });

            return this.createToken(user);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async createToken(user: UserEntity) {
        return this.jwtService.sign(
            {
                sub: user.uuid,
                name: user.name,
                email: user.email
            },
            {
                expiresIn: String(process.env.LOGIN_EXPIRES_IN),
                issuer: `${process.env.PROJECT_NAME} - Login`,
                audience: 'users'
            }
        );
    }

    async checkToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                audience: 'users',
                issuer: `${process.env.PROJECT_NAME} - Login`
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
