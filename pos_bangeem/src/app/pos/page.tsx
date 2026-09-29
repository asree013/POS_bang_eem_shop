'use client'
import { Card, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductCard from '../components/ProductCard'
import { Products } from '@/models/product.model'
import { findProductAll } from '@/services/product.service'
import { toast } from '@/services/alert.service'
import PaginationDesing from '../components/PaginationDesing'
import Divider from '@mui/joy/Divider'
import CartProduct from '../components/CartProduct'
import { CartContext } from '../contexts/cart.product.context'
import { OrderItems } from '@/models/order.model'

const StyleBody = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 5px;
`

const StyleProduct = styled.div`
  width: 100%;
  padding: 5px;
`

const StyleCart = styled.div`
  width: 40%;
  padding: 5px;
`

const StyleGridProduct = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`

const CartStyle = styled.div`
padding: 15px;
  
`

export default function Page() {
  const [products, setProducts] = useState<Products[]>({} as Products[])
  const [orderItem, setOrderItem] = useState<OrderItems[]>({} as OrderItems[])

  async function onUpdatePage(page: number) {
    const result = await findProductAll(page, 12)
    setProducts(result.data)
  }

  const onFeedProduct = useCallback(async () => {
    try {
      const result = await findProductAll(1, 12)
      setProducts(result.data)
    } catch (error: any) {
      toast(error.message, 'error')
    }
  }, [setProducts])

  useEffect(() => {
    onFeedProduct()
  }, [onFeedProduct])

  return (
    <CartContext.Provider value={{orderItem, setOrderItem}}>
      <StyleBody>
        <StyleProduct>
          <Card elevation={4} style={{ padding: 10, background: '#d6d4d4', height: '90vh' }}>
            <StyleGridProduct>
              {Object.keys(products).length === 0 ? null :
                products.map((r, i) => <ProductCard key={i} product={r} />)}
            </StyleGridProduct>
            <div style={{ background: 'white', marginTop: 10, position: 'absolute', bottom: 50, width: '68%' }}>
              <PaginationDesing onReturnPage={onUpdatePage} />
            </div>
          </Card>
        </StyleProduct>

        <StyleCart>
          <Card elevation={4} style={{ padding: 10, borderRadius: 10, height: '90vh' }}>
            <Typography color="warning" style={{ fontSize: '1.2rem', fontWeight: 500 }}>ตะกร้าสินค้า</Typography>
            <Divider sx={{ background: 'black' }} />
            <CartStyle>
              {/* Add cart contents here */}
              {
                Object.keys(orderItem).length === 0?
                null:
                orderItem.map((r, i) => 
                <CartProduct key={i} productItem={r}  />
                )
              }
            </CartStyle>
          </Card>
        </StyleCart>
      </StyleBody>
    </CartContext.Provider>
  )
}
