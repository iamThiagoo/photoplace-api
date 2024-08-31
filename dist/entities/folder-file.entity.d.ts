import { FolderEntity } from './folder.entity';
import { FileEntity } from './file.entity';
export declare class FolderFileEntity {
    fileId: string;
    folderId: string;
    file: FileEntity;
    folder: FolderEntity;
}
