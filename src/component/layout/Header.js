import {BrowserRouter, Switch, Route, Link, useHistory} from "react-router-dom";
import {useAuth} from "../../context";
import {Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import * as PropTypes from "prop-types";
import {useState} from "react";
import Storage from "../../utils/Storage";

function Logout(props) {
    return null;
}

Logout.propTypes = {fontSize: PropTypes.string};

function Header() {
    const {userInfo, setUserInfo} = useAuth()

    const history = useHistory()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(userInfo)

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
                                    <li><Link to="/order">My Order</Link></li>
                                </ul>
                            </nav>
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