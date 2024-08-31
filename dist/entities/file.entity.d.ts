import { UserEntity } from './user.entity';
import { FolderFileEntity } from './folder-file.entity';
export declare class FileEntity {
    uuid: string;
    fileName: string;
    originalname: string;
    hash: string;
    fileType: string;
    fileSize: number;
    filePath: string;
    favorite: boolean;
    createdAt: Date;
    uploadedAt: Date;
    trashedAt: Date;
    userId: string;
    user: UserEntity;
    folderFiles: FolderFileEntity[];
}
