import {Button, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    BrowserRouter,
    Switch,
    useParams,
    useHistory
} from "react-router-dom";
import callApi from "../../callAPI/apiCaller";
import {useGetDetailProduct, useGetListOrder} from "../../../service/product";
import Storage from "../../../utils/Storage";
import axios from "axios";
import {useAuth} from "../../../context";

const Order = () => {
    const {userInfo, setUserInfo} = useAuth()
    const checkout = useHistory()
    const [cart, setCart] = useState([])
    const [order, setOrder] = useState([])

    const getListOrder = useGetListOrder({
        id: userInfo?.id
    })
    console.log('sss', {
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
            a += item?.price
        })

        console.log('s232ss', a)

        return a
    }

// const total= order.reduce((total,item)=> {
//     return total += item?.idProduct
// })
    console.log('userInfo', getListOrder?.data)
    const onChangeHandler = (event) => {
        console.log('event', event.target.value)
        // if (event.target.value < 1) {
        //
        // } else {
        //     setCart(prev => {
        //         return [
        //             ...prev,
        //             {
        //                 quantity: event.target.value,
        //             }
        //         ]
        //
        //     })
        // }

    }

    const getDetailProduct = (id, quantity) => {
        axios.get(`http://localhost:8080/product/findById/${id}`)
            .then(res => {
                const data = res.data;
                setCart(prev => {
                    return [
                        ...prev,
                        {
                            quantity: quantity,
                            productName: data?.name,
                            image: data?.image,
                            price: data?.price,
                            productId: id
                        }
                    ]

                })
            })
            .catch(error => console.log(error));
    }

    const toCheckout = () => {
        if (cart) {
            checkout.push("/checkout", {
                item: cart
            })
        }
    }

    useEffect(() => {
        if (Storage.get('cart')) {
            Storage.get('cart')?.map((item, index) => {
                getDetailProduct(item?.productId, item?.quantity)
            })
        }
    }, [])

    useEffect(() => {
        Storage.save('cart', cart)
    }, [cart])
    const onHandleDelete = (id) => {
        setCart(cart.filter((value, index) => {
            return value.productId != id
        }))
        // Storage.delete('cart',id)

    }

    return (
        <div>
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Cart List</h2>
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
                                    <th scope="col">Tên sản phẩm</th>
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
                                                    {value?.listOrderDetailDTO?.map((item, index) => {
                                                        return (
                                                            <p>{item?.nameProduct}</p>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                            <td>
                                                <h5>
                                                    {value?.listOrderDetailDTO?.map((item, index) => {
                                                        return (
                                                            <p>$ {item?.price}</p>
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
                                                <Button onClick={() => {
                                                    onHandleDelete(value.productId)
                                                }} style={{float: "right"}}>X</Button>
                                            </td>
                                        </tr>
                                    )
                                })}


                                </tbody>
                            </table>
                            {/*<div className="checkout_btn_inner float-right">*/}
                            {/*    <Link className="btn_1 mr-2" to="/shop">Continue Shopping</Link>*/}
                            {/*    <button onClick={toCheckout} className="btn_1 checkout_btn_1">Proceed to checkout*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;