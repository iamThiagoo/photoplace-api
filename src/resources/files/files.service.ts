import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
    constructor() {}

    async upload(files) {
        console.log(files);
    }
}
