import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import CreateUserDto from 'src/users/dto/create-user.dto';
import { AuthData } from './auth.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Request() req: AuthData) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signup')
  async signup(@Request() req: CreateUserDto) {
    return this.authService.signUp(req);
  }
}
