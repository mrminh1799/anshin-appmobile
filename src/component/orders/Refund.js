import React, {useState} from "react";
import {IconButton, Modal} from "@mui/material";
import {Button, TextField} from "@material-ui/core";
import SearchProduct from "./SearchProduct";
import {changeQuantityDetailOrder, changeReturn} from "../../service/order";
import {FaTrash} from "react-icons/fa";
import {useDispatch} from "react-redux";


const Refund = ({open, setOpen, formData, detailOrder, setFormData}) => {

    const dispatch = useDispatch()

    const [data, setData] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({
            ...formData,
            listOrderProductDetailDTO: data,
        })
        dispatch(changeReturn({
            ...formData,
            listOrderProductDetailDTO: data,
        }))
    }

    return open && (
        <Modal
            style={{
                overflow: 'scroll'
            }}
            keepMounted
            open={open} onClose={() => {
            setOpen(false)
        }} className="px-5 pt-4">
            <form style={{
                backgroundColor: 'white',
                marginLeft: 100,
                marginRight: 100,
            }} className="border rounded p-4 shadow" autoComplete="off">
                <div style={{
                    display: 'flex',
                }}>
                    <div style={{flex: 1}}>
                        <TextField
                            name="name"
                            value={formData.fullName}
                            fullWidth
                            label="Tên khách hàng"
                            className="my-2 mb-4"
                        />
                        <TextField
                            name="name"
                            value={formData.phoneNumber}
                            fullWidth
                            label="Số điện thoại"
                            className="my-2 mb-4"
                        />
                        <TextField
                            name="name"
                            value={formData.address}
                            fullWidth
                            label="Địa chỉ"
                            className="my-2 mb-4"
                        />
                        <TextField
                            name="name"
                            value={formData.detailAddress}
                            fullWidth
                            label="Địa chỉ chi tiết"
                            className="my-2 mb-4"
                        />
                    </div>
                    <div className={'ml-5 form-group'} style={{flex: 1}}>
                        <label htmlFor="exampleFormControlTextarea1">Lý do đổi trả</label>
                        <textarea value={formData.reason} onChange={(e)=>{
                            setFormData({
                                ...formData,
                                reason: e.target.value
                            })
                        }} className="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="6"/>
                    </div>
                </div>
                <div className={'d-flex'}>
                    <div style={{flex: 1}} className={'mr-3'}/>
                    <div style={{flex: 1}} className={'ml-3'}>
                        <SearchProduct order={formData} cancelUpdate={true} onChange={(value) => {
                            setData([
                                ...data,
                                {
                                    ...value,
                                    coloName: value.color,
                                    sizeName: value.size,
                                    nameProduct: value.data.name,
                                    price: value.data.price,
                                },
                            ])
                        }}/>
                    </div>
                </div>
                <div className={'d-flex'}>
                    <table style={{flex: 1}} className="table table-striped table-bordered table-hover shadow mr-3">
                        <thead className="thead-dark">
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Màu</th>
                            <th>Size</th>
                            <th>số lượng</th>
                            <th>Giá</th>
                            <th>Tổng tiền</th>
                            {
                                open.update
                                &&
                                <th>Action</th>
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            detailOrder?.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.nameProduct}</td>
                                        <td>{item.coloName}</td>
                                        <td>{item.sizeName}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity * item.price}</td>
                                        {
                                            open.update
                                            &&
                                            <td>
                                                <IconButton>
                                                    <FaTrash color={'red'} size={14}/>
                                                </IconButton>
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <table style={{flex: 1}} className="table table-striped table-bordered table-hover shadow ml-3">
                        <thead className="thead-dark">
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Màu</th>
                            <th>Size</th>
                            <th>số lượng</th>
                            <th>Giá</th>
                            <th>Tổng tiền</th>
                            {
                                open.update
                                &&
                                <th>Action</th>
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data?.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.nameProduct}</td>
                                        <td>{item.coloName}</td>
                                        <td>{item.sizeName}</td>
                                        <td>
                                            {
                                                open.update
                                                    ?
                                                    <TextField type={'number'} onBlur={() =>
                                                        dispatch(changeQuantityDetailOrder({
                                                            orderDetailId: item.idOrderDetail,
                                                            quantity: item.quantity
                                                        }))}
                                                        // onChange={(value) => onChangeQuantity(item.idOrderDetail, value)}
                                                               value={item.quantity}/>
                                                    :
                                                    item.quantity
                                            }
                                        </td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity * item.price}</td>

                                        {
                                            open.update
                                            &&
                                            <td>
                                                <IconButton>
                                                    <FaTrash color={'red'} size={14}/>
                                                </IconButton>
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <Button onClick={handleSubmit} className="mr-2 mt-2" variant={'contained'}>
                    Lưu
                </Button>
            </form>
        </Modal>
    )
}

export default Refund