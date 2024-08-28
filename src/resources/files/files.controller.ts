import {
    Controller,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @UseInterceptors(
        FilesInterceptor('files', 100, {
            storage: diskStorage({
                destination: '../../../uploads',
                filename: (_req, file, cb) => {
                    const uniqueSuffix =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(
                        null,
                        file.fieldname +
                            '-' +
                            uniqueSuffix +
                            extname(file.originalname)
                    );
                }
            })
        })
    )
    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async create(@UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: Number(process.env.MAX_SIZE_FILE_UPLOAD)
                    })
                ]
            })
        )
        files: Array<Express.Multer.File>
    ) {
        console.log(files);
    }
}
