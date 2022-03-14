import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, NavLink, BrowserRouter, Switch, useParams } from "react-router-dom";
import callApi from "../../callAPI/apiCaller";

function Checkout() {
    const formDataInItValue = {
        id: "",
        firstname: "",
        lastname: "",
        country: "",
        city: "",
        address: "",
        phone: "",
        email: "",
        note: ""
    };
    const [product, setProduct] = useState([])
    const [formData, setFormData] = useState(formDataInItValue);
    const array = [];
    useEffect(() => {
        callApi(`categories/1/products/`, "GET", null)
            .then((response) => {
                const { data } = response
                for (var i = 0; i < localStorage.length; i++) {
                    data.map((value, index) => {
                        if (value.id == localStorage.key(i)) {
                            value = {
                                ...value,
                                quantity: localStorage.getItem(localStorage.key(i)),
                            };
                            array.push(value);
                        }
                    });
                }
                setProduct(array)
            })
    }, [])
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    let total = product.reduce((total, product) => {
        return total += product.quantity * product.price;
    }, 0)
    const onSubmitHandler = () => {
        callApi("customer","POST",formData)
        .then((res)=>{
            console.log(res)
        })
        console.log(product.keys)
        callApi("order","POST",{product})
        .then((res)=>{
            console.log(res)
        })
        localStorage.clear();
    }
    return (
        <div>
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Checkout</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="checkout_area section_padding">
                <div className="container">
                    <div className="billing_details">
                        <div className="row">
                            <div className="col-lg-8">
                                <h3>Billing Details</h3>
                                <form className="row contact_form">
                                    <div className="col-md-6">
                                        <TextField
                                            onChange={onChangeHandler}
                                            fullWidth
                                            label="First name"
                                            className="my-2"
                                            type="text"
                                            id="firstname"
                                            name="firstname"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            onChange={onChangeHandler}
                                            fullWidth
                                            label="Last name"
                                            className="my-2"
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            onChange={onChangeHandler}
                                            fullWidth
                                            label="Phone number"
                                            className="my-2"
                                            type="text"
                                            id="phone"
                                            name="phone"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            onChange={onChangeHandler}
                                            fullWidth
                                            label="Email"
                                            className="my-2"
                                            type="text"
                                            id="email"
                                            name="email"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            onChange={onChangeHandler}
                                            fullWidth
                                            label="Country"
                                            className="my-2"
                                            type="text"
                                            id="country"
                                            name="country"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            onChange={onChangeHandler}
                                            fullWidth
                                            label="Address"
                                            className="my-2"
                                            type="text"
                                            id="address"
                                            name="address"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            onChange={onChangeHandler}
                                            fullWidth
                                            label="City"
                                            className="my-2"
                                            type="text"
                                            id="city"
                                            name="city"
                                        />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <div className="creat_account">
                                            <h3>Shipping Details</h3>
                                        </div>
                                        <textarea className="form-control" name="message" id="message" rows="1"
                                            placeholder="Order Notes"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-4">
                                <div className="order_box">
                                    <h2>Your Order</h2>
                                    <ul className="list">
                                        <li>
                                            <Link href="#">Product
                                            <span>Total</span>
                                            </Link>
                                        </li>
                                        {product.map((value, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link >{value.name}
                                                        <span className="middle">x {value.quantity}</span>
                                                        <span className="last">${value.price}</span>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <ul className="list list_2 mb-5">
                                        <li>
                                            <Link href="#">Total
                                            <span>${total}</span>
                                            </Link>
                                        </li>
                                    </ul>
                                    <Button variant="contained" color="primary" className="mt-5 w-100" onClick={onSubmitHandler}><Link className="w-100" to="/confirm">Proceed to Paypal</Link></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Checkout;