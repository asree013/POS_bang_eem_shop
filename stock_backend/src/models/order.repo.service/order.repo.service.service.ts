import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Orders, PrismaClient } from '@prisma/client';
import { EnvService } from 'src/constants/env_service';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';

@Injectable()
export class OrderRepoService implements IBaseRepository<Orders> {
    constructor(@Inject(EnvService.conDb) private readonly db: PrismaClient) { }

    repoFindAll(page: number, limit: number): Promise<Orders[]> {
        page ?? 1
        limit ?? 10
        try {
            const skip = (page - 1) * limit
            return this.db.orders.findMany({
                skip, take: Number(limit),
                include: {
                    order_item: {
                        include: {
                            product_detail: true
                        }
                    },
                    Payments: true,
                    _count: true,
                }
            })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoFindById(id: string): Promise<Orders> {
        try {
            return this.db.orders.findFirst({ where: { id } })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoCreate(data: Orders): Promise<Orders> {
        try {
            return this.db.orders.create({ data })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoDelete(id: string): Promise<Orders> {
        try {
            return this.db.orders.delete({ where: { id } })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoSearch(data: Partial<Orders>): Promise<Orders | Orders[]> {
        try {
            return this.db.orders.findFirst({
                where: data
            })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoUpdate(id: string, data: Partial<Orders>): Promise<Orders> {
        try {
            return this.db.orders.update({ where: { id }, data })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async repoDeleteMany(id: string) {
        try {
            const result = await this.db.orders.findFirst({where: {id}});
            await this.db.orderItems.deleteMany({ where: { order_id: id } });
            await this.db.orders.delete({ where: { id } });
            return result
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
