import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {updateStatusOrder, useGetListOrder, useUpdateStatusOrder} from "../../../service/product";
import {useAuth} from "../../../context";
import moment from "moment";
import {useConfirm} from 'material-ui-confirm'
import {useHistory} from "react-router-dom";
import {Box, Tab, Tabs} from "@mui/material";
import {useDispatch} from "react-redux";
import {getOrder} from "../../../service/order";
import {toast} from "react-toastify";

const Order = () => {
    const {userInfo} = useAuth()
    const [order, setOrder] = useState({})
    const [tab, setTab] = useState(1)
    const confirm = useConfirm();
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) history.push('/')
    }, [userInfo])

    useEffect(() => {
        if (userInfo) {
            let temp = {
                0: [],
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: [],
            }
            dispatch(getOrder({
                id: userInfo.id
            }, (res) => {
                res.map(item => {
                    temp?.[item?.status]?.push(item)
                })
                setOrder(temp)
            }))
        }
    }, [userInfo])

    const total = (value) => {
        let a = 0
        value?.map((item, index) => {
            a += item?.price * item?.quantity
        })
        return a
    }


    const changeStatus = (item) => {
        if (item?.status === 1) {
            confirm({
                description: "Bạn có chắc huỷ đơn hàng?",
                title: 'Xác nhận huỷ'
            }).then(() => {
                dispatch(updateStatusOrder({
                    idOrder: item?.orderId,
                    status: 4
                }))
                setOrder(prevState => ({
                    ...prevState,
                    [tab]: prevState[tab].filter(value => item.orderId !== value.orderId)
                }))
                toast.success('Huỷ đơn thành công')
            })
        } else {
            confirm({
                title: 'Huỷ thất bại',
                description: "Bạn không thể huỷ đơn hàng",
            })
        }
    }

    return (
        <div style={{backgroundColor: '#efefef', paddingTop: '30px', paddingBottom: '100px'}}>
            <div className="container"
                 style={{
                     maxWidth: '80%',
                     padding: '30px 30px',
                     backgroundColor: 'white',
                     borderRadius: 10,
                     minHeight: '600px'
                 }}>
                <h2 style={{textAlign: "center"}} className={'py-2'}>Đơn hàng của bạn</h2>
                <div style={{borderTop: '1px solid black',}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider', backgroundColor: 'white'}}>
                        <Tabs
                            indicatorColor="primary"
                            textColor="inherit"
                            variant="fullWidth" value={tab} onChange={(e, newTab) => setTab(newTab)}
                            aria-label="basic tabs example">
                            <Tab value={1} label="Chờ xác nhận"/>
                            <Tab value={2} label="Đã xử lý"/>
                            <Tab value={3} label="Hoàn thành"/>
                            <Tab value={6} label="Đã đổi trả"/>
                            <Tab value={4} label="Đã huỷ"/>
                            <Tab value={0} label="Đã bị hủy"/>
                        </Tabs>
                    </Box>
                    <div className="cart_inner">
                        {
                            order?.[tab]?.length > 0 ?
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th style={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                                color: 'black',
                                                whiteSpace: 'noWrap'
                                            }} scope="col">Ngày mua
                                            </th>
                                            <th style={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                                color: 'black',
                                                whiteSpace: 'noWrap'
                                            }} scope="col">Tên sản phẩm
                                            </th>
                                            <th style={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                                color: 'black',
                                                whiteSpace: 'noWrap'
                                            }} scope="col">Màu
                                            </th>
                                            <th style={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                                color: 'black',
                                                whiteSpace: 'noWrap'
                                            }} scope="col">Size
                                            </th>
                                            <th style={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                                color: 'black',
                                                whiteSpace: 'noWrap'
                                            }} scope="col">Số lượng
                                            </th>
                                            <th style={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                                color: 'black',
                                                whiteSpace: 'noWrap'
                                            }} scope="col">Giá
                                            </th>
                                            <th style={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                                color: 'black',
                                                whiteSpace: 'noWrap'
                                            }} scope="col">Tổng
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {order?.[tab]?.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="product_count">
                                                            <p style={{fontFamily: "Playfair Display", lineHeight: 2.3, fontSize: 15, whiteSpace: 'noWrap'}}>{moment(value?.createDate).format('DD/MM/YYYY, h:mm:ss')}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="product_count">
                                                            {value?.listOrderDetailDTO?.map((item, index) => {
                                                                return (
                                                                    <tr style={{fontFamily: "Playfair Display", lineHeight: 2.3, fontSize: 15, whiteSpace: 'noWrap'}}>{item?.nameProduct}</tr>
                                                                )
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="product_count">
                                                            {value?.listOrderDetailDTO?.map((item, index) => {
                                                                return (
                                                                    <tr style={{fontFamily: "Playfair Display", lineHeight: 2.3, fontSize: 15, whiteSpace: 'noWrap'}}>{item?.colorName}</tr>
                                                                )
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="product_count">
                                                            {value?.listOrderDetailDTO?.map((item, index) => {
                                                                return (
                                                                    <tr style={{fontFamily: "Playfair Display", lineHeight: 2.3, fontSize: 15, whiteSpace: 'noWrap'}}>{item?.sizeName}</tr>
                                                                )
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="product_count">
                                                            {value?.listOrderDetailDTO?.map((item, index) => {
                                                                return (
                                                                    <tr style={{fontFamily: "Playfair Display", lineHeight: 2.3, fontSize: 15, whiteSpace: 'noWrap'}}>{item?.quantity}</tr>
                                                                )
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="product_count">
                                                            {value?.listOrderDetailDTO?.map((item, index) => {
                                                                return (
                                                                    <tr style={{fontFamily: "Playfair Display", lineHeight: 2.3, fontSize: 15, whiteSpace: 'noWrap'}}>{item?.price * item?.quantity}đ</tr>
                                                                )
                                                            })}
                                                        </div>
                                                    </td>

                                                    <td>{total(value?.listOrderDetailDTO)}đ
                                                    </td>
                                                    {
                                                        tab === 1 &&
                                                        <td>
                                                            <Button onClick={() => changeStatus(value)}
                                                                    style={{float: "right"}}>X</Button>
                                                        </td>
                                                    }
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div className={'p-5 d-flex justify-content-center'}>
                                    <p style={{fontFamily: "Playfair Display", lineHeight: 2.3, fontSize: 15, whiteSpace: 'noWrap'}}>Chưa có đơn nào!</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;