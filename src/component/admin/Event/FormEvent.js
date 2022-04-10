import React, {useEffect, useState} from "react";
import {TextField, Button, Select, MenuItem, InputLabel, FormControl} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {Box, Chip, Modal} from "@mui/material";
import {
    useCreateEvent,
    useCreateProDiscount,
    useDeleteDiscount,
    useGetSpByEventId,
    useUpdateDiscount, useUpdateEvent
} from "../../../service/event";
import {useGetProducts} from "../../../service/product";
import Text from "antd/es/typography/Text";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function FormEvent({
                       detailsEvent,
                       clickedRow,
                       setClickedRow,
                       setEvents,
                       table,
                       setOpen,
                       setLoading,
                       open,
                       setTable

                   }) {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState({
        nameEvent: '',
        startTime: '',
        endTime: '',
    });
    const [openAddPr, setOpenAddPr] = useState(false)
    const [openUpdatePr, setOpenUpdatePr] = useState(false)
    const [product, setProduct] = useState(false)
    const getProductByEvent = useGetSpByEventId({
        id: detailsEvent?.id
    })
    const [option, setOption] = useState([])
    const [idProduct, setIdProduct] = useState()
    const [input, setInput] = useState('')
    const getAllProduct = useGetProducts()
    const [delProduct, setDelProduct] = useState()
    const [idPrUpdate, setIdPrUpdate] = useState({
        id: '',
        styleDiscount: '',
        discount: ''
    })
    const [idAddUpdate, setIdAddUpdate] = useState({
        idProduct: '',
        styleDiscount: '',
        discount: ''
    })
    const updateDiscount = useUpdateDiscount({
        id: idPrUpdate?.id,
        discount: idPrUpdate?.discount,
        styleDiscount: idPrUpdate?.styleDiscount
    })
    const deleteProductDiscount = useDeleteDiscount({
        id: idPrUpdate?.id,
    })
    const addProductDiscount = useCreateProDiscount({
        discount: idAddUpdate?.discount,
        idProduct: idAddUpdate?.idProduct,
        idEvent: detailsEvent?.id,
        styleDiscount: idAddUpdate?.styleDiscount
    })
    const addEvent = useCreateEvent({
        nameEvent: selectedDate?.nameEvent,
        startTime:selectedDate?.startTime,
        endTime: selectedDate?.endTime
    })
    const updateEvents = useUpdateEvent({
        id: detailsEvent?.id,
        startTime: selectedDate?.startTime,
        endTime: selectedDate?.endTime
    })
    const buttonAddEvent=()=>{
        addEvent.refetch().then((res)=>{
            if(res){
                setEvents(prev=>(
                    [...prev,res?.data]
                ))
            }
           alert('Thêm sự kiện thành công')
        })
    }

    const buttonUpdateEvent=()=>{
        if(selectedDate.startTime==''){
            alert('Chọn ngày bắt đầu')
            return
        }
        if(selectedDate.endTime==''){
            alert('Chọn ngày kết thúc')
            return
        }
        updateEvents.refetch(res=>
            console.log('êwwee',res)
        )
    }

    const upadateProduct = (item) => {
        setIdPrUpdate(prev => ({
            ...prev,
            id: item?.idProduct
        }))
        setOpenUpdatePr(true)


    }

    const onChangeInputSearch = (value) => {
        setInput(value.target.value)
        if (value.target.value === '') {
            setOption([])
        } else {
            setOption(getAllProduct?.data?.filter(item => {
                return (item?.name?.includes(value.target.value))
            }))
        }
    }
    const onChangeHander = (value) => {
        setIdAddUpdate(prev => ({
            ...prev,
            idProduct: value?.id
        }))
        setIdProduct(value?.id)
        setInput(value?.name)
        setOption([])
    }

    const searchbarDropdown = () => {
        return (<div className={'search-bar-dropdown'}>
                <input onChange={(value) => onChangeInputSearch(value)} value={input} type="text"
                       className="form-control"
                       placeholder="Search"/>
                <div>
                    <ul className="list-group">

                        {
                            option?.map((item, index) => {
                                return (

                                    <button key={index} onClick={() => onChangeHander(item)} type="button"
                                            className="list-group-item list-group-item-action active">
                                        {item?.name}
                                    </button>

                                )
                            })
                        }

                    </ul>
                </div>
            </div>
        )
    };


    const onCreateProduct = () => {
        setLoading(true)
    };

    const onUpdateProduct = () => {
        setLoading(true)

    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (clickedRow != -1) {
            onUpdateProduct();
        } else {
            onCreateProduct();
        }
        btnClearForm();
    };
    const btnClearForm = (event) => {
        setClickedRow(-1)
        // setFormData({
        //     ...formDataInItValue,
        //     category: category[0]
        // });
    };
    const buttonUpdateDiscount = () => {
        if (idPrUpdate?.discount === '') {
            alert('Vui lòng nhập giảm giá')
            return
        }
        if (idPrUpdate?.styleDiscount === '') {
            alert('Vui lòng chọn hình thức giảm giá')
            return;
        }
        if (idPrUpdate?.styleDiscount === true && idPrUpdate?.discount > 100) {
            alert('Mức độ giảm giá không được lớn hơn 100%')
            return;
        }
        updateDiscount.refetch().then(res => {
            if (res) {
                alert('Cập nhật thành công')
            }
        })
    }

    const buttonAddDiscount = () => {
        if (idAddUpdate?.id === '') {
            alert('Vui lòng chọn sản phẩm')
            return
        }
        if (idAddUpdate?.discount === '') {
            alert('Vui lòng nhập giảm giá')
            return
        }
        if (idAddUpdate?.styleDiscount === '') {
            alert('Vui lòng chọn hình thức giảm giá')
            return;
        }
        if (idAddUpdate?.styleDiscount === true && idAddUpdate?.discount > 100) {
            alert('Mức độ giảm giá không được lớn hơn 100%')
            return;
        }

        addProductDiscount.refetch().then(res => {
            if (res) {
                setProduct((prev) => (
                    [...prev,res?.data?.product]
                ))

                alert('Thêm thành công')
            }
        })
    }

    console.log('setProduct', product)
    const onChangeInputTextUpdateDiscount = (e) => {
        setIdPrUpdate(prev => ({
            ...prev,
            discount: e.target.value
        }))
    }
    const onChangeInputTextAddDiscount = (e) => {
        setIdAddUpdate(prev => ({
            ...prev,
            discount: e.target.value
        }))
    }
    const deleteProduct = (item) => {
        setIdPrUpdate(prev => ({
            ...prev,
            id: item?.idProduct
        }))
        setDelProduct(item?.idProduct)
        setProduct(product?.filter((value) => value?.idDiscount !== item?.idDiscount))
        alert('Xoá thành công')
    }
    useEffect(() => {
        getProductByEvent.refetch()
    }, [detailsEvent])

    useEffect(() => {
        if (getProductByEvent?.data) {
            setProduct(getProductByEvent?.data)
        }
    }, [getProductByEvent.data])

    useEffect(() => {
        deleteProductDiscount.refetch()

    }, [delProduct])
    useEffect(() => {
        if (updateDiscount?.data) {
            product?.map((item, index) => {
                if (item?.idDiscount === updateDiscount?.data?.idDiscount) {
                    item.styleDiscount = updateDiscount?.data?.styleDiscount
                    item.discount = updateDiscount?.data?.discount
                    item.discountPrice = updateDiscount?.data?.discountPrice
                }
            })
        }
    }, [updateDiscount?.data])

    console.log('assa', moment(detailsEvent?.startTime).format('YYYY-MM-DD'))
    return (
        <div>
            <Box>
                <Button variant={'contained'} onClick={() => setOpen(true)}>Tạo sự kiện</Button>
            </Box>
            <Modal
                style={{
                    overflow: "scroll"
                }}
                keepMounted
                open={open} onClose={() => {
                setOpen(false)
                setTable(false)
            }} className="px-5 pt-4">
                <div style={{
                    backgroundColor: 'white',
                    marginLeft: 300,
                    marginRight: 300,
                }} name="product" className="border rounded p-4 shadow row">

                    <form onSubmit={onSubmitHandler} autoComplete="off" style={{flex: 1}}>
                        {
                            table ?
                                <></>
                                : <TextField
                                    required
                                    onChange={(e) => setSelectedDate(prev => ({
                                        ...prev,
                                        nameEvent: e.target.value
                                    }))}
                                    name="name"
                                    fullWidth
                                    label="Tên sự kiện"
                                    className="my-2"
                                />

                        }

                        <Text>Ngày bắt đầu: {moment(detailsEvent?.startTime).format('DD-MM-YYYY')}</Text>

                        <form className={classes.container} >
                            <TextField
                                id="date"
                                label="Ngày bắt đầu"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}

                                onChange={(e) => setSelectedDate(prev => ({
                                    ...prev,
                                    startTime: e.target.value
                                }))}
                            />
                        </form>
                        <Text>Ngày kết thúc: {moment(detailsEvent?.endTime).format('DD-MM-YYYY')}</Text>

                        <form className={classes.container}>
                            <TextField
                                id="date"
                                label="Ngày kết thúc"
                                type="date"
                                onChange={(e) => setSelectedDate(prev => ({
                                    ...prev,
                                    endTime: e.target.value
                                }))}
                                className={classes.textField}

                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                        {
                            table ?
                                <></>
                                :
                                <Button style={{display: "inline-block", marginTop: 20}} onClick={buttonAddEvent} className="mr-2"
                                        variant="outlined">
                                    Tạo Sự kiện
                                </Button>

                        }

                        {
                            table ?
                                <Button style={{display: "inline-block", marginTop: 20}}
                                        onClick={() => setOpenAddPr(true)}
                                        className="mr-2" variant="outlined">
                                    Thêm sản phẩm giảm giá
                                </Button>
                                : <></>
                        }
                        {
                            table ?
                                <Button onClick={buttonUpdateEvent} style={{display: "inline-block", marginTop: 20}} className="mr-2"
                                        variant="outlined">
                                    Cập nhật
                                </Button>
                                :

                                <></>
                        }
                        <Button type="button" style={{display: "inline-block", marginTop: 20}} variant="outlined"
                                color="inherit">
                            Quay lại
                        </Button>
                    </form>
                    {
                        table ?
                            <table style={{marginTop: 20}}
                                   className="table table-striped table-bordered table-hover shadow">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Hình thức giảm giá</th>
                                    <th>Giảm giá</th>
                                    <th>Giá được giảm</th>
                                    <th>Thao tác</th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    product && product?.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{item?.productName}</td>
                                                <td>{item?.styleDiscount ? 'Giảm giá theo phần trăm' : 'Giảm giá theo số tiền'}</td>
                                                <td>{item?.discount}{item?.styleDiscount ? '%' : '$'}</td>
                                                <td>{item?.discountPrice}</td>
                                                <td>
                                                    <Button
                                                        onClick={() => upadateProduct(item)}
                                                        variant="contained"
                                                        color="secondary"
                                                    >
                                                        Sửa
                                                    </Button>
                                                    <Button
                                                        onClick={() => deleteProduct(item)}
                                                        variant="contained"
                                                        color="secondary"
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                                </tbody>
                            </table>
                            :
                            <></>
                    }

                </div>
            </Modal>
            <Modal
                style={{
                    overflow: "scroll"
                }}
                keepMounted
                open={openAddPr} onClose={() => {
                setOpenAddPr(false)
            }} className="px-5 pt-4">
                <div style={{
                    backgroundColor: 'white',
                    marginLeft: 600,
                    marginRight: 600,
                }} name="product" className="border rounded p-4 shadow row">

                    <form onSubmit={onSubmitHandler} autoComplete="off" style={{flex: 1}}>
                        {searchbarDropdown()}

                        <div>

                            <FormControl style={{width: 200}}>
                                <InputLabel id="demo-simple-select-label">Hình thức giảm giá</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={(event) => {
                                        setIdAddUpdate(prev => ({
                                            ...prev,
                                            styleDiscount: event.target.value,
                                        }))

                                    }}
                                >

                                    <MenuItem value={true}>Giảm giá theo phần trăm</MenuItem>
                                    <MenuItem value={false}>Giảm giá theo số tiền</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <TextField
                            required
                            onChange={(e) => onChangeInputTextAddDiscount(e)}
                            name="name"
                            // value={formData.name}
                            fullWidth
                            label="Giảm giá"
                            className="my-2"
                        />


                        <Button style={{display: "inline-block"}} onClick={buttonAddDiscount} className="mr-2"
                                variant="outlined">
                            Xong
                        </Button>
                        <Button style={{display: "inline-block"}} onClick={() => setOpenAddPr(false)} className="mr-2"
                                variant="outlined">
                            Huỷ
                        </Button>
                    </form>
                </div>
            </Modal>
            <Modal
                style={{
                    overflow: "scroll"
                }}
                keepMounted
                open={openUpdatePr} onClose={() => {
                setOpenUpdatePr(false)
            }} className="px-5 pt-4">
                <div style={{
                    backgroundColor: 'white',
                    marginLeft: 600,
                    marginRight: 600,
                }} name="product" className="border rounded p-4 shadow row">
                    <form onSubmit={onSubmitHandler} autoComplete="off" style={{flex: 1}}>
                        <div>

                            <FormControl style={{width: 200}}>
                                <InputLabel id="demo-simple-select-label">Hình thức giảm giá</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={(event) => {
                                        setIdPrUpdate(prev => ({
                                            ...prev,
                                            styleDiscount: event.target.value,
                                        }))

                                    }}
                                >

                                    <MenuItem value={true}>Giảm giá theo phần trăm</MenuItem>
                                    <MenuItem value={false}>Giảm giá theo số tiền</MenuItem>


                                </Select>
                            </FormControl>
                        </div>

                        <TextField
                            required
                            onChange={(e) => onChangeInputTextUpdateDiscount(e)}
                            name="name"
                            // value={formData.name}
                            fullWidth
                            label="Giảm giá"
                            className="my-2"
                        />


                        <Button style={{display: "inline-block"}} onClick={buttonUpdateDiscount} className="mr-2"
                                variant="outlined">
                            Xong
                        </Button>
                        <Button style={{display: "inline-block"}} onClick={() => setOpenAddPr(false)} className="mr-2"
                                variant="outlined">
                            Huỷ
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default FormEvent;