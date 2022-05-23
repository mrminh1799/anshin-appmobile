import {Button, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";

import {useDeleteCartProduct, useGetListCart} from "../../../service/product";
import Storage from "../../../utils/Storage";
import {useAuth} from "../../../context";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {getCart, updateCart} from "../../../service/order";
import _ from "lodash";


function Cart() {
    const checkout = useHistory()
    const [cart, setCart] = useState([])
    const [cartAccount, setCartAccount] = useState([])
    const [idProDel, setIdProDel] = useState([])
    const {userInfo, setUserInfo} = useAuth()
    const dispatch = useDispatch()
    const history = useHistory()

    const listCart = useGetListCart({
        id: userInfo?.id
    })


    const delProductCart = useDeleteCartProduct({
        idAcount: userInfo?.id,
        idProduct: idProDel
    })

    useEffect(() => {
        if (userInfo) {
            listCart.refetch().then((res) => {
                if (res?.data) {
                    setCartAccount(res?.data)

                }
            })
        }
    }, [userInfo])


    // useEffect(() => {
    //     if (userInfo) {
    //         if (listCart?.data) {
    //         }
    //     }
    // }, [listCart?.data])

    const onChangeHandler = (event, item) => {
        if (event.target.value < 1) {
            toast.warn('Số lượng phải lớn hơn 0')
        } else {
            setCartAccount(cartAccount.map(value => {
                if (item.idProduct === value.idProduct) {
                    value.quantity = event.target.value
                    dispatch(updateCart({
                        idAccount: userInfo.id,
                        idProductDetail: value.idProduct,
                        quantity: event.target.value
                    }))
                }
                return value
            }))
        }
    }

    const onChangeLocalHandler = (event, item) => {
        if (event.target.value < 1) {
            toast.warn('Số lượng phải lớn hơn 0')
        } else {
            let temp = cart.map(value => {
                console.log(cart, item)
                if (item.productIdDetail === value.productIdDetail) {
                    value.quantity = event.target.value
                }
                return value
            })
            Storage.save('cart', temp)
            setCart(temp)
        }
    }


    const toCheckout = () => {
        if (!_.isEmpty(cart) || !_.isEmpty(cartAccount)) {
            console.log(cartAccount, cart)
            let temp
            if (_.isEmpty(userInfo)) temp = cart.map(item => {
                item.idProduct = item.productIdDetail
                return item
            });
            checkout.push("/checkout", {
                item: !_.isEmpty(userInfo) ? cartAccount : temp
            })
        } else {
            toast.warn('Không có sản phẩm nào trong giỏ hàng')
        }
    }

    useEffect(() => {
        if (_.isEmpty(userInfo)) {
            const temp = Storage.get('cart')
            if (temp) {
                setCart(temp)
            }
        } else {
            dispatch(getCart({
                id: userInfo.id
            }, (res) => {
                setCartAccount(res)
            }))
        }
    }, [])

    useEffect(() => {
        // Storage.save('cart', cart)
    }, [cart])

    const onHandleDelete = (id) => {
        if (userInfo) {
            setIdProDel(id?.idProduct)
        } else {
            setCart(cart.filter((value, index) => {
                return value.productIdDetail != id?.productIdDetail
            }))
            if (Storage.get('cart')) {
                Storage.save('cart', Storage.get('cart')?.filter((item, index) => {
                    return item.productIdDetail != id?.productIdDetail
                }))
            }
        }
    }

    useEffect(() => {
        if (idProDel) {
            delProductCart.refetch()
            setCartAccount(cartAccount?.filter((value, index) => {
                return value.idProduct != idProDel
            }))
        }
    }, [idProDel])
    return (
        <div>
            <div className="cart_area" style={{backgroundColor: '#efefef', paddingTop: '30px', paddingBottom: '100px'}}>
                <div className="container"
                     style={{maxWidth: '80%', padding: '30px 30px', backgroundColor: 'white', borderRadius: 10}}>
                    <h2 style={{textAlign: "center"}} className={'py-2'}>Giỏ hàng</h2>
                    <div className={'d-flex pt-4'} style={{borderTop: '1px solid black',}}>
                        <div className="cart_inner" style={{flex: 1,}}>
                            {
                                _.isEmpty(cart) && _.isEmpty(cartAccount) ?
                                    <div className={'p-5 d-flex justify-content-center'}
                                         style={{flexDirection: 'column'}}>
                                        <p style={{textAlign: 'center'}}>Giỏ hàng của bạn đang trống</p>
                                        <div style={{margin: 'auto'}}>
                                            <Button variant="contained" color={'primary'}
                                                    onClick={() => history.push('/shop')}>
                                                Mua ngay
                                            </Button>
                                        </div>
                                    </div>
                                    :
                                    <div className="table-responsive">
                                        {

                                            userInfo ?
                                                <table className="table">
                                                    <thead>
                                                    <tr style={{fontWeight: 700}}>
                                                        <th style={{fontWeight: 700}} scope="col">Sản phẩm</th>
                                                        <th style={{fontWeight: 700}} scope="col">Giá</th>
                                                        <th style={{fontWeight: 700}} scope="col">Màu sắc</th>
                                                        <th style={{fontWeight: 700}} scope="col">Size</th>
                                                        <th style={{fontWeight: 700}} scope="col">Số lượng</th>
                                                        <th style={{fontWeight: 700}} scope="col">Tổng tiền</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {cartAccount && cartAccount?.map((value, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="d-flex">
                                                                            <img width="100px" src={value.colorImage}/>
                                                                        </div>
                                                                        <div className="media-body"
                                                                             style={{maxWidth: 350}}>
                                                                            <p>{value.productName}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <h5>${value.price}</h5>
                                                                </td>

                                                                <td>
                                                                    <h5>{value.colorName}</h5>
                                                                </td>
                                                                <td>
                                                                    <h5>{value.sizeName}</h5>
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
                                                                    <h5 style={{
                                                                        display: "inline-block",
                                                                        marginRight: 10
                                                                    }}>
                                                                        {/*${Number(value.quantity) * 20}*/}
                                                                        ${Number(value.quantity) * Number(value.price)}
                                                                    </h5>
                                                                    <Button onClick={() => {
                                                                        onHandleDelete(value)
                                                                    }} style={{float: "right"}}>X</Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}

                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>
                                                            <h4>Tổng</h4>
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
                                                        <th style={{fontWeight: 700}} scope="col">Sản phẩm</th>
                                                        <th style={{fontWeight: 700}} scope="col">Giá</th>
                                                        <th style={{fontWeight: 700}} scope="col">Màu sắc</th>
                                                        <th style={{fontWeight: 700}} scope="col">Size</th>
                                                        <th style={{fontWeight: 700}} scope="col">Số lượng</th>
                                                        <th style={{fontWeight: 700}} scope="col">Tổng tiền</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {cart?.map((value, index) => {
                                                        console.log('cart', cart)
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="d-flex">
                                                                            <img width="100px" src={value.imageDetail}/>
                                                                        </div>
                                                                        <div className="media-body"
                                                                             style={{maxWidth: 350}}>
                                                                            <p>{value.name}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <h5>{value.price}đ</h5>
                                                                </td>
                                                                <td>
                                                                    <h5>{value.color}</h5>
                                                                </td>
                                                                <td>
                                                                    <h5>{value.size}</h5>
                                                                </td>
                                                                <td>
                                                                    <div className="product_count">
                                                                        <TextField
                                                                            name="quantity"
                                                                            onChange={(event) => onChangeLocalHandler(event, value)}
                                                                            value={value.quantity}
                                                                            className="mb-2"
                                                                            type="number"
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <h5 style={{
                                                                        display: "inline-block",
                                                                        marginRight: 10
                                                                    }}>
                                                                        {/*${Number(value.quantity) * 20}*/}
                                                                        {Number(value.quantity) * Number(value.price)}đ
                                                                    </h5>
                                                                    <Button onClick={() => {
                                                                        onHandleDelete(value)
                                                                    }} style={{float: "right"}}>X</Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}

                                                    <tr>
                                                        <td><span/></td>
                                                        <td><span/></td>
                                                        <td><span/></td>
                                                        <td><span/></td>
                                                        <td>
                                                            <h4>Tổng</h4>
                                                        </td>
                                                        <td>
                                                            <h5>{cart.reduce((total, cart) => {
                                                                return total += Number(cart.quantity) * Number(cart.price);
                                                            }, 0)}đ</h5>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                        }
                                        <div className="checkout_btn_inner float-right">
                                            <Link className="btn_1 mr-2" to="/shop">Tiếp tục mua hàng</Link>
                                            <button onClick={toCheckout} className="btn_1 checkout_btn_1">Thanh toán
                                            </button>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;