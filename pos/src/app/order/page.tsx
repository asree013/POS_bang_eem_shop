'use client'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import TableThree from '@/components/Tables/TableThree'
import { Orders } from '@/models/order.model'
import { toast } from '@/services/alert.service'
import { findOrderAll } from '@/services/order.service'
import React, { useCallback, useEffect, useState } from 'react'

export default function page() {
  const [orders, setOrders] = useState<Orders[]>({} as Orders[])

  const onFeedOrders = useCallback(async () => {
    try {
      const result = await findOrderAll(1, 10)
      setOrders(result.data)
    } catch (error: any) {
      toast(error.message, 'error')
    }
  }, [setOrders])

  useEffect(() => {
    onFeedOrders()
  }, [onFeedOrders])
  return (
    <DefaultLayout>
      <div>
        <TableThree orders={orders} setOrders={setOrders} />
      </div>
    </DefaultLayout>
  )
}
