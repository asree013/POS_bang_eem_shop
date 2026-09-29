import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaClient, Users } from '@prisma/client';
import { EnvService } from 'src/constants/env_service';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';

@Injectable()
export class UserRepoService implements IBaseRepository<Users> {
  constructor(@Inject(EnvService.conDb) private readonly db: PrismaClient) {}

  repoFindAll(page: number, limit: number): Promise<Users[]> {
    page ?? 1;
    limit ?? 10;
    try {
      const skip = (page - 1) * limit;
      return this.db.users.findMany({
        skip,
        take: Number(limit),
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  repoFindById(id: string): Promise<Users> {
    try {
      return this.db.users.findFirst({ where: { id: id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  repoCreate(data: Users): Promise<Users> {
    try {
      return this.db.users.create({ data: data });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  repoDelete(id: string): Promise<Users> {
    try {
      return this.db.users.delete({ where: { id: id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  repoSearch(data: Partial<Users>): Promise<Users | Users[]> {
    try {
      return this.db.users.findFirst({ where: {
        email: data.email
      } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  repoUpdate(id: string, data: Partial<Users>): Promise<Users> {
    try {
      return this.db.users.update({ where: { id: id }, data });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
