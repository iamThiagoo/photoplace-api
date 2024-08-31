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
exports.FolderEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const folder_file_entity_1 = require("./folder-file.entity");
let FolderEntity = class FolderEntity {
};
exports.FolderEntity = FolderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FolderEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], FolderEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], FolderEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], FolderEntity.prototype, "favorite", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], FolderEntity.prototype, "trash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], FolderEntity.prototype, "parentFolderUuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FolderEntity, folder => folder.subFolders),
    (0, typeorm_1.JoinColumn)({ name: 'parent_folder_uuid' }),
    __metadata("design:type", FolderEntity)
], FolderEntity.prototype, "parentFolder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FolderEntity, folder => folder.parentFolder),
    __metadata("design:type", Array)
], FolderEntity.prototype, "subFolders", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], FolderEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.folders),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], FolderEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], FolderEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], FolderEntity.prototype, "uploadedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], FolderEntity.prototype, "trashedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => folder_file_entity_1.FolderFileEntity, folderFile => folderFile.folder),
    __metadata("design:type", Array)
], FolderEntity.prototype, "folderFiles", void 0);
exports.FolderEntity = FolderEntity = __decorate([
    (0, typeorm_1.Entity)('folders')
], FolderEntity);
//# sourceMappingURL=folder.entity.js.map