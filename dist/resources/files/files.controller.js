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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const files_service_1 = require("./files.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const files_1 = require("../../util/helpers/files");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async create(files) {
        return this.filesService.upload(files);
    }
    async get(hash) {
        return this.filesService.getFileByHash(hash);
    }
    async update() {
    }
    async moveToTrash() {
    }
    async restore() {
    }
    async favorite() {
    }
    async unfavorite() {
    }
    async delete() {
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', null, {
        storage: (0, multer_1.diskStorage)({
            destination: '.files',
            filename: (_req, file, cb) => {
                cb(null, (0, files_1.generateRandomFileName)(file.fieldname, file.originalname));
            }
        })
    })),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: Number(process.env.MAX_SIZE_FILE_UPLOAD)
            })
        ]
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/:uuid'),
    __param(0, (0, common_1.Query)('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "get", null);
__decorate([
    (0, common_1.Put)('/:uuid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('/trash/:uuid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "moveToTrash", null);
__decorate([
    (0, common_1.Put)('/restore/:uuid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "restore", null);
__decorate([
    (0, common_1.Put)('/favorite/:uuid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "favorite", null);
__decorate([
    (0, common_1.Put)('/unfavorite/:uuid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "unfavorite", null);
__decorate([
    (0, common_1.Delete)('/:uuid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "delete", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map