import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    create(files: Array<Express.Multer.File>, req: any): Promise<{
        success: boolean;
    }>;
    getFile(uuid: string, res: any): Promise<void>;
    getFileInfos(uuid: string): Promise<import("../../entities/file.entity").FileEntity>;
    update(): Promise<void>;
    moveToTrash(): Promise<void>;
    restore(): Promise<void>;
    favorite(): Promise<void>;
    unfavorite(): Promise<void>;
    delete(uuid: string): Promise<{
        success: boolean;
    }>;
}
