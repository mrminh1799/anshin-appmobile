import React, { useState, useEffect } from "react";
import FormProduct from "./FormProduct"
import ListProduct from "./ListProduct"
import callApi from "../callAPI/apiCaller";
import { useParams } from "react-router-dom";
import { Backdrop, Box, CircularProgress, ListItem, ListItemIcon, ListItemText, makeStyles, TextField } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import AllInboxIcon from '@material-ui/icons/AllInbox';



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
            <Box>
                <Button>
                <Link to="/admin/productDetail/Create" >
                    <ListItem button className="pl-3">
                        <ListItemIcon className="pl-1" style={{ minWidth: 45 }}>
                            <AllInboxIcon style={{ color: 'black' }} />
                        </ListItemIcon>
                        <ListItemText secondary="Tạo mới sản phẩm"/>
                    </ListItem>
                </Link>
                </Button>
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
            <Pagination
                count={totalPage}
                onChange={onChangePage}
                className="py-4 d-flex justify-content-center"
            />
        </div>
    )
}

export default Products;