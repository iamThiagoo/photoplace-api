import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './resources/auth/auth.module';
import { MailerModule } from "@nestjs-modules/mailer"
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { FilesModule } from './resources/files/files.modules';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [join(__dirname, "**", "*.entity.{js,ts}")],
            synchronize: false
        }),
        MailerModule.forRoot({
            transport: {
                host: process.env.SMTP_DOMAIN,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            },
            defaults: {
                from: `${process.env.APP_NAME} - ${process.env.SMTP_USER}`
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new PugAdapter(),
                options: {
                    strict: true
                }
            }
        }),
        AuthModule,
        FilesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    constructor() {}
}
