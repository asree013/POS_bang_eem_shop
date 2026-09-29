import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OrderItems, PrismaClient } from '@prisma/client';
import { EnvService } from 'src/constants/env_service';
import { OrderItem } from 'src/DTO/ProductCreateDTO';
import { IBaseAddOnRepo } from 'src/interfaces/IBaseAddOnRepo';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';

@Injectable()
export class OrderItemRepoService implements IBaseRepository<OrderItems> {
    constructor(@Inject(EnvService.conDb) private readonly db: PrismaClient) { }


    repoFindAll(page: number, limit: number): Promise<OrderItems[]> {
        page ?? 1
        limit ?? 10
        try {
            const skip: number = (page - 1) * limit
            return this.db.orderItems.findMany({
                skip,
                take: Number(limit)
            })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoFindById(id: string): Promise<OrderItems> {
        try {
            return this.db.orderItems.findFirst({ where: { id } })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoCreate(data: OrderItems): Promise<OrderItems> {
        try {
            return this.db.orderItems.create({ data })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoDelete(id: string): Promise<OrderItems> {
        try {
            return this.db.orderItems.delete({ where: { id } })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoSearch(data: Partial<OrderItems>): Promise<OrderItems | OrderItems[]> {
        try {
            return this.db.orderItems.findFirst({ where: data })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoUpdate(id: string, data: Partial<OrderItems>): Promise<OrderItems> {
        try {
            return this.db.orderItems.update({ where: { id }, data })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

}
