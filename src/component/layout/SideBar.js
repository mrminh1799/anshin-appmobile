import React, {useEffect, useState} from 'react';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WatchOutlinedIcon from '@material-ui/icons/WatchOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import Product from "../products/Products"
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import TreeItem from "@material-ui/lab/TreeItem";
import {Category, ExpandLess, StarBorder} from '@material-ui/icons';
import callApi from '../callAPI/apiCaller';
import {Collapse, ListItemButton} from "@mui/material";


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
    const classes = useStyles();

    const [open, setOpen] = useState(true);

    const [openCate, setOpenCate] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}  style={{marginTop: -50}}>
            <div className="position-fixed h-100 hidescroll" style={{overflowY: "scroll"}}>
                <div className={classes.bg}>
                    <List style={{width: '250px'}} component="nav" className="h-100" aria-label="main mailbox folders">
                        <div className="border border-light" style={{margin: 30}}>
                            <h1 className={"text-center m-4 text-white"}><Link to="/">SHOP</Link></h1>
                        </div>
                        <div className={classes.bgList}>
                            <Link to="/admin/dashboard">
                                <ListItem button className="pl-3">
                                    <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                        <AllInboxIcon style={{color: 'white'}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Tổng quan"/>
                                </ListItem>
                            </Link>
                            <ListItem button className="pl-3" onClick={handleClick}>
                                <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                    <CategoryOutlinedIcon style={{color: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Đơn hàng"/>
                                {open ? <ExpandLess/> : <ExpandMoreIcon/>}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Link to="/admin/orders/1">
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{pl: 9}}>
                                            <ListItemText primary="Chờ xử lý"/>
                                        </ListItemButton>
                                    </List>
                                </Link>
                                <Link to="/admin/orders/2">
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{pl: 9}}>
                                            <ListItemText primary="Đã xử lý"/>
                                        </ListItemButton>
                                    </List>
                                </Link>
                                <Link to="/admin/orders/6">
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{pl: 9}}>
                                            <ListItemText primary="Đã đổi trả"/>
                                        </ListItemButton>
                                    </List>
                                </Link>
                                <Link to="/admin/orders/3">
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{pl: 9}}>
                                            <ListItemText primary="Hoàn thành"/>
                                        </ListItemButton>
                                    </List>
                                </Link>
                                <Link to="/admin/orders/0">
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{pl: 9}}>
                                            <ListItemText primary="Thất bại"/>
                                        </ListItemButton>
                                    </List>
                                </Link>
                            </Collapse>
                            <ListItem button className="pl-3" onClick={()=>setOpenCate(!openCate)}>
                                <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                    <CategoryOutlinedIcon style={{color: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Danh mục"/>
                                {openCate ? <ExpandLess/> : <ExpandMoreIcon/>}
                            </ListItem>
                            <Collapse in={openCate} timeout="auto" unmountOnExit>
                                <Link to="/admin/categories">
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{pl: 9}}>
                                            <ListItemText primary="Danh mục cha"/>
                                        </ListItemButton>
                                    </List>
                                </Link>
                                <Link to="/admin/childCategory">
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{pl: 9}}>
                                            <ListItemText primary="Danh mục con"/>
                                        </ListItemButton>
                                    </List>
                                </Link>
                            </Collapse>
                            <Link to="/admin/products">
                                <ListItem button className="pl-3">
                                    <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                        <AllInboxIcon style={{color: 'white'}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Sản phẩm"/>
                                </ListItem>
                            </Link>
                            <Link to="/admin/event">
                                <ListItem button className="pl-3">
                                    <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                        <AllInboxIcon style={{color: 'white'}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Sự kiện"/>
                                </ListItem>
                            </Link>
                            <Link to="/admin/users">
                                <ListItem button className="pl-3">
                                    <ListItemIcon className="pl-1" style={{minWidth: 45}}>
                                        <AllInboxIcon style={{color: 'white'}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Tài khoản"/>
                                </ListItem>
                            </Link>
                        </div>
                    </List>
                </div>
            </div>
        </div>
    );
}

export default SideBar;