import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS: number = 10;
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async getHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async findOneByCredentials(
    username: string,
    password: string,
  ): Promise<User> {
    const findedUser = await this.findOne({ username });
    if (!findedUser) {
      throw new BadRequestException("User doesn't exist.");
    }
    const validPassword = await bcrypt.compare(password, findedUser.password);
    if (!validPassword) {
      throw new BadRequestException('Invalid password.');
    }
    return findedUser;
  }

  async findOne(params): Promise<User> {
    const findedUser = await this.usersRepository.findOne<User>({
      where: {
        ...params,
      },
    });
    return findedUser;
  }

  async create(user: User): Promise<User> {
    const findedUser = await this.findOne({ username: user.username });
    if (findedUser) {
      throw new BadRequestException('User exists.');
    }
    const hashedPassword = await this.getHashedPassword(user.password);
    const response = await this.usersRepository.create({
      username: user.username,
      password: hashedPassword,
      role: user.role,
    });
    return response.dataValues;
  }
}
