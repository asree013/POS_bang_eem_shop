'use client'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { Button, Card, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { NIL } from 'uuid';
import { Prompays } from '@/models/prompay.model';
import { toast } from '@/services/alert.service';
import { findPrompayAll } from '@/services/prompay.service';
import Loadding from '@/components/Loadding';
import Box from '@mui/joy/Box';
import CardJ from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import TypographyJ from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import PaginationDesing from '@/components/PaginationDesing';
import styled from 'styled-components';

const HomeLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
`

export default function page() {
    const [load, setLoad] = useState<boolean>(false)
    const [prompays, setPromPays] = useState<Prompays[]>({} as Prompays[])

    const onFeedPrompay = useCallback(async () => {
        setLoad(true)
        try {
            const result = await findPrompayAll(1, 10)
            setPromPays(result.data)
        } catch (error: any) {
            toast(error.message, 'error')
        } finally {
            setLoad(false)
        }
    }, [setPromPays])

    async function onUpdatePage(page: number) {
        try {
            const result = await findPrompayAll(page, 10)
            setPromPays(result.data)
        } catch (error: any) {
            toast(error.message, 'error')
        }
    }

    useEffect(() => {
        onFeedPrompay()
    }, [onFeedPrompay])
    return (
        <>
            <DefaultLayout>
                <HomeLayout>
                    <div onClick={() => {
                        setLoad(true)
                        window.location.href = '/prompay/' + NIL
                    }}>
                        <Card elevation={4} sx={{ width: 250, cursor: 'pointer', display: "flex", alignItems: 'center', justifyContent: 'center', border: '3px solid orange' }}>
                            <div style={{ padding: 10 }}>
                                <AddToPhotosIcon color='warning' style={{ width: 140, height: 140 }} />
                                <Typography color='warning'>เพิ่มประเภทชำระ</Typography>
                            </div>
                        </Card>
                    </div>
                    {
                        prompays.length > 0 ?
                            prompays.map((r, i) =>
                                <CardJ
                                    key={i}
                                    variant="outlined"
                                    sx={{
                                        width: 250,
                                        // to make the card resizable
                                        overflow: 'auto',
                                        resize: 'horizontal',
                                    }}
                                >
                                    <CardContent>
                                        <TypographyJ level="title-lg">{r.first_name} {r.last_name}</TypographyJ>
                                        <TypographyJ level="body-lg">
                                            เลข: {r.number_phone}
                                        </TypographyJ>
                                    </CardContent>
                                    <CardActions buttonFlex="0 1 120px">
                                        <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
                                            <FavoriteBorder />
                                        </IconButton>
                                        <Button onClick={() => {
                                            setLoad(true)
                                            window.location.href = '/prompay/'+ r.id
                                        }} variant="outlined" color="inherit">
                                            แก้ไข
                                        </Button>
                                        <Button variant="contained" color="warning">
                                            ลบ
                                        </Button>
                                    </CardActions>
                                </CardJ>
                            ) : null
                    }
                </HomeLayout>
                <PaginationDesing onReturnPage={onUpdatePage} />
            </DefaultLayout>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    )
}
