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
            title: 'Hu??? ho?? ????n',
            description: "B???n c?? ch???c mu???n hu??? ????n n??y?",
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
            title: 'Xo?? s???n ph???m trong ????n h??ng',
            description: "B???n c?? ch???c mu???n xo???",
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
            title: 'X??c nh???n ????n h??ng',
            description: "B???n c?? ch???c mu???n x??c nh???n ????n?",
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
            toast.success('X??c nh???n th??nh c??ng')
        })
    }

    const handleSuccess = (id) => {
        dispatch(changeStatus({
            id: id,
            status: 3
        }))
        setListOrder(listOrder.filter(item => item.id !== id))
        toast.success('X??c nh???n th??nh c??ng')
    }

    const handleFail = (id) => {
        dispatch(changeStatus({
            id: id,
            status: 0
        }))
        setListOrder(listOrder.filter(item => item.id !== id))
        toast.success('Hu??? ????n th??nh c??ng')
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
                        <h4 className={'mb-0'}>{open?.update ? 'C???p nh???t' : "Chi ti???t"} ????n h??ng</h4>
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
                            <h4>Th??ng tin kh??ch h??ng</h4>
                            <TextField
                                disabled={!open.update}
                                name="name"
                                value={formData.fullName}
                                fullWidth
                                label="T??n kh??ch h??ng"
                                className="my-2 mb-4"
                            />
                            <TextField
                                disabled={!open.update}
                                name="name"
                                value={formData.phoneNumber}
                                fullWidth
                                label="S??? ??i???n tho???i"
                                className="my-2 mb-4"
                            />
                            <TextField
                                disabled={!open.update}
                                name="name"
                                value={formData.address}
                                fullWidth
                                label="?????a ch???"
                                className="my-2 mb-4"
                            />
                            <TextField
                                disabled={!open.update}
                                name="name"
                                value={formData.detailAddress}
                                fullWidth
                                label="?????a ch??? chi ti???t"
                                className="my-2 mb-4"
                            />
                        </div>
                        <div style={{flex: 6.5, marginLeft: 30}}>
                            {
                                !open.update && [6, '6'].includes(params?.id) &&
                                    <>
                                        <div className={'mt-4'}>
                                            <h4>Danh s??ch s???n ph???m c??</h4>
                                        </div>
                                        <table
                                            className={`table table-striped table-bordered table-hover shadow ${!open.update && 'mt-4'}`}>
                                            <thead className="thead-dark">
                                            <tr>
                                                <th>T??n s???n ph???m</th>
                                                <th>M??u</th>
                                                <th>Size</th>
                                                <th>s??? l?????ng</th>
                                                <th>Gi??</th>
                                                <th>T???ng ti???n</th>
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
                                                    <p>Kh??ng c?? s???n ph???m n??o</p>
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
                                    <h4>Danh s??ch s???n ph???m m???i</h4>
                                </div>
                            }
                            <table
                                className={`table table-striped table-bordered table-hover shadow ${!open.update && 'mt-4'}`}>
                                <thead className="thead-dark">
                                <tr>
                                    <th>T??n s???n ph???m</th>
                                    <th>M??u</th>
                                    <th>Size</th>
                                    <th>s??? l?????ng</th>
                                    <th>Gi??</th>
                                    <th>T???ng ti???n</th>
                                    {
                                        open.update
                                        &&
                                        <th>H??nh ?????ng</th>
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
                                X??c nh???n
                            </Button>
                            <Button onClick={() => handleCancelOrder(formData.id)} className={'w-100 mt-2'}
                                    variant="contained" color="inherit">
                                Hu??? ????n h??ng
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
                    <h3 style={{width: 'fit-content'}} className={'bg-light p-2 rounded-bottom'}>L???c</h3>
                    <div className={'row'}>
                        <TextField onChange={onchangeFilter} name={'name'} className={'col-3 mr-5'}
                                   label={'T??n kh??ch h??ng'}/>
                        <TextField onChange={onchangeFilter} name={'phone'} className={'col-3 mr-5'}
                                   label={'S??? ??i???n tho???i'}/>
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
                        <th>T??n kh??ch h??ng</th>
                        <th>?????a ch???</th>
                        <th>S??? ??i???n tho???i</th>
                        <th>Th???i gian ?????t</th>
                        <th>T???ng ti???n</th>
                        <th>H??nh ?????ng</th>
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
                                                    ti???t</Dropdown.Item>}
                                            {
                                                ['1'].includes(params?.id) ?
                                                    <>
                                                        <Dropdown.Item onClick={() => handleUpdate(value)}>C???p
                                                            nh???t</Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => handleConfirmOrder(value.id)}>X??c
                                                            nh???n ????n</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => handleCancelOrder(value.id)}>Hu???
                                                            ????n</Dropdown.Item>
                                                    </>
                                                    :
                                                    (['2'].includes(params?.id) ?
                                                        <>
                                                            <Dropdown.Item onClick={() => handleSuccess(value.id)}>Giao
                                                                th??nh c??ng</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => handleFail(value.id)}>Kh??ng
                                                                nh???n h??ng</Dropdown.Item>
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
                                                                }}>?????i
                                                                    tr???</Dropdown.Item>
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