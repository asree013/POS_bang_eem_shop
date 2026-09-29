export interface IBaseRepository<T> {
  repoFindAll(page: number, limit: number): Promise<T[]>;
  repoFindById(id: string): Promise<T | null>;
  repoCreate(data: T): Promise<T>;
  repoDelete(id: string): Promise<T | null>;
  repoSearch(data: Partial<T>): Promise<T[] | null | T>;
  repoUpdate(id: string, data: Partial<T>): Promise<T>;
}
