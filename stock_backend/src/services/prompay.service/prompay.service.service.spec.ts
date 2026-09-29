import { Test, TestingModule } from '@nestjs/testing';
import { PrompayService } from './prompay.service.service';

describe('PrompayServiceService', () => {
  let service: PrompayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrompayService],
    }).compile();

    service = module.get<PrompayService>(PrompayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
