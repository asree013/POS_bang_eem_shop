import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Payments, PrismaClient } from '@prisma/client';
import { EnvService } from 'src/constants/env_service';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';

@Injectable()
export class PaymentRepoService implements IBaseRepository<Payments> {
    constructor(@Inject(EnvService.conDb) private readonly db: PrismaClient) {}

    repoFindAll(page: number, limit: number): Promise<Payments[]> {
        page?? 1
        limit?? 10
        try {
            const skip = (page - 1) * limit
            return this.db.payments.findMany({skip, take: Number(limit)})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoFindById(id: string): Promise<Payments> {
        try {
            return this.db.payments.findFirst({where: {id}})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoCreate(data: Payments): Promise<Payments> {
        try {
            return this.db.payments.create({data})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoDelete(id: string): Promise<Payments> {
        try {
            return this.db.payments.delete({where: {id}})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoSearch(data: Partial<Payments>): Promise<Payments | Payments[]> {
        try {
            return this.db.payments.findMany({where: data})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoUpdate(id: string, data: Partial<Payments>): Promise<Payments> {
        try {
            return this.db.payments.update({where: {id}, data})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
