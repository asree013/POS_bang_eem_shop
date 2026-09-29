'use client'

import CategoryCard from '@/components/CategoryCard'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Loadding from '@/components/Loadding'
import PaginationDesing from '@/components/PaginationDesing'
import { Categorys } from '@/models/category.model'
import { findCategoryAll } from '@/services/category.service'
import { Button } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { NIL } from 'uuid'

export default function page() {
  const [categorys, setCategorys] = useState<Categorys[]>({} as Categorys[])
  const [load, setLoad] = useState<boolean>(false)

  async function onUpdatePage(page: number) {
    try {
      const result = await findCategoryAll(page, 10)
      setCategorys(result.data)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const onFeedCategory = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findCategoryAll(1, 10)
      setCategorys(result.data)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoad(false)
    }
  }, [setCategorys])

  useEffect(() => {
    onFeedCategory()
  }, [onFeedCategory])
  return (
    <>
      <DefaultLayout>
        <Button onClick={() => {
          setLoad(true)
          window.location.href = '/category/' + NIL
        }} variant='outlined' sx={{ fontSize: '1.1rem' }} color='warning'>เพิ่มประเภท</Button>
        <div>
          {
            categorys.length > 0?
              categorys.map((r, i) =>
                <CategoryCard data={r} key={i} />
              ) : <p>ไม่มี ประเภคสินค้า</p>
          }

        </div>
        <PaginationDesing onReturnPage={onUpdatePage} />
      </DefaultLayout>

      {
        load?
        <Loadding />:
        null
      }
    </>
  )
}
