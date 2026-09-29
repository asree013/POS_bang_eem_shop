export interface IBaseAddOnRepo<T> {
    addOnCreateMany(data: T[]): Promise<T[]>
    addOnDeleteMany(id: string[]): Promise<T[]>
    addOnUpdateMany(id: string[], data: T[]): Promise<T[]>
}