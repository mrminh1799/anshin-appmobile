import React, {useState} from 'react';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import {Link, useHistory} from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {ExpandLess} from '@material-ui/icons';
import {Collapse, ListItemButton} from "@mui/material";
import '../../style/style.css'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 250,
        color: "white",
        scrollbarWidth: "none"
    },
    name: {
        color: "white",
        textAlign: "center",
        margin: 25,
    },
    bg: {
        height: "100%",
        background: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(32,32,32,1) 100%)"
    },
    bgList: {
        paddingTop: 7,
        background: 'radial-gradient(circle, rgba(14,14,14,1) 0%, rgba(43,40,41,1) 100%)'
    }, reverse: {
        flexDirection: "row-reverse"
    }
}));

function SideBar() {

    const history = useHistory()

    const classes = useStyles();

    const [open, setOpen] = useState(true);

    const [openCate, setOpenCate] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <div className="position-fixed h-100 hidescroll" style={{overflowY: "scroll", marginTop: -50}}>
                <div className={classes.bg}>
                    <List style={{width: '250px'}} component="nav" className="h-100" aria-label="main mailbox folders">
                        <div className="border border-light" style={{margin: 30}}>
                            <h1 onClick={()=>history.push('/')} className={"text-center m-4 text-white"}>SHOP</h1>
                        </div>
                        <div className={classes.bgList}>
                            <ListItem onClick={() => history.push('/admin/dashboard')} button className="pl-3">
                                <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                    <AllInboxIcon style={{color: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Tổng quan"/>
                            </ListItem>
                            <ListItem onClick={() => history.push('/admin/createOrder')} button className="pl-3">
                                <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                    <AllInboxIcon style={{color: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Bán hàng"/>
                            </ListItem>
                            <ListItem button className="pl-3" onClick={handleClick}>
                                <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                    <CategoryOutlinedIcon style={{color: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Đơn hàng"/>
                                {open ? <ExpandLess/> : <ExpandMoreIcon/>}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton onClick={() => history.push('/admin/orders/1')} sx={{pl: 9}}>
                                        <ListItemText primary="Chờ xử lý"/>
                                    </ListItemButton>
                                </List>
                                <List component="div" disablePadding>
                                    <ListItemButton onClick={() => history.push('/admin/orders/2')} sx={{pl: 9}}>
                                        <ListItemText primary="Đã xử lý"/>
                                    </ListItemButton>
                                </List>
                                <List component="div" disablePadding>
                                    <ListItemButton onClick={() => history.push('/admin/orders/3')} sx={{pl: 9}}>
                                        <ListItemText primary="Hoàn thành"/>
                                    </ListItemButton>
                                </List>
                                <List component="div" disablePadding>
                                    <ListItemButton onClick={() => history.push('/admin/orders/6')} sx={{pl: 9}}>
                                        <ListItemText primary="Đã đổi trả"/>
                                    </ListItemButton>
                                </List>
                                <List component="div" disablePadding>
                                    <ListItemButton onClick={() => history.push('/admin/orders/0')} sx={{pl: 9}}>
                                        <ListItemText primary="Thất bại"/>
                                    </ListItemButton>
                                </List>
                            </Collapse>
                            <ListItem button className="pl-3" onClick={() => setOpenCate(!openCate)}>
                                <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                    <CategoryOutlinedIcon style={{color: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Danh mục"/>
                                {openCate ? <ExpandLess/> : <ExpandMoreIcon/>}
                            </ListItem>
                            <Collapse in={openCate} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton onClick={() => history.push('/admin/categories')} sx={{pl: 9}}>
                                        <ListItemText primary="Danh mục cha"/>
                                    </ListItemButton>
                                </List>
                                <List component="div" disablePadding>
                                    <ListItemButton onClick={() => history.push('/admin/childCategory')} sx={{pl: 9}}>
                                        <ListItemText primary="Danh mục con"/>
                                    </ListItemButton>
                                </List>
                            </Collapse>
                            <ListItem onClick={() => history.push('/admin/products')} button className="pl-3">
                                <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                    <AllInboxIcon style={{color: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Sản phẩm"/>
                            </ListItem>
                            <ListItem onClick={() => history.push('/admin/event')} button className="pl-3">
                                <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                    <AllInboxIcon style={{color: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Sự kiện"/>
                            </ListItem>
                            <ListItem onClick={() => history.push('/admin/users')} button className="pl-3">
                                <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                    <AllInboxIcon style={{color: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Tài khoản"/>
                            </ListItem>
                            <ListItem onClick={() => history.push('/admin/sizes')} button className="pl-3">
                                <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                    <AllInboxIcon style={{color: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Size"/>
                            </ListItem>
                            <ListItem onClick={() => history.push('/admin/colors')} button className="pl-3">
                                <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                    <AllInboxIcon style={{color: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Color"/>
                            </ListItem>
                        </div>
                    </List>
                </div>
            </div>
        </div>
    );
}

export default SideBar;