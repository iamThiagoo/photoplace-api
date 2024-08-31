import { UserEntity } from './user.entity';
import { FolderFileEntity } from './folder-file.entity';
export declare class FolderEntity {
    uuid: string;
    name: string;
    description: string;
    favorite: boolean;
    trash: boolean;
    parentFolderUuid: string;
    parentFolder: FolderEntity;
    subFolders: FolderEntity[];
    userId: string;
    user: UserEntity;
    createdAt: Date;
    uploadedAt: Date;
    trashedAt: Date;
    folderFiles: FolderFileEntity[];
}
