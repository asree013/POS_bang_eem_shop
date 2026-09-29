'use client'
import { Button, Card, TextField } from '@mui/material'
import styled from '@emotion/styled'
import React, { FormEvent, useState } from 'react'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PasswordIcon from '@mui/icons-material/Password';
import Divider from '@mui/joy/Divider';
import Logo from '@/public/logo.jpeg'
import Loadding from '@/components/Loadding/Loadding';
import { login } from '@/services/auth.service';

const StyleBodyLogin = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background: linear-gradient(125deg, #f12711, #f5af19);
`

const StyleInput = styled.div`
    display: flex;
    align-items: end;
    justify-content: center;
    margin: 10px 0;
`

const StyleP = styled.p`
    font-weight: 600;
    margin: 15px 0;
    color: aliceblue;
`

export default function Page() {
    const [form, setForm] = useState<{ email: string, password: string }>({} as { email: string, password: string })
    const [load, setload] = useState<boolean>(false)
    async function onSubmitLogin(e: FormEvent<HTMLFormElement>) {
        setload(true)
        e.preventDefault()
        console.log();
        try {
            console.log(form);

            const result = await login(form)
            localStorage.setItem('jwt', result.data.access_token)
            window.location.href = '/home'
        } catch (error) {
            console.log(error);
            setload(false)
        }

    }
    return (
        <>
            <StyleBodyLogin>
                <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'row'}}>
                    <img style={{ width: 100, height: 100, borderRadius: 20, objectFit: 'contain' }} src={Logo.src} alt="" />
                    <div style={{marginLeft: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white', fontWeight: 400}}>
                        <p style={{fontSize: '2rem'}}>ก.ประดับยนต์</p>
                        <p style={{fontSize: '0.8rem'}}>KOHTEO CAE ACCESSORIES</p>
                        <p style={{fontSize: '1rem'}}>TEL. 090 - 210 - 4162</p>
                    </div>
                </div>
                <Card sx={{ width: 300 }}>
                    <form onSubmit={onSubmitLogin} style={{ padding: 15 }}>
                        <StyleInput>
                            <PersonPinIcon style={{ width: '1.8rem', height: '1.8rem' }} />
                            <TextField onChange={(e) => setForm({ ...form, email: e.target.value })} label={'อีเมล'} style={{ width: 270, marginLeft: 10 }} variant="standard" color='warning' required />
                        </StyleInput>
                        <StyleInput>
                            <PasswordIcon style={{ width: '1.8rem', height: '1.8rem' }} />
                            <TextField onChange={(e) => setForm({ ...form, password: e.target.value })} type='password' label={'รหัสผ่าน'} style={{ width: 270, marginLeft: 10 }} variant="standard" color='warning' required />
                        </StyleInput>

                        <Button type='submit' variant='contained' color='warning' style={{ borderRadius: 10, fontSize: '1.2rem', fontWeight: 600, width: '100%', margin: '15px 0' }}>Login</Button>
                    </form>
                </Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <StyleP style={{ fontSize: '1.1rem' }} >
                        ลืมรหัสผ่าน
                    </StyleP>
                    <Divider sx={{ width: 180, color: 'white' }}  >หรือ</Divider>
                    <StyleP style={{ fontSize: '1.ภrem' }}>
                        สมัครสมาชิก
                    </StyleP>
                </div>
            </StyleBodyLogin>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>

    )
}
