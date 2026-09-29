export interface IBaseService<T> {
  create(data: T): Promise<T>;
  findAll(page: number, limit: number): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<T | null>;
  search(data: Partial<T>): Promise<T[] | T | null>;
}
