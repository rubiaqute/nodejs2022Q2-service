import { Body, Controller, Post } from '@nestjs/common';
import CreateUserDto from 'src/users/dto/create-user.dto';
import { AuthData } from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() req: AuthData) {
    return this.authService.login(req);
  }

  @Post('signup')
  async signup(@Body() req: CreateUserDto) {
    return this.authService.signUp(req);
  }

  @Post('refresh')
  async refresh(@Body() req: { refreshToken: string }) {
    return this.authService.refresh(req.refreshToken);
  }
}
