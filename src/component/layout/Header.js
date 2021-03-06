import { Link, useHistory} from "react-router-dom";
import {useAuth} from "../../context";
import { Button,  Menu, MenuItem, TextField} from "@material-ui/core";
import * as PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import Storage from "../../utils/Storage";
import {
    useChangePass,
    useConfirmPass,
    useGetDetailProduct,
    useGetParentCate,
    useGetProducts,
    useUpdateInfor
} from "../../service/product";
import {Drawer, Modal} from "@mui/material";
import Text from "antd/es/typography/Text";
import DanhMuc from "./DanhMuc";
import Select, {components, DropdownIndicatorProps} from "react-select";
import './style.css'
import {useConfirm} from "material-ui-confirm";
import {toast} from "react-toastify";

function Logout(props) {
    return null;
}

Logout.propTypes = {fontSize: PropTypes.string};

function Header() {
    const confirm = useConfirm();
    const [openDrawer, setOpen] = useState()
    const {userInfo, setUserInfo} = useAuth()
    const history = useHistory()
    const login = useHistory()
    const navigateOrder = useHistory()
    const navigateDiscount = useHistory()
    const [anchorEl, setAnchorEl] = useState(null);
    const [idProduct, setIdProduct] = useState()
    const [openCNTT, setOpenCNTT] = useState(false)
    const [openChangePass, setOpenChangePass] = useState(false)
    const [statusConfirm, setStatusConfirm] = useState()
    const categoryNav = useGetParentCate({})
    const [openModal,setOpenModal] = useState(false)
    const [textInfo,setTextInfo] = useState({
        name: userInfo?.fullname,
        phone:userInfo?.username,
        email:userInfo?.email,
    })
    const [password, setPassword] = useState({
        oldPass: '',
        newPass1: '',
        newPass2: '',
    })
    const updateInfo = useUpdateInfor({
        id: userInfo?.id,
        phoneNumber: textInfo?.phone,
        fullName: textInfo?.name,
        email: textInfo?.email,
        photo: "123wwwd"
    })


    const updateInforUser = () => {
        updateInfo.refetch().then(
            (res)=>{
                setUserInfo(res?.data)
                toast.success('C???p nh???t th??nh c??ng!')
                setOpenCNTT(false)
            }
        )
    }
    const onChangeOldPass = (value) => {
        setPassword((prev) => ({
            ...prev,
            oldPass: value.target.value
        }))
    }
    const onChangeNewPass1 = (value) => {
        setPassword((prev) => ({
            ...prev,
            newPass1: value.target.value
        }))
    }
    const onChangeNewPass2 = (value) => {
        setPassword((prev) => ({
            ...prev,
            newPass2: value.target.value
        }))
    }
    //call api confirm pass
    const confirmPass = useConfirmPass({
        id: userInfo?.id,
        password: password?.oldPass
    })
    const changePass = useChangePass({
        id: userInfo?.id,
        password: password?.newPass2
    })

    const handlerChangePass = () => {
        confirmPass.refetch()
    }

    const handleChangeTextInfo = (value) => {

    }


    useEffect(() => {
        if (confirmPass?.data) {
            setStatusConfirm(confirmPass?.data)
            // changePass.refetch()
            confirmPass.remove()
        } else {
            setStatusConfirm(confirmPass?.data)
        }


    }, [confirmPass?.data])

    useEffect(() => {
        if (statusConfirm) {
            changePass.refetch()
            alert('true')
        }
    }, [statusConfirm])

    useEffect(() => {
        categoryNav.refetch()
    }, [])

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
        setOpen(false)
    }
    const toDiscount = () => {
        navigateDiscount.push(`/discount`)
    }
    const toOrder = () => {
        if (userInfo === null) {
            toast.warn("Vui l??ng ????ng nh???p")
        } else {
            navigateOrder.push(`/order`)
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

    const DropdownIndicator = (
        props: DropdownIndicatorProps<[], false>
    ) => {
        return (
            <components.DropdownIndicator {...props}>
                <span className="flaticon-search"></span>
            </components.DropdownIndicator>
        );
    };

    const search = () => {
        return (<div>
                <span onClick={() => setOpen(true)}
                      className="flaticon-search"></span>
            <Drawer
                anchor={'right'}
                open={openDrawer}
                onClose={() => setOpen(false)}
            >
                <div style={{width: 400, padding: 20}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}>
                        <h3>T??m ki???m</h3>
                        <buttom style={{fontSize: 25}} onClick={() => setOpen(false)}>X</buttom>
                    </div>
                    <Select
                        onChange={(data) => onChangeHander(data)}
                        value={{
                            value: null,
                            label: 'T??m ki???m s???n ph???m...'
                        }}
                        components={{DropdownIndicator}}
                        options={getAllProduct?.data?.map(item => {
                            item.value = item.id
                            item.label = item.name
                            return item
                        })}
                    />
                </div>
            </Drawer>
        </div>)
    }

    return (
        <div className="header-area">
            <div style={{padding: 0}} className="main-header">
                <div style={{
                    backgroundColor: '#000',
                    color: 'white',
                    justifyContent: 'center',
                }} className="menu-wrapper">
                    <div className="main-menu d-none d-lg-block">
                        <nav>
                            <ul style={{
                                marginBottom: 0,
                            }} id="navigation">
                                <li><Link to="/">Trang ch???</Link></li>
                                <li><Link to="/shop">Shop</Link></li>
                                <li onClick={toOrder}><Link>????n h??ng c???a b???n</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="main-header header-sticky z-depth-1-half">
                <div style={{padding: '10px 0'}} className="container-fluid">
                    <div className="menu-wrapper">
                        <div className="logo" style={{flex: 1}}>
                            <Link to="/">
                                <img width="200px" height={'80px'} style={{objectFit: 'cover'}} src="https://firebasestorage.googleapis.com/v0/b/anshin-b910b.appspot.com/o/images%2F1-removebg-preview.png?alt=media&token=5b68e872-12d6-4096-a655-4f3fe40fd9ca"/>
                            </Link>
                        </div>
                        <div className="main-menu d-none d-lg-block" style={{flex: 2}}>
                            <nav>
                                <ul style={{
                                    marginBottom: 0,
                                }} id="navigation">
                                    <DanhMuc data={categoryNav?.data}/>
                                </ul>
                            </nav>
                        </div>
                        <div className="header-right" style={{flex: 1}}>
                            <ul style={{
                                marginBottom: 0,
                                float: 'right'
                            }}>
                                <li>{search()}</li>
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
                        Trang qu???n l??
                    </MenuItem>
                }
                {
                    userInfo?.roles?.includes('Admin') &&
                    <MenuItem onClick={() => setOpenModal(true)}>
                        C???p nh???t th??ng tin
                    </MenuItem>
                }
                <MenuItem onClick={() => {
                    confirm({
                        description: "B???n c?? mu???n ????ng xu???t?",
                        title: 'X??c nh???n'
                    }).then(() => {
                        login.push("/login")
                        Storage.delete('userData')
                        Storage.delete('cart')
                        setUserInfo(null)
                        toast.success('????ng xu???t th??nh c??ng')
                    })
                }}>
                    ????ng xu???t

                </MenuItem>
            </Menu>
            <Modal
                keepMounted
                open={openModal} onClose={() => {
                setOpenModal(false)
            }} className="px-5 pt-4">
                <form style={{
                    backgroundColor: 'white',
                    marginLeft: 300,
                    marginRight:300,
                }} className="border rounded p-4 shadow" autoComplete="off">
                    <div>
                        <p>H??? v?? t??n: {userInfo?.fullname}</p>
                        <p>S??? ??i???n tho???i: {userInfo?.username}</p>
                        <p>Email: {userInfo?.email}</p>
                        <div>
                            <Button className="mr-2 w-100 mb-1" onClick={() => setOpenChangePass(true)}
                                    variant="outlined">
                                ?????i m???t kh???u
                            </Button>
                            <Button className="mr-2 w-100 mb-1" onClick={() => setOpenCNTT(true)} variant="outlined">
                                C???p nh???t th??ng tin
                            </Button>
                            <Button className={'w-100'} onClick={() => setOpenModal(false)} variant="outlined"
                                    color="inherit">
                                Hu???
                            </Button>
                        </div>
                    </div>

                </form>
            </Modal>
            <Modal
                keepMounted
                open={openCNTT} onClose={() => {
                setOpenCNTT(false)
            }} className="px-5 pt-4">
                <form style={{
                    backgroundColor: 'white',
                    marginLeft: 400,
                    marginRight:400,
                }} className="border rounded p-4 shadow" autoComplete="off">
                    <div>
                        <div>
                            <TextField
                                onChange={(value) => handleChangeTextInfo(setTextInfo((prev) => ({
                                    ...prev,
                                    name: value.target.value
                                })))}
                                value={textInfo?.fullname}
                                name="name"
                                fullWidth
                                label="T??n kh??ch h??ng"
                                className="my-2 mb-4"
                            />
                            <TextField
                                name="name"
                                value={textInfo?.phone}
                                onChange={(value)=>handleChangeTextInfo(setTextInfo((prev)=>({
                                    ...prev,
                                    phone: value.target.value
                                })))}
                                fullWidth
                                label="S??? ??i???n tho???i"
                                className="my-2 mb-4"
                            />
                            <TextField
                                name="name"
                                value={textInfo?.email}
                                onChange={(value)=>handleChangeTextInfo(setTextInfo((prev)=>({
                                    ...prev,
                                    email: value.target.value
                                })))}
                                fullWidth
                                label="Email"
                                className="my-2 mb-4"
                            />
                        </div>
                        <div>

                            <Button className="mr-2 w-100 mb-1" onClick={updateInforUser} variant="outlined">
                                X??c nh???n
                            </Button>
                            <Button className={'w-100'} onClick={() => setOpenCNTT(false)} variant="outlined"
                                    color="inherit">
                                Hu???
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
            <Modal
                keepMounted
                open={openChangePass} onClose={() => {
                setOpenChangePass(false)
            }} className="px-5 pt-4">
                <form style={{
                    backgroundColor: 'white',
                    marginLeft: 500,
                    marginRight: 500,
                }} className="border rounded p-4 shadow" autoComplete="off">
                    <div>
                        <div>
                            <TextField
                                name="name"
                                onChange={onChangeOldPass}
                                fullWidth
                                type={'password'}
                                label="M???t kh???u c??"
                                className="my-2 mb-4"
                            />
                            {
                                statusConfirm === false ?
                                    <Text style={{color: 'red'}}>M??t kh???u c?? kh??ng ????ng</Text> : <></>
                            }
                            <TextField
                                name="name"
                                onChange={onChangeNewPass1}
                                fullWidth
                                type={'password'}
                                label="M???t kh???u m???i"
                                className="my-2 mb-4"
                            />
                            <TextField
                                name="name"
                                onChange={onChangeNewPass2}
                                type={'password'}
                                fullWidth
                                label="Nh???p l???i m???t kh???u m???i"
                                className="my-2 mb-4"
                            />

                        </div>
                        <div>
                            <Button className="mr-2 w-100 mb-1" onClick={handlerChangePass} variant="outlined">
                                X??c nh???n
                            </Button>
                            <Button className={'w-100'} onClick={() => setOpenChangePass(false)} variant="outlined"
                                    color="inherit">
                                Hu???
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default Header;