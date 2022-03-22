import React, {useEffect, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import callApi from "../callAPI/apiCaller";
import {useGetAllOrder, useGetAllOrderById} from "../../service/order";
import {Box, Chip, FormControl, InputLabel, MenuItem, Modal, Select} from "@mui/material";
import {useParams} from "react-router-dom";
import moment from "moment";

function ListCategories({setLoading,category,setClickedRow,setFormData,setCategory}) {


    let params = useParams()

    const [open, setOpen] = useState(false)

    console.log(params)

    const order = useGetAllOrderById({
        id: params.id
    })

    useEffect(()=>{
        order.refetch().then(res=>{
            if(res?.data){
                setCategory(res.data)
            }
        })
    },[params])

    const tblOnClickHandler = (event, value, index) => {
        if(event.target.textContent=="Delete") return;
        setClickedRow(index);
        setFormData(value);
    };
    
    const onDeleteCategory = (event, value, index) => {
        if (window.confirm("Bạn muốn xóa danh mục này?")) {
            setLoading(true)
            callApi(`category`, 'DELETE', value.id)
                .then((response) => {
                    setCategory((oldState) => {
                        let newState = oldState.filter((value, idx) => {
                            return idx != index;
                        });
                        return newState;
                    });
                    setLoading(false)
                })
        }
    }
    return (
        <div className="p-5 m-auto">
            {/*<Button onClick={()=>setOpen(true)}>Tạo đơn</Button>*/}
            <table className="table table-striped table-bordered table-hover shadow">
                <thead className="thead-dark">
                    <tr>
                        <th>Tên khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Thời gian đặt</th>
                        <th>Tổng tiền</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map(function (value, index) {

                        let status = value.status === 1 ? 'Chờ xác nhận' : (
                            value.status === 2 ? 'Đã xác nhận' : (
                                value.status === 3 ? "Đổi trả" : (
                                    value.status === 4 ? "Không nhận" : (
                                        value.status === 5 ? "Đã nhận" : "Huỷ"
                                    )
                                )
                            )
                        )

                        return (
                            <tr
                                onClick={(event) => {
                                    tblOnClickHandler(event, value, index);
                                }}
                                key={index}
                            >
                                {/*<td>{value.idStaff}</td>*/}
                                <td>{value.fullName}</td>
                                <td>{value.detailAddress}</td>
                                <td>{value.phoneNumber}</td>
                                <td>{moment(value.timeCreate).format('DD/MM/YYYY')}</td>
                                <td>{value.sumPrice}</td>
                                <td>
                                    <Button
                                        onClick={()=>setOpen(true)}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Cập nhập
                                </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Modal
                keepMounted
                open={open} onClose={()=>{setOpen(false)}} className="px-5 pt-4">
                <form style={{
                    backgroundColor: 'white',
                    marginLeft: 100,
                    marginRight: 100,
                }} className="border rounded p-4 shadow" autoComplete="off">
                    <div style={{
                        display: 'flex',
                    }}>
                        <div>
                            <TextField
                                name="name"
                                // value={formData.name}
                                fullWidth
                                label="Tên khách hàng"
                                className="my-2 mb-4"
                            />
                            <TextField
                                name="name"
                                // value={formData.name}
                                fullWidth
                                label="Số điện thoại"
                                className="my-2 mb-4"
                            />
                            <TextField
                                name="name"
                                // value={formData.name}
                                fullWidth
                                label="Địa chỉ"
                                className="my-2 mb-4"
                            />
                            <TextField
                                name="name"
                                // value={formData.name}
                                fullWidth
                                label="Địa chỉ chi tiết"
                                className="my-2 mb-4"
                            />
                        </div>
                        <div className={'ml-5'}>
                            <Button className="mr-2 w-100 mb-1" type="submit" variant="outlined">
                                Xác nhận
                            </Button>
                            <Button className={'w-100'} variant="outlined" color="inherit">
                                Huỷ đơn hàng
                            </Button>
                        </div>
                    </div>
                    <table className="table table-striped table-bordered table-hover shadow">
                        <thead className="thead-dark">
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Màu</th>
                            <th>Size</th>
                            <th>số lượng</th>
                            <th>Giá</th>
                            <th>Tổng tiền</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        {/*<tbody>*/}
                        {/*        <tr>*/}
                        {/*            <td>1</td>*/}
                        {/*            <td>2</td>*/}
                        {/*            <td>22</td>*/}
                        {/*            <td>2</td>*/}
                        {/*            <td>3</td>*/}
                        {/*            <td>3</td>*/}
                        {/*            <td>*/}
                        {/*                <Button*/}
                        {/*                    onClick={(event) => {*/}

                        {/*                    }}*/}
                        {/*                    variant="contained"*/}
                        {/*                    color="secondary"*/}
                        {/*                >*/}
                        {/*                    Delete*/}
                        {/*                </Button>*/}
                        {/*            </td>*/}
                        {/*        </tr>*/}
                        {/*</tbody>*/}
                    </table>
                </form>
            </Modal>
        </div>
    )
}

export default ListCategories;