import React, {useEffect, useState} from "react";
import { Button, TablePagination } from "@material-ui/core";
import callApi from "../callAPI/apiCaller";
import {useGetProducts} from "../../service/product";
import { useHistory } from 'react-router-dom'; 


function ListProduct({ setLoading,product, setClickedRow, setFormData, setProduct, categoriesId, page, setPage }) {
    
    const [page2, setPage2] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage2(newPage);
      };

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage2(0);
      };

      const history = useHistory()

    


    const listProduct = useGetProducts()
    

    useEffect(()=>{
        if(listProduct?.data){
            setProduct(listProduct?.data)
        }
    },[listProduct?.data])

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

    const onUpdateHandle=(event, value, index)=>{
        history.push(`/admin/productDetailUD/${value.id}`)

    }
    return (

        
        <div className="pt-5 px-5 m-auto">
            <table className="table table-striped table-bordered table-hover shadow">

                <thead className="thead-dark">
                    <tr>
                        <th>Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {product.slice(page2 * rowsPerPage, page2 * rowsPerPage + rowsPerPage).map(function (value, index) {
                        return (
                            <tr
                                onClick={(event) => {
                                    tblOnClickHandler(event, value, index);
                                }}
                                key={index}
                            >
                                <td className="text-center"><img style={{ width: 100 }} src={value.image} /></td>
                                <td>{value.name}</td>
                                <td>{value.price}$</td>
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
                                    <Button
                                        onClick={(event) => {
                                            onUpdateHandle(event, value, index);
                                        }}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={product.length}
            rowsPerPage={rowsPerPage}
            page={page2}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
    )
}
export default ListProduct;