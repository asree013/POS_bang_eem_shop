import { Module } from '@nestjs/common';
import { EnvRepository } from 'src/constants/env_repository';
import { EnvService } from 'src/constants/env_service';
import { ProductController } from 'src/controllers/product.controller/product.controller.controller';
import { ProductRepoService } from 'src/models/product.repo.service/product.repo.service.service';
import { UserRepoService } from 'src/models/user.repo.service/user.repo.service.service';
import { ConnectDbService } from 'src/services/connect_db.service/connect_db.service.service';
import { ProductService } from 'src/services/product.service/product.service.service';
import { UserService } from 'src/services/user.service/user.service.service';

@Module({
  controllers: [ProductController],
  providers: [
    {
      provide: EnvRepository.repoProduct,
      useFactory: (conDb: ConnectDbService) => {
        return new ProductRepoService(conDb);
      },
      inject: [EnvService.conDb],
    },
    {
      provide: EnvService.product,
      useFactory: (repo: ProductRepoService) => {
        return new ProductService(repo);
      },
      inject: [EnvRepository.repoProduct]
    },
  ],
})
export class ProductModule {}
