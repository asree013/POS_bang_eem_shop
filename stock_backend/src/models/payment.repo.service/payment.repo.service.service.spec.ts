import { Test, TestingModule } from '@nestjs/testing';
import { PaymentRepoService } from './payment.repo.service.service';

describe('PaymentRepoService', () => {
  let service: PaymentRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentRepoService],
    }).compile();

    service = module.get<PaymentRepoService>(PaymentRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
