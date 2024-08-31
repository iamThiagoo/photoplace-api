import { Timestamp } from 'typeorm';
import { FileEntity } from './file.entity';
import { FolderEntity } from './folder.entity';
export declare class UserEntity {
    uuid: string;
    name: string;
    email: string;
    password: string;
    createdAt: Timestamp;
    folders: FolderEntity[];
    files: FileEntity[];
}
