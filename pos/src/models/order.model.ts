import { Payments } from "./payment.model"

export interface Orders {
  id: string
  detail: string
  status: string
  total_price: string
  create_date: string
  update_date: string
  payment_id: string
  prompay_id: string
  order_item: Array<OrderItems>
  Payments: {
    id: string
    type: string
    image: any
    status_payment: string
    create_date: string
    update_date: string
  }
  _count: {
    order_item: number
  }
}

export interface OrderItemCreate {
  order_id: string
  product_id: string
  count: number
  price: string
}

export interface OrderItems {
  id: string
  order_id: string
  product_id: string
  count: number
  price: string
  product_detail: {
    id: string
    name: string
    sku: string
    detail: string
    price: string
    cost: string
    count: number
    image: string
    create_date: string
    update_date: string
    create_by: string
    category_id: string
  }
}