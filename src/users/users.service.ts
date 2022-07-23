import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import User from './interfaces/user.interface';
import { User as UserBase } from './../entities/User';
import UpdatePasswordDto from './dto/update-password.dto';
import { Repository } from 'typeorm';
import { DatabaseService } from 'src/database/database.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserBase)
    private usersRepository: Repository<UserBase>,
  ) {}

  async create(user: CreateUserDto) {
    const timestamp = Date.now();
    const newUser = new UserBase();
    newUser.id = uuid();
    newUser.login = user.login;
    newUser.password = user.password;
    await this.usersRepository.save(newUser);
    return await this.usersRepository.findOneBy({ id: newUser.id });
  }

  async findAll(): Promise<UserBase[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserBase> {
    return await this.usersRepository.findOneBy({ id });
  }

  async deleteOne(id: string): Promise<boolean> {
    const isSuccess = !!(await this.usersRepository.findOneBy({ id }));
    if (isSuccess) this.usersRepository.delete(id);
    return isSuccess;
  }

  async updatePassword(
    id: string,
    receivedPasswords: UpdatePasswordDto,
  ): Promise<UserBase> {
    if (!receivedPasswords.newPassword || !receivedPasswords.oldPassword)
      throw new HttpException(
        'This old or new passwords are missing',
        HttpStatus.BAD_REQUEST,
      );
    const userForUpdate = await this.usersRepository.findOneBy({ id });

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
    };

    await this.usersRepository.save(updatedUser);
    return await this.usersRepository.findOneBy({ id });
  }
}
