'use client'
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { Products } from '@/models/product.model';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { OrderItems } from '@/models/order.model';
import { CartContext, TCartProductContext } from '../contexts/cart.product.context';
import { toast } from '@/services/alert.service';

type Props = {
    productItem: OrderItems
}

export default function CartProduct({ productItem }: Props) {
    const { orderItem, setOrderItem } = React.useContext<TCartProductContext>(CartContext)

    function onRemoveProduct() {
        const newData = orderItem.filter(r => {
            return r.product_detail.id !== productItem.product_detail.id
        })
        setOrderItem(newData)
        toast('ลบสินค้าออกแล้ว', 'success')
    }

    function onAddProduct() {
        const newData = orderItem.map(r => {
            if (r.product_detail.id === productItem.product_detail.id) {
                return { ...r, count: r.count + 1 }
            }
            return r
        })
        setOrderItem(newData)
    }

    function onMinusProduct() {
        if(productItem.count === 1) {
            const newData = orderItem.filter(r => r.product_detail.id !== productItem.product_detail.id)
            setOrderItem(newData)
            return
        }
        const newData = orderItem.map(r => {
            if (r.product_detail.id === productItem.product_detail.id) {
                return { ...r, count: r.count - 1 }
            }
            return r
        })
        setOrderItem(newData)
    }
    return (
        <Card orientation="horizontal" variant="outlined" sx={{ width: "100%", height: 'auto', marginTop: 1 }}>
            <CardOverflow sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                    src={productItem.product_detail.image}
                    srcSet={productItem.product_detail.image}
                    loading="lazy"
                    alt=""
                    style={{ width: 50, height: 50, objectFit: 'contain' }}
                />
            </CardOverflow>
            <CardContent>
                <Typography textColor="success.plainColor" sx={{ fontWeight: 'md', }}>
                    {productItem.product_detail.name}
                </Typography>
                <Typography level="body-lg" sx={{ fontSize: '1.4rem' }}>฿ {productItem.product_detail.price}</Typography>
            </CardContent>
            <CardContent sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>

                    <IconButton color='warning' onClick={onMinusProduct}>
                        <RemoveCircleOutlineIcon fontSize='medium' />
                    </IconButton>
                    <p style={{ fontSize: '1.5rem', fontWeight: 500 }}>{productItem.count}</p>
                    <IconButton color='warning' onClick={onAddProduct}>
                        <AddCircleOutlineIcon fontSize='medium' />
                    </IconButton> 
                </div>
                <Button variant='contained' onClick={onRemoveProduct} color='error' startIcon={<DeleteIcon fontSize='large' />} style={{ width: '100%' }}>ลบ</Button>
                {/* <IconButton>
                    <DeleteIcon fontSize='large' />
                </IconButton> */}
            </CardContent>
        </Card>
    );
}
