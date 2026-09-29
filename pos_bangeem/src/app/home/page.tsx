'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from './home.module.css'
import { Avatar, Box, Button, Card, Typography } from '@mui/material'
import Loadding from '../components/Loadding'
import { NIL } from 'uuid'
import ProductTable from '../components/ProductTable'
import { Products } from '@/models/product.model'
import { findProductAll } from '@/services/product.service'
import { toast } from '@/services/alert.service'
import PaginationDesing from '../components/PaginationDesing'
import CategoryTable from '../components/CategoryTable'
import { Categorys } from '@/models/category.model'
import { findCategoryAll } from '@/services/category.service'

export default function page() {
  const [load, setLoad] = useState<boolean>(false)
  const [product, setProduct] = useState<Products[]>({} as Products[])
  const [category, setCategory] = useState<Categorys[]>({} as Categorys[])

  const onFeedProduct = useCallback(async () => {
    try {
      const result = await findProductAll(1, 10)
      setProduct(result.data)
    } catch (error: any) {
      toast(error.message, 'error')
    }
  }, [setProduct])

  const onFeedCategory = useCallback(async () => {
    try {
      const result = await findCategoryAll(1, 10)
      setCategory(result.data)
    } catch (error: any) {
      toast(error.message, 'error')
    }
  }, [setProduct])

  function filterProduct(product_id: string) {
    setProduct(product.filter(r => r.id !== product_id))
  }

  async function updatePage(pages: number) {
    try {
      const result = await findProductAll(pages, 10)
      setProduct(result.data)
    } catch (error: any) {
      toast(error.message, 'error')
    }
  }

  useEffect(() => {
    onFeedProduct()
    onFeedCategory()

    return () => {
      onFeedProduct
      onFeedCategory
    }
  }, [onFeedProduct, onFeedCategory])
  return (
    <>
      <div className={style.home}>
        <div className={style.contentHead}>
          <div className={style.cardHead}>
            <Card style={{ height: 150, borderRadius: 10, minWidth: 250, padding: 12, width: 'auto', color: 'white', background: 'linear-gradient(125deg, #f12711, #f5af19);' }} elevation={4}>
              <div onClick={() => {
                setLoad(true)
                window.location.href = '/pos'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Avatar src='...' />
                  <p>icon</p>
                </Box>
                <Typography>23ชิ้น</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography>product</Typography>
                  <Typography>today 4ชิ้น</Typography>
                </Box>
              </div>
            </Card>
            <Card style={{ height: 150, borderRadius: 10, minWidth: 250, padding: 12, width: 'auto', color: 'white', background: 'black' }} elevation={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Avatar src='...' />
                <p>icon</p>
              </Box>
              <Typography>23ชิ้น</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>product</Typography>
                <Typography>today 4ชิ้น</Typography>
              </Box>
            </Card>
            <Card style={{ height: 150, borderRadius: 10, minWidth: 250, padding: 12, width: 'auto', color: 'white', background: 'black' }} elevation={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Avatar src='...' />
                <p>icon</p>
              </Box>
              <Typography>23ชิ้น</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>product</Typography>
                <Typography>today 4ชิ้น</Typography>
              </Box>
            </Card>
            <Card style={{ height: 150, borderRadius: 10, minWidth: 250, padding: 12, width: 'auto', color: 'white', background: 'black' }} elevation={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Avatar src='...' />
                <p>icon</p>
              </Box>
              <Typography>23ชิ้น</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>product</Typography>
                <Typography>today 4ชิ้น</Typography>
              </Box>
            </Card>
          </div>
          <Card className={style.contentHeadChart} elevation={4}>
            chart
          </Card>
        </div>

        <div className={style.contentBody} >

          <Card className={style.contentProduct} style={{ width: '100%' }} elevation={4}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p>สินค้าภาในร้าน</p>
              <Button onClick={() => {
                setLoad(true)
                window.location.href = '/product/' + NIL
              }} variant='contained' color='warning'>เพิ่มสินค้า</Button>
            </div>
            <div style={{ minWidth: 330, overflow: 'scroll' }}>
              <ProductTable product={product} onReturnProductId={filterProduct} />
            </div>
            <PaginationDesing onReturnPage={updatePage} />
          </Card>

          <Card className={style.contentOrder} style={{ width: '60%', marginLeft: 10 }} elevation={4}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p>สินค้าภาในร้าน</p>
              <Button onClick={() => {
                setLoad(true)
                window.location.href = '/category/' + NIL
              }} variant='contained' color='inherit'>เพิ่มประเภท</Button>
            </div>
            <CategoryTable categorys={category} />
          </Card>
        </div>
      </div>

      {
        load ?
          <Loadding />
          : null
      }
    </>
  )
}
