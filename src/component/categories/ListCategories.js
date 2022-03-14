import React from "react";
import { Button } from "@material-ui/core";
import callApi from "../callAPI/apiCaller";

function ListCategories({setLoading,category,setClickedRow,setFormData,setCategory}) {
    const tblOnClickHandler = (event, value, index) => {
        if(event.target.textContent=="Delete") return;
        setClickedRow(index);
        setFormData(value);
    };
    
    const onDeleteCategory = (event, value, index) => {
        if (window.confirm("Bạn muốn xóa danh mục này?")) {
            setLoading(true)
            callApi(`category`, 'DELETE', value.id)
                .then((response) => {
                    setCategory((oldState) => {
                        let newState = oldState.filter((value, idx) => {
                            return idx != index;
                        });
                        return newState;
                    });
                    setLoading(false)
                })
        }
    }
    return (
        <div className="p-5 m-auto">
            <table className="table table-striped table-bordered table-hover shadow">
                <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Tên danh mục</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map(function (value, index) {
                        return (
                            <tr
                                onClick={(event) => {
                                    tblOnClickHandler(event, value, index);
                                }}
                                key={index}
                            >
                                <th>{index+1}</th>
                                <td>{value.id}</td>
                                <td>{value.name}</td>
                                <td>
                                    <Button
                                        onClick={(event) => {
                                            onDeleteCategory(event, value, index);
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

export default ListCategories;