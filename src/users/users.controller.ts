import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import UpdatePasswordDto from './dto/update-password.dto';
import User, { UserEntity } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.login && createUserDto.password) {
      const newUser = await this.usersService.create(createUserDto);
      return new UserEntity(newUser);
    }
    throw new HttpException(
      'Login or password are missing',
      HttpStatus.BAD_REQUEST,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((el) => new UserEntity(el));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param() params: any) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        params.id,
      )
    ) {
      const user = await this.usersService.findOne(params.id);
      if (user) return new UserEntity(user);
      throw new HttpException('This user does not exist', HttpStatus.NOT_FOUND);
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  async deleteOne(@Param() params: any) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        params.id,
      )
    ) {
      const isSuccess = await this.usersService.deleteOne(params.id);
      if (!isSuccess) {
        throw new HttpException(
          'This user does not exist',
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          'This user was successfullly deleted',
          HttpStatus.NO_CONTENT,
        );
      }
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updatePassword(
    @Param() params: any,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        params.id,
      )
    ) {
      const userUpdated = await this.usersService.updatePassword(
        params.id,
        updatePasswordDto,
      );
      return new UserEntity(userUpdated);
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }
}
