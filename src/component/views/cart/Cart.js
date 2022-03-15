
import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, NavLink, BrowserRouter, Switch, useParams } from "react-router-dom";
import callApi from "../../callAPI/apiCaller";
import {useGetDetailProduct} from "../../../service/product";


function Cart() {
    const array = [];
    const [product, setProduct] = useState([])
    const [listCart, setListCart]= useState({
        idProduct:"",
        quantity:""
    })
    const cart = ()=>{

    }
    console.log('222333',localStorage.getItem(10))
    // useEffect(() => {
    //
    // })
    // useEffect(() => {
    //     callApi(`categories/1/products/`, "GET", null)
    //         .then((response) => {
    //             const { data } = response
    //             for (var i = 0; i < localStorage.length; i++) {
    //                 data.map((value, index) => {
    //                     if (value.id == localStorage.key(i)) {
    //                         value = {
    //                             ...value,
    //                             quantity: localStorage.getItem(localStorage.key(i)),
    //                         };
    //                         array.push(value);
    //                     }
    //                 });
    //             }
    //             setProduct(array)
    //         })
    // }, [])
    // const detailProduct =useGetDetailProduct({
    //
    // })
    // console.log('2222111',localStorage.getItem(localStorage.key()))
    const onHandleDelete = (id) => {
        setProduct(product.filter((value, index) => { return value.id != id }))
        localStorage.removeItem(id)
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
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="media">
                                                        <div className="d-flex">
                                                            <img width="150px" src={value.image} />
                                                        </div>
                                                        <div className="media-body">
                                                            <p>{value.name}</p>
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
                                                            value={value.quantity}
                                                            className="mb-2 fs-2"
                                                            type="number"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5 style={{ display: "inline-block", marginRight: 10 }}>
                                                        ${Number(value.quantity) * Number(value.price)}
                                                    </h5>
                                                    <Button onClick={() => { onHandleDelete(value.id) }} style={{ float: "right" }} >X</Button>
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
                                            <h5>${product.reduce((total, product) => {
                                                return total += product.quantity * product.price;
                                            }, 0)}</h5>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="checkout_btn_inner float-right">
                                <Link className="btn_1 mr-2" to="/shop">Continue Shopping</Link>
                                <Link className="btn_1 checkout_btn_1" to="/checkout">Proceed to checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart;