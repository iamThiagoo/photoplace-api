import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {

    constructor() {}

    async upload(files : Array<Express.Multer.File>) {
        try {
            // TODO

        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async getFileByHash(uuid : string) {
        try {
            //
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
