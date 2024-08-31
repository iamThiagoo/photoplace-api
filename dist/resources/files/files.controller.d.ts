import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    create(files: Array<Express.Multer.File>): Promise<void>;
    get(hash: string): Promise<void>;
    update(): Promise<void>;
    moveToTrash(): Promise<void>;
    restore(): Promise<void>;
    favorite(): Promise<void>;
    unfavorite(): Promise<void>;
    delete(): Promise<void>;
}
