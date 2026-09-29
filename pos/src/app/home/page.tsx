'use client'
import ECommerce from '@/components/Dashboard/E-commerce'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import { metadata } from '../layout'

export default function page() {
    return (
        <DefaultLayout>
            <ECommerce />
        </DefaultLayout>
    )
}
