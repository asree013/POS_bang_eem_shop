import { Orders } from "./order.model"

export interface Prompays {
    id: string
    first_name: string
    last_name: string
    number_phone: string
    create_date: string
    update_date: string
    Orders: Orders[]
}