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
import { Box, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { OrderItems } from '@/models/order.model';
import { toast } from '@/services/alert.service';
import { CartContext, TCartProductContext } from '@/contexts/cart.product.context';
import styled from 'styled-components';

type Props = {
    productItem: OrderItems
}

const NewCard = styled(Card)`
    width: 100%;
    margin: 3px 0;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
`

const NewCardContent = styled(CardContent)`
    
`

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
        if (productItem.count === 1) {
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
        <NewCard orientation="horizontal" variant="outlined" >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
                <CardOverflow sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src={productItem.product_detail.image}
                        srcSet={productItem.product_detail.image}
                        loading="lazy"
                        alt=""
                        style={{ width: 45, height: 45, objectFit: 'contain' }}
                    />
                </CardOverflow>
                <CardContent>
                    <Typography>
                        {productItem.product_detail.name}
                    </Typography>
                </CardContent>
                {/* <CardContent>
                    <Typography level="body-lg" sx={{ fontSize: '1.4rem' }}>฿ {productItem.product_detail.price}</Typography>
                </CardContent> */}
            </Box>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%', padding: 0 }}>
                <Box>
                    <Typography level="body-lg" >ราคา</Typography>
                    <Typography textColor="success.plainColor" level="body-lg" sx={{ fontSize: '1.1rem' }}>฿ {productItem.product_detail.price}</Typography>

                </Box>
                <NewCardContent>
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                        <IconButton color='warning' onClick={onMinusProduct}>
                            <RemoveCircleOutlineIcon fontSize='medium' />
                        </IconButton>
                        <p style={{ fontSize: '1.5rem', fontWeight: 500 }}>{productItem.count}</p>
                        <IconButton color='warning' onClick={onAddProduct}>
                            <AddCircleOutlineIcon fontSize='medium' />
                        </IconButton>
                    </div>
                    <Button sx={{ height: 25 }} variant='contained' onClick={onRemoveProduct} color='error' startIcon={<DeleteIcon fontSize='large' />} style={{ width: '100%' }}>ลบ</Button>
                </NewCardContent>
            </CardContent>
        </NewCard>
    );
}
