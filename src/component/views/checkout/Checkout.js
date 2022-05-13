import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {
    Link, useHistory,
    useLocation
} from "react-router-dom";
import {useAuth} from "../../../context";
import {useAddress, useDeleteProductAllCart, useGetInforUser, useOrder} from "../../../service/product";
import Storage from "../../../utils/Storage";
import Text from "antd/es/typography/Text";
import { useConfirm } from 'material-ui-confirm';
import {toast} from "react-toastify";
import * as productService from '../../../service/product'


const Checkout = () => {
    const {userInfo, setUserInfo} = useAuth()
    const [stateDetails,setSateDetails]=useState([])
    const location = useLocation()
    const {item} = location.state
    const confirm = useConfirm();
    const home = useHistory()

    const getInfoUser = useGetInforUser({
        id: userInfo?.id
    })
    const deleteCart = useDeleteProductAllCart({
        id: userInfo?.id
    })
    const [addressCity, setAddressCity] = useState([])
    const [addressQuan, setAddressQuan] = useState([])
    const [addressPhuong, setAddressPhuong] = useState([])
    const [detailsAddresses, setDetailsAddresses] = useState({
        thanhpho:"",
        phuong:"",
        quan:""
    })
    const [formData, setFormData] = useState({
        fullname: userInfo?userInfo?.fullname:"",
        address1: "",
        address2: "",
        phone: userInfo?userInfo?.username:"",
    });

    const order = useOrder({
        idAcount: userInfo ? userInfo?.id : 5,
        fullName:formData?.fullname,
        address: detailsAddresses?.thanhpho +', '+ detailsAddresses?.quan+', '+ detailsAddresses?.phuong,
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
        productService.findCity().then((res)=>{
            if(res?.data){
                setAddressCity(res?.data)
            }
        })
    },[])
    useEffect(() => {
        if(item){
            item?.map((vale)=>{
                setSateDetails(prev=>{
                    return[
                        ...prev,
                        {
                            quantity:vale?.quantity,
                            idProductDetail: vale?.idProduct
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

        if(formData.address2==''){
            alert('Không bỏ trống địa chỉ chi tiết')
            return false
        }
        order.refetch().then((res)=>{

            Storage.delete('cart')
            home.push("/", )
            toast.success("Đặt hàng thành công")
        })
        deleteCart.refetch()
      
    }

    return (
        <div>
            <section className="container" style={{maxWidth: '70%'}}>
                <div >
                    <div >
                        <div >
                            <div >
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
                                    {/*<div className="col-md-12">*/}
                                    {/*    <Text>Địa chỉ <Text style={{color:"red"}}>*</Text></Text>*/}
                                    {/*    <TextField*/}
                                    {/*        onChange={(item) => {*/}
                                    {/*            setFormData(prev=>({*/}
                                    {/*                ...prev,*/}
                                    {/*                address1: item?.target?.value*/}
                                    {/*            }))*/}
                                    {/*        }*/}
                                    {/*        }*/}
                                    {/*        fullWidth*/}
                                    {/*        className="my-2"*/}
                                    {/*        type="text"*/}
                                    {/*        id="address"*/}
                                    {/*        name="address"*/}
                                    {/*    />*/}
                                    {/*    {*/}
                                    {/*        formData?.address1===''? <Text style={{color:"red"}}>Không bỏ trống địa chỉ</Text>:<></>*/}
                                    {/*    }*/}
                                    {/*</div>*/}
                                    <FormControl  style={{width: 200, marginLeft:12, marginTop:20}}>
                                        {/*<InputLabel id="demo-simple-select-label">Thành phố</InputLabel>*/}
                                        <Text >Tỉnh/Thành phố</Text>

                                        <div style={{height:20}}>
                                           <Text >{detailsAddresses?.thanhpho}</Text>
                                       </div>
                                        <Select
                                            style={{height:8}}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={'ád'}
                                            label={detailsAddresses?.thanhpho}

                                            onChange={(event) => {
                                                setAddressQuan(event.target.value?.districts)
                                                setDetailsAddresses(prev => ({
                                                    ...prev,
                                                    thanhpho: event.target.value.name,
                                                }))

                                            }}

                                        >
                                            {
                                                addressCity?.map((item, index) => {
                                                    return (
                                                        <MenuItem value={item}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }

                                        </Select>
                                        {
                                            detailsAddresses?.thanhpho==''? <Text style={{color:"red", marginTop:5}}>Không bỏ trống Tỉnh thành</Text>:<></>
                                        }
                                    </FormControl>
                                    <FormControl style={{width: 200 , marginTop:20}}>
                                        <Text >Quận/huyện</Text>

                                        <div style={{height:20}}>
                                            <Text >{detailsAddresses?.quan}</Text>
                                        </div>
                                        <Select
                                            style={{height:8}}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={detailsAddresses.quan}
                                            label={'filterProduct.labelColor'}
                                            defaultValue={'filterProduct.labelColor'}
                                            onChange={(event) => {
                                                console.log('event',event.target.value)
                                                setAddressPhuong(event.target.value.wards)
                                                setDetailsAddresses(prev => ({
                                                    ...prev,
                                                    quan: event.target.value.name,
                                                }))

                                            }}

                                        >
                                            {
                                                addressQuan?.map((item, index) => {
                                                    return (
                                                        <MenuItem value={item}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }

                                        </Select>
                                        {
                                            detailsAddresses?.quan==''? <Text style={{color:"red", marginTop:5}}>Không bỏ trống Quận/Huyện</Text>:<></>
                                        }
                                    </FormControl>
                                    <FormControl style={{width: 200, marginTop:20}}>
                                        <div style={{height:20}}>
                                            <Text >Phường/Xã</Text>
                                        </div>
                                        <div style={{height:20}}>
                                            <Text >{detailsAddresses?.phuong}</Text>
                                        </div>
                                        <Select
                                            style={{height:8}}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={detailsAddresses.phuong}
                                            label={detailsAddresses.phuong}
                                            defaultValue={detailsAddresses.phuong}
                                            onChange={(event) => {
                                                setDetailsAddresses(prev => ({
                                                    ...prev,
                                                    phuong: event.target.value.name,
                                                }))

                                            }}

                                        >
                                            {
                                                addressPhuong?.map((item, index) => {
                                                    return (
                                                        <MenuItem value={item}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }

                                        </Select>
                                        {
                                            detailsAddresses?.phuong==''? <Text style={{color:"red", marginTop:5}}>Không bỏ trống Phường/Xã</Text>:<></>
                                        }
                                    </FormControl>
                                    <div className="col-md-12" style={{marginTop:20}}>
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
                                                <span className="middle" style={{marginLeft:50, width:100}}>Số lượng</span>
                                                <span className="middle" style={{marginLeft:50, width:100}}>Màu sắc</span>
                                                <span className="middle" style={{marginLeft:50, width:100}}>Size</span>
                                                <span  className="last">Giá</span>
                                            </Link>
                                        </li>

                                        {item.map((value, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link>{value.productName}
                                                        <span className="middle" style={{marginLeft:50, width:100}}>x {value.quantity}</span>
                                                        <span className="middle" style={{marginLeft:50, width:100}}>{userInfo?value?.colorName:value.color}</span>
                                                        <span className="middle" style={{marginLeft:50, width:100}}>{userInfo?value?.sizeName:value.size}</span>
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