import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/entities/file.entity';
import { IAuthUser } from 'src/types/IAuthUser';
import { generateHashByString } from 'src/util/helpers/files';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { FileUpdateDTO } from './dto/update-file.dto';

@Injectable()
export class FilesService {

    constructor(
        @InjectRepository(FileEntity)
        private filesRepository: Repository<FileEntity>
    ) {}

    async upload(files : Array<Express.Multer.File>, user : IAuthUser) : Promise<{ success: boolean}> {
        try {
            await Promise.all(files.map(async (file) => {
                const hash = await generateHashByString(file.filename);
    
                const newFile = {
                    fileName: file.filename,
                    hash: hash,
                    originalname: file.originalname,
                    fileType: file.mimetype,
                    fileSize: file.size,
                    filePath: file.path,
                    userId: String(user.id)
                };
    
                return await this.filesRepository.save(newFile);
            }));

            return {
                success: true
            }
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async getFileInfos(uuid : string) {
        try {
            return await this.filesRepository.findOneByOrFail({uuid}); 
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async getFile(uuid : string, @Res() res: Response) {
        try {
            const file = await this.filesRepository.findOneByOrFail({uuid});
            const fileStream = fs.createReadStream(join(__dirname, '../../../.files', file.fileName));

            fileStream.pipe(res);

            fileStream.on('end', () => {
                res.end();
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updatePartial(data : FileUpdateDTO, userId : string) : Promise<{ success: boolean}> {
        const file = await this.filesRepository.findOneByOrFail({uuid: data.uuid});

        if (file.userId !== userId)
            throw new UnauthorizedException('Você não pode atualizar o arquivo/pasta do amiguinho!');
        
        const fileUpdated : Partial<FileEntity> = {}
        const currentTimestamp = new Date();

        if (data.originalname) fileUpdated.originalname = data.originalname;
        if (data.favorite) fileUpdated.favorite = true;
        if (data.unfavorite) fileUpdated.favorite = false;
        if (data.moveToTrash) fileUpdated.trashedAt = currentTimestamp;
        if (data.restoreFromTrash) fileUpdated.trashedAt = null;
        
        fileUpdated.updatedAt = currentTimestamp;

        await this.filesRepository.update(file.uuid, fileUpdated);
        
        return {
            success: true
        }
    }

    async deleteFile(uuid : string, user : IAuthUser) : Promise<{ success: boolean}> {
        try {
            const file = await this.filesRepository.findOneByOrFail({uuid});

            if (file.userId !== user.id)
                throw new UnauthorizedException('Você não pode deletar o arquivo/pasta do amiguinho!');

            await fs.promises.unlink(file.filePath);
            await this.filesRepository.delete(uuid);

            return {
                success: true
            };
        } catch (error) {
            throw new BadRequestException(error.message || 'Erro ao tentar excluir o arquivo.');
        }
    }
}
