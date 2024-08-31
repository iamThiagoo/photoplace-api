import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Timestamp
} from 'typeorm';
import { FolderFileEntity } from './folder-file.entity';
import { FileEntity } from './file.entity';
import { FolderEntity } from './folder.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Timestamp;

    @OneToMany(() => FolderFileEntity, folder => folder.file)
    folders: FolderEntity[];
  
    @OneToMany(() => FileEntity, file => file.user)
    files: FileEntity[];
}
