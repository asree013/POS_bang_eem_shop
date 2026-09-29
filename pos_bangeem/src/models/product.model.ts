export interface Products {
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
    user_create: {
      first_name: string
      last_name: string
      id: string
      image: string
    }
    category: {
      name: string
    }
  }