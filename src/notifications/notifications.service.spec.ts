import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { MeteorologicalService } from './meteorological.service/meteorological.service';
import { MeteorologicalServiceCPTEC } from './meteorological.service/meteorological.CPTEC.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: MeteorologicalService, useClass: MeteorologicalService },
        {
          provide: MeteorologicalServiceCPTEC,
          useClass: MeteorologicalServiceCPTEC,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
