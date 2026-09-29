import { Box, LinearProgress } from '@mui/material'
import React from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function Loadding() {
    return (
        <Modal
            open={true}
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box sx={{ width: '80%' }}>
                <LinearProgress color='warning' />
            </Box>
        </Modal>
    )
}
