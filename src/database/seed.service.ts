import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { Role } from '../users/roles/role.enum';

@Injectable()
export class SeedService {
  private readonly LOGGER = new Logger(SeedService.name);
  constructor(private usersService: UsersService) {}

  async initSeed(): Promise<void> {
    this.LOGGER.log('Executing seed');
    const user: User = new User({
      username: 'achoque',
      password: 'qwerty1234',
      role: Role.User,
    });
    await this.usersService.create(user);

    const admin: User = new User({
      username: 'admin',
      password: 'qwerty1234',
      role: Role.Admin,
    });
    await this.usersService.create(admin);

    this.LOGGER.log('Finishing seed');
  }
}
