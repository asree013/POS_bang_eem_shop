'use client'
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Products } from '@/models/product.model';
import { Button } from '@mui/material';
import { CartContext, TCartProductContext } from '../contexts/cart.product.context';
import { toast } from '@/services/alert.service';
import { OrderItems } from '@/models/order.model';
import styled from 'styled-components';

const CardFixed = styled(Card)`
  width: 200px;
  @media only screen and (max-width: 1200px) {
    width: 185px;
  }
`

type Props = {
  product: Products
}

export default function ProductCard({ product }: Props) {
  const { orderItem, setOrderItem } = React.useContext<TCartProductContext>(CartContext)
  return (
    <CardFixed >
      <CardOverflow>
        <AspectRatio sx={{ width: 150, height: 80, objectFit: 'contain'}}>
          <img
            src={product.image}
            srcSet={product.image}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs">{product.category.name}</Typography>
        <Link
          href="#product-card"
          color="neutral"
          textColor="text.primary"
          overlay
          endDecorator={<ArrowOutwardIcon />}
          sx={{ fontWeight: 'md' }}
        >
          {product.name}
        </Link>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: 'xl' }}
        >
          {product.price} THB
        </Typography>
        <Typography level="body-sm">
          (Only <b>{product.count}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardContent>
        <Button variant="contained" color="warning" onClick={async () => {
          const orderItemsArray = Array.isArray(orderItem) ? orderItem : [];
          try {
            const findProduct = orderItemsArray.find(r => r.product_detail.id === product.id)
            const oi = {} as OrderItems
            oi.count = 1
            oi.price = product.price
            oi.product_detail = product
            if (findProduct) {
              const newData = orderItemsArray.map(r => {
                if (r.product_detail.id === product.id) {
                  return { ...r, count: r.count + 1 }; 
                }
                return r
              });
      
      
              setOrderItem(newData);
            }
            else {
              setOrderItem(prev => {
                if (Array.isArray(prev)) {
                  return [...prev, oi]
                }
                else {
                  return [oi]
                }
              })
            }

          } catch (error) {
            console.log(error);

            toast('error', 'error')
          }
        }} >
          Add to cart
        </Button>
      </CardContent>
    </CardFixed>
  );
}
