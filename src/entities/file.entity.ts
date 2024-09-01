import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { UserEntity } from './user.entity';
import { FolderFileEntity } from './folder-file.entity';

@Entity('files')
export class FileEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
  
    @Column({name: 'file_name', length: 255, nullable: true })
    fileName: string;

    @Column({length: 255, nullable: true })
    originalname: string;
  
    @Column({length: 255 })
    hash: string;
  
    @Column({name: 'file_type', length: 50, nullable: true })
    fileType: string;
  
    @Column({name: 'file_size', type: 'int', nullable: true })
    fileSize: number;
  
    @Column({name: 'file_path', length: 255, nullable: true })
    filePath: string;
  
    @Column({ type: 'boolean', default: false })
    favorite: boolean;
  
    @CreateDateColumn({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at', type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @Column({name: 'trashed_at', type: 'timestamp', nullable: true })
    trashedAt: Date;
  
    @Column({name: 'user_id', type: 'uuid' })
    userId: string;
  
    @ManyToOne(() => UserEntity, user => user.files)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @OneToMany(() => FolderFileEntity, folderFile => folderFile.file)
    folderFiles: FolderFileEntity[];
}
