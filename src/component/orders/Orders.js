import {Button, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useEffect, useMemo, useState} from "react";
import {
    changeQuantityDetailOrder,
    changeStatus,
    deleteOrderDetail,
    getDetailOrder,
    useGetAllOrderById
} from "../../service/order";
import {useParams} from "react-router-dom";
import moment from "moment";
import {IconButton, Modal} from "@mui/material";
import {FaEllipsisV, FaTrash} from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {Dropdown} from "semantic-ui-react";
import SearchProduct from "./SearchProduct";
import Refund from "./Refund";
import {useConfirm} from "material-ui-confirm";
import {toast} from "react-toastify";
import {getHistoryOrder} from "../../service/product";

const formDataInItValue = {
    fullName: "",
    address: "",
    detailAddress: "",
    phoneNumber: "",
    sumPrice: 500000,
    timeCreate: "2022-03-04T16:42:49.000+00:00",
}

function Orders() {

    const params = useParams()

    const dispatch = useDispatch()
    const confirm = useConfirm()

    const [filter, setFilter] = useState({})
    const [order, setOrder] = useState([])
    const [history, setHistory] = useState([])
    const [listOrder, setListOrder] = useState([])
    const [formData, setFormData] = useState(formDataInItValue);
    const [totalPage, setTotalPage] = useState(1);
    const [pagination, setPagination] = useState({
        index: 0,
        size: 10
    });

    const [open, setOpen] = useState({
        open: false,
        update: false
    })

    const [openRefund, setOpenRefund] = useState({
        open: false,
        update: false
    })

    const [detailOrder, setDetailOrder] = useState([])

    const orderApi = useGetAllOrderById({
        id: params.id
    })

    useEffect(() => {
        if (listOrder) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            setOrder(listOrder.slice(firstIndex, lastIndex))
        }
    }, [listOrder])

    useEffect(() => {
        if (listOrder) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            setTotalPage(Math.ceil(listOrder.length / pagination.size))
            setOrder(listOrder.slice(firstIndex, lastIndex))
        }
    }, [pagination.index])

    useEffect(() => {
        orderApi.refetch().then(res => {
            if (res?.data) {
                setTotalPage(Math.ceil(res?.data.length / pagination.size))
                setPagination({
                    ...pagination,
                    index: 0
                })
                setListOrder(res.data)
                setOrder(res.data.slice(0, pagination.size))
            }
        })
    }, [params.id])

    useEffect(()=>{
    },[params.id])

    const handleUpdate = (value, type = true) => {
        setFormData(value)
        dispatch(getDetailOrder({
            orderId: value.id
        }, (res) => {
            if([6, '6'].includes(params.id) && !open.update){
                dispatch(getHistoryOrder({
                    idOrder: value.id
                }, (res)=>{
                    setHistory(res)
                }))
            }
            setDetailOrder(res)
            setOpen({
                open: true,
                update: type
            })
        }))
    }

    const handleCancelOrder = (id) => {
        confirm({
            title: 'Huỷ hoá đơn',
            description: "Bạn có chắc muốn huỷ đơn này?",
        }).then(() => {
            setOpen({
                open: false,
                update: false
            })
            dispatch(changeStatus({
                id: id,
                status: 0
            }))
            setListOrder(listOrder.filter(item => item.id !== id))
        })
    }

    const onChangePage = (event, newPage) => {
        setPagination({
            ...pagination,
            index: newPage - 1
        });
    };

    const handleDeleteOrderDetail = (id) => {
        confirm({
            title: 'Xoá sản phẩm trong đơn hàng',
            description: "Bạn có chắc muốn xoá?",
        }).then(() => {
            dispatch(deleteOrderDetail({
                orderDetailId: id,
            }))
            setDetailOrder(detailOrder.filter(item => item.idOrderDetail !== id))
        })
    }

    const onChangeQuantity = (id, quantity) => {
        if (quantity.target.value > 0) {
            setDetailOrder(detailOrder.map(item => {
                if (item.idOrderDetail === id) {
                    item.quantity = quantity.target.value
                }
                return item
            }))
        }
    }

    const handleConfirmOrder = (id) => {
        confirm({
            title: 'Xác nhận đơn hàng',
            description: "Bạn có chắc muốn xác nhận đơn?",
        }).then(() => {
            setOpen({
                open: false,
                update: false
            })
            dispatch(changeStatus({
                id: id,
                status: 2
            }))
            setListOrder(listOrder.filter(item => item.id !== id))
            toast.success('Xác nhận thành công')
        })
    }

    const handleSuccess = (id) => {
        dispatch(changeStatus({
            id: id,
            status: 3
        }))
        setListOrder(listOrder.filter(item => item.id !== id))
        toast.success('Xác nhận thành công')
    }

    const handleFail = (id) => {
        dispatch(changeStatus({
            id: id,
            status: 0
        }))
        setListOrder(listOrder.filter(item => item.id !== id))
        toast.success('Huỷ đơn thành công')
    }

    const onchangeFilter = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }

    const formOrder = useMemo(() => {
        return (
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
                    <div className={'py-2 d-flex justify-content-between align-items-center'}
                         style={{borderBottom: '1px solid black'}}>
                        <h4 className={'mb-0'}>{open?.update ? 'Cập nhật' : "Chi tiết"} đơn hàng</h4>
                        <Button style={{fontSize: 15}} onClick={() => {
                            setOpen({
                                open: false,
                                update: false
                            })
                        }}>X</Button>
                    </div>
                    <div style={{
                        display: 'flex',
                    }}>
                        <div className={'mt-4 p-4'}
                             style={{flex: 3.5, backgroundColor: '#eeeeee', borderRadius: '10px 10px 0 0'}}>
                            <h4>Thông tin khách hàng</h4>
                            <TextField
                                disabled={!open.update}
                                name="name"
                                value={formData.fullName}
                                fullWidth
                                label="Tên khách hàng"
                                className="my-2 mb-4"
                            />
                            <TextField
                                disabled={!open.update}
                                name="name"
                                value={formData.phoneNumber}
                                fullWidth
                                label="Số điện thoại"
                                className="my-2 mb-4"
                            />
                            <TextField
                                disabled={!open.update}
                                name="name"
                                value={formData.address}
                                fullWidth
                                label="Địa chỉ"
                                className="my-2 mb-4"
                            />
                            <TextField
                                disabled={!open.update}
                                name="name"
                                value={formData.detailAddress}
                                fullWidth
                                label="Địa chỉ chi tiết"
                                className="my-2 mb-4"
                            />
                        </div>
                        <div style={{flex: 6.5, marginLeft: 30}}>
                            {
                                !open.update && [6, '6'].includes(params?.id) &&
                                    <>
                                        <div className={'mt-4'}>
                                            <h4>Danh sách sản phẩm cũ</h4>
                                        </div>
                                        <table
                                            className={`table table-striped table-bordered table-hover shadow ${!open.update && 'mt-4'}`}>
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
                                            { history?.length > 0 ?
                                                history?.map((item, index) => {
                                                    console.log('item',item)
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
                                                :
                                                <div className={'d-flex justify-content-center'}>
                                                    <p>Không có sản phẩm nào</p>
                                                </div>
                                            }
                                            </tbody>
                                        </table>
                                    </>
                            }
                            {
                                open.update
                                &&
                                <div className={'my-3'}>
                                    <SearchProduct order={formData} onChange={(data) => {
                                        let a = {
                                            ...data.orderDetail.detailProduct,
                                            ...data.orderDetail.detailProduct.color,
                                            ...data.orderDetail.detailProduct.size,
                                            ...data.orderDetail,
                                            ...data,
                                            nameProduct: data.productName
                                        }
                                        setDetailOrder([
                                            ...detailOrder,
                                            {
                                                ...a,
                                                coloName: a.colorName,
                                                sizeName: a.size_name
                                            },
                                        ])
                                    }}/>
                                </div>
                            }
                            {
                                !open.update && [6, '6'].includes(params?.id) && <div className={'mt-4'}>
                                    <h4>Danh sách sản phẩm mới</h4>
                                </div>
                            }
                            <table
                                className={`table table-striped table-bordered table-hover shadow ${!open.update && 'mt-4'}`}>
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
                                    detailOrder?.map((item, index) => {
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
                                                                       onChange={(value) => onChangeQuantity(item.idOrderDetail, value)}
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
                                                        <IconButton
                                                            onClick={() => handleDeleteOrderDetail(item.idOrderDetail)}>
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
                    </div>
                    {
                        open.update &&
                        <div className={'mt-2 pt-4'}>
                            <Button onClick={() => handleConfirmOrder(formData.id)} className="mr-2 w-100 mb-1"
                                    color={'primary'} variant="contained">
                                Xác nhận
                            </Button>
                            <Button onClick={() => handleCancelOrder(formData.id)} className={'w-100 mt-2'}
                                    variant="contained" color="inherit">
                                Huỷ đơn hàng
                            </Button>
                        </div>
                    }
                </form>
            </Modal>
        )
    }, [open, detailOrder, formData, history])

    return (
        <div className="justify-content-center flex-fill">

            <div className="pt-5 px-5 m-auto">
                <div className={'px-5 pb-4 rounded-bottom'}
                     style={{backgroundColor: '#eeeeee', borderTop: '3px solid'}}>
                    <h3 style={{width: 'fit-content'}} className={'bg-light p-2 rounded-bottom'}>Lọc</h3>
                    <div className={'row'}>
                        <TextField onChange={onchangeFilter} name={'name'} className={'col-3 mr-5'}
                                   label={'Tên khách hàng'}/>
                        <TextField onChange={onchangeFilter} name={'phone'} className={'col-3 mr-5'}
                                   label={'Số điện thoại'}/>
                    </div>
                </div>
            </div>
            {formOrder}
            <Refund open={openRefund} setOpen={setOpenRefund} detailOrder={detailOrder} formData={formData}
                    setOrder={setOrder} order={order}
                    setFormData={setFormData}/>
            <div className="pt-5 px-5 m-auto">
                <table className="table table-striped table-bordered table-hover shadow">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Thời gian đặt</th>
                        <th>Tổng tiền</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.map(function (value, index) {

                        return (
                            <tr
                                key={index}
                            >
                                <td>{((pagination.index + 1) * pagination.size - pagination.size + 1) + index}</td>
                                <td>{value.fullName}</td>
                                <td>{value.detailAddress}</td>
                                <td>{value.phoneNumber}</td>
                                <td>{moment(value.timeCreate).format('DD/MM/YYYY')}</td>
                                <td>{value.sumPrice}</td>
                                <td>
                                    <Dropdown icon={<IconButton>
                                        <FaEllipsisV size={15}/>
                                    </IconButton>}>
                                        <Dropdown.Menu>
                                            {
                                                !['1'].includes(params?.id)
                                                &&
                                                <Dropdown.Item
                                                    onClick={() => handleUpdate(value, false)}>Chi
                                                    tiết</Dropdown.Item>}
                                            {
                                                ['1'].includes(params?.id) ?
                                                    <>
                                                        <Dropdown.Item onClick={() => handleUpdate(value)}>Cập
                                                            nhật</Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => handleConfirmOrder(value.id)}>Xác
                                                            nhận đơn</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => handleCancelOrder(value.id)}>Huỷ
                                                            đơn</Dropdown.Item>
                                                    </>
                                                    :
                                                    (['2'].includes(params?.id) ?
                                                        <>
                                                            <Dropdown.Item onClick={() => handleSuccess(value.id)}>Giao
                                                                thành công</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => handleFail(value.id)}>Không
                                                                nhận hàng</Dropdown.Item>
                                                        </>
                                                        :
                                                        (['3'].includes(params?.id)
                                                                ?
                                                                <Dropdown.Item onClick={() => {
                                                                    setFormData(value)
                                                                    dispatch(getDetailOrder({
                                                                        orderId: value.id
                                                                    }, (res) => {
                                                                        setDetailOrder(res)
                                                                        setOpenRefund({
                                                                            open: true,
                                                                            update: true
                                                                        });
                                                                    }))
                                                                }}>Đổi
                                                                    trả</Dropdown.Item>
                                                                :
                                                                <></>
                                                        ))
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <Pagination
                page={pagination.index + 1}
                count={totalPage}
                onChange={onChangePage}
                className="py-4 d-flex justify-content-center"
            />
        </div>
    )
}

export default Orders;