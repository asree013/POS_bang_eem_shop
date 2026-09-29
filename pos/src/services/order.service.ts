import { OrderItemCreate, OrderItems, Orders } from "@/models/order.model";
import { endpoint } from "./endpoint.service";
import { pathConstant } from "@/constants/path.constant";

export function createOrder(data: Orders) {
    try {
        return endpoint.post<Orders>(pathConstant.order, data)
    } catch (error) {
        throw error
    }
}

export function findOrderAll(page: number, limit: number) {
    return endpoint.get<Orders[]>(pathConstant.order + `?page=${page}&limit=${limit}`)
}

export function createOrderItem(data: OrderItemCreate[]) {
    return endpoint.post<Orders>(pathConstant.orderItem + '/many', data)
}

export function deleteOrderItemById(order_id: string) {
    return endpoint.delete(pathConstant.order + '/' + order_id + "/many")
}