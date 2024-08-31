export declare class FilesService {
    constructor();
    upload(files: Array<Express.Multer.File>): Promise<void>;
    getFileByHash(uuid: string): Promise<void>;
}
