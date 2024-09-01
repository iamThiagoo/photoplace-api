import {
    Body,
    Controller,
    Delete,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Put,
    Req,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateRandomFileName } from 'src/util/helpers/files';
import { FileUpdateDTO } from './dto/update-file.dto';

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
        files: Array<Express.Multer.File>,
        @Req() req
    ) {
        return this.filesService.upload(files, req.user);
    }


    /**
     * Get's
     */
    @Get('/:uuid')
    async getFile(@Param('uuid') uuid : string, @Res() res) {
        return this.filesService.getFile(uuid, res);
    }

    @Get('/info/:uuid')
    async getFileInfos(@Param('uuid') uuid : string) {
        return this.filesService.getFileInfos(uuid);
    }

    
    /**
     * Put's
     */
    @Put('/:uuid')
    async update(@Body() data : FileUpdateDTO, @Req() req) {
        return this.filesService.updatePartial(data, req.user);
    }
    

    /**
     * Delete's
     */
    @Delete('/:uuid')
    async delete(@Param('uuid') uuid : string, @Req() req) {
        return this.filesService.deleteFile(uuid, req.user);
    }
}
