import { Backdrop, CircularProgress } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useState, useEffect } from "react";
import callApi from "../callAPI/apiCaller";
import FormCategories from "./FormCategories"
import ListCategories from "./ListCategories"
import {useGetAllOrder} from "../../service/order";
import {useParams} from "react-router-dom";

function Categories({ category, setCategory, loading, setLoading}) {

    const formDataInItValue = {
        id: "",
        name: "",
    }
    let params = useParams()
    const [clickedRow, setClickedRow] = useState(-1);
    const [formData, setFormData] = useState(formDataInItValue);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    
    const onChangePage = (event, newPage) => {
        setPage(newPage);
    };
    // console.log(params)
    return (
        <div className="justify-content-center flex-fill">
            {/* <Backdrop open={loading} style={{ zIndex: "1000" }}>
                <CircularProgress />
            </Backdrop> */}
            <FormCategories
                formData={formData}
                setCategory={setCategory}
                category={category}
                setFormData={setFormData}
                clickedRow={clickedRow}
                setLoading={setLoading}
                formDataInItValue={formDataInItValue}
            />
            <ListCategories
                formData={formData}
                setFormData={setFormData}
                category={category}
                setCategory={setCategory}
                clickedRow={clickedRow}
                setClickedRow={setClickedRow}
                setLoading={setLoading}
            />
            <Pagination
                count={totalPage}
                onChange={onChangePage}
                className="py-4 d-flex justify-content-center"
            />
        </div>
    )
}

export default Categories;