import { Module } from '@nestjs/common';
import { EnvRepository } from 'src/constants/env_repository';
import { EnvService } from 'src/constants/env_service';
import { OrderItemController } from 'src/controllers/order.item/order.item.controller';
import { OrderItemRepoService } from 'src/models/order.item.repo/order.item.repo.service';
import { ConnectDbService } from 'src/services/connect_db.service/connect_db.service.service';
import { OrderItemService } from 'src/services/order.item.service/order.item.service';

@Module({
    controllers: [OrderItemController],
    providers: [
        {
            provide: EnvRepository.repoOrderIten,
            useFactory: (conDb: ConnectDbService) => {
                return new OrderItemRepoService(conDb)
            },
            inject: [EnvService.conDb]
        },
        {
            provide: EnvService.orderItem,
            useFactory: (repo: OrderItemRepoService) => {
                return new OrderItemService(repo)
            },
            inject: [EnvRepository.repoOrderIten]

        }
    ]
})
export class OrderItemModule {}
