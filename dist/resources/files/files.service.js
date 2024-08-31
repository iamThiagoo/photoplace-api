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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("../../entities/file.entity");
const files_1 = require("../../util/helpers/files");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const path_1 = require("path");
let FilesService = class FilesService {
    constructor(filesRepository) {
        this.filesRepository = filesRepository;
    }
    async upload(files, user) {
        try {
            await Promise.all(files.map(async (file) => {
                const hash = await (0, files_1.generateHashByString)(file.filename);
                const newFile = {
                    fileName: file.filename,
                    hash: hash,
                    originalname: file.originalname,
                    fileType: file.mimetype,
                    fileSize: file.size,
                    filePath: file.path,
                    userId: String(user.id)
                };
                return await this.filesRepository.save(newFile);
            }));
            return {
                success: true
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getFileInfos(uuid) {
        try {
            return await this.filesRepository.findOneByOrFail({ uuid });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getFile(uuid, res) {
        try {
            const file = await this.filesRepository.findOneByOrFail({ uuid });
            const fileStream = fs.createReadStream((0, path_1.join)(__dirname, '../../../.files', file.fileName));
            fileStream.pipe(res);
            fileStream.on('end', () => {
                res.end();
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deleteFile(uuid) {
        try {
            const file = await this.filesRepository.findOneByOrFail({ uuid });
            await fs.promises.unlink(file.filePath);
            await this.filesRepository.delete(uuid);
            return {
                success: true
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Erro ao tentar excluir o arquivo.');
        }
    }
};
exports.FilesService = FilesService;
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesService.prototype, "getFile", null);
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.FileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FilesService);
//# sourceMappingURL=files.service.js.map