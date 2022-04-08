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
    useGetProducts, useUpdateInfor
} from "../../service/product";
import {Modal} from "@mui/material";
import Text from "antd/es/typography/Text";
import DanhMuc from "./DanhMuc";

function Logout(props) {
    return null;
}

Logout.propTypes = {fontSize: PropTypes.string};

function HeaderAdmin() {
    const {userInfo, setUserInfo} = useAuth()
    const [input, setInput] = useState('')
    const history = useHistory()
    const navigateOrder = useHistory()
    const navigateDiscount = useHistory()
    const [option, setOption] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [idProduct, setIdProduct] = useState()
    const [openCNTT, setOpenCNTT] = useState(false)
    const [openChangePass, setOpenChangePass] = useState(false)
    const [statusConfirm, setStatusConfirm] = useState()
    const categoryNav = useGetParentCate({})
    const [openModal, setOpenModal] = useState(false)
    const [textInfo, setTextInfo] = useState({
        name: "",
        phone: "",
        email: "",
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
        updateInfo.refetch()
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
    }
    const toDiscount = () => {
        navigateDiscount.push(`/discount`)
    }
    const toOrder = () => {
        if (userInfo === null) {
            alert('Vui lòng đăng nhập')
        } else {
            navigateOrder.push(`/order`)
        }
    }

    const onChangeInput = (value) => {
        setInput(value.target.value)
        if (value.target.value === '') {
            setOption([])
        } else {
            setOption(getAllProduct?.data?.filter(item => {
                return (item?.name?.includes(value.target.value))
            }))
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
                <input onChange={(value) => onChangeInput(value)} type="text" className="form-control"
                       placeholder="Search"/>
                <div>
                    <ul className="list-group">

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
        <nav style={{marginLeft: 250, marginBottom: 200}}
             className="navbar fixed-top navbar-light bg-light shadow justify-content-end">
            <div className="header-right py-2">
                                                <span onClick={handleClick}
                                                      className="flaticon-user">  {userInfo?.fullname}</span>
            </div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                style={{
                    marginTop: 30
                }}
            >
                {/*{*/}
                {/*    userInfo?.roles?.includes('Admin') &&*/}
                {/*    <MenuItem onClick={() => setOpenModal(true)}>*/}
                {/*        Cập nhật thông tin*/}
                {/*    </MenuItem>*/}
                {/*}*/}
                <MenuItem onClick={() => {
                    Storage.delete('userData')
                    setUserInfo(null)
                }}>
                    Đăng xuất
                </MenuItem>
            </Menu>
        </nav>
    )
}

export default HeaderAdmin;