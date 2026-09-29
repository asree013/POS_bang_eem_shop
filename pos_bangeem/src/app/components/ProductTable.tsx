'use client'
import { Products } from '@/models/product.model'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { IconButton } from '@mui/material';
import Swal from 'sweetalert2';
import { delteProductById } from '@/services/product.service';
import { toast } from '@/services/alert.service';
import { NIL } from 'uuid';

type Props = {
    product: Products[]
    onReturnProductId: (product_id: string) => void
}

export default function ProductTable({ product, onReturnProductId }: Props) {
    const [load, setload] = useState<boolean>(false)
    function onDeleteProduct(product: Products) {
        Swal.fire({
            title: "คุณแน่ใจ?",
            text: `คุณต้องการลบสิ้นค้า ${product.name} นี้หรือไม่!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ยืนยันที่จะลบ",
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setload(true)
                try {
                    await delteProductById(product.id)
                    Swal.fire({
                        title: `ลบสิ้นค้า ${product.name}!`,
                        text: `คุณได้ลบสิ้นค้า ${product.name} แล้ว!`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true
                    });
                    onReturnProductId(product.id)
                } catch (error: any) {
                    toast(error.message, 'error')
                } finally {
                    setload(false)
                }
            }
        });
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">image</th>
                    <th scope="col">name</th>
                    <th scope="col">sku</th>
                    <th scope="col">price</th>
                    <th scope="col">cost</th>
                    <th scope="col">detail</th>
                    <th scope="col">category</th>
                    <th scope="col">add by</th>
                    <th scope="col">เพิ่มเมื่อ</th>
                    <th scope="col">แก้ไขเมื่อ</th>
                    <th scope="col">action</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(product).length === 0 ?
                        null :
                        product.map((r, i) =>
                            <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td><img style={{ width: 50, height: 50 }} src={r.image} alt="" /></td>
                                <td>{r.name}</td>
                                <td>{r.sku}</td>
                                <td>{r.price}</td>
                                <td>{r.cost}</td>
                                <td>{r.detail}</td>
                                <td>{r.category.name}</td>
                                <td>{r.user_create.first_name}</td>
                                <td>{new Date(r.create_date).toLocaleString('th-TH')}</td>
                                <td>{new Date(r.update_date).toLocaleString('th-TH')}</td>
                                <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column', height: 'auto' }}>
                                    <IconButton onClick={() => onDeleteProduct(r)}>
                                        <DeleteIcon style={{ cursor: 'pointer' }} color='error' />
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        setload(true)
                                        window.location.href = '/product/' + r.id
                                    }}>
                                        <EditCalendarIcon style={{ cursor: 'pointer', marginTop: '20px' }} color='warning' />
                                    </IconButton>
                                </td>
                            </tr>
                        )
                }
            </tbody>
        </table>
    )
}
