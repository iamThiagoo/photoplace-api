import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly jwtService;
    private usersRepository;
    constructor(jwtService: JwtService, usersRepository: Repository<UserEntity>);
    login(email: string, password: string): Promise<string>;
    create(name: string, email: string, password: string): Promise<string>;
    resetPassword(email: string): Promise<void>;
    createToken(user: UserEntity): Promise<string>;
    checkToken(token: string): Promise<any>;
}
