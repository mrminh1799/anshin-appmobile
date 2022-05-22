import React, {useEffect, useState} from "react";
import {IconButton, Modal} from "@mui/material";
import {Button, TextField} from "@material-ui/core";
import SearchProduct from "./SearchProduct";
import {changeReturn} from "../../service/order";
import {FaTrash} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {useAuth} from "../../context";


const Refund = ({open, setOpen, formData, detailOrder, setFormData}) => {

    const dispatch = useDispatch()

    const {userInfo} = useAuth()

    const [data, setData] = useState([])

    const [prevForm, setPrevForm] = useState()

    const [count, setCount] = useState(0)

    useEffect(() => {
        if (formData) {
            setCount(1)
            if (count < 1) {
                setPrevForm({...formData})
            }
        }
    }, [formData])

    useEffect(() => {
        setData(detailOrder)
    }, [detailOrder])

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
    console.log(userInfo)

    return open && (
        <Modal
            style={{
                overflow: 'scroll'
            }}
            keepMounted
            open={open.open} onClose={() => {
            setOpen({
                open: false,
                update: false
            })
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
                            disabled
                            name="name"
                            value={prevForm?.fullName}
                            fullWidth
                            label="Tên khách hàng"
                            className="my-2 mb-4"
                        />
                        <TextField
                            disabled
                            name="name"
                            value={prevForm?.phoneNumber}
                            fullWidth
                            label="Số điện thoại"
                            className="my-2 mb-4"
                        />
                        <TextField
                            disabled
                            name="name"
                            value={prevForm?.address}
                            fullWidth
                            label="Địa chỉ"
                            className="my-2 mb-4"
                        />
                        <TextField
                            disabled
                            name="name"
                            value={prevForm?.detailAddress}
                            fullWidth
                            label="Địa chỉ chi tiết"
                            className="my-2 mb-4"
                        />
                    </div>
                    <div className={'ml-5 form-group'} style={{flex: 1}}>

                        <div style={{flex: 1}}>
                            <TextField onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    fullName: e.target.value
                                })
                            }}
                                       name="name"
                                       value={formData.fullName}
                                       fullWidth
                                       label="Tên khách hàng"
                                       className="my-2 mb-4"
                            />
                            <TextField onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    phoneNumber: e.target.value
                                })
                            }}
                                       name="name"
                                       value={formData.phoneNumber}
                                       fullWidth
                                       label="Số điện thoại"
                                       className="my-2 mb-4"
                            />
                            <TextField onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    address: e.target.value
                                })
                            }}
                                       name="name"
                                       value={formData.address}
                                       fullWidth
                                       label="Địa chỉ"
                                       className="my-2 mb-4"
                            />
                            <TextField onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    detailAddress: e.target.value
                                })
                            }}
                                       name="name"
                                       value={formData.detailAddress}
                                       fullWidth
                                       label="Địa chỉ chi tiết"
                                       className="my-2 mb-4"
                            />
                        </div>
                        <label htmlFor="exampleFormControlTextarea1">Lý do đổi trả</label>
                        <textarea value={formData.reason} onChange={(e) => {
                            setFormData({
                                ...formData,
                                reason: e.target.value
                            })
                        }} className="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="4"/>
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
                                <th>Hành động</th>
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
                                                    <TextField type={'number'}
                                                               onChange={(e) => {
                                                                   let arr = data.map(item => ({...item}))
                                                                   setData(arr.map(value => {
                                                                       if (item.idOrderDetail === value.idOrderDetail && e.target.value > 0) {
                                                                           value.quantity = e.target.value
                                                                       }
                                                                       return value
                                                                   }))
                                                               }}
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
                                                <IconButton onClick={() => {
                                                    setData(data.filter(value => value.idOrderDetail !== item.idOrderDetail))
                                                }}>
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