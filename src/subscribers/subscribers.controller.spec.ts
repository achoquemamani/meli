import { Test, TestingModule } from '@nestjs/testing';
import { SubscribersController } from './subscribers.controller';
import { ExceptionHandling } from '../utils/exception.handling';
import { SubscribersService } from './subscribers.service';
import { Subscriber } from './models/subscriber.entity';

describe('SubscribersController', () => {
  let controller: SubscribersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribersController],
      providers: [
        SubscribersController,
        ExceptionHandling,
        { provide: SubscribersService, useValue: Subscriber },
      ],
    }).compile();

    controller = module.get<SubscribersController>(SubscribersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
