import {useAuth} from "../../context";
import {Menu, MenuItem} from "@material-ui/core";
import React, {useState} from "react";
import Storage from "../../utils/Storage";
import {useConfirm} from "material-ui-confirm";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";

function HeaderAdmin() {
    const {userInfo, setUserInfo} = useAuth()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
    const confirm = useConfirm();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav style={{marginLeft: 250, marginBottom: 200}}
             className="navbar fixed-top navbar-light bg-light shadow justify-content-end">
            <div className="header-right py-2">
                                                <span onClick={handleClick}
                                                      className="flaticon-user"
                                                      style={{cursor: 'pointer'}}>  {userInfo?.fullname}</span>
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
                <MenuItem onClick={() => {
                    confirm({
                        description: "Bạn có muốn đăng xuất?",
                        title: 'Xác nhận'
                    }).then(() => {
                        history.push("/login")
                        Storage.delete('userData')
                        Storage.delete('cart')
                        setUserInfo(null)
                        toast.success('Đăng xuất thành công')
                    })
                }}>
                    Đăng xuất
                </MenuItem>
            </Menu>
        </nav>
    )
}

export default HeaderAdmin;