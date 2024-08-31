import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn
} from 'typeorm';
import { UserEntity } from './user.entity';
import { FolderFileEntity } from './folder-file.entity';

@Entity('files')
export class FileEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
  
    @Column({length: 255, nullable: true })
    fileName: string;
  
    @Column({length: 255 })
    hash: string;
  
    @Column({length: 50, nullable: true })
    fileType: string;
  
    @Column({ type: 'int', nullable: true })
    fileSize: number;
  
    @Column({length: 255, nullable: true })
    filePath: string;
  
    @Column({ type: 'boolean', default: false })
    favorite: boolean;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    uploadedAt: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    trashedAt: Date;
  
    @Column({ type: 'uuid' })
    userId: string;
  
    @ManyToOne(() => UserEntity, user => user.files)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @OneToMany(() => FolderFileEntity, folderFile => folderFile.file)
    folderFiles: FolderFileEntity[];
}
