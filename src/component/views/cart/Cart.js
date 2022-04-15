import {Button, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {
    Link,
    useHistory
} from "react-router-dom";

import { useGetListCart} from "../../../service/product";
import Storage from "../../../utils/Storage";
import axios from "axios";
import {useAuth} from "../../../context";


function Cart() {
    const checkout = useHistory()
    const [cart, setCart] = useState([])
    const [cartAccount, setCartAccount] = useState([])
    const {userInfo, setUserInfo} = useAuth()
    const listCart = useGetListCart({
        id: userInfo?.id
    })

    const getDetailProduct = (id, quantity) => {
        axios.get(`http://localhost:8080/product/findById/${id}`)
            .then(res => {
                const data = res.data;
                if(userInfo){
                    setCartAccount(prev => {
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
                }else {
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
                }

            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        if (userInfo) {
            listCart.refetch()
        }
    }, [])


    useEffect(() => {
        if (userInfo) {
            if (listCart?.data) {
                setCartAccount(listCart?.data)
            }
        }
    }, [listCart?.data])

    console.log('listCart?.data',cartAccount)
    const onChangeHandler = (event) => {
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


    const toCheckout = () => {
        if (cart || cartAccount) {
            checkout.push("/checkout", {
                item: userInfo?cartAccount: cart
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
        // Storage.save('cart', cart)
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
                            {userInfo ?
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Totasssl</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartAccount?.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="media">
                                                        <div className="d-flex">
                                                            <img width="150px" src={value.image}/>
                                                        </div>
                                                        <div className="media-body">
                                                            <p>{value.productName}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5>${value.price}</h5>
                                                </td>
                                                <td>
                                                    <div className="product_count">
                                                        <TextField
                                                            name="quantity"
                                                            onChange={(event) => onChangeHandler(event, value)}
                                                            value={value.quantity}
                                                            className="mb-2 fs-2"
                                                            type="number"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5 style={{display: "inline-block", marginRight: 10}}>
                                                        {/*${Number(value.quantity) * 20}*/}
                                                        ${Number(value.quantity) * Number(value.price)}
                                                    </h5>
                                                    <Button onClick={() => {
                                                        onHandleDelete(value.productId)
                                                    }} style={{float: "right"}}>X</Button>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <h5>Subtotal</h5>
                                        </td>
                                        <td>
                                            <h5>${cartAccount.reduce((total, cartAccount) => {
                                                return total += Number(cartAccount.quantity) * Number(cartAccount.price);
                                            }, 0)}</h5>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                :
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cart?.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="media">
                                                        <div className="d-flex">
                                                            <img width="150px" src={value.image}/>
                                                        </div>
                                                        <div className="media-body">
                                                            <p>{value.productName}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5>${value.price}</h5>
                                                </td>
                                                <td>
                                                    <div className="product_count">
                                                        <TextField
                                                            name="quantity"
                                                            onChange={(event) => onChangeHandler(event, value)}
                                                            value={value.quantity}
                                                            className="mb-2 fs-2"
                                                            type="number"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5 style={{display: "inline-block", marginRight: 10}}>
                                                        {/*${Number(value.quantity) * 20}*/}
                                                        ${Number(value.quantity) * Number(value.price)}
                                                    </h5>
                                                    <Button onClick={() => {
                                                        onHandleDelete(value.productId)
                                                    }} style={{float: "right"}}>X</Button>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <h5>Subtotal</h5>
                                        </td>
                                        <td>
                                            <h5>${cart.reduce((total, cart) => {
                                                return total += Number(cart.quantity) * Number(cart.price);
                                            }, 0)}</h5>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            }
                            <div className="checkout_btn_inner float-right">
                                <Link className="btn_1 mr-2" to="/shop">Continue Shopping</Link>
                                <button onClick={toCheckout} className="btn_1 checkout_btn_1">Proceed to checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;