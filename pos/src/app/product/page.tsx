'use client'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Loadding from '@/components/Loadding'
import PaginationDesing from '@/components/PaginationDesing'
import ProductCard from '@/components/ProductCard'
import { Products } from '@/models/product.model'
import { findProductAll } from '@/services/product.service'
import { Button } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { NIL } from 'uuid'

const ProductLayout = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(5,2fr);
  grid-gap: 10px;
`

export default function page() {
  const [products, setProducts] = useState<Products[]>({} as Products[])
  const [load, setLoad] = useState<boolean>(false)
  async function onUpdatePage(page: number) {
    try {
      const resutl = await findProductAll(page, 15)
      setProducts(resutl.data)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const onFeedProduct = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findProductAll(1, 10)
      setProducts(result.data)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoad(false)
    }
  }, [setProducts])

  useEffect(() => {
    onFeedProduct()
  }, [onFeedProduct])
  return (
    <>
      <div>
        <Button onClick={() => {
          setLoad(true)
          window.location.href = '/product/' + NIL
        }} color='warning' sx={{ fontSize: '1.1rem' }} variant='outlined'>เพิ่มสินค้า</Button>
        <ProductLayout>
          {
            products.length > 0 ?
              products.map((r, i) =>
                <ProductCard key={i} product={r} />
              ) : <p>ไม่มีสินค้าในระบบ</p>
          }
        </ProductLayout>

        <PaginationDesing onReturnPage={onUpdatePage} />
      </div>

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  )
}
