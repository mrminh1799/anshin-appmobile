import React, { useState, useEffect } from "react";
import FormProduct from "./FormProduct"
import ListProduct from "./ListProduct"
import callApi from "../callAPI/apiCaller";
import { useParams } from "react-router-dom";
import { Backdrop, CircularProgress, makeStyles, TextField } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

function Products({ product, setProduct, loading, setLoading }) {
    const formDataInItValue = {
        id: "",
        name: "",
        price: "",
        avaiable: "",
        image: "",
        createDate: ""
    };
    const [clickedRow, setClickedRow] = useState(-1);
    const [formData, setFormData] = useState(formDataInItValue);
    const { id } = useParams();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const onChangePage = (event, newPage) => {
        setPage(newPage);
    };
    // const getTotalPage = () => {
    //     callApi(`product`, "GET", null)
    //         .then((response) => {
    //             const { data } = response;
    //             setTotalPage(Math.ceil(data.length / limit))
    //         })
    // }
    // const getListProduct = () => {
    //     callApi(`product`, "GET", null)
    //         .then((response) => {
    //             console.log(response)
    //             setLoading(false)
    //             const { data } = response;
    //             setProduct(data);
    //         })
    // }
    // useEffect(() => {
    //     setLoading(true)
    //     getListProduct();
    // }, [id, page]);

    return (
        <div className="justify-content-center flex-fill">
            {/* <Backdrop open={loading} style={{ zIndex: "1000" }}>
                <CircularProgress />
            </Backdrop> */}
            <FormProduct
                formData={formData}
                setProduct={setProduct}
                product={product}
                setFormData={setFormData}
                setClickedRow={setClickedRow}
                clickedRow={clickedRow}
                categoriesId={id}
                page={page}
                setPage={setPage}
                totalPage={totalPage}
                setTotalPage={setTotalPage}
                
                formDataInItValue={formDataInItValue}
            />
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