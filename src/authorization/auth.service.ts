import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import CreateUserDto from 'src/users/dto/create-user.dto';
import { AuthData } from './auth.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authData: AuthData) {
    if (
      !authData.login ||
      !authData.password ||
      typeof authData.login !== 'string' ||
      typeof authData.password !== 'string'
    ) {
      throw new HttpException(
        'The login or password are incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const users = await this.usersService.findAll();
    const userNeed = users.find((el) => el.login === authData.login);
    if (!userNeed) {
      throw new HttpException('The password is wrong', HttpStatus.FORBIDDEN);
    }
    const isPasswordCorrect = await bcrypt.compare(
      authData.password,
      userNeed.password,
    );
    if (!isPasswordCorrect) {
      throw new HttpException('The password is wrong', HttpStatus.FORBIDDEN);
    }
    const payload = { login: userNeed.login, sub: userNeed.id };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '24h' }),
    };
  }

  async signUp(user: CreateUserDto) {
    if (
      !user.login ||
      !user.password ||
      typeof user.login !== 'string' ||
      typeof user.password !== 'string'
    ) {
      throw new HttpException(
        'The login or password are incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const passwordHashed = await bcrypt.hash(user.password, 10);
    return this.usersService.create({
      login: user.login,
      password: passwordHashed,
    });
  }

  async refresh(refreshToken: string) {
    if (!refreshToken || typeof refreshToken !== 'string') {
      throw new HttpException(
        'The refreshToken is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isSucces = await this.jwtService.verify(refreshToken);
    if (!isSucces) {
      throw new HttpException(
        'The refreshToken is invalid',
        HttpStatus.FORBIDDEN,
      );
    } else {
      const user = await this.usersService.findOne(isSucces.userId);
      const payload = { login: user.login, sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
        refreshToken: this.jwtService.sign(payload, { expiresIn: '24h' }),
      };
    }
  }
}
