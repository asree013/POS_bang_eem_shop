import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Payments, PrismaClient, PrompayDetails } from '@prisma/client';
import { EnvService } from 'src/constants/env_service';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';

@Injectable()
export class PrompayRepoService implements IBaseRepository<PrompayDetails> {
    constructor(@Inject(EnvService.conDb) private readonly db: PrismaClient){}

    repoFindAll(page: number, limit: number): Promise<PrompayDetails[]> {
        if(!page) page = 1
        if(!limit) limit = 10
        try {
            const skip = (page - 1)* limit
            return this.db.prompayDetails.findMany({skip, take: Number(limit)})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoFindById(id: string): Promise<PrompayDetails> {
        try {
            return this.db.prompayDetails.findFirst({where: {id}})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoCreate(data: PrompayDetails): Promise<PrompayDetails> {
        try {
            return this.db.prompayDetails.create({data})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoDelete(id: string): Promise<PrompayDetails> {
        try {
            return this.db.prompayDetails.delete({where: {id}})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoSearch(data: Partial<PrompayDetails>): Promise<PrompayDetails | PrompayDetails[]> {
        try {
            return this.db.prompayDetails.findMany({where: data})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoUpdate(id: string, data: Partial<PrompayDetails>): Promise<PrompayDetails> {
        try {
            return this.db.prompayDetails.update({where: {id}, data: data})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
