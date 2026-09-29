import { Module } from '@nestjs/common';
import { EnvRepository } from 'src/constants/env_repository';
import { EnvService } from 'src/constants/env_service';
import { OrderController } from 'src/controllers/order.controller/order.controller.controller';
import { OrderRepoService } from 'src/models/order.repo.service/order.repo.service.service';
import { ConnectDbService } from 'src/services/connect_db.service/connect_db.service.service';
import { OrderService } from 'src/services/order.service/order.service.service';

@Module({
    controllers: [OrderController],
    providers: [
        {
            provide: EnvRepository.repoOrder,
            useFactory: (conDb: ConnectDbService) => {
                return new OrderRepoService(conDb)
            },
            inject: [EnvService.conDb]
        },
        {
            provide: EnvService.order,
            useFactory: (repo: OrderRepoService) => {
                return new OrderService(repo, repo)
            },
            inject: [EnvRepository.repoOrder]
        }
    ]
})
export class OrderModule {}
