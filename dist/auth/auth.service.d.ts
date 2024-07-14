export declare class AuthService {
    login(email: string, password: string): Promise<void>;
    create(name: string, email: string, password: string): Promise<void>;
    resetPassword(email: string): Promise<void>;
}
