
'use client'
import React, { useEffect } from 'react'
import Loadding from './components/Loadding'

export default function page() {
  function validJwt() {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) return window.location.href = '/login'
    else return window.location.href = '/home'
  }

  useEffect(() => {

  validJwt()
}, [validJwt])

  return (
    <Loadding />
  )
}
