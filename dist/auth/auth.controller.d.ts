import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { AuthCreateDTO } from './dto/auth-create.dto';
import { AuthResetPasswordDTO } from './dto/auth-reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ email, password }: AuthDTO): Promise<void>;
    create({ name, email, password }: AuthCreateDTO): Promise<void>;
    resetPassword({ email }: AuthResetPasswordDTO): Promise<void>;
}
