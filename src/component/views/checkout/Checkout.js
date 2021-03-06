import {Button, FormControl, MenuItem, Select, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useAuth} from "../../../context";
import * as productService from "../../../service/product";
import {useDeleteProductAllCart, useGetInforUser, useOrder} from "../../../service/product";
import Storage from "../../../utils/Storage";
import Text from "antd/es/typography/Text";
import {toast} from "react-toastify";


const Checkout = () => {
    const {userInfo, setUserInfo} = useAuth()
    const [stateDetails, setSateDetails] = useState([])
    const location = useLocation()
    const {state} = location
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
    const [check, setCheck] = useState({
        name: true,
        phone: true,
        city: true,
        quan: true,
        xa: true,
        detail: true
    })
    const [detailsAddresses, setDetailsAddresses] = useState({
        thanhpho: '',
        phuong: '',
        quan: ''
    })
    const [formData, setFormData] = useState({
        fullname: userInfo ? userInfo?.fullname : '',
        address1: '',
        address2: '',
        phone: userInfo ? userInfo?.username : '',
    });

    const order = useOrder({
        idAcount: userInfo ? userInfo?.id : 5,
        fullName: formData?.fullname,
        address: detailsAddresses?.thanhpho + ', ' + detailsAddresses?.quan + ', ' + detailsAddresses?.phuong,
        detailAddress: formData?.address2,
        phoneNumber: formData?.phone,
        listOrderProductDetailDTO: stateDetails
    })

    useEffect(() => {
        if (userInfo) {
            setFormData({
                fullname: userInfo?.fullname,
                address1: '',
                address2: '',
                phone: userInfo.username,
            })
        }
    }, [userInfo])

    useEffect(() => {
        try {
            console.log(state.item)
        } catch (e) {
            home.push('/')
        }
    }, [state?.item])

    useEffect(() => {
        if (userInfo) {
            getInfoUser.refetch()
        }
    }, [])
    useEffect(() => {
        productService.findCity().then((res) => {
            if (res?.data) {
                setAddressCity(res?.data)
            }
        })
    }, [])
    useEffect(() => {
        if (state?.item) {
            state?.item?.map((vale) => {
                setSateDetails(prev => {
                    return [
                        ...prev,
                        {
                            quantity: vale?.quantity,
                            idProductDetail: vale?.idProduct
                        }
                    ]
                })
            })
        }
    }, [])

    console.log(state)
    // let total = state?.item?.reduce((total, item) => {
    //     return total += Number(item.quantity) * Number(item.price);
    // }, 0)
    const onSubmitHandler = (quantity, productId) => {
        if (!formData.fullname) {
            setCheck(prevState => ({
                ...prevState,
                name: false
            }))
        }
        if (!formData.phone) {
            setCheck(prevState => ({
                ...prevState,
                phone: false
            }))
        }
        if (formData.phone.length < 10 || formData.phone.length > 11) {
            setCheck(prevState => ({
                ...prevState,
                phone: false
            }))
        }
        if (!formData.address2) {
            setCheck(prevState => ({
                ...prevState,
                detail: false
            }))
        }
        if (!detailsAddresses?.thanhpho) {
            setCheck(prevState => ({
                ...prevState,
                city: false
            }))
        }
        if (!detailsAddresses?.phuong) {
            setCheck(prevState => ({
                ...prevState,
                xa: false
            }))
        }
        if (!detailsAddresses?.quan) {
            setCheck(prevState => ({
                ...prevState,
                quan: false
            }))
        }
        if (!formData.fullname) {
            toast.warn('Kh??ng b??? tr???ng t??n')
            return false
        }
        if (!formData.phone) {
            toast.warn('Kh??ng b??? tr???ng s??? ??i???n tho???i')
            return false
        }
        if (formData.phone.length < 10 || formData.phone.length > 11) {
            toast.warn('S??? ??i???n tho???i kh??ng h???p l???')
            return false
        }
        if (!detailsAddresses?.thanhpho) {
            toast.warn('Kh??ng b??? tr???ng Th??nh ph???')
            return false
        }
        if (!detailsAddresses?.phuong) {
            toast.warn('Kh??ng b??? tr???ng Ph?????ng/X??')
            return false
        }
        if (!detailsAddresses?.quan) {
            toast.warn('Kh??ng b??? tr???ng Qu???n/Huy???n')
            return false
        }
        if (!formData.address2) {
            toast.warn('Kh??ng b??? tr???ng ?????a ch??? chi ti???t')
            return false
        }
        order.refetch().then((res) => {
            !state?.item?.[0]?.isKeep && Storage.delete('cart')
            home.push("/",)
            toast.success("?????t h??ng th??nh c??ng")
        })
        !state?.item?.[0]?.isKeep && deleteCart.refetch()
    }

    return (
        <div style={{backgroundColor: '#efefef', paddingTop: '30px', paddingBottom: '100px'}}>
            <section className="container"
                     style={{maxWidth: '80%', padding: '30px 30px', backgroundColor: 'white', borderRadius: 10}}>
                <h2 style={{textAlign: "center"}} className={'py-2'}>Chi ti???t ????n h??ng</h2>
                <div className={'d-flex pt-4'} style={{borderTop: '1px solid black',}}>
                    <div className={'mr-3'} style={{flex: 4.5}}>
                        <form className="row contact_form order_box" style={{backgroundColor: 'white'}}>
                            <h2>?????a ch??? nh???n h??ng</h2>
                            <div className={'d-flex'}>
                                <div style={{flex: 1}} className="mr-2">
                                    <Text>H??? v?? t??n <Text style={{color: "red"}}>*</Text></Text>
                                    <TextField
                                        onChange={(item) => {
                                            console.log(item?.target?.value,item?.target?.value !== '')
                                            setCheck(prevState => ({
                                                ...prevState,
                                                name: item?.target?.value !== ''
                                            }))
                                            setFormData(prev => ({
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
                                        !check.name && formData?.fullname == '' ?
                                            <Text style={{color: "red"}}>Kh??ng b??? tr???ng t??n</Text> : <></>
                                    }
                                </div>
                                <div style={{flex: 1}} className="ml-2">
                                    <Text>S??? ??i???n tho???i <Text style={{color: "red"}}>*</Text></Text>
                                    <TextField
                                        onChange={(item) => {
                                            setCheck(prevState => ({
                                                ...prevState,
                                                phone: !(item?.target?.value < 10 || item?.target?.value > 11)
                                            }))
                                            setFormData(prev => ({
                                                ...prev,
                                                phone: item?.target?.value?.replace(/\D/g, '')
                                            }))
                                        }
                                        }
                                        value={formData?.phone ? formData?.phone?.replace(/\D/g, '') : ''}
                                        fullWidth
                                        className="my-2"
                                        type="text"
                                        id="phone"
                                        name="phone"
                                    />

                                    {
                                        !check.phone && (formData?.phone?.length < 10 || formData?.phone?.length > 11) &&
                                        <Text style={{color: "red"}}>S??? ??i???n tho???i kh??ng h???p l???</Text>
                                    }
                                </div>
                            </div>
                            <div className={'d-flex'}>
                                <FormControl className="mr-2" style={{flex: 1, marginTop: 20}}>
                                    <Text>T???nh/Th??nh ph??? <Text style={{color: "red"}}>*</Text></Text>
                                    <div style={{height: 20}}>
                                        <Text>{detailsAddresses?.thanhpho}</Text>
                                    </div>
                                    <Select
                                        style={{height: 8}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={'??d'}
                                        label={detailsAddresses?.thanhpho}
                                        onChange={(event) => {
                                            setCheck(prevState => ({
                                                ...prevState,
                                                city: false
                                            }))
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
                                        !check.city && detailsAddresses?.thanhpho == '' ?
                                            <Text style={{color: "red", marginTop: 5}}>Kh??ng b??? tr???ng T???nh
                                                th??nh</Text> : <></>
                                    }
                                </FormControl>
                                <FormControl className="ml-2" style={{flex: 1, marginTop: 20}}>
                                    <Text>Qu???n/huy???n <Text style={{color: "red"}}>*</Text></Text>
                                    <div style={{height: 20}}>
                                        <Text>{detailsAddresses?.quan}</Text>
                                    </div>
                                    <Select
                                        style={{height: 8}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={detailsAddresses.quan}
                                        label={'filterProduct.labelColor'}
                                        defaultValue={'filterProduct.labelColor'}
                                        onChange={(event) => {
                                            setCheck(prevState => ({
                                                ...prevState,
                                                quan: false
                                            }))
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
                                        !check.quan && detailsAddresses?.quan == '' ?
                                            <Text style={{color: "red", marginTop: 5}}>Kh??ng b??? tr???ng
                                                Qu???n/Huy???n</Text> : <></>
                                    }
                                </FormControl>
                            </div>
                            <div className={'d-flex'}>
                                <FormControl style={{flex: 1, marginTop: 20}}>
                                    <div style={{height: 20}}>
                                        <Text>Ph?????ng/X?? <Text style={{color: "red"}}>*</Text></Text>
                                    </div>
                                    <div style={{height: 20}}>
                                        <Text>{detailsAddresses?.phuong}</Text>
                                    </div>
                                    <Select
                                        style={{height: 8}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={detailsAddresses.phuong}
                                        label={detailsAddresses.phuong}
                                        defaultValue={detailsAddresses.phuong}
                                        onChange={(event) => {
                                            setCheck(prevState => ({
                                                ...prevState,
                                                phone: false
                                            }))
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
                                        !check.xa && detailsAddresses?.phuong == '' ?
                                            <Text style={{color: "red", marginTop: 5}}>Kh??ng b??? tr???ng
                                                Ph?????ng/X??</Text> : <></>
                                    }
                                </FormControl>
                            </div>
                            <div className="col-md-12" style={{marginTop: 20}}>
                                <Text>?????a chi ti???t <Text style={{color: "red"}}>*</Text></Text>
                                <TextField
                                    onChange={(item) => {
                                        setCheck(prevState => ({
                                            ...prevState,
                                            detail: item?.target?.value !== ''
                                        }))
                                        setFormData(prev => ({
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
                                    !check.detail && formData?.address2 === '' ?
                                        <Text style={{color: "red"}}>Kh??ng b??? tr???ng ?????a ch??? chi
                                            ti???t</Text> : <></>
                                }
                            </div>
                        </form>
                    </div>
                    <div className={'ml-3'} style={{flex: 5.5}}>
                        <div className="order_box">
                            <h2>????n h??ng c???a b???n</h2>
                            <table style={{width: '100%'}}>
                                <thead>
                                <tr style={{fontFamily: "Josefin Sans"}}>
                                    <td className="middle"
                                        style={{width: '40%', flex: 1}}>S???n ph???m
                                    </td>
                                    <td className="middle"
                                        style={{
                                            width: 100,
                                            textAlign: 'center'
                                        }}>S??? l?????ng
                                    </td>
                                    <td className="middle"
                                        style={{
                                            width: 200,
                                            textAlign: 'center'
                                        }}>M??u s???c
                                    </td>
                                    <td className="middle"
                                        style={{
                                            width: 100,
                                            textAlign: 'center'
                                        }}>Size
                                    </td>
                                    <td style={{
                                        width: 100,
                                        textAlign: 'right'
                                    }}>Gi??
                                    </td>
                                </tr>
                                </thead>
                                <tbody style={{fontFamily: "Josefin Sans"}}>
                                {state?.item?.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="middle" style={{
                                                width: 100,
                                                paddingRight: 10,
                                            }}>{value?.productName ? value.productName : value.name}</td>
                                            <td className="middle" style={{
                                                marginLeft: 50,
                                                width: 100,
                                                textAlign: 'center'
                                            }}>x {value.quantity}</td>
                                            <td className="middle" style={{
                                                marginLeft: 50,
                                                width: 200,
                                                textAlign: 'center'
                                            }}>{userInfo ? value?.colorName : value.color}</td>
                                            <td className="middle" style={{
                                                marginLeft: 50,
                                                width: 100,
                                                textAlign: 'center'
                                            }}>{userInfo ? value?.sizeName : value.size}</td>
                                            <td className="last"
                                                style={{
                                                    width: 100,
                                                    textAlign: 'right'
                                                }}>{value.price}??
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            <ul className="list list_2 mb-5">
                                <li>
                                    <Link href="#">T???ng
                                        {/*<span>{total}??</span>*/}
                                    </Link>
                                </li>
                            </ul>
                            <Button variant="contained" color="primary" className="mt-2 w-100"
                                    onClick={onSubmitHandler}>?????t h??ng</Button>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Checkout;