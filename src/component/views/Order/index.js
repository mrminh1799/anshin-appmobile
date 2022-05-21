import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useGetListOrder, useUpdateStatusOrder} from "../../../service/product";
import {useAuth} from "../../../context";
import moment from "moment";
import {useConfirm} from 'material-ui-confirm'

const Order = () => {
    const {userInfo} = useAuth()
    const [order, setOrder] = useState([])
    const [orderId, setOrderId] = useState()
    const confirm = useConfirm();
    console.log('order', order)
    const getListOrder = useGetListOrder({
        id: userInfo?.id
    })
    const updateStatus = useUpdateStatusOrder({
        idOrder: orderId,
        status: 4
    })
    useEffect(() => {
        if (userInfo) {
            getListOrder.refetch().then((res) => {
                if (res?.data) {
                    updateStatus.remove()
                }
            })

        }
    }, [userInfo])

    useEffect(() => {
        setOrder(getListOrder?.data)
    }, [getListOrder?.data])

    const total = (value) => {
        let a = 0
        value?.map((item, index) => {
            a += item?.price * item?.quantity
        })
        return a
    }


    const changeStatus = (item) => {
        if (item?.status === 1) {
            setOrderId(item?.orderId)
            confirm({
                description: "Bạn có chắc huỷ đơn hàng?",
                title: 'Xác nhận huỷ'
            }).then(() => {
                updateStatus.refetch()

            })
        } else {
            confirm({
                title: 'Huỷ thất bại',
                description: "Bạn không thể huỷ đơn hàng",
            })
        }

    }


    useEffect(() => {
        if (orderId) {
            const a = order?.filter((item, id) => item?.orderId === orderId)
            return a[0].status = 4
        }
    }, [orderId])

    return (
        <div>
            <div >
                <div className="container">
                    <div className="cart_inner">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Ngày mua</th>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">Màu</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Tổng</th>
                                    <th scope="col">Trạng thái</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order?.map((value, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <div className="product_count">

                                                    <p>{moment(value?.createDate).format('DD/MM/YYYY, h:mm:ss a')}</p>

                                                </div>
                                            </td>
                                            <td>
                                                <div className="product_count">
                                                    {value?.listOrderDetailDTO?.map((item, index) => {
                                                        return (
                                                            <p>{item?.nameProduct}</p>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="product_count">
                                                    {value?.listOrderDetailDTO?.map((item, index) => {
                                                        return (
                                                            <p>{item?.colorName}</p>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="product_count">
                                                    {value?.listOrderDetailDTO?.map((item, index) => {
                                                        return (
                                                            <p>{item?.sizeName}</p>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="product_count">
                                                    {value?.listOrderDetailDTO?.map((item, index) => {
                                                        return (
                                                            <p>{item?.quantity}</p>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                            <td>
                                                <h5>
                                                    {value?.listOrderDetailDTO?.map((item, index) => {
                                                        return (
                                                            <p>{item?.price * item?.quantity}đ</p>
                                                        )
                                                    })}
                                                </h5>
                                            </td>

                                            <td>
                                                <p style={{display: "inline-block", marginRight: 10}}>{total(value?.listOrderDetailDTO)}đ
                                                </p>
                                            </td>
                                            <td>
                                                <p style={{display: "inline-block", marginRight: 10}}>
                                                    {
                                                        value?.status == 1 ?
                                                            <p>Chờ xác nhận</p> :
                                                            (value?.status == 2 ?
                                                                    <p>Đã xác nhận</p> :
                                                                    (value?.status == 3 ?
                                                                            <p>Đã nhận</p> :
                                                                            (value?.status == 4) ?
                                                                                <p>Huỷ</p>
                                                                                : (value?.status == 0) ?
                                                                                    <p>Bị huỷ</p> :
                                                                                    <></>
                                                                    )
                                                            )
                                                    }
                                                </p>
                                            </td>
                                            <td>
                                                <Button onClick={() => changeStatus(value)}
                                                        style={{float: "right"}}>X</Button>
                                            </td>
                                        </tr>
                                    )
                                })}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;