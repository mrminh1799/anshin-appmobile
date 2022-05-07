import {Button, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {
    Link,
    useLocation
} from "react-router-dom";
import {useAuth} from "../../../context";
import {useGetInforUser, useOrder} from "../../../service/product";
import Storage from "../../../utils/Storage";
import Text from "antd/es/typography/Text";


const Checkout = () => {

    const {userInfo, setUserInfo} = useAuth()
    const [stateDetails,setSateDetails]=useState([])
    const location = useLocation()
    const {item} = location.state
    console.log('item',item)
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
            alert('Không bỏ trống địa chỉ ')
            return false
        }
        if(formData.address2==''){
            alert('Không bỏ trống địa chỉ chi tiết')
            return false
        }
       order.refetch().then((res)=>{
           alert('Đặt thành công')
           Storage.delete('cart')
       })
    }

    return (
        <div>
            <section>
                <div className="container">
                    <div className="billing_details">
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>Chi tiết hoá đơn</h3>
                                <form className="row contact_form">
                                    <div className="col-md-6">
                                        <Text>Họ và tên <Text style={{color:"red"}}>*</Text></Text>
                                        <TextField
                                            onChange={(item) => {
                                                setFormData(prev=>({
                                                    ...prev,
                                                    fullname: item?.target?.value
                                                }))
                                            }
                                            }
                                            fullWidth
                                            value={formData?.fullname}
                                            className="my-2"
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                        />
                                        {
                                            formData?.fullname===''? <Text style={{color:"red"}}>Không bỏ trống tên</Text>:<></>
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <Text>Số điện thoại <Text style={{color:"red"}}>*</Text></Text>
                                        <TextField
                                            onChange={(item) => {
                                                setFormData(prev=>({
                                                    ...prev,
                                                    phone: item?.target?.value
                                                }))
                                            }
                                            }
                                            value={formData?.phone}
                                            fullWidth
                                            className="my-2"
                                            type="text"
                                            id="phone"
                                            name="phone"
                                        />
                                        {
                                            formData?.phone===''? <Text style={{color:"red"}}>Không bỏ trống số điện thoại</Text>:<></>
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <Text>Địa chỉ <Text style={{color:"red"}}>*</Text></Text>
                                        <TextField
                                            onChange={(item) => {
                                                setFormData(prev=>({
                                                    ...prev,
                                                    address1: item?.target?.value
                                                }))
                                            }
                                            }
                                            fullWidth
                                            className="my-2"
                                            type="text"
                                            id="address"
                                            name="address"
                                        />
                                        {
                                            formData?.address1===''? <Text style={{color:"red"}}>Không bỏ trống địa chỉ</Text>:<></>
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <Text>Địa chi tiết <Text style={{color:"red"}}>*</Text></Text>
                                        <TextField
                                            onChange={(item) => {
                                                setFormData(prev=>({
                                                    ...prev,
                                                    address2: item?.target?.value
                                                }))
                                            }
                                            }
                                            fullWidth
                                            className="my-2"
                                            type="text"
                                            id="address"
                                            name="address"
                                        />
                                        {
                                            formData?.address2===''? <Text style={{color:"red"}}>Không bỏ trống địa chỉ chi tiết</Text>:<></>
                                        }
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-7" style={{marginTop:100}}>
                                <div className="order_box">
                                    <h2>Đơn hàng của bạn</h2>
                                    <ul className="list">
                                        <li>
                                            <Link href="#">Sản phẩm
                                                <span  className="last">Giá</span>
                                            </Link>
                                        </li>

                                        {item.map((value, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link>{value.productName}
                                                        <span className="middle">x {value.quantity}</span>
                                                        <span className="middle" style={{marginLeft:50}}>{userInfo?value?.colorName:value.color}</span>
                                                        <span className="middle" style={{marginLeft:50}}>{userInfo?value?.sizeName:value.size}</span>
                                                        <span className="last">{value.price}đ</span>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <ul className="list list_2 mb-5">
                                        <li>
                                            <Link href="#">Tổng
                                                <span>{total}đ</span>
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