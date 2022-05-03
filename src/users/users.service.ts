import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: CreateUserDto) {
    const isUserExist = await this.usersRepository.findOne({
      where: {
        username: userDto.username,
      },
    });

    if (isUserExist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    } else {
      const currentUser = this.usersRepository.create();
      const saltOrRounds = 10;
      currentUser.username = userDto.username;
      currentUser.password = await bcrypt.hash(userDto.password, saltOrRounds);
      await this.usersRepository.save(currentUser);
      return 'User created';
    }
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }
}
