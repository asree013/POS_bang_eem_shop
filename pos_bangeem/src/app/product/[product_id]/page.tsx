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
import { userFindMe } from '@/services/auth.service';

type Props = {
    params: {
        product_id: string
    }
}

export default function page({ params }: Props) {
    const [category, setCategory] = useState<Categorys[]>({} as Categorys[])
    const [load, setLoad] = useState<boolean>(false)
    const [product, setProduct] = useState<Products>({} as Products)
    const {findMe, setFindMe} = useContext<TFindMeContrxt>(FindMeContext)

    const feedCategory = useCallback(async () => {
        setLoad(true)
        try {
            const result = await findCategoryAll(1, 20)
            setCategory(result.data)
        } catch (error) {
            console.log(error);

        } finally {
            setLoad(false)
        }
    }, [setCategory])

    async function handlerUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e);

        if (e.target.files) {
            const file = e.target.files[0];
            const image = new FormData();
            image.append('file', file); // เพิ่มไฟล์เข้าไปใน FormData

            image.forEach((value, key) => {
                console.log(key, value);
            });

            try {
                const result = await uploadImageService(image)
                console.log(result.data);

                setProduct({ ...product, image: pathConstant.base_url_image_local + result.data })
                console.log(product);

            } catch (error) {
                console.log(error);

            }
        }
    }

    async function onCreateProduct() {

        if (!product.name || !product.cost || !product.price || !product.count || !product.category_id) {
            toast('กรอกข้อมูลที่จำเป็นให้ครบ', 'error')
        }
        else {
            try {
                const jwt = localStorage.getItem('jwt')
                const user = await userFindMe(jwt?? '')
                const p = {} as Products
                p.category_id = product.category_id
                p.cost = product.cost
                p.detail = product.detail
                p.sku = product.sku
                p.count = product.count
                p.image = product.image
                p.name = product.name
                p.price = product.price
                p.create_by = user.data.id
                console.log(p);
                await createProduct(p)
                history.back()
            } catch (error: any) {
                toast(error.message, 'error')
            }
        }
    }

    useEffect(() => {
        if (params.product_id.includes(NIL)) {
            feedCategory()
            setProduct({...product, create_by: findMe.id})
        }

        return () => {
            feedCategory
        }
    }, [feedCategory])
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 30 }}>
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', flexDirection: 'column', textAlign: 'start' }}>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 600 }} color='warning'>เพิ่มสินค้า</Typography>
                    <label htmlFor="">เพื่มสินค้าหรือบริการของท่านเพื่อใช้งานระบบ</label>
                </div>
                <Card elevation={4} style={{ width: 330, padding: 10, marginTop: 10 }}>
                    <TextField onChange={(e) => setProduct({ ...product, name: e.target.value })} style={{ width: '100%', margin: '10px 0' }} color='warning' id="filled-basic" label="ชื่อสืนค้า" variant="filled" />
                    {product.name ? null : <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

                    <TextField onChange={(e) => setProduct({ ...product, sku: e.target.value })} style={{ width: '100%', margin: '10px 0' }} color='warning' id="filled-basic" label="รหัสสินค้า sku" variant="filled" />
                    {product.sku ? null : <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

                    <TextField onChange={(e) => setProduct({ ...product, detail: e.target.value })} style={{ width: '100%', margin: '10px 0' }} color='warning' id="filled-basic" label="รายละเอียดสินค้า" variant="filled" />
                    <TextField onChange={(e) => {
                        {
                            const rawValue = e.target.value;
                            // ลบทุกอย่างที่ไม่ใช่ตัวเลขหรือจุดทศนิยม
                            const cleanValue = rawValue.replace(/[^0-9.]/g, '');

                            // ตรวจสอบว่าในข้อความมีจุดทศนิยมมากกว่าหนึ่งจุดหรือไม่
                            const dotCount = cleanValue.split('.').length - 1;
                            if (dotCount <= 1) {
                                setProduct({ ...product, price: cleanValue });
                            }
                        }
                    }} style={{ width: '100%', margin: '10px 0' }} color='warning' id="filled-basic" label="ราคา" variant="filled" />
                    {product.price ? null : <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

                    <TextField
                        type="text"
                        value={product.cost}
                        onChange={(e) => {
                            const rawValue = e.target.value;
                            // ลบทุกอย่างที่ไม่ใช่ตัวเลขหรือจุดทศนิยม
                            const cleanValue = rawValue.replace(/[^0-9.]/g, '');

                            // ตรวจสอบว่าในข้อความมีจุดทศนิยมมากกว่าหนึ่งจุดหรือไม่
                            const dotCount = cleanValue.split('.').length - 1;
                            if (dotCount <= 1) {
                                setProduct({ ...product, cost: cleanValue });
                            }
                        }}
                        style={{ width: '100%', margin: '10px 0' }}
                        color="warning"
                        id="filled-basic"
                        label="ราคาต้นทุน"
                        variant="filled"
                    />
                    {product.cost ? null : <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

                    <TextField onChange={(e) => setProduct({ ...product, count: Number(e.target.value) })} style={{ width: '100%', margin: '10px 0' }} color='warning' id="filled-basic" label="จำนวน" variant="filled" />
                    {product.count ? null : <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel color='warning' id="demo-simple-select-label">ประเภทสินค้า</InputLabel>
                            <Select
                                color='warning'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Age"
                                onChange={(e) => setProduct({ ...product, category_id: e.target.value as string })}
                            >
                                {
                                    category.length > 0 ?
                                        category.map((r, i) =>
                                            <MenuItem key={i} value={r.id}>{r.name}</MenuItem>
                                        ) : <MenuItem value={'notdata'} onClick={() => {
                                            setLoad(true)
                                            window.location.href = '/category'
                                        }}>ไม่มี ประเภท คลิกเพื่อเพื่มประเภท</MenuItem>
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    {product.category_id? null: <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

                    <Button style={{ width: '100%', margin: '10px 0' }} variant='outlined' color='inherit' startIcon={<CloudUploadIcon />} onClick={() => document.getElementById('productImage')?.click()}>อัพโหลดรูปภาพ</Button>                  
                    {product.image ? null: <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

                    <input id='productImage' onChange={handlerUploadImage} accept="image/*" type='file' hidden />

                    {
                        product?.image ?
                            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <img style={{ width: 120, height: 120, objectFit: 'contain' }} src={product.image} />
                            </div> :
                            null
                    }

                    <Button type='button' onClick={onCreateProduct} variant='contained' color='warning' style={{ width: '100%', fontSize: '1.2rem', marginTop: 10 }}>เพิ้มสินค้า</Button>
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
