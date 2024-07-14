import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {


    /**
     * 
     * @param jwtService 
     * @param usersRepository 
     */
    constructor(
        private readonly jwtService : JwtService,
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
            throw new UnauthorizedException("E-mail ou Senha incorretos!")
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
    async resetPassword(email: string) {}


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
