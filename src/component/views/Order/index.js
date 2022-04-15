import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { useGetListOrder} from "../../../service/product";
import {useAuth} from "../../../context";
import moment from "moment";

const Order = () => {
    const {userInfo} = useAuth()
    const [order, setOrder] = useState([])

    const getListOrder = useGetListOrder({
        id: userInfo?.id
    })

    useEffect(() => {
        if (userInfo) {
            getListOrder.refetch()

        }
    }, [])

    useEffect(() => {
        setOrder(getListOrder?.data)
    }, [getListOrder?.data])

    const total = (value) => {
        let a = 0
        value?.map((item, index) => {
            a += item?.price  * item?.quantity
        })
        return a
    }

    return (
        <div>
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Order</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart_area section_padding">
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
                                    console.log('order',order)
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
                                                            <p>$ {item?.price * item?.quantity}</p>
                                                        )
                                                    })}
                                                </h5>
                                            </td>

                                            <td>
                                                <p style={{display: "inline-block", marginRight: 10}}>
                                                    $ {total(value?.listOrderDetailDTO)}
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
                                                                                <p>Không nhận hàng</p>
                                                                                : (value?.status == 0) ?
                                                                                    <p>Bị huỷ</p> :
                                                                                    <></>
                                                                    )
                                                            )
                                                    }
                                                </p>
                                            </td>
                                            <td>
                                                <Button style={{float: "right"}}>X</Button>
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