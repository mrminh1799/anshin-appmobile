import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useEffect, useState} from "react";
import {Link as RouterLink, Link, useHistory} from "react-router-dom";
import {
    useGetAllProducts,
    useGetDetailProduct, useGetFilterProduct,
    useGetListColor,
    useGetListSize
} from "../../../service/product";

import { styled } from '@mui/material/styles';
import {Card, Grid, Typography,Box,Stack} from "@mui/material";
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
    const [checkFilter,setCheckFilter] = useState(true)
    const [pagination, setPagination] = useState({
        index: 0,
        size: 10
    });
    const [order, setOrder] = useState([])
    const [listOrder, setListOrder] = useState([])
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
    useEffect(() => {allProducts.refetch()},[])
    useEffect(() => {
        if(allProducts?.data){
                setTotalPage(Math.ceil(allProducts?.data?.length / pagination.size))
                setPagination({
                    ...pagination,
                    index: 0
                })
                setListOrder(allProducts?.data)
                setOrder(allProducts?.data.slice(0, pagination.size))

        }
    },[allProducts.data])

    console.log('allProducts',order)
    useEffect(() => {
        filterSP.refetch()
    },[checkFilter])

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
            <div className="slider-area ">
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
                <div className="container">
                    <FormControl style={{width: 200}}>
                        <InputLabel id="demo-simple-select-label">Màu sắc</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterProduct.labelColor}
                            label={filterProduct.labelColor}
                            defaultValue={filterProduct.labelColor}
                            onChange={(event) => {
                                setCheckFilter(false)
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
                                setCheckFilter(false)
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
                                setCheckFilter(false)
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


                                    <Grid container spacing={3}>

                                        {
                                            order?.map((item, index) =>  {
                                                return (
                                                    <Grid  key={item?.id} item xs={12} sm={6} md={2.2} onClick={() => toDetailProduct(item)}>
                                                        <Card>
                                                            <Box sx={{ pt: '100%', position: 'relative' }}>

                                                                {/*<Label*/}
                                                                {/*    variant="filled"*/}
                                                                {/*    // color={(status === 'sale' && 'error') || 'info'}*/}
                                                                {/*    sx={{*/}
                                                                {/*        zIndex: 9,*/}
                                                                {/*        top: 16,*/}
                                                                {/*        right: 16,*/}
                                                                {/*        position: 'absolute',*/}
                                                                {/*        textTransform: 'uppercase'*/}
                                                                {/*    }}*/}
                                                                {/*>*/}
                                                                {/*   123*/}
                                                                {/*</Label>*/}

                                                                <ProductImgStyle src={item?.image} />
                                                            </Box>

                                                            <Stack spacing={2} sx={{ p: 3 }}>
                                                                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                                                                    <Typography variant="subtitle2" noWrap>
                                                                        {item?.name}}
                                                                    </Typography>
                                                                </Link>

                                                                <Stack direction="row" alignItems="center" justifyContent="space-between">

                                                                    <Typography variant="subtitle1">
                                                                        {/*<Typography*/}
                                                                        {/*    component="span"*/}
                                                                        {/*    variant="body1"*/}
                                                                        {/*    sx={{*/}
                                                                        {/*        color: 'text.disabled',*/}
                                                                        {/*        textDecoration: 'line-through'*/}
                                                                        {/*    }}*/}
                                                                        {/*>*/}
                                                                        {/*   123*/}
                                                                        {/*</Typography>*/}
                                                                        &nbsp;
                                                                        $ {item?.price}
                                                                    </Typography>
                                                                </Stack>
                                                            </Stack>
                                                        </Card>
                                                    </Grid>
                                                )
                                            })
                                        }

                                    </Grid>
                                    {/*<div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-6">*/}
                                    {/*    <div className="single-popular-items mb-50 text-center">*/}
                                    {/*        <div className="popular-img" style={{*/}
                                    {/*            backgroundImage: `url(${value.image})`,*/}
                                    {/*            width: 360,*/}
                                    {/*            height: 360,*/}
                                    {/*            overFlow: "hidden",*/}
                                    {/*            backgroundSize: "cover",*/}
                                    {/*            backgroundRepeat: "no-repeat",*/}
                                    {/*            backgroundPosition: "center"*/}
                                    {/*        }}>*/}
                                    {/*            /!*<div className="img-cap">*!/*/}
                                    {/*            /!*    <span >Thêm vào giỏ hàng</span>*!/*/}
                                    {/*            /!*</div>*!/*/}
                                    {/*        </div>*/}
                                    {/*        <button onClick={() => toDetailProduct(value)}*/}
                                    {/*                className="btn-danger">*/}
                                    {/*            <h4>*/}
                                    {/*                <span color={'white'}>{value.name}</span>*/}

                                    {/*            </h4>*/}
                                    {/*            <span>${value.price}</span>*/}
                                    {/*        </button>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

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

                                    return (
                                    <Grid container spacing={3}>

                                        {
                                            filterSP?.data && filterSP?.data.map((item, index) =>  {
                                                return (
                                                    <Grid  key={item?.id} item xs={12} sm={6} md={2.2} onClick={() => toDetailProduct(item)}>
                                                        <Card>
                                                            <Box sx={{ pt: '100%', position: 'relative' }}>

                                                                {/*<Label*/}
                                                                {/*    variant="filled"*/}
                                                                {/*    // color={(status === 'sale' && 'error') || 'info'}*/}
                                                                {/*    sx={{*/}
                                                                {/*        zIndex: 9,*/}
                                                                {/*        top: 16,*/}
                                                                {/*        right: 16,*/}
                                                                {/*        position: 'absolute',*/}
                                                                {/*        textTransform: 'uppercase'*/}
                                                                {/*    }}*/}
                                                                {/*>*/}
                                                                {/*   123*/}
                                                                {/*</Label>*/}

                                                                <ProductImgStyle src={item?.image} />
                                                            </Box>

                                                            <Stack spacing={2} sx={{ p: 3 }}>
                                                                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                                                                    <Typography variant="subtitle2" noWrap>
                                                                        {item?.name}}
                                                                    </Typography>
                                                                </Link>

                                                                <Stack direction="row" alignItems="center" justifyContent="space-between">

                                                                    <Typography variant="subtitle1">
                                                                        {/*<Typography*/}
                                                                        {/*    component="span"*/}
                                                                        {/*    variant="body1"*/}
                                                                        {/*    sx={{*/}
                                                                        {/*        color: 'text.disabled',*/}
                                                                        {/*        textDecoration: 'line-through'*/}
                                                                        {/*    }}*/}
                                                                        {/*>*/}
                                                                        {/*   123*/}
                                                                        {/*</Typography>*/}
                                                                        &nbsp;
                                                                        $ {item?.price}
                                                                    </Typography>
                                                                </Stack>
                                                            </Stack>
                                                        </Card>
                                                    </Grid>
                                                )
                                            })
                                        }

                                    </Grid>
                                    {/*<div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-6">*/}
                                    {/*    <div className="single-popular-items mb-50 text-center">*/}
                                    {/*        <div className="popular-img" style={{*/}
                                    {/*            backgroundImage: `url(${value.image})`,*/}
                                    {/*            width: 360,*/}
                                    {/*            height: 360,*/}
                                    {/*            overFlow: "hidden",*/}
                                    {/*            backgroundSize: "cover",*/}
                                    {/*            backgroundRepeat: "no-repeat",*/}
                                    {/*            backgroundPosition: "center"*/}
                                    {/*        }}>*/}
                                    {/*            /!*<div className="img-cap">*!/*/}
                                    {/*            /!*    <span >Thêm vào giỏ hàng</span>*!/*/}
                                    {/*            /!*</div>*!/*/}
                                    {/*        </div>*/}
                                    {/*        <button onClick={() => toDetailProduct(value)}*/}
                                    {/*                className="btn-danger">*/}
                                    {/*            <h4>*/}
                                    {/*                <span color={'white'}>{value.name}</span>*/}

                                    {/*            </h4>*/}
                                    {/*            <span>${value.price}</span>*/}
                                    {/*        </button>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

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