import {Backdrop, Button, CircularProgress, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useState, useEffect, useMemo} from "react";
import {
    getDetailOrder,
    changeStatus,
    useGetAllOrderById,
    deleteOrderDetail,
    changeQuantityDetailOrder
} from "../../service/order";
import {useParams} from "react-router-dom";
import moment from "moment";
import {IconButton, Modal} from "@mui/material";
import {FaEllipsisV, FaTrash} from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {Dropdown} from "semantic-ui-react";

const formDataInItValue = {
    fullName: "",
    address: "",
    detailAddress: "",
    phoneNumber: "",
    sumPrice: 500000,
    timeCreate: "2022-03-04T16:42:49.000+00:00"
}

function Orders() {

    const params = useParams()

    const dispatch = useDispatch()

    const [order, setOrder] = useState([])
    const [listOrder, setListOrder] = useState([])
    const [formData, setFormData] = useState(formDataInItValue);
    const [totalPage, setTotalPage] = useState(1);
    const [pagination, setPagination] = useState({
        index: 0,
        size: 10
    });

    const [open, setOpen] = useState(false)

    const [detailOrder, setDetailOrder] = useState([])

    const orderApi = useGetAllOrderById({
        id: params.id
    })

    useEffect(() => {
        orderApi.refetch()
    }, [])

    useEffect(() => {
        if (listOrder) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            setOrder(listOrder.slice(firstIndex, lastIndex))
        }
    }, [listOrder])

    useEffect(() => {
        if (listOrder) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            setTotalPage(Math.ceil(listOrder.length / pagination.size))
            setOrder(listOrder.slice(firstIndex, lastIndex))
        }
    }, [pagination.index])

    useEffect(() => {
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

    const handleUpdate = (value) => {
        dispatch(getDetailOrder({
            orderId: value.id
        }, (res) => {
            setDetailOrder(res)
            setOpen(true)
            setFormData(value)
        }))
    }

    const handleCancelOrder = (id) => {
        let a = window.confirm('Bạn có chắc muốn huỷ đơn?')
        if (a) {
            setOpen(false)
            dispatch(changeStatus({
                id: id,
                status: 0
            }))
            setListOrder(listOrder.filter(item => item.id !== id))
        }
    }

    const onChangePage = (event, newPage) => {
        setPagination({
            ...pagination,
            index: newPage - 1
        });
    };

    const handleDeleteOrderDetail = (id) => {
        let a = window.confirm('Bạn có chắc muốn xoá đơn này?')
        if (a) {
            dispatch(deleteOrderDetail({
                orderDetailId: id,
            }))
            setDetailOrder(detailOrder.filter(item => item.idOrderDetail !== id))
        }
    }

    const onChangeQuantity = (id, quantity) => {
        if (quantity.target.value > 0) {
            setDetailOrder(detailOrder.map(item => {
                if (item.idOrderDetail === id) {
                    item.quantity = quantity.target.value
                }
                return item
            }))
        }
    }

    const handleConfirmOrder = (id) => {
        let a = window.confirm('Bạn có chắc muốn xác nhận đơn?')
        if (a) {
            setOpen(false)
            dispatch(changeStatus({
                id: id,
                status: 2
            }))
            setListOrder(listOrder.filter(item => item.id !== id))
        }
    }

    const handleSuccess = (id) => {
        dispatch(changeStatus({
            id: id,
            status: 3
        }))
        setListOrder(listOrder.filter(item => item.id !== id))
    }

    const handleFail = (id) => {
        dispatch(changeStatus({
            id: id,
            status: 0
        }))
        setListOrder(listOrder.filter(item => item.id !== id))
    }

    const formOrder = () => {

        return (
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
                                disabled
                                name="name"
                                value={formData.fullName}
                                fullWidth
                                label="Tên khách hàng"
                                className="my-2 mb-4"
                            />
                            <TextField
                                disabled
                                name="name"
                                value={formData.phoneNumber}
                                fullWidth
                                label="Số điện thoại"
                                className="my-2 mb-4"
                            />
                            <TextField
                                disabled
                                name="name"
                                value={formData.address}
                                fullWidth
                                label="Địa chỉ"
                                className="my-2 mb-4"
                            />
                            <TextField
                                disabled
                                name="name"
                                value={formData.detailAddress}
                                fullWidth
                                label="Địa chỉ chi tiết"
                                className="my-2 mb-4"
                            />
                        </div>
                        <div className={'ml-5'}>
                            <Button onClick={() => handleConfirmOrder(formData.id)} className="mr-2 w-100 mb-1"
                                    color={'primary'} variant="contained">
                                Xác nhận
                            </Button>
                            <Button onClick={() => handleCancelOrder(formData.id)} className={'w-100 mt-2'}
                                    variant="contained" color="inherit">
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
                        {
                            detailOrder?.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.nameProduct}</td>
                                        <td>{item.coloName}</td>
                                        <td>{item.sizeName}</td>
                                        {/*<td>{item.quantity}</td>*/}
                                        <td><TextField type={'number'} onBlur={() =>
                                            dispatch(changeQuantityDetailOrder({
                                                orderDetailId: item.idOrderDetail,
                                                quantity: item.quantity
                                            }))}
                                                       onChange={(value) => onChangeQuantity(item.idOrderDetail, value)}
                                                       value={item.quantity}/></td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity * item.price}</td>
                                        <td>
                                            <IconButton onClick={() => handleDeleteOrderDetail(item.idOrderDetail)}>
                                                <FaTrash color={'red'} size={14}/>
                                            </IconButton>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </form>
            </Modal>
        )
    }

    return (
        <div className="justify-content-center flex-fill">
            {formOrder()}
            <div className="p-5 m-auto">
                <table className="table table-striped table-bordered table-hover shadow">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Thời gian đặt</th>
                        <th>Tổng tiền</th>
                        {
                            !['0', '3'].includes(params?.id) &&
                            <th>Hành động</th>
                        }
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
                                key={index}
                            >
                                <td>{((pagination.index + 1) * pagination.size - pagination.size + 1) + index}</td>
                                <td>{value.fullName}</td>
                                <td>{value.detailAddress}</td>
                                <td>{value.phoneNumber}</td>
                                <td>{moment(value.timeCreate).format('DD/MM/YYYY')}</td>
                                <td>{value.sumPrice}</td>
                                {
                                    !['0', '3'].includes(params?.id) &&
                                    <td>
                                        <Dropdown icon={<IconButton>
                                            <FaEllipsisV size={15}/>
                                        </IconButton>}>
                                            <Dropdown.Menu>
                                                {
                                                    ['1'].includes(params?.id) ?
                                                        <>
                                                            <Dropdown.Item onClick={() => handleUpdate(value)}>Cập
                                                                nhật</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => handleCancelOrder(value.id)}>Huỷ
                                                                đơn</Dropdown.Item>
                                                        </>
                                                        :
                                                        <>
                                                            <Dropdown.Item onClick={() => handleSuccess(value.id)}>Giao
                                                                thành công</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => handleFail(value.id)}>Không
                                                                nhận hàng</Dropdown.Item>
                                                        </>
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                }
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <Pagination
                page={pagination.index + 1}
                count={totalPage}
                onChange={onChangePage}
                className="py-4 d-flex justify-content-center"
            />
        </div>
    )
}

export default Orders;