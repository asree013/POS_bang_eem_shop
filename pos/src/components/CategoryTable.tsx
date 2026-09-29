'use client'
import { Categorys } from '@/models/category.model'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { IconButton } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';

type Props = {
    categorys: Categorys[]
}

export default function CategoryTable({ categorys }: Props) {

    function onDeleteCategory(c: Categorys) {

    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">detail</th>
                    <th scope="col">เพิ่มเมื่อ</th>
                    <th scope="col">แก้ไขเมื่อ</th>
                    <th scope="col">action</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(categorys).length === 0 ?
                        null :
                        categorys.map((r, i) =>
                            <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{r.name}</td>
                                <td>{r.detail}</td>
                                <td>{new Date(r.create_date).toLocaleString('th-TH')}</td>
                                <td>{new Date(r.update_date).toLocaleString('th-TH')}</td>
                                <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column', height: 'auto' }}>
                                    <IconButton onClick={() => onDeleteCategory(r)}>
                                        <DeleteIcon style={{ cursor: 'pointer' }} color='error' />
                                    </IconButton>
                                    <IconButton>
                                        <Inventory2Icon color='primary' />
                                    </IconButton>
                                    <IconButton>
                                        <EditCalendarIcon style={{ cursor: 'pointer' }} color='warning' />
                                    </IconButton>
                                </td>
                            </tr>
                        )
                }
            </tbody>
        </table>
    )
}
