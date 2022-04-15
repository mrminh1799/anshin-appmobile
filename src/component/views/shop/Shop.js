import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {
    useGetAllProducts,
    useGetDetailProduct, useGetFilterProduct,
    useGetListColor,
    useGetListSize
} from "../../../service/product";
import './style.css'


function Shop() {
    let detail = useHistory();
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [idProduct, setIdProduct] = useState()
    const [allSize, setAllSize] = useState()
    const [allColor, setAllColor] = useState()
    const listColor = useGetListColor({})
    const listSize = useGetListSize({})
    const [checkFilter,setCheckFilter] = useState(true)


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
    const allProducts = useGetAllProducts({
        currenPage: 1,
        sizePage: 9
    })
    const detailProduct = useGetDetailProduct({
        id: idProduct
    })

    const filterSP= useGetFilterProduct({
        idColor:filterProduct?.color,
        idSize:filterProduct?.size,
        priceFrom: filterProduct?.priceFrom,
        priceTo: filterProduct?.priceTo
    })

    const toDetailProduct = (item) => {
        setIdProduct(item?.id)
    }

    const handleFilter = () =>{

    }

    useEffect(() => {
        filterSP.refetch()
        setCheckFilter(false)
    },[filterProduct])

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

    const onChangePage = (event, newPage) => {
        setPage(newPage);
    };
    return (
        <div>
            <div className="slider-area">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Shop</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="popular-items latest-padding">
                <div className="container" style={{maxWidth: '95%'}}>
                    <FormControl style={{width: 200}}>
                        <InputLabel id="demo-simple-select-label">Màu sắc</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterProduct.labelColor}
                            label={filterProduct.labelColor}
                            defaultValue={filterProduct.labelColor}
                            onChange={(event) => {
                                setFilterProduct(prev => ({
                                    ...prev,
                                    color: event.target.value.id,
                                    labelColor: event.target.value.colorName
                                }))

                            }}

                        >
                            {
                                allColor?.map((item, index) => {
                                    return (
                                        <MenuItem value={item}>{item.colorName}</MenuItem>
                                    )
                                })
                            }

                        </Select>
                    </FormControl>
                    <FormControl style={{width: 200}}>
                        <InputLabel id="demo-simple-select-label">Kích cỡ</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterProduct.labelSize}
                            label={filterProduct.labelSize}
                            defaultValue={filterProduct.labelSize}
                            onChange={(event) => {
                                console.log('ưewe', event.target.value)
                                setFilterProduct(prev => ({
                                    ...prev,
                                    size: event.target.value.id,
                                    labelSize: event.target.value.size_name
                                }))

                            }}

                        >
                            {
                                allSize?.map((item, index) => {
                                    return (
                                        <MenuItem value={item}>{item.size_name}</MenuItem>
                                    )
                                })
                            }

                        </Select>
                    </FormControl>
                    <FormControl style={{width: 200}}>
                        <InputLabel id="demo-simple-select-label">Giá</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterProduct.labelPrice}
                            label={filterProduct.labelPrice}
                            defaultValue={filterProduct.labelPrice}
                            onChange={(event) => {
                                setFilterProduct(prev => ({
                                    ...prev,
                                    priceFrom: event.target.value.priceFrom,
                                    priceTo: event.target.value.priceTo,
                                    labelPrice: event.target.value.label
                                }))

                            }}

                        >
                            {
                                priceFilter?.map((item, index) => {
                                    return (
                                        <MenuItem value={item}>{item.label}</MenuItem>
                                    )
                                })
                            }

                        </Select>
                    </FormControl>

                    {
                        checkFilter?
                            <div className="tab-content" id="nav-tabContent" style={{marginTop: 50}}>
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                     aria-labelledby="nav-home-tab">
                                    <div className="row">
                                        {allProducts?.data && allProducts?.data.map((value, index) => {
                                            return (
                                                <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="single-popular-items mb-50 text-center">
                                                        <div className="popular-img" style={{
                                                            backgroundImage: `url(${value.image})`,
                                                            width: 360,
                                                            height: 360,
                                                            overFlow: "hidden",
                                                            backgroundSize: "cover",
                                                            backgroundRepeat: "no-repeat",
                                                            backgroundPosition: "center"
                                                        }}>
                                                            {/*<div className="img-cap">*/}
                                                            {/*    <span >Thêm vào giỏ hàng</span>*/}
                                                            {/*</div>*/}
                                                        </div>
                                                        <button onClick={() => toDetailProduct(value)}
                                                                className="btn-danger">
                                                            <h4>
                                                                <span color={'white'}>{value.name}</span>

                                                            </h4>
                                                            <span>${value.price}</span>
                                                        </button>
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
                            :
                            <div className="tab-content" id="nav-tabContent" style={{marginTop: 50}}>
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                     aria-labelledby="nav-home-tab">
                                    <div className="row justify-content-around">
                                        {filterSP?.data && filterSP?.data.map((value, index) => {
                                            return (
                                                <div key={index} className="col-xl-3 popular-img">
                                                    <div className="single-popular-items mb-25">
                                                        <div className="popular-img" style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            overFlow: "hidden",
                                                            borderWidth: 0
                                                        }}>
                                                            <img src={value.image}/>
                                                        </div>
                                                        <button style={{
                                                            borderWidth: 0,
                                                            backgroundColor: 'white',
                                                            textAlign: 'left',
                                                            fontWeight: 'bold'
                                                        }} onClick={() => toDetailProduct(value)}>
                                                            <h5>
                                                                <span className={'threeDot'} color={'white'}>{value.name}</span>
                                                            </h5>
                                                            <span style={{
                                                                color: 'darkRed',
                                                                fontSize: 18
                                                            }} >{value.price}<span style={{textDecoration: 'underline', fontSize: 14}}>đ</span></span>
                                                        </button>
                                                        <div className="popular-img" style={{
                                                            width: '100%',
                                                            height: 35,
                                                            overflow: 'unset',
                                                            borderBottom: 0
                                                        }}>
                                                            <div>
                                                                <div className="img-cap w-50" style={{textAlign: 'center', height: 25, left: 0}}>
                                                                    <span style={{padding: '10px 0', borderRight: '1px solid'}}>Thêm vào giỏ hàng</span>
                                                                </div>
                                                                <div className="img-cap w-50" style={{textAlign: 'center', height: 25, right: 0}}>
                                                                    <span style={{padding: '10px 0'}}>Xem chi tiết</span>
                                                                </div>
                                                            </div>
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