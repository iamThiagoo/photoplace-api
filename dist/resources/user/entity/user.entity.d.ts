import { Timestamp } from 'typeorm';
export declare class UserEntity {
    uuid: string;
    name: string;
    email: string;
    password: string;
    createdAt: Timestamp;
}
