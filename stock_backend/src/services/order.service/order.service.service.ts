import { Inject, Injectable } from '@nestjs/common';
import { Orders, PrismaClient } from '@prisma/client';
import { BaseService } from 'src/base/base.service/base.service.service';
import { EnvService } from 'src/constants/env_service';
import { OrderDTO } from 'src/DTO/ProductCreateDTO';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';
import { OrderRepoService } from 'src/models/order.repo.service/order.repo.service.service';

@Injectable()
export class OrderService extends BaseService<Orders> {
    constructor(repo: IBaseRepository<Orders>, @Inject(EnvService.conDb) private readonly service: OrderRepoService){
        super(repo)
    }

    serviceDeleteMany(id: string) {
        return this.service.repoDeleteMany(id)
    }
}
