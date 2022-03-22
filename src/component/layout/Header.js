import {BrowserRouter, Switch, Route, Link, useHistory} from "react-router-dom";
import {useAuth} from "../../context";
import {Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import * as PropTypes from "prop-types";
import {useEffect, useState} from "react";
import Storage from "../../utils/Storage";
import {useGetDetailProduct, useGetProducts} from "../../service/product";

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
        console.log('1232',value)
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
            </Menu>
        </div>
    )
}

export default Header;