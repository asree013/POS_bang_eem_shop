import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderItems } from '@prisma/client';
import { BaseService } from 'src/base/base.service/base.service.service';
import { IBaseAddOnRepo } from 'src/interfaces/IBaseAddOnRepo';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';
import { OrderItemRepoService } from 'src/models/order.item.repo/order.item.repo.service';

@Injectable()
export class OrderItemService extends BaseService<OrderItems> {
    constructor(repo: IBaseRepository<OrderItems>){
        super(repo)
    }
    async createMany(data: OrderItems[]) {
        console.log(data);
        
        try {
            const result = await Promise.all(data.map(async(data) => {
                await this.create(data)
            }))
            return result
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
