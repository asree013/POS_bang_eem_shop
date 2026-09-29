import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaClient, Products } from '@prisma/client';
import { EnvService } from 'src/constants/env_service';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';

@Injectable()
export class ProductRepoService implements IBaseRepository<Products> {
  constructor(@Inject(EnvService.conDb) private readonly db: PrismaClient) {}

  repoFindAll(page: number, limit: number): Promise<Products[]> {
    if(!page) page = 1
    if(!limit) limit = 10
    try {
      const skip = (page - 1) * limit;
      return this.db.products.findMany({
        skip,
        take: Number(limit),
        include: {
          user_create: {
            select: {
              first_name: true,
              last_name: true,
              id: true,
              image: true,
            },
          },
          category: {
            select: {
              name: true
            }
          }
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  repoFindById(id: string): Promise<Products> {
    try {
      return this.db.products.findFirst({ where: { id: id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  repoCreate(data: Products): Promise<Products> {
    try {
      return this.db.products.create({ data });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  repoDelete(id: string): Promise<Products> {
    try {
      return this.db.products.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  repoSearch(data: Partial<Products>): Promise<Products | Products[]> {
    try {
      return this.db.products.findMany({ where: data });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  repoUpdate(id: string, data: Partial<Products>): Promise<Products> {
    try {
      return this.db.products.update({ where: { id }, data });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
