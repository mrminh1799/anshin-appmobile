import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {
    useGetAllProducts,
    useGetDetailProduct,
    useGetFilterProduct,
    useGetListColor,
    useGetListSize
} from "../../../service/product";
import './style.css'

import {styled} from '@mui/material/styles';
import Image from "../../../utils/Image";

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

function Shop() {
    let detail = useHistory();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [idProduct, setIdProduct] = useState()
    const [allSize, setAllSize] = useState()
    const [allColor, setAllColor] = useState()
    const listColor = useGetListColor({})
    const listSize = useGetListSize({})
    const [checkFilter, setCheckFilter] = useState(true)
    const [pagination, setPagination] = useState({
        index: 0,
        size: 8
    });
    const [order, setOrder] = useState([])
    const [listOrder, setListOrder] = useState([])
    const [currentSize, setcurrentSize] = useState(null)
    const [currentColor, setcurrentColor] = useState(null)
    const [filterProduct, setFilterProduct] = useState({
        size: 0,
        priceFrom: 0,
        priceTo: 0,
        color: 0,
        labelPrice: "",
        labelSize: "",
        labelColor: ""
    })
    const priceFilter = [
        {
            label: "Tất cả",
            priceFrom: 0,
            priceTo: 0
        },
        {
            label: "$1 - $100",
            priceFrom: 1,
            priceTo: 100
        },
        {
            label: "$100 - $500",
            priceFrom: 100,
            priceTo: 500
        },
        {
            label: "$500 - $1000",
            priceFrom: 500,
            priceTo: 1000
        },
        {
            label: "Trên $1000",
            priceFrom: 1000,
            priceTo: 100000000
        }
    ]
    const allProducts = useGetAllProducts({})
    const detailProduct = useGetDetailProduct({
        id: idProduct
    })

    const filterSP = useGetFilterProduct({
        idColor: filterProduct?.color,
        idSize: filterProduct?.size,
        priceFrom: filterProduct?.priceFrom,
        priceTo: filterProduct?.priceTo
    })
    const toDetailProduct = (item) => {
        setIdProduct(item?.id)
    }

    useEffect(() => {
        allProducts.refetch()
    }, [])
    useEffect(() => {
        if (allProducts?.data) {
            setTotalPage(Math.ceil(allProducts?.data?.length / pagination.size))
            setPagination({
                ...pagination,
                index: 0
            })
            setListOrder(allProducts?.data)
            setOrder(allProducts?.data.slice(0, pagination.size))

        }
    }, [allProducts.data])


    useEffect(() => {
        filterSP.refetch()
    }, [checkFilter])

    useEffect(() => {
        listColor.refetch()
        listSize.refetch()
    }, [])

    useEffect(() => {
        if (listSize?.data) {
            setAllSize([{id: 0, size_name: "Tất cả"}, ...listSize?.data])
        }

    }, [listSize?.data])

    useEffect(() => {
        if (listColor?.data) {
            setAllColor([{id: 0, colorName: "Tất cả"}, ...listColor?.data])
        }
    }, [listColor?.data])

    useEffect(() => {
        if (idProduct) {
            detailProduct.refetch().then(res => {
                if (res) {
                    detail.push(`/detail/${idProduct}`, {
                        item: res?.data
                    })
                }
            })
        }
    }, [idProduct])
    useEffect(() => {
        if (listOrder) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            // console.log('1121321',lastIndex,firstIndex)
            setOrder(listOrder.slice(firstIndex, lastIndex))
        }
    }, [listOrder])


    useEffect(() => {
        if (listOrder) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            // setTotalPage(Math.ceil(listOrder.length / pagination.size))
            setOrder(listOrder.slice(firstIndex, lastIndex))
        }
    }, [pagination.index])

    const onChangePage = (event, newPage) => {
        setPagination({
            ...pagination,
            index: newPage - 1
        });
    };
    return (
        <div>
            <section className="popular-items">
                <div className="container">
                    {/*<FormControl style={{width: 200}}>*/}
                    {/*    <InputLabel id="demo-simple-select-label">Màu sắc</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        labelId="demo-simple-select-label"*/}
                    {/*        id="demo-simple-select"*/}
                    {/*        value={currentColor}*/}
                    {/*        defaultValue={filterProduct.labelColor}*/}
                    {/*        onChange={(event) => {*/}
                    {/*            setcurrentColor(event.target.value)*/}
                    {/*            setCheckFilter(false)*/}
                    {/*            setFilterProduct(prev => ({*/}
                    {/*                ...prev,*/}
                    {/*                color: event.target.value.id,*/}
                    {/*                labelColor: event.target.value.colorName*/}
                    {/*            }))*/}

                    {/*        }}*/}

                    {/*    >*/}
                    {/*        {*/}
                    {/*            allColor?.map((item, index) => {*/}
                    {/*                return (*/}
                    {/*                    <MenuItem value={item}>{item.colorName}</MenuItem>*/}
                    {/*                )*/}
                    {/*            })*/}
                    {/*        }*/}

                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                    {/*<FormControl style={{width: 200}}>*/}
                    {/*    <InputLabel id="demo-simple-select-label">Kích cỡ</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        labelId="demo-simple-select-label"*/}
                    {/*        id="demo-simple-select"*/}
                    {/*        value={currentSize}*/}
                    {/*        defaultValue={filterProduct.labelSize}*/}
                    {/*        onChange={(event) => {*/}
                    {/*            setcurrentSize(event.target.value)*/}
                    {/*            setCheckFilter(false)*/}
                    {/*            setFilterProduct(prev => ({*/}
                    {/*                ...prev,*/}
                    {/*                size: event.target.value.id,*/}
                    {/*                labelSize: event.target.value.size_name*/}
                    {/*            }))*/}

                    {/*        }}*/}

                    {/*    >*/}
                    {/*        {*/}
                    {/*            allSize?.map((item, index) => {*/}
                    {/*                return (*/}
                    {/*                    <MenuItem value={item}>{item.size_name}</MenuItem>*/}
                    {/*                )*/}
                    {/*            })*/}
                    {/*        }*/}

                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                    {/*<FormControl style={{width: 200}}>*/}
                    {/*    <InputLabel id="demo-simple-select-label">Giá</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        labelId="demo-simple-select-label"*/}
                    {/*        id="demo-simple-select"*/}
                    {/*        value={filterProduct.labelPrice}*/}
                    {/*        label={filterProduct.labelPrice}*/}
                    {/*        defaultValue={filterProduct.labelPrice}*/}
                    {/*        onChange={(event) => {*/}
                    {/*            setCheckFilter(false)*/}
                    {/*            setFilterProduct(prev => ({*/}
                    {/*                ...prev,*/}
                    {/*                priceFrom: event.target.value.priceFrom,*/}
                    {/*                priceTo: event.target.value.priceTo,*/}
                    {/*                labelPrice: event.target.value.label*/}
                    {/*            }))*/}

                    {/*        }}*/}

                    {/*    >*/}
                    {/*        {*/}
                    {/*            priceFilter?.map((item, index) => {*/}
                    {/*                return (*/}
                    {/*                    <MenuItem value={item}>{item.label}</MenuItem>*/}
                    {/*                )*/}
                    {/*            })*/}
                    {/*        }*/}

                    {/*    </Select>*/}
                    {/*</FormControl>*/}

                    {
                        checkFilter ?
                            <div className="tab-content" id="nav-tabContent" style={{marginTop: 50}}>
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                     aria-labelledby="nav-home-tab">
                                    <div className="row">
                                        {order?.map((value, index) => {
                                            return (
                                                <div onClick={() => toDetailProduct(value)} key={index}
                                                     className="col-xl-3 popular-img">
                                                    <div className="single-popular-items mb-25">
                                                        <div className="popular-img" style={{
                                                            minWidth: 260,
                                                            minHeight: 260 / 212 * 319,
                                                            overFlow: "hidden",
                                                            borderWidth: 0
                                                        }}>
                                                            <Image src={value.image}
                                                                 style={{height: '100%', width: '100%'}}/>
                                                        </div>
                                                        <button style={{
                                                            borderWidth: 0,
                                                            backgroundColor: 'white',
                                                            textAlign: 'left',
                                                            fontWeight: 'bold'
                                                        }} onClick={() => toDetailProduct(value)}>
                                                            <h5>
                                                                <span className={'threeDot'}
                                                                      color={'white'}>{value.name}</span>
                                                            </h5>
                                                            <span style={{
                                                                color: 'darkRed',
                                                                fontSize: 18
                                                            }}>{value.price}<span style={{
                                                                textDecoration: 'underline',
                                                                fontSize: 14
                                                            }}>đ</span></span>
                                                        </button>
                                                        <div className="popular-img" style={{
                                                            width: '100%',
                                                            height: 35,
                                                            overflow: 'unset',
                                                            borderBottom: 0
                                                        }}>

                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <Pagination
                                    page={pagination.index + 1}
                                    count={totalPage}
                                    onChange={onChangePage}
                                    className="py-4 d-flex justify-content-center"
                                />
                            </div>
                            :
                            <div className="tab-content" id="nav-tabContent" style={{marginTop: 50}}>
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                     aria-labelledby="nav-home-tab">
                                    <div className="row justify-content-around">
                                        {filterSP?.data && filterSP?.data.map((value, index) => {
                                            return (
                                                <div onClick={() => toDetailProduct(value)} key={index}
                                                     className="col-xl-3 popular-img">
                                                    <div className="single-popular-items mb-25">
                                                        <div className="popular-img" style={{
                                                            minWidth: 260,
                                                            minHeight: 260 / 212 * 319,
                                                            overFlow: "hidden",
                                                            borderWidth: 0
                                                        }}>
                                                            <img src={value.image}
                                                                 style={{height: '100%', width: '100%'}}/>
                                                        </div>
                                                        <button style={{
                                                            borderWidth: 0,
                                                            backgroundColor: 'white',
                                                            textAlign: 'left',
                                                            fontWeight: 'bold'
                                                        }} onClick={() => toDetailProduct(value)}>
                                                            <h5>
                                                                <span className={'threeDot'}
                                                                      color={'white'}>{value.name}</span>
                                                            </h5>
                                                            <span style={{
                                                                color: 'darkRed',
                                                                fontSize: 18
                                                            }}>{value.price}<span style={{
                                                                textDecoration: 'underline',
                                                                fontSize: 14
                                                            }}>đ</span></span>
                                                        </button>
                                                        <div className="popular-img" style={{
                                                            width: '100%',
                                                            height: 35,
                                                            overflow: 'unset',
                                                            borderBottom: 0
                                                        }}>

                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <Pagination
                                    count={totalPage}
                                    onChange={onChangePage}
                                    className="py-4 d-flex justify-content-center"
                                />
                            </div>
                    }
                </div>
            </section>
        </div>
    )
}

export default Shop;