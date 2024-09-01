import { PartialType } from '@nestjs/mapped-types';
import { FileDTO } from './create-file.dto';

export class FileUpdateDTO extends PartialType(FileDTO) {}
