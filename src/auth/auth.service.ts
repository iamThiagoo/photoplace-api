import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {


    /**
     * 
     * @param jwtService 
     * @param usersRepository 
     */
    constructor(
        private readonly jwtService : JwtService,
        private readonly mailerService: MailerService,
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>
    ) {}


    /**
     * 
     * @param email 
     * @param password 
     * @returns 
     */
    async login(email: string, password: string) {
        const user = await this.usersRepository.findOneBy({email});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException("E-mail ou Senha inválidos!")
        }

        return this.createToken(user);
    }


    /**
     * 
     * @param name 
     * @param email 
     * @param password 
     * @returns 
     */
    async create(name: string, email: string, password: string) {
        
        if (await this.usersRepository.findOne({ where: { email } })) {
            throw new BadRequestException("E-mail já vinculado!");
        }

        password = await bcrypt.hash(password, await bcrypt.genSalt());
        const user = await this.usersRepository.create({name, email, password});
        await this.usersRepository.save(user);

        return this.createToken(user);
    }


    /**
     * 
     * @param email 
     */
    async sendEmailToResetPassword(email: string) {

        const user = await this.usersRepository.findOneBy({email});

        if (!user) {
            return { success: true };
        }

        const token = this.jwtService.sign({
            sub: user.uuid,
            uuid: user.uuid,
        }, {
            expiresIn: String(process.env.RESET_PASSWORD_EXPIRES_IN),
            issuer: `${process.env.PROJECT_NAME} - Reset Password`,
            audience: "users"
        });

        await this.mailerService.sendMail({
            subject: "Recuperação de Senha",
            to: user.email,
            template: "resetPassword",
            context: {
                name: user.name,
                urlToReset: process.env.APP_FRONTEND_URL + '/reset/' + token
            }
        });

        return {
            success: true 
        };
    }


    /**
     * 
     * @param email 
     * @returns 
     */
    async resetPassword(token: string, newPassword: string) {
        try {
            const data: any = this.jwtService.verify(token, {
              issuer: `${process.env.PROJECT_NAME} - Reset Password`,
              audience: 'users',
            });
      
            if (!data.uuid) {
                throw new BadRequestException('Ocorreu um problema ao salvar a sua nova senha!');
            }
      
            let password = await bcrypt.hash(newPassword, await bcrypt.genSalt());
            await this.usersRepository.update(data.uuid, {
                password,
            });
      
            const user = await this.usersRepository.findOneBy({uuid: data.uuid});
            return this.createToken(user);
            
        } catch (e) {
            throw new BadRequestException(e);
        }
    }


    /**
     * 
     * @param user 
     * @returns 
     */
    async createToken(user : UserEntity) {
        return this.jwtService.sign({
            sub: user.uuid,
            name: user.name, 
            email: user.email
        }, {
            expiresIn: String(process.env.LOGIN_EXPIRES_IN),
            issuer: `${process.env.PROJECT_NAME} - Login`,
            audience: "users"
        });
    } 


    /**
     * 
     * @param token 
     * @returns 
     */
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
