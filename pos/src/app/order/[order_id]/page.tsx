import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import OrderCard from './orderCard'

type Props = {
    params: {
        order_id: string
    }
}
export default function page({ params }: Props) {
    return (
        <DefaultLayout>
            <div>
                <OrderCard />
            </div>
        </DefaultLayout>
    )
}
