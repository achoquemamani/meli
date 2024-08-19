import { Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionHandling } from '../utils/exception.handling';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  private readonly LOGGER = new Logger(SeedController.name);
  constructor(
    private seedService: SeedService,
    private exceptionHandling: ExceptionHandling,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async initSeed(): Promise<void> {
    try {
      await this.seedService.initSeed();
    } catch (error) {
      this.exceptionHandling.handleException(this.LOGGER, error);
    }
  }
}
