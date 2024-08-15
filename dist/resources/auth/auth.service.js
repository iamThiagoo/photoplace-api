"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entity/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
let AuthService = class AuthService {
    constructor(jwtService, mailerService, usersRepository) {
        this.jwtService = jwtService;
        this.mailerService = mailerService;
        this.usersRepository = usersRepository;
    }
    async login(email, password) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('E-mail ou Senha inválidos!');
        }
        return this.createToken(user);
    }
    async create(data) {
        if (await this.usersRepository.findOne({ where: { email: data.email } })) {
            throw new common_1.BadRequestException('E-mail já vinculado!');
        }
        console.log(data);
        const password = await bcrypt.hash(data.password, await bcrypt.genSalt());
        const user = this.usersRepository.create({
            name: data.name,
            email: data.email,
            password
        });
        await this.usersRepository.save(user);
        return this.createToken(user);
    }
    async sendEmailToResetPassword(email) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) {
            return { success: true };
        }
        const token = this.jwtService.sign({
            sub: user.uuid,
            uuid: user.uuid
        }, {
            expiresIn: String(process.env.RESET_PASSWORD_EXPIRES_IN),
            issuer: `${process.env.PROJECT_NAME} - Reset Password`,
            audience: 'users'
        });
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
    async resetPassword(token, newPassword) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: `${process.env.PROJECT_NAME} - Reset Password`,
                audience: 'users'
            });
            if (!data.uuid) {
                throw new common_1.BadRequestException('Ocorreu um problema ao salvar a sua nova senha!');
            }
            const password = await bcrypt.hash(newPassword, await bcrypt.genSalt());
            await this.usersRepository.update(data.uuid, {
                password
            });
            const user = await this.usersRepository.findOneBy({
                uuid: data.uuid
            });
            return this.createToken(user);
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async createToken(user) {
        return this.jwtService.sign({
            sub: user.uuid,
            name: user.name,
            email: user.email
        }, {
            expiresIn: String(process.env.LOGIN_EXPIRES_IN),
            issuer: `${process.env.PROJECT_NAME} - Login`,
            audience: 'users'
        });
    }
    async checkToken(token) {
        try {
            return this.jwtService.verify(token, {
                audience: 'users',
                issuer: `${process.env.PROJECT_NAME} - Login`
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mailer_1.MailerService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map