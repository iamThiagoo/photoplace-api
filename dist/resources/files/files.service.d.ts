import { Response } from 'express';
import { FileEntity } from 'src/entities/file.entity';
import { IAuthUser } from 'src/types/IAuthUser';
import { Repository } from 'typeorm';
export declare class FilesService {
    private filesRepository;
    constructor(filesRepository: Repository<FileEntity>);
    upload(files: Array<Express.Multer.File>, user: IAuthUser): Promise<{
        success: boolean;
    }>;
    getFileInfos(uuid: string): Promise<FileEntity>;
    getFile(uuid: string, res: Response): Promise<void>;
    deleteFile(uuid: string): Promise<{
        success: boolean;
    }>;
}
