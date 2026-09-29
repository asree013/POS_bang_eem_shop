'use client'

import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Loadding from '@/components/Loadding';
import { Categorys } from '@/models/category.model';
import { toast } from '@/services/alert.service';
import { createCategory, findCategoryById } from '@/services/category.service';
import { Button, Card, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { NIL } from 'uuid';


type Props = {
    params: {
        category_id: string
    }
}

export default function page({ params }: Props) {
    const [category, setCategory] = useState<Categorys>({} as Categorys)
    const [load, setLoad] = useState<boolean>(false)

    async function onCreateCategory() {
        setLoad(true)
        try {
            const c = {} as Categorys
            c.name = category.name
            c.detail = category.detail
            await createCategory(c)   
            history.back()         
        } catch (error) {
            alert('error create category')
        } finally {
            setLoad(false)
        }
    }

    const onFeedCategoryById = useCallback(async(params: string) => {
        setLoad(true)
        try {
            const resutl = await findCategoryById(params)
            setCategory(resutl.data)
        } catch (error: any) {
            toast(error.message, 'error')
        } finally {
            setLoad(false)
        }
    }, [setCategory])

    useEffect(() => {
        if (!params.category_id.includes(NIL)) {
            onFeedCategoryById(params.category_id)
        }

        return () => {
            onFeedCategoryById
        }
    }, [onFeedCategoryById])
    return (
        <>
            <DefaultLayout>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', flexDirection: 'column', textAlign: 'start' }}>
                        <Typography sx={{ fontSize: '2rem', fontWeight: 600 }} color='warning'>เพิ่มประเภทสินค้า</Typography>
                        <label htmlFor="">เพื่มสินค้าหรือบริการของท่านเพื่อใช้งานระบบ</label>
                    </div>
                    <Card elevation={4} style={{ width: 330, padding: 10, marginTop: 10 }}>
                        <TextField onChange={(e) => setCategory({ ...category, name: e.target.value })} style={{ width: '100%', margin: '10px 0' }} color='warning' id="filled-basic" label="ชื่อประเภทสืนค้า" variant="filled" />
                        {category.name ? null : <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

                        <TextField onChange={(e) => setCategory({ ...category, detail: e.target.value })} style={{ width: '100%', margin: '10px 0' }} color='warning' id="filled-basic" label="รายละเอียดประเภท" variant="filled" />
                        {category.detail ? null : <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

                        <Button type='button' onClick={onCreateCategory} variant='contained' color='warning' style={{ width: '100%', fontSize: '1.2rem', marginTop: 10 }}>เพิ้มสินค้า</Button>
                    </Card>
                </div>
            </DefaultLayout>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    )
}
