import { Module } from '@nestjs/common';
import { EnvController } from 'src/constants/env_controller';
import { EnvRepository } from 'src/constants/env_repository';
import { EnvService } from 'src/constants/env_service';
import { CategoryController } from 'src/controllers/category/category.controller';
import { CategoryRepoService } from 'src/models/category.repo/category.repo.service';
import { CategoryService } from 'src/services/category/category.service';
import { ConnectDbService } from 'src/services/connect_db.service/connect_db.service.service';

@Module({
    controllers: [CategoryController],
    providers: [
        {
            provide: EnvRepository.category,
            useFactory: (conDeb: ConnectDbService) => {
                return new CategoryRepoService(conDeb)
            },
            inject: [EnvService.conDb]
        },
        {
            provide: EnvService.category,
            useFactory: (repo: CategoryRepoService) => {
                return new CategoryService(repo)
            },
            inject: [EnvRepository.category]
        }
    ]
})
export class CategoryModule {}
