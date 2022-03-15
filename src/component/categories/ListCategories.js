import React, {useEffect} from "react";
import { Button } from "@material-ui/core";
import callApi from "../callAPI/apiCaller";
import {useGetAllOrder} from "../../service/order";

function ListCategories({setLoading,category,setClickedRow,setFormData,setCategory}) {

    const order = useGetAllOrder()

    useEffect(()=>{
        order.refetch().then(res=>{
            if(res?.data){
                setCategory(res.data)
            }
        })
    },[])

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
                        <th>Tên khách hàng</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map(function (value, index) {

                        let status = value.status === 1 ? 'Chờ xác nhận' : (
                            value.status === 2 ? 'Đã xác nhận' : (
                                value.status === 3 ? "Đổi trả" : (
                                    value.status === 4 ? "Không nhận" : (
                                        value.status === 5 ? "Đã nhận" : "Huỷ"
                                    )
                                )
                            )
                        )

                        return (
                            <tr
                                onClick={(event) => {
                                    tblOnClickHandler(event, value, index);
                                }}
                                key={index}
                            >
                                <th>{index+1}</th>
                                <td>{value.id}</td>
                                {/*<td>{value.idStaff}</td>*/}
                                <td>{value.fullName}</td>
                                <td>{value.phoneNumber}</td>
                                <td>{value.detailAddress}</td>
                                <td>{value.sumPrice}</td>
                                <td>{status}</td>
                                {/*<td>*/}
                                {/*    <Button*/}
                                {/*        onClick={(event) => {*/}
                                {/*            onDeleteCategory(event, value, index);*/}
                                {/*        }}*/}
                                {/*        variant="contained"*/}
                                {/*        color="secondary"*/}
                                {/*    >*/}
                                {/*        Delete*/}
                                {/*</Button>*/}
                                {/*</td>*/}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListCategories;