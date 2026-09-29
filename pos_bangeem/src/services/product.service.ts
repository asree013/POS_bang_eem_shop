import { Products } from "@/models/product.model";
import { endpoint } from "./endpoint.service";
import { pathConstant } from "@/constants/path.constant";

export function createProduct(data: Products) {
    return endpoint.post<Products>(pathConstant.product, data)
}

export function findProductAll(page: number, limit: number) {
    return endpoint.get<Products[]>(pathConstant.product + `?page=${page}&limit=${limit}`)
}

export function findProductById(product_id: string) {
    return endpoint.get<Products>(pathConstant.product + `/${product_id}`)
}

export function delteProductById(product_id: string) {
    return endpoint.delete<Products>(pathConstant.product + `/${product_id}`)
}