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
let AuthService = class AuthService {
    constructor(jwtService, usersRepository) {
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
    }
    async login(email, password) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException("E-mail ou Senha incorretos!");
        }
        return this.createToken(user);
    }
    async create(name, email, password) {
        if (await this.usersRepository.findOne({ where: { email } })) {
            throw new common_1.BadRequestException("E-mail já vinculado!");
        }
        password = await bcrypt.hash(password, await bcrypt.genSalt());
        const user = await this.usersRepository.create({ name, email, password });
        await this.usersRepository.save(user);
        return this.createToken(user);
    }
    async resetPassword(email) { }
    async createToken(user) {
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
    async checkToken(token) {
        try {
            return this.jwtService.verify(token, {
                audience: "users",
                issuer: `${process.env.PROJECT_NAME} - Login`,
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
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map