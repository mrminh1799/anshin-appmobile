import React, { useState, useEffect } from "react";
import FormUser from "./FormUser"
import ListUser from "./ListUser"
import callApi from "../callAPI/apiCaller";
import { useParams } from "react-router-dom";
import { Backdrop, CircularProgress, makeStyles, TextField } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

function Users({ user, setUser, loading, setLoading }) {
    const formDataInItValue = {
        id: "",
        username:"",
        password: "",
        name: "",
        photo:"",
        email: "",
        roles: []
    };
    const [clickedRow, setClickedRow] = useState(-1);
    const [formData, setFormData] = useState(formDataInItValue);
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
    const getListUser = () => {
        
        callApi(`user`, "GET")
            .then((response) => {
                setLoading(false)
                const { data } = response;
                setUser(data);
                console.log(data)
            })
    }
    useEffect(() => {
        setLoading(true)
        getListUser();
    }, [page]);

    return (
        <div className="justify-content-center flex-fill">
            {/* <Backdrop open={loading} style={{ zIndex: "1000" }}>
                <CircularProgress />
            </Backdrop> */}
            <FormUser
                formData={formData}
                setUser={setUser}
                user={user}
                formData={formData}
                setFormData={setFormData}
                setClickedRow={setClickedRow}
                clickedRow={clickedRow}
                page={page}
                setPage={setPage}
                totalPage={totalPage}
                setTotalPage={setTotalPage}
                
                formDataInItValue={formDataInItValue}
            />
            <ListUser
                formData={formData}
                setFormData={setFormData}
                user={user}
                setUser={setUser}
                clickedRow={clickedRow}
                setClickedRow={setClickedRow}
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

export default Users;