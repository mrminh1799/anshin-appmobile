import {Backdrop, Button, CircularProgress, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useState, useEffect, useMemo} from "react";
import callApi from "../callAPI/apiCaller";
import FormOrder from "./FormOrder"
import ListOrders from "./ListOrders"
import {useGetAllOrder, useGetAllOrderById} from "../../service/order";
import {useParams} from "react-router-dom";
import moment from "moment";
import {IconButton, Menu, MenuItem, Modal} from "@mui/material";
import {FaEllipsisV} from 'react-icons/fa';

const formDataInItValue = {
    id: "",
    name: "",
}

function Orders({loading, setLoading}) {

    let params = useParams()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [order, setOrder] = useState([])
    const [listOrder, setListOrder] = useState([])
    const [clickedRow, setClickedRow] = useState(-1);
    const [formData, setFormData] = useState(formDataInItValue);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [pagination, setPagination] = useState({
        index: 0,
        size: 10
    });

    const [open, setOpen] = useState(false)

    const orderApi = useGetAllOrderById({
        id: params.id
    })

    useEffect(() => {
        if (listOrder) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            console.log(lastIndex, firstIndex, listOrder, listOrder.slice(firstIndex, lastIndex))
            // console.log(listOrder.slice(firstIndex, lastIndex))
            setOrder(listOrder.slice(firstIndex, lastIndex))
        }
    }, [pagination.index])

    useMemo(() => {
        console.log('doi', params.id)
        orderApi.refetch().then(res => {
            if (res?.data) {
                setTotalPage(Math.ceil(res?.data.length / pagination.size))
                setPagination({
                    ...pagination,
                    index: 0
                })
                setListOrder(res.data)
                setOrder(res.data.slice(0, pagination.size))
            }
        })
    }, [params.id])

    const tblOnClickHandler = (event, value, index) => {
        if (event.target.textContent == "Delete") return;
        setClickedRow(index);
        setFormData(value);
    };

    const onChangePage = (event, newPage) => {
        setPagination({
            ...pagination,
            index: newPage - 1
        });
    };
    // console.log(params)
    return (
        <div className="justify-content-center flex-fill">
            {/* <Backdrop open={loading} style={{ zIndex: "1000" }}>
                <CircularProgress />
            </Backdrop> */}
            {/*<FormOrder*/}
            {/*    formData={formData}*/}
            {/*    setOrder={setOrder}*/}
            {/*    order={order}*/}
            {/*    setFormData={setFormData}*/}
            {/*    clickedRow={clickedRow}*/}
            {/*    setLoading={setLoading}*/}
            {/*    formDataInItValue={formDataInItValue}*/}
            {/*/>*/}
            <div className="p-5 m-auto">
                {/*<Button onClick={()=>setOpen(true)}>Tạo đơn</Button>*/}
                <table className="table table-striped table-bordered table-hover shadow">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Thời gian đặt</th>
                        <th>Tổng tiền</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.map(function (value, index) {

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
                                <td>{((pagination.index + 1) * pagination.size - pagination.size + 1) + index}</td>
                                <td>{value.fullName}</td>
                                <td>{value.detailAddress}</td>
                                <td>{value.phoneNumber}</td>
                                <td>{moment(value.timeCreate).format('DD/MM/YYYY')}</td>
                                <td>{value.sumPrice}</td>
                                <td>
                                    <IconButton
                                        onClick={handleClick}>
                                        <FaEllipsisV size={15}/>
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={anchorEl}
                                        onClose={handleClose}
                                    >
                                        {/*<MenuItem onClick={handleClose}>*/}
                                        {/*    Cập nhật*/}
                                        {/*</MenuItem>*/}
                                        {/*<MenuItem onClick={handleClose}>*/}
                                        {/*    Huỷ đơn*/}
                                        {/*</MenuItem>*/}
                                    </Menu>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <Modal
                    keepMounted
                    open={open} onClose={() => {
                    setOpen(false)
                }} className="px-5 pt-4">
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
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>22</td>
                                <td>2</td>
                                <td>3</td>
                                <td>3</td>
                                <td>
                                    <Button
                                        onClick={(event) => {

                                        }}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </Modal>
            </div>
            <Pagination
                count={totalPage}
                onChange={onChangePage}
                className="py-4 d-flex justify-content-center"
            />
        </div>
    )
}

export default Orders;