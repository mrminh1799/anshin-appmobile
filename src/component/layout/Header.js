import {BrowserRouter, Switch, Route, Link, useHistory} from "react-router-dom";
import {useAuth} from "../../context";
import {Avatar, Box, Button, IconButton, ListItemIcon, Menu, MenuItem, TextField, Tooltip} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import * as PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import Storage from "../../utils/Storage";
import {
    useChangePass,
    useConfirmPass,
    useGetDetailProduct, useGetInforUser,
    useGetParentCate,
    useGetProducts
} from "../../service/product";
import {Modal} from "@mui/material";
import Text from "antd/es/typography/Text";
import DanhMuc from "./DanhMuc";

function Logout(props) {
    return null;
}

Logout.propTypes = {fontSize: PropTypes.string};

function Header() {
    const {userInfo, setUserInfo} = useAuth()
    const [input,setInput] =useState('')
    const history = useHistory()
    const navigateOrder = useHistory()
    const navigateDiscount = useHistory()
    const [option, setOption] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [idProduct, setIdProduct] = useState()
    const [openCNTT,setOpenCNTT] = useState(false)
    const [openChangePass,setOpenChangePass] = useState(false)
    const [statusConfirm, setStatusConfirm] = useState()
    const categoryNav = useGetParentCate({})

    console.log('asas',userInfo)
    const [password, setPassword] = useState({
        oldPass:'',
        newPass1:'',
        newPass2:'',
    })
    const onChangeOldPass = (value)=>{
        setPassword((prev)=>({
            ...prev,
            oldPass:value.target.value
        }))
    }
    const onChangeNewPass1 = (value)=>{
        setPassword((prev)=>({
            ...prev,
            newPass1:value.target.value
        }))
    }
    const onChangeNewPass2 = (value)=>{
        setPassword((prev)=>({
            ...prev,
            newPass2:value.target.value
        }))
    }
    //call api confirm pass
    const confirmPass= useConfirmPass({
        id:userInfo?.id,
        password: password?.oldPass
    })
    const changePass= useChangePass({
        id:userInfo?.id,
        password: password?.newPass2
    })

    const handlerChangePass =()=>{
        console.log({
            id:userInfo?.id,
            password: password?.oldPass
        })
        confirmPass.refetch()
    }


    useEffect(() => {
            if(confirmPass?.data){
                setStatusConfirm(confirmPass?.data)
                // changePass.refetch()
                confirmPass.remove()
            }else {
                setStatusConfirm(confirmPass?.data)
            }


    },[confirmPass?.data])

    useEffect(() => {
        if(statusConfirm){
            console.log('vaoooo')
            changePass.refetch()
            alert('true')
        }
    },[statusConfirm])

    useEffect(() => {
        categoryNav.refetch()
    },[])

    let detail = useHistory();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const getAllProduct = useGetProducts()
    const detailProduct = useGetDetailProduct({
        id: idProduct
    })
    const onChangeHander = (value) => {
        setIdProduct(value?.id)
    }
    const toDiscount =()=>{
        navigateDiscount.push(`/discount`)
    }
    const toOrder =()=>{
        if(userInfo===null){
            alert('Vui lòng đăng nhập')
        }else {
            navigateOrder.push(`/order`)
        }
    }

    const onChangeInput = (value) => {
        setInput(value.target.value)
        if(value.target.value===''){
            setOption([])
        }else {
            setOption(getAllProduct?.data?.filter(item => {return (item?.name?.includes(value.target.value))}))
        }
    }

    useEffect(() => {
        if (idProduct) {
            detailProduct.refetch().then(res => {
                if (res) {
                    detail.push(`/detail/${idProduct}`, {
                        item: res?.data
                    })
                }
            })
        }
    }, [idProduct])
    const searchbarDropdown = () => {
        return (<div className={'search-bar-dropdown'}>
            <input onChange={(value) => onChangeInput(value)}  type="text" className="form-control"
                   placeholder="Search"/>
            <div >
            <ul className="list-group" >

                {
                    option?.map((item, index) => {
                        return (

                                <button key={index} onClick={() => onChangeHander(item)} type="button"
                                        className="list-group-item list-group-item-action active">
                                    {item?.name}
                                </button>

                        )
                    })
                }

            </ul>
            </div>
        </div>
            )
    };

    return (
        <div className="header-area">
            <div className="main-header header-sticky">
                <div className="container-fluid">
                    <div className="menu-wrapper">
                        <div className="logo">
                            <Link to="/">
                                <span style={{fontSize: 28, fontWeight: "bold", color: "black"}}>
                                    Anshin <span style={{color: "red"}}>Zone</span>
                                </span>
                            </Link>
                        </div>
                        <div className="main-menu d-none d-lg-block">
                            <nav>
                                <ul id="navigation">

                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/shop">Shop</Link></li>
                                    <li><Link to="/cart">Cart</Link></li>
                                    <li onClick={toOrder}><Link >My Order</Link></li>
                                    <li onClick={toDiscount}><Link>Discount</Link></li>
                                    <DanhMuc data={categoryNav?.data}/>

                                </ul>
                            </nav>
                            {searchbarDropdown()}
                        </div>
                        <div className="header-right">
                            <ul>
                                <li>
                                    {
                                        !userInfo ?
                                            <Link to="/login" style={{color: "white"}}><span className="flaticon-user"/></Link>
                                            :
                                            <div>
                                                <span onClick={handleClick}
                                                      className="flaticon-user">  {userInfo?.fullname}</span>
                                            </div>
                                    }
                                </li>
                                <li><Link to="/cart" style={{color: "white"}}><span
                                    className="flaticon-shopping-cart"></span></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mobile_menu d-block d-lg-none"></div>
                    </div>
                </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                style={{
                    marginTop: 40
                }}
            >
                {
                    userInfo?.roles?.includes('Admin') &&
                    <MenuItem onClick={() => {
                        history.push('/admin')
                    }}>
                        Manager
                    </MenuItem>
                }
                <MenuItem onClick={() => {
                    Storage.delete('userData')
                    setUserInfo(null)
                }}>
                    Logout
                </MenuItem>
                {
                    userInfo?.roles?.includes('Admin') &&
                    <MenuItem  onClick={()=>setOpenCNTT(true)}>
                       Cập nhật thông tin
                    </MenuItem>
                }
            </Menu>
            <Modal
                keepMounted
                open={openCNTT} onClose={()=>{setOpenCNTT(false)}} className="px-5 pt-4">
                <form style={{
                    backgroundColor: 'white',
                    marginLeft: 400,
                    marginRight: 400,
                }} className="border rounded p-4 shadow" autoComplete="off">
                    <div style={{
                        display: 'flex',
                    }}>
                        <div>
                            <TextField
                                name="name"
                                fullWidth
                                label="Tên khách hàng"
                                className="my-2 mb-4"
                            />
                            <TextField
                                name="name"
                                // value={formData.name}
                                fullWidth
                                label="Số điện thoại"
                                className="my-2 mb-4"
                            />
                            <TextField
                                name="name"
                                // value={formData.name}
                                fullWidth
                                label="Email"
                                className="my-2 mb-4"
                            />
                            <TextField
                                name="name"
                                // value={formData.name}
                                fullWidth
                                label="Địa chỉ"
                                className="my-2 mb-4"
                            />
                            <TextField
                                name="name"
                                // value={formData.name}
                                fullWidth
                                label="Địa chỉ chi tiết"
                                className="my-2 mb-4"
                            />
                        </div>
                        <div className={'ml-5'}>
                            <Button className="mr-2 w-100 mb-1"  onClick={()=>setOpenChangePass(true)} variant="outlined">
                                Đổi mật khẩu
                            </Button>
                            <Button className="mr-2 w-100 mb-1" type="submit" variant="outlined">
                                Xác nhận
                            </Button>
                            <Button className={'w-100'} onClick={()=>setOpenCNTT(false)} variant="outlined" color="inherit">
                                Huỷ
                            </Button>
                        </div>
                    </div>

                </form>
            </Modal>
            <Modal
                keepMounted
                open={openChangePass} onClose={()=>{setOpenChangePass(false)}} className="px-5 pt-4">
                <form style={{
                    backgroundColor: 'white',
                    marginLeft: 600,
                    marginRight:600,
                }} className="border rounded p-4 shadow" autoComplete="off">
                    <div style={{
                        display: 'flex',
                    }}>
                        <div>
                            <TextField
                                name="name"
                                onChange={onChangeOldPass}
                                fullWidth
                                type={'password'}
                                label="Mật khẩu cũ"
                                className="my-2 mb-4"
                            />
                            {
                                statusConfirm===false?  <Text style={{color:'red'}}>Mât khẩu cũ không đúng</Text>:<></>
                            }
                            <TextField
                                name="name"
                                onChange={onChangeNewPass1}
                                fullWidth
                                type={'password'}
                                label="Mật khẩu mới"
                                className="my-2 mb-4"
                            />
                            <TextField
                                name="name"
                               onChange={onChangeNewPass2}
                                type={'password'}
                                fullWidth
                                label="Nhập lại mật khẩu mới"
                                className="my-2 mb-4"
                            />

                        </div>
                        <div className={'ml-5'}>
                            <Button className="mr-2 w-100 mb-1" onClick={handlerChangePass} variant="outlined">
                                Xác nhận
                            </Button>
                            <Button className={'w-100'} onClick={()=>setOpenChangePass(false)} variant="outlined" color="inherit">
                                Huỷ
                            </Button>
                        </div>
                    </div>

                </form>
            </Modal>
        </div>
    )
}

export default Header;