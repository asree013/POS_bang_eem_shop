'use cilent'
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type Props = {
  onReturnPage: (page: number) => void
}



export default function PaginationDesing({ onReturnPage }: Props) {
  const [page, setPage] = useState(1)
  return (
    <Box sx={{
      position: 'fixed',
      bottom: '65px',
      width: 600,
      minWidth: 300
    }}>
      <div style={{ padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button onClick={() => {
          setPage(page - 1)
          onReturnPage(page - 1)
        }} disabled={page === 1 ? true : false} variant='outlined' color='warning'><ArrowBackIosNewIcon /></Button>
        <Typography style={{ fontSize: '1.2rem' }} color='warning'>หน้าปัจจุบัน ({page})</Typography>
        <Button onClick={() => {
          setPage(page + 1)
          onReturnPage(page + 1)
        }} variant='outlined' color='warning'><ArrowForwardIosIcon /></Button>
      </div>
    </Box>
  )
}
