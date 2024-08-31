import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/entities/file.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.JWT_KEY
        }),
        TypeOrmModule.forFeature([FileEntity])
    ],
    controllers: [FilesController],
    providers: [FilesService],
    exports: [FilesService]
})
export class FilesModule {}
