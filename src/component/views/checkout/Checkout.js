import {Button, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {
    Link,
    useLocation
} from "react-router-dom";
import {useAuth} from "../../../context";
import {useGetInforUser, useOrder} from "../../../service/product";
import Storage from "../../../utils/Storage";


const Checkout = () => {

    const {userInfo, setUserInfo} = useAuth()
    const [stateDetails,setSateDetails]=useState([])
    const location = useLocation()
    const {item} = location.state
    const getInfoUser = useGetInforUser({
        id: userInfo?.id
    })
    // const
    const [product, setProduct] = useState([])
    const [formData, setFormData] = useState({
        fullname: userInfo?userInfo?.fullname:"",
        address1: "",
        address2: "",
        phone: userInfo?userInfo?.username:"",
    });

    const order = useOrder({
        idAcount: userInfo ? userInfo?.id : 5,
        fullName:formData?.fullname,
        address: formData?.address1,
        detailAddress: formData?.address2,
        phoneNumber: formData?.phone,
        listOrderProductDetailDTO: stateDetails
    })
    useEffect(() => {
        if(userInfo){
            getInfoUser.refetch()
        }
    },[])

    useEffect(() => {
        if(item){
            item?.map((item)=>{
                setSateDetails(prev=>{
                   return[
                       ...prev,
                       {
                           quantity:item?.quantity,
                           idProductDetail: item?.productId
                       }
                   ]
                })
            })
        }
    },[])
    let total = item.reduce((total, item) => {
        return total += Number(item.quantity) * Number(item.price);
    }, 0)
    const onSubmitHandler = (quantity,productId) => {
        if(formData.fullname==''){
            alert('Không bỏ trống tên')
            return false
        }
        if(formData.phone==''){
            alert('Không bỏ trống số điện thoại')
            return false
        }
        if(formData.address1==''){
            alert('Không bỏ trống địa chỉ 1')
            return false
        }
        if(formData.address2==''){
            alert('Không bỏ trống địa chỉ 2')
            return false
        }
       order.refetch().then((res)=>{
           alert('Đặt thành công')
           Storage.delete('cart')
       })
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
                                            onChange={(item) => {
                                                setFormData(prev=>({
                                                    ...prev,
                                                    fullname: item?.target?.value
                                                }))
                                            }
                                            }
                                            fullWidth
                                            value={userInfo?formData?.fullname:""}
                                            label={"Full name"}
                                            className="my-2"
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            onChange={(item) => {
                                                setFormData(prev=>({
                                                    ...prev,
                                                    phone: item?.target?.value
                                                }))
                                            }
                                            }
                                            value={userInfo?formData?.phone:""}
                                            fullWidth
                                            label={"Phone Number"}
                                            className="my-2"
                                            type="text"
                                            id="phone"
                                            name="phone"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            onChange={(item) => {
                                                setFormData(prev=>({
                                                    ...prev,
                                                    address1: item?.target?.value
                                                }))
                                            }
                                            }
                                            fullWidth
                                            label="Address1"
                                            className="my-2"
                                            type="text"
                                            id="address"
                                            name="address"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            onChange={(item) => {
                                                setFormData(prev=>({
                                                    ...prev,
                                                    address2: item?.target?.value
                                                }))
                                            }
                                            }
                                            fullWidth
                                            label="Address2"
                                            className="my-2"
                                            type="text"
                                            id="address"
                                            name="address"
                                        />
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
                                        {item.map((value, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link>{value.productName}
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
                                    <Button variant="contained" color="primary" className="mt-5 w-100"
                                            onClick={onSubmitHandler}>Đặt hàng</Button>
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