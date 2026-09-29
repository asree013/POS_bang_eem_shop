import { Injectable } from '@nestjs/common';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';
import { IBaseService } from 'src/interfaces/IBaseService';

@Injectable()
export class BaseService<T> implements IBaseService<T> {
  constructor(private repo: IBaseRepository<T>) {}
  create(data: T): Promise<T> {
    return this.repo.repoCreate(data);
  }
  findAll(page: number, limit: number): Promise<T[]> {
    return this.repo.repoFindAll(page, limit);
    
  }
  findById(id: string): Promise<T> {
    return this.repo.repoFindById(id);
  }
  update(id: string, data: Partial<T>): Promise<T> {
    return this.repo.repoUpdate(id, data);
  }
  delete(id: string): Promise<T> {
    return this.repo.repoDelete(id);
  }
  search(data: Partial<T>): Promise<T | T[]> {
    return this.repo.repoSearch(data);
  }
}
