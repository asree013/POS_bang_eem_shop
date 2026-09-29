'use client'

import { Categorys } from '@/models/category.model';
import { Products } from '@/models/product.model';
import { findCategoryAll } from '@/services/category.service';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Card, CardMedia, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';

import { uploadImageService } from '@/services/upload.service';
import { pathConstant } from '@/constants/path.constant';
import Loadding from '@/app/components/Loadding';
import { NIL } from 'uuid';
import { toast } from '@/services/alert.service';
import { createProduct } from '@/services/product.service';
import { Users } from '@/models/user.model';
import { FindMeContext, TFindMeContrxt } from '@/app/contexts/findme.context';

type Props = {
    params: {
        category_id: string
    }
}

export default function page({ params }: Props) {
    const [category, setCategory] = useState<Categorys>({} as Categorys)
    const [load, setLoad] = useState<boolean>(false)
    const {findMe, setFindMe} = useContext<TFindMeContrxt>(FindMeContext)

    function onCreateCategory() {

    }

    useEffect(() => {
        if (params.category_id.includes(NIL)) {

        }

        return () => {
        }
    }, [])
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 30 }}>
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', flexDirection: 'column', textAlign: 'start' }}>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 600 }} color='warning'>เพิ่มประเภทสินค้า</Typography>
                    <label htmlFor="">เพื่มสินค้าหรือบริการของท่านเพื่อใช้งานระบบ</label>
                </div>
                <Card elevation={4} style={{ width: 330, padding: 10, marginTop: 10 }}>
                    <TextField onChange={(e) => setCategory({ ...category, name: e.target.value })} style={{ width: '100%', margin: '10px 0' }} color='warning' id="filled-basic" label="ชื่อสืนค้า" variant="filled" />
                    {category.name ? null : <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

                    <TextField onChange={(e) => setCategory({ ...category, detail: e.target.value })} style={{ width: '100%', margin: '10px 0' }} color='warning' id="filled-basic" label="รหัสสินค้า sku" variant="filled" />
                    {category.detail ? null : <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

                    <Button type='button' onClick={onCreateCategory} variant='contained' color='warning' style={{ width: '100%', fontSize: '1.2rem', marginTop: 10 }}>เพิ้มสินค้า</Button>
                </Card>
            </div>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    )
}
