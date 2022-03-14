import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WatchOutlinedIcon from '@material-ui/icons/WatchOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Product from "../products/Products"
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import TreeItem from "@material-ui/lab/TreeItem";
import { Category } from '@material-ui/icons';
import callApi from '../callAPI/apiCaller';


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
    return (
        <div className={classes.root}>
            <div className="position-fixed h-100 hidescroll" style={{ overflowY: "scroll" }}>
                <div className={classes.bg}>
                    <List component="nav" className="h-100" aria-label="main mailbox folders">
                        <div className="border border-light" style={{ margin: 30 }}>
                            <h1 className={"text-center m-4 text-white"}><Link to="/">SHOP</Link></h1>
                        </div>
                        <div className={classes.bgList}>
                            <Link to="/admin/categories">
                                <ListItem button className="pl-3">
                                    <ListItemIcon className="pl-1" style={{ minWidth: 45 }}>
                                        <CategoryOutlinedIcon style={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Danh mục" />
                                </ListItem>
                            </Link>
                            <Link to="/admin/products">
                                <ListItem button className="pl-3">
                                    <ListItemIcon className="pl-1" style={{ minWidth: 45 }}>
                                        <AllInboxIcon style={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Sản phẩm" />
                                </ListItem>
                            </Link>
                            <Link to="/admin/users">
                                <ListItem button className="pl-3">
                                    <ListItemIcon className="pl-1" style={{ minWidth: 45 }}>
                                        <AccountCircleIcon style={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Người dùng" />
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