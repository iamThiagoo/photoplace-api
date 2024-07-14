import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
    imports: [
        JwtModule.register({
            secret: String(process.env.JWT_KEY),
        }),
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}