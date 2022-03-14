import React from "react";
import { Button } from "@material-ui/core";
import callApi from "../callAPI/apiCaller";

function ListProduct({ setLoading,product, setClickedRow, setFormData, setProduct, categoriesId, page, setPage }) {
    const tblOnClickHandler = (event, value, index) => {
        if (event.target.textContent == "Delete") return;
        setClickedRow(index);
        setFormData(value);
    };

    const onDeleteProduct = (event, value, index) => {
        if (window.confirm("Bạn muốn xóa sản phẩm này?")) {
            setLoading(true)
            callApi(`product`, 'DELETE', value.id)
                .then((response) => {
                    setProduct((oldState) => {
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
                        <th style={{width:"30%"}}>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Danh mục</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
<tr
                                
                            >
                                <th>1</th>
                                <td>32</td>
                                <td className="text-center">fds</td>
                                <td>Gói siêu cấp</td>
                                <td>100000$</td>
                                <td>ok</td>
                                <td>blabla</td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr><tr
                                
                            >
                                <th>1</th>
                                <td>32</td>
                                <td className="text-center">fds</td>
                                <td>Gói siêu cấp</td>
                                <td>100000$</td>
                                <td>ok</td>
                                <td>blabla</td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                    {product.map(function (value, index) {
                        return (
                            <tr
                                onClick={(event) => {
                                    tblOnClickHandler(event, value, index);
                                }}
                                key={index}
                            >
                                <th>{page < 2 ? index + 1 : page * 10 - 10 + index + 1}</th>
                                <td>{value.id}</td>
                                <td className="text-center"><img style={{ width: 100 }} src={value.image} /></td>
                                <td>{value.name}</td>
                                <td>{value.price}$</td>
                                <td>{value.avaiable}</td>
                                <td>{value.category.name}</td>
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
export default ListProduct;