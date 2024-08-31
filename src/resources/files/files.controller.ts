import {
    Controller,
    Delete,
    Get,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    Put,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateRandomFileName } from 'src/util/helpers/files';

@Controller('files')
export class FilesController {
    
    constructor(private readonly filesService: FilesService) {}

    /**
     * Post's
     */
    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(
        FilesInterceptor('files', null, {
            storage: diskStorage({
                destination: '.files',
                filename: (_req, file, cb) => {
                    cb(null, generateRandomFileName(file.fieldname, file.originalname));
                }
            })
        })
    )
    async create(
        @UploadedFiles(
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
        return this.filesService.upload(files);
    }


    /**
     * Get's
     */
    @Get('/:uuid')
    async get(@Query('file') hash : string) {
        return this.filesService.getFileByHash(hash);
    }

    
    /**
     * Put's
     */
    @Put('/:uuid')
    async update() {
        //
    }

    @Put('/trash/:uuid')
    async moveToTrash() {
        //
    }


    @Put('/restore/:uuid')
    async restore() {
        //
    }

    @Put('/favorite/:uuid')
    async favorite() {
        //
    }

    @Put('/unfavorite/:uuid')
    async unfavorite() {
        //
    }
    

    /**
     * Delete's
     */
    @Delete('/:uuid')
    async delete() {
        //
    }
}
