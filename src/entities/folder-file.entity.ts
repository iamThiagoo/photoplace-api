import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
} from 'typeorm';
import { FolderEntity } from './folder.entity';
import { FileEntity } from './file.entity';

@Entity('users')
export class FolderFileEntity {
    @PrimaryColumn('uuid')
    fileId: string;
  
    @PrimaryColumn('uuid')
    folderId: string;

    @ManyToOne(() => FileEntity, file => file.folderFiles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'file_id' })
    file: FileEntity;
  
    @ManyToOne(() => FolderEntity, folder => folder.folderFiles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'folder_id' })
    folder: FolderEntity;
}
