import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Categorys, PrismaClient } from '@prisma/client';
import { EnvService } from 'src/constants/env_service';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';

@Injectable()
export class CategoryRepoService implements IBaseRepository<Categorys> {
    constructor(@Inject(EnvService.conDb) private readonly db: PrismaClient){}

    repoFindAll(page: number, limit: number): Promise<Categorys[]> {
        page?? 1
        limit?? 10
        try {
            console.log(page, limit);
            
            const skip = (page - 1) * limit
            return this.db.categorys.findMany({skip, take: Number(limit)})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoFindById(id: string): Promise<Categorys> {
        try {
            return this.db.categorys.findFirst({where: {id}})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoCreate(data: Categorys): Promise<Categorys> {
        try {
            return this.db.categorys.create({data})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoDelete(id: string): Promise<Categorys> {
        try {
            return this.db.categorys.delete({where: {id}})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoSearch(data: Partial<Categorys>): Promise<Categorys | Categorys[]> {
        try {
            return this.db.categorys.findFirst({where: data})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
    repoUpdate(id: string, data: Partial<Categorys>): Promise<Categorys> {
        try {
            return this.db.categorys.update({where: {id}, data})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
