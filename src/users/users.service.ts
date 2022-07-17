import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import User from './interfaces/user.interface';
import UpdatePasswordDto from './dto/update-password.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(user: CreateUserDto) {
    const timestamp = Date.now();
    const newUser = {
      id: uuid(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  deleteOne(id: string): boolean {
    const isSuccess = !!this.users.find((user) => user.id === id);
    if (isSuccess) this.users = this.users.filter((el) => el.id !== id);
    return isSuccess;
  }

  updatePassword(id: string, receivedPasswords: UpdatePasswordDto): User {
    if (!receivedPasswords.newPassword || !receivedPasswords.oldPassword)
      throw new HttpException(
        'This old or new passwords are missing',
        HttpStatus.BAD_REQUEST,
      );
    const userForUpdate = this.users.find((user) => user.id === id);

    if (!userForUpdate)
      throw new HttpException('This user does not exist', HttpStatus.NOT_FOUND);
    if (userForUpdate.password !== receivedPasswords.oldPassword)
      throw new HttpException(
        'The old password is not correct',
        HttpStatus.FORBIDDEN,
      );

    const timestamp = Date.now();
    const updatedUser = {
      id: userForUpdate.id,
      login: userForUpdate.login,
      password: receivedPasswords.newPassword,
      version: userForUpdate.version + 1,
      createdAt: userForUpdate.createdAt,
      updatedAt: timestamp,
    };

    this.users = this.users.map((el) => (el.id === id ? updatedUser : el));
    return updatedUser;
  }
}
