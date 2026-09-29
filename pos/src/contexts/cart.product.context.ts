import { OrderItems } from "@/models/order.model"
import { Products } from "@/models/product.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TCartProductContext = {
    orderItem: OrderItems[]
    setOrderItem: Dispatch<SetStateAction<OrderItems[]>>
}

export const CartContext = createContext<TCartProductContext>({} as TCartProductContext)