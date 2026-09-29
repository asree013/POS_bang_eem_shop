import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepoService } from './order.repo.service.service';

describe('OrderRepoService', () => {
  let service: OrderRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderRepoService],
    }).compile();

    service = module.get<OrderRepoService>(OrderRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
