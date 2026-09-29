import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemRepoService } from './order.item.repo.service';

describe('OrderItemRepoService', () => {
  let service: OrderItemRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderItemRepoService],
    }).compile();

    service = module.get<OrderItemRepoService>(OrderItemRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
