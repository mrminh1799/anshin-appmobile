import React, {useEffect, useMemo, useState} from "react";
import {changeOrder, getAllProduct, getProductColor, getProductDetail, getProductSize} from "../../service/order";
import {useDispatch} from "react-redux";
import {Modal} from "@mui/material";
import Select from "react-select";
import {Button, TextField} from "@material-ui/core";

const SearchProduct = ({order, onChange, cancelUpdate= false}) => {
    const productImage = "https://i.pinimg.com/originals/a0/86/47/a08647cec486718eaf66a38d6f6f8784.png";

    const [listProduct, setSearchListProduct] = useState()

    const [open, setOpen] = useState(false)

    const [currentProduct, setCurrentProduct] = useState()

    const [currentProductDetail, setCurrentProductDetail] = useState({})

    const dispatch = useDispatch()

    useMemo(() => {
        dispatch(getAllProduct({}, (res) => {
            setSearchListProduct(res)
        }))
    }, [])

    const handleShowDetailProduct = (data) => {
        setCurrentProduct({
            ...currentProduct,
            data,
            idProduct: data.id,
            idOrder: order.id
        })
        dispatch(getProductDetail(data, (product) => {
            setCurrentProductDetail(product)
            setOpen(true)
        }))
    }

    const handleSubmit = ()=>{
        setOpen(false)
        if(cancelUpdate){
            onChange(currentProduct)
        }else {
            dispatch(changeOrder(currentProduct,(res)=>{
                onChange(res)
            }))
        }
    }

    return (
        <div className={'w-25'}>
            <span>Tìm kiếm sản phẩm</span>
            <Select
                onChange={(data) => handleShowDetailProduct(data)}
                value={{}}
                options={listProduct?.map(item => {
                    item.value = item.id
                    item.label = item.name
                    return item
                })}/>
            <Modal
                style={{
                    overflow: "scroll"
                }}
                keepMounted
                open={open} onClose={() => {
                setOpen(false)
            }} className="px-5 pt-4">
                <div style={{
                    backgroundColor: 'white',
                    marginLeft: 300,
                    marginRight: 300,
                }} name="product" className="border rounded p-4 shadow row">
                    <div className="pl-3 pr-5 pt-3 w-auto">
                        <img className="shadow rounded" style={{width: 200}}
                             src={currentProductDetail?.image ? currentProductDetail.image : productImage}/>
                    </div>
                    <div style={{
                        flex: 1,
                    }}>
                        <h3>{currentProductDetail.name}</h3>
                        <span style={{
                            display: 'block'
                        }}>Giá: {currentProductDetail.price}</span>
                        <span style={{
                            display: 'block'
                        }}>Danh mục: {currentProductDetail.categoryName}</span>
                        <span>Số lượng: </span> <TextField className={'mb-2'} placeholder={'Số lượng'} value={currentProduct?.quantity} onChange={(e)=>{
                            setCurrentProduct({
                                ...currentProduct,
                                quantity: e.target.value
                            })
                        }}/>
                        <Select
                            onChange={(value)=>{
                                setCurrentProduct({
                                    ...currentProduct,
                                    idColor: value.idColor,
                                    color: value.nameColor
                                })
                            }}
                            options={currentProductDetail?.listColor?.filter(item => item.isSelected).map(item => {
                                item.value = item.idColor
                                item.label = item.nameColor
                                return item
                            })}/>
                        <Select
                            onChange={(value)=>{
                                setCurrentProduct({
                                    ...currentProduct,
                                    idSize: value.idSize,
                                    size: value.nameSize
                                })
                            }}
                            options={currentProductDetail?.listSize?.filter(item => item.isSelected).map(item => {
                                item.value = item.idSize
                                item.label = item.nameSize
                                return item
                            })}/>
                        <Button onClick={handleSubmit} className="mr-2 mt-2" variant={'contained'}>
                            Chọn
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default SearchProduct