export interface IBaseController<T> {
  handlerFindById(id: string): Promise<T | null>;
  handlerFindAll(page: number, limit: number): Promise<T[]>;
  handlerCreate(data: T): Promise<T>;
  handlerUpdate(id: string, data: Partial<T>): Promise<T>;
  handlerDelete(id: string): Promise<T>;
  handlerSearch(data: Partial<T>): Promise<T | T[] | null>;
}
