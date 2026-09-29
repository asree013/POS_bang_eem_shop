import { Test, TestingModule } from '@nestjs/testing';
import { PrompayRepoService } from './prompay.repo.service';

describe('PrompayRepoService', () => {
  let service: PrompayRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrompayRepoService],
    }).compile();

    service = module.get<PrompayRepoService>(PrompayRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
