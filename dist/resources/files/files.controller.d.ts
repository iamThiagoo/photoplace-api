import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    create(files: Array<Express.Multer.File>): Promise<void>;
}
