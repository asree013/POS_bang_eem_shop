'use client'
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Loadding from '@/components/Loadding';
import { Categorys } from '@/models/category.model';
import { Prompays } from '@/models/prompay.model';
import { toast } from '@/services/alert.service';
import { createCategory, findCategoryById } from '@/services/category.service';
import { createPromPay, findPrompayAll, findPrompayById } from '@/services/prompay.service';
import { Button, Card, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { NIL } from 'uuid';

type Props = {
  params: {
    prompay_id: string
  }
}

export default function page({params}: Props) {
  const [prompay, setPrompay] = useState<Prompays>({} as Prompays)
  const [load, setLoad] = useState<boolean>(false)

  async function onCreatePrompay() {
    setLoad(true)
    try {
      await createPromPay(prompay)
      history.back()
    } catch (error: any) {
      toast(error.message, 'error')
    } finally {
      setLoad(false)
    }
  }

  const onFeedPrompayById = useCallback(async(prompay_id: string) => {
    setLoad(true)
    try {
      const resutl = await findPrompayById(prompay_id)
      setPrompay(resutl.data)
    } catch (error: any) {
      toast(error.message, 'error')
    } finally {
      setLoad(false)
    }
  }, [setPrompay])

  useEffect(() => {
    if(!params.prompay_id.includes(NIL)){
      onFeedPrompayById(params.prompay_id)
    }
  }, [onFeedPrompayById])
  return (
    <>
      <DefaultLayout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 2 }}>
          <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', flexDirection: 'column', textAlign: 'start' }}>
            <Typography sx={{ fontSize: '2rem', fontWeight: 600 }} color='warning'>เพิ่มบัญชี Prompay</Typography>
            <label htmlFor="">เพื่มสินค้าหรือบริการของท่านเพื่อใช้งานระบบ</label>
          </div>
          <Card elevation={4} style={{ width: 330, padding: 10, marginTop: 10 }}>
            <TextField value={prompay.first_name?? ''} onChange={(e) => setPrompay({ ...prompay, first_name: e.target.value })} style={{ width: '100%', margin: '10px 0' }} color='warning' id="filled-basic" label="ชื่อเจ้าของบัญชี" variant="filled" />
            {prompay.first_name ? null : <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

            <TextField value={prompay.last_name?? ''} onChange={(e) => setPrompay({ ...prompay, last_name: e.target.value })} style={{ width: '100%', margin: '10px 0' }} color='warning' id="filled-basic" label="นามสกุลเจ้าของบัญชี" variant="filled" />
            {prompay.last_name ? null : <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

            <TextField value={prompay.number_phone?? 0} type='number' onChange={(e) => setPrompay({ ...prompay, number_phone: e.target.value })} style={{ width: '100%', margin: '10px 0' }} color='warning' id="filled-basic" label="เบอร์ Prompay" variant="filled" />
            {prompay.number_phone ? null : <label htmlFor="" style={{ color: 'red', fontSize: '13px', position: 'relative', bottom: 10 }}>*จำเป็นต้องใส่</label>}

            {
              params.prompay_id.includes(NIL)?
              <Button type='button' onClick={onCreatePrompay} variant='contained' color='warning' style={{ width: '100%', fontSize: '1.2rem', marginTop: 10 }}>เพิ้มบัญชี Prompay</Button>:
              <Button type='button' variant='contained' color='warning' style={{ width: '100%', fontSize: '1.2rem', marginTop: 10 }}>แก้ไขบัญชี Prompay</Button>
            }
          </Card>
        </div>
      </DefaultLayout>

      {
        load?
        <Loadding />:
        null
      }
    </>
  )
}
