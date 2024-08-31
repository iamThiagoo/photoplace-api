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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const folder_file_entity_1 = require("./folder-file.entity");
let FileEntity = class FileEntity {
};
exports.FileEntity = FileEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FileEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], FileEntity.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], FileEntity.prototype, "originalname", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], FileEntity.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_type', length: 50, nullable: true }),
    __metadata("design:type", String)
], FileEntity.prototype, "fileType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_size', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], FileEntity.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_path', length: 255, nullable: true }),
    __metadata("design:type", String)
], FileEntity.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], FileEntity.prototype, "favorite", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], FileEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'uploaded_at', type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], FileEntity.prototype, "uploadedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trashed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], FileEntity.prototype, "trashedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], FileEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.files),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], FileEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => folder_file_entity_1.FolderFileEntity, folderFile => folderFile.file),
    __metadata("design:type", Array)
], FileEntity.prototype, "folderFiles", void 0);
exports.FileEntity = FileEntity = __decorate([
    (0, typeorm_1.Entity)('files')
], FileEntity);
//# sourceMappingURL=file.entity.js.map