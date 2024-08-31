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
exports.FolderFileEntity = void 0;
const typeorm_1 = require("typeorm");
const folder_entity_1 = require("./folder.entity");
const file_entity_1 = require("./file.entity");
let FolderFileEntity = class FolderFileEntity {
};
exports.FolderFileEntity = FolderFileEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], FolderFileEntity.prototype, "fileId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], FolderFileEntity.prototype, "folderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => file_entity_1.FileEntity, file => file.folderFiles, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'file_id' }),
    __metadata("design:type", file_entity_1.FileEntity)
], FolderFileEntity.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => folder_entity_1.FolderEntity, folder => folder.folderFiles, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'folder_id' }),
    __metadata("design:type", folder_entity_1.FolderEntity)
], FolderFileEntity.prototype, "folder", void 0);
exports.FolderFileEntity = FolderFileEntity = __decorate([
    (0, typeorm_1.Entity)('users')
], FolderFileEntity);
//# sourceMappingURL=folder-file.entity.js.map