import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { BaseService } from 'src/base/base.service/base.service.service';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';
import { ProductRepoService } from 'src/models/product.repo.service/product.repo.service.service';

@Injectable()
export class ProductService extends BaseService<Products> {
  constructor(repo: IBaseRepository<Products>) {
    super(repo);
  }
}
