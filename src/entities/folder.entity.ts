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

@Entity('folders')
export class FolderEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  favorite: boolean;

  @Column({ type: 'boolean', default: false })
  trash: boolean;

  @Column({ type: 'uuid', nullable: true })
  parentFolderUuid: string;

  @ManyToOne(() => FolderEntity, folder => folder.subFolders)
  @JoinColumn({ name: 'parent_folder_uuid' })
  parentFolder: FolderEntity;

  @OneToMany(() => FolderEntity, folder => folder.parentFolder)
  subFolders: FolderEntity[];

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne(() => UserEntity, user => user.folders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  trashedAt: Date;

  @OneToMany(() => FolderFileEntity, folderFile => folderFile.folder)
  folderFiles: FolderFileEntity[];
}