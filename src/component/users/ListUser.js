import React, { useDebugValue } from "react";
import { Button } from "@material-ui/core";
import callApi from "../callAPI/apiCaller";

function ListUser({ setLoading,user, setClickedRow, setFormData, setUser, page,formData }) {
    const tblOnClickHandler = (event, value, index) => {
        if (event.target.textContent == "Delete") return;
        console.log(value);
        setClickedRow(index);
        setFormData(value);
        console.log(value.roles,formData.roles);
    };

    const onDeleteProduct = (event, value, index) => {
        if (window.confirm("Bạn muốn xóa sản phẩm này?")) {
            setLoading(true)
            callApi(`user`, 'DELETE', value.id)
                .then((response) => {
                    setUser((oldState) => {
                        let newState = oldState.filter((value, idx) => {
                            return idx != index;
                        });
                        return newState;
                    });
                    setLoading(false)
                    // if (product.length == 1) {
                    //     setPage(page - 1);
                    // }
                })
        }
    }
    return (
        <div className="pt-5 px-5 m-auto">
            <table className="table table-striped table-bordered table-hover shadow">
                <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Ảnh</th>
                        <th style={{width:"30%"}}>Tài khoản</th>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                        <th>Chức vụ</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map(function (value, index) {
                        return (
                            <tr
                            key={index}
                                onClick={(event) => {
                                    tblOnClickHandler(event, value, index);
                                }}
                            >
                                <th>{page < 2 ? index + 1 : page * 10 - 10 + index + 1}</th>
                                <td>{value.id}</td>
                                <td className="text-center"><img style={{ width: 100 }} src={value.photo} /></td>
                                <td>{value.username}</td>
                                <td>{value.name}</td>
                                <td>{value.email}</td>
                                <td className="px-0">{value.roles.map(item=><p style={{color:"#212529",textAlign:"center"}}>{item.name}</p>)}</td>
                                <td>
                                    <Button
                                        onClick={(event) => {
                                            onDeleteProduct(event, value, index);
                                        }}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default ListUser;