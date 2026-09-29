'use client'
import { Button, Card, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Products } from '@/models/product.model'
import { findProductAll } from '@/services/product.service'
import { toast } from '@/services/alert.service'
import Divider from '@mui/joy/Divider'
import { OrderItemCreate, OrderItems, Orders } from '@/models/order.model'
import { CartContext } from '@/contexts/cart.product.context'
import ProductCard from '@/components/ProductCard'
import PaginationDesing from '@/components/PaginationDesing'
import CartProduct from '@/components/CartProduct'
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Person from '@mui/icons-material/Person';
import People from '@mui/icons-material/People';
import Apartment from '@mui/icons-material/Apartment';
import MoneyIcon from '@mui/icons-material/Money';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Payments } from '@/models/payment.model'

import TypographyJ from '@mui/joy/Typography';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { Prompays } from '@/models/prompay.model'
import { createPromPay, findPrompayAll } from '@/services/prompay.service'
import { Input } from '@mui/joy'
import { createPayment } from '@/services/payment.service'
import { createOrder, createOrderItem } from '@/services/order.service'
import Loadding from '@/components/Loadding'

const StyleBody = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 3px;
  @media only screen and (max-width: 450px) {
    flex-direction: column;
  }
`

const StyleProduct = styled.div`
  width: 100%;
  padding: 5px;
`

const StyleCart = styled.div`
  width: 40%;
  padding: 5px;
`

const StyleGridProduct = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  @media only screen and (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media only screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const CartStyle = styled.div`
  padding: 15px;
  height: 380px;
  overflow: scroll;
`

export default function Page() {
  const [products, setProducts] = useState<Products[]>({} as Products[])
  const [orderItem, setOrderItem] = useState<OrderItems[]>({} as OrderItems[])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [discountStatus, setDiscountStatus] = useState<boolean>(false)
  const [discountValue, setDiscountValue] = useState<string>('')
  const [order, setOrder] = useState<Orders>({} as Orders)
  const [selectPayment, setSelectPayment] = useState<string>('')
  const [payments, setPayments] = useState<Payments[]>({} as Payments[])
  const [prompay, setPrompay] = useState<Prompays>({} as Prompays)
  const [load, setload] = useState<boolean>(false)

  async function onUpdatePage(page: number) {
    const result = await findProductAll(page, 12)
    setProducts(result.data)
  }

  const onFeedProduct = useCallback(async () => {
    try {
      const result = await findProductAll(1, 12)
      setProducts(result.data)
    } catch (error: any) {
      toast(error.message, 'error')
    }
  }, [setProducts])

  async function onCreateOrder() {
    setload(true)
    try {
      const p = {} as Payments
      p.type = selectPayment
      p.status_payment = 'pending'
      const createP = await createPayment(p)

      const o = {} as Orders
      if (selectPayment.includes('prompay')) {
        o.prompay_id =  prompay.id 

      }
      o.payment_id = createP.data.id
      o.status = 'pending'
      o.total_price = String(totalPrice)
      o.detail = discountValue.length === 0 ? 'คำสั่งศื้อที่ ' + new Date().getTime() : 'คำสั่งศื้อที่ ' + new Date().getTime() + 'ส่วนลด ' + discountValue
      const createO = await createOrder(o)

      const mapOrder: OrderItemCreate[] = orderItem.map(r => {
        return { order_id: createO.data.id, product_id: r.product_detail.id, count: r.count, price: r.price }
      })

      await createOrderItem(mapOrder)
      window.location.href = '/order/' + createO.data.id
    } catch (error: any) {
      toast(error.message, 'error')
    } finally {
      setload(false)
    }

  }

  const onChangeCart = useCallback(() => {
    if (orderItem.length >= 0) {
      const totalNum = orderItem.reduce((t, r) => {
        const itemPrice = parseFloat(r.product_detail.price)
        return t + itemPrice * r.count
      }, 0)
      setTotalPrice(totalNum)
    }
    else {
      return
    }
  }, [orderItem])

  useEffect(() => {
    onFeedProduct()
    onChangeCart()
  }, [onFeedProduct, onChangeCart])

  return (
    <>
      <CartContext.Provider value={{ orderItem, setOrderItem }}>
        <StyleBody>
          <StyleProduct>
            <Card elevation={4} style={{ padding: 10, background: '#d6d4d4', height: '83vh' }}>
              <StyleGridProduct>
                {Object.keys(products).length === 0 ? null :
                  products.map((r, i) => <ProductCard key={i} product={r} />)}
              </StyleGridProduct>
              <div style={{ background: 'white', marginTop: 10, minWidth: 310, padding: 0, borderRadius: 5 }}>
                <PaginationDesing onReturnPage={onUpdatePage} />
              </div>
            </Card>
          </StyleProduct>

          <StyleCart>
            <Card elevation={4} style={{ padding: 10, borderRadius: 10, height: '83vh' }}>
              <Typography color="warning" style={{ fontSize: '1.2rem', fontWeight: 500 }}>ตะกร้าสินค้า</Typography>
              <Divider sx={{ background: 'black' }} />
              <CartStyle>
                {
                  Object.keys(orderItem).length === 0 ?
                    null :
                    orderItem.map((r, i) =>
                      <CartProduct key={i} productItem={r} />
                    )
                }
              </CartStyle>
              <Divider />
              <div hidden={discountValue.length === 0}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', margin: '5px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                    <p style={{ fontSize: '1rem', fontWeight: 400, marginRight: 5 }}>ยอดรวมเดิม</p>
                    <div style={{ border: '1px solid red', width: 40, position: 'absolute', marginRight: '30px' }}></div>
                    <p style={{ fontSize: '1.2rem', fontWeight: 500, color: 'red' }}>{totalPrice}</p>
                    <p style={{ fontSize: '1rem', fontWeight: 400, marginLeft: 5 }}>บาท</p>
                  </div>
                </div>
              </div>
              <div hidden={discountValue.length === 0}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', margin: '5px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                    <p style={{ fontSize: '1rem', fontWeight: 400, marginRight: 5 }}>ส่วนลด</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: 500, color: 'orange' }}>{discountValue}</p>
                    <p style={{ fontSize: '1rem', fontWeight: 400, marginLeft: 5 }}>บาท</p>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', margin: '20px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                    <p style={{ fontSize: '1.3rem', fontWeight: 400, marginRight: 5 }}>ยอดรวม</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 500, color: 'green' }}>{discountValue.length > 0 ? totalPrice - Number(discountValue) : totalPrice}</p>
                    <p style={{ fontSize: '1.3rem', fontWeight: 400, marginLeft: 5 }}>บาท</p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <TextField value={discountValue ?? ''} onChange={(e) => setDiscountValue(e.target.value)} hidden={!discountStatus} sx={{ width: 150 }} variant='outlined' label={'กรอกส่วนลด'} color='warning' />
                <Button sx={{ fontSize: '18px', marginLeft: '5px', height: 55, margin: '10px 0' }} onClick={() => {
                  if (discountStatus === true) setDiscountValue('')
                  setDiscountStatus(!discountStatus)
                }} color='warning' variant='outlined'>{discountStatus ? 'ยกเลิก' : 'เพิ่มส่วนลด'}</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <label htmlFor="" style={{ color: 'red' }}>{prompay ? 'ชำระไปที่บัญชี: ' + prompay.number_phone : '*เลือกประเภทชำระเงินก่อนชำระ'}</label>
              </div>
              <RadioPositionEnd />
              <Button disabled={selectPayment.length > 0 && orderItem.length > 0 ? false : true} onClick={onCreateOrder} color='warning' variant='contained' style={{ width: '100%', fontSize: 22, marginTop: 20 }}>ออกบิล</Button>
            </Card>
          </StyleCart>
        </StyleBody>
      </CartContext.Provider>

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  )

  function RadioPositionEnd() {
    const [open, setOpen] = useState<boolean>(false)
    const [prompays, setPrompays] = useState<Prompays[]>({} as Prompays[])

    const onFeedPrompayAll = useCallback(async () => {
      try {
        const result = await findPrompayAll(1, 10)
        setPrompays(result.data)
      } catch (error: any) {
        toast(error.message, 'error')
      }
    }, [setPrompay])

    useEffect(() => {
      onFeedPrompayAll()
    }, [onFeedPrompayAll])
    return (
      <>
        <RadioGroup value={selectPayment ?? null} onChange={(e) => {
          if (e.target.value === 'prompay') {
            setOpen(true)
          }
          else {
            setSelectPayment(e.target.value)
          }
        }} aria-label="Your plan" name="people" defaultValue="Individual">
          <List
            sx={{
              minWidth: 240,
              '--List-gap': '0.5rem',
              '--ListItem-paddingY': '1rem',
              '--ListItem-radius': '8px',
              '--ListItemDecorator-size': '32px',
            }}
          >
            <ListItem variant="outlined" sx={{ boxShadow: 'sm' }}>
              <ListItemDecorator>
                <MoneyIcon />
              </ListItemDecorator>
              <Radio
                overlay
                value={'money'}
                label={'เงินสด'}
                sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                slotProps={{
                  action: ({ checked }) => ({
                    sx: (theme) => ({
                      ...(checked && {
                        inset: -1,
                        border: '2px solid',
                        borderColor: theme.vars.palette.primary[500],
                      }),
                    }),
                  }),
                }}
              />
            </ListItem>
            <ListItem variant="outlined" sx={{ boxShadow: 'sm' }}>
              <ListItemDecorator>
                <QrCodeScannerIcon />
              </ListItemDecorator>
              <Radio
                overlay
                value={'prompay'}
                label={'สแกนจ่าย Prompay'}
                sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                slotProps={{
                  action: ({ checked }) => ({
                    sx: (theme) => ({
                      ...(checked && {
                        inset: -1,
                        border: '2px solid',
                        borderColor: theme.vars.palette.primary[500],
                      }),
                    }),
                  }),
                }}
              />
            </ListItem>
          </List>
        </RadioGroup>

        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          // onClose={() => setOpen(false)}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Sheet
            variant="outlined"
            sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <TypographyJ
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              sx={{ fontWeight: 'lg', mb: 1 }}
            >
              เลือกบัญชี Prompay
            </TypographyJ>
            <div>
              <Input endDecorator />
            </div>
            {
              prompays.length > 0 ?
                prompays.map((r, i) =>
                  <Card elevation={4} sx={{ padding: 2 }} key={i}>
                    <TypographyJ id="modal-desc" textColor="text.tertiary">
                      ชื่อ-สกุล: {r.first_name} {r.last_name}
                    </TypographyJ>
                    <TypographyJ id="modal-desc" textColor="text.tertiary">
                      เลข: {r.number_phone}
                    </TypographyJ>
                    <Button onClick={() => {
                      toast('เลือกบัญชีแล้ว', 'success')
                      setPrompay(r)
                      setSelectPayment('prompay')
                      setOpen(false)
                    }} sx={{ width: '100%', marginTop: '15px' }} color='warning' variant='contained'>เลือกเลขบัญชี</Button>
                  </Card>
                ) : null
            }
          </Sheet>
        </Modal>
      </>
    );
  }
}
