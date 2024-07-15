import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { AuthCreateDTO } from './dto/auth-create.dto';
import { AuthResetPasswordDTO } from './dto/auth-reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ email, password }: AuthDTO): Promise<string>;
    create(authCreateDTO: AuthCreateDTO): Promise<string>;
    resetPassword({ email }: AuthResetPasswordDTO): Promise<{
        success: boolean;
    }>;
}
