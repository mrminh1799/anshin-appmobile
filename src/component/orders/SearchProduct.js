import React, {useEffect, useMemo, useState} from "react";
import {getAllProduct, getProductColor, getProductDetail, getProductSize} from "../../service/order";
import {useDispatch, useSelector} from "react-redux";
import {FormControl, InputLabel, MenuItem, Modal} from "@mui/material";
import Select from "react-select";
import {Button, TextField} from "@material-ui/core";

const SearchProduct = () => {
    const productImage = "https://i.pinimg.com/originals/a0/86/47/a08647cec486718eaf66a38d6f6f8784.png";

    const [listProduct, setSearchListProduct] = useState()

    const [open, setOpen] = useState(false)

    const [currentProduct, setCurrentProduct] = useState({})

    const [currentProductDetail, setCurrentProductDetail] = useState({})

    const [formData, setFormData] = useState({})

    const dispatch = useDispatch()

    useMemo(() => {
        dispatch(getAllProduct({}, (res) => {
            setSearchListProduct(res)
        }))
    }, [])

    const handleShowDetailProduct = (data) => {
        setCurrentProduct(data)
        dispatch(getProductDetail(data, (product) => {
            setCurrentProductDetail(product)
            setOpen(true)
        }))
    }

    console.log(currentProductDetail?.listColor?.filter(item => item.isSelected).map(item => {
        item.value = item.idColor
        item.label = item.nameColor
        return item
    }))

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
                        <Select
                            options={currentProductDetail?.listColor?.filter(item => item.isSelected).map(item => {
                                item.value = item.idColor
                                item.label = item.nameColor
                                return item
                            })}/>
                        <Button className="mr-2" variant={'contained'}>
                            Chọn
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default SearchProduct