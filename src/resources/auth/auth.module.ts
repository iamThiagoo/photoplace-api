import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { AuthGuard } from 'src/guards/auth.guard';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.JWT_KEY
        }),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AuthGuard],
    exports: [AuthService]
})
export class AuthModule {}
