import { IsBoolean, IsString } from 'class-validator';

export class FileDTO {

    @IsString()
    uuid: string;

    @IsString()
    originalname: string;

    @IsBoolean()
    favorite: boolean;

    @IsBoolean()
    unfavorite: boolean;

    @IsBoolean()
    moveToTrash: boolean;

    @IsBoolean()
    restoreFromTrash: boolean;

    @IsString()
    userId: string

}
