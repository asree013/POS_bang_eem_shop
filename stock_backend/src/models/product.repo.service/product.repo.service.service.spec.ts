import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepoService } from './product.repo.service.service';

describe('ProductRepoService', () => {
  let service: ProductRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRepoService],
    }).compile();

    service = module.get<ProductRepoService>(ProductRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
