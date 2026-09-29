import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepoService } from './category.repo.service';

describe('CategoryRepoService', () => {
  let service: CategoryRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryRepoService],
    }).compile();

    service = module.get<CategoryRepoService>(CategoryRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
