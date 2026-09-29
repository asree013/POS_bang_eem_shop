import { pathConstant } from "@/constants/path.constant";
import { endpoint } from "./endpoint.service";
import { Categorys } from "@/models/category.model";

export function findCategoryAll(page: number, limit: number) {
    return endpoint.get<Categorys[]>(pathConstant.category+ `?page=${page}&limit=${limit}`)
}

export function findCategoryById(categoryById: string) {
    return endpoint.get<Categorys>(pathConstant.category+ `/${categoryById}`)
}

export function createCategory(data: Categorys) {
    return endpoint.post<Categorys>(pathConstant.category , data)
}