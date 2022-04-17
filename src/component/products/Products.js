import React, { useState, useEffect } from "react";
import FormProduct from "./FormProduct"
import ListProduct from "./ListProduct"
import callApi from "../callAPI/apiCaller";
import { useParams } from "react-router-dom";
import { Backdrop, Box, Button, CircularProgress, ListItem, ListItemIcon, ListItemText, makeStyles, TextField } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import AllInboxIcon from '@material-ui/icons/AllInbox';
import { Input } from "antd";



function Products({ product, setProduct, loading, setLoading }) {
    const formDataInItValue = {
        id: "",
        name: "",
        price: "",
        avaiable: "",
        image: "",
        createDate: ""
    };
    //let useHistory = useHistory();
    const [clickedRow, setClickedRow] = useState(-1);
    const [formData, setFormData] = useState(formDataInItValue);
    const { id } = useParams();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const onChangePage = (event, newPage) => {
        setPage(newPage);
    };


    return (
        <div className="justify-content-center flex-fill">
            <Box className="mt-5 ml-5">
                <div class="d-inline p-2 bg-dark">
                    <Button>
                        <Link to="/admin/productDetail/Create" >
                            {/* <ListItem button className="pl-3">
                                <ListItemIcon className="pl-1" style={{ minWidth: 30 }}>
                                    <AllInboxIcon style={{ color: 'while' }} />
                                </ListItemIcon>
                                <ListItemText secondary="Tạo mới sản phẩm" />
                            </ListItem> */}
                            Tạo mới sản phẩm
                        </Link>
                    </Button> <input className="" placeholder="Tìm kiếm theo tên" ></input></div>
            </Box>
            <ListProduct
                formData={formData}
                setFormData={setFormData}
                product={product}
                setProduct={setProduct}
                clickedRow={clickedRow}
                setClickedRow={setClickedRow}
                categoriesId={id}
                page={page}
                setPage={setPage}
            />

        </div>
    )
}

export default Products;