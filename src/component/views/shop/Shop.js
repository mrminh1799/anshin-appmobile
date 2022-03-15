import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Link, NavLink, BrowserRouter, Switch, useHistory} from "react-router-dom";
import callApi from "../../callAPI/apiCaller";
import {useGetAllProduct, useGetAllProducts, useGetDetailProduct} from "../../../service/product";

function Shop() {
    const [product, setProduct] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);
    const [category, setCategory] = useState();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [idProduct, setIdProduct] = useState()
    let detail = useHistory();
    const allProducts = useGetAllProducts({
        currenPage:1,
        sizePage: 9
    })
    const detailProduct = useGetDetailProduct({
        id:idProduct
    })
    console.log('22',idProduct)
    const toDetailProduct =(item)=>{
        console.log('item',item.id)
        setIdProduct(item?.id)
       if(idProduct){
           detailProduct.refetch().then(res =>{
               if(res){
                   detail.push(`/detail/${item.id}`,{
                       item:res?.data
                   })
               }
           })
       }
        console.log('123',item)

    }
    console.log(detailProduct)
    // useEffect(() => {
    //     callApi(`product`, "GET", null)
    //         .then((response) => {
    //             const { data } = response;
    //             setProduct(data);
    //             setFilterProduct(data)
    //         })
    // }, [page, category]);


    // useEffect(() => {
    //     callApi(`category`, "GET", null)
    //         .then((response) => {
    //             const { data } = response;
    //             setCategory(data);
    //         })
    // }, []);

    const onChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const onChangeCate = (event) => {
        let data = event.target.value
        if (data.match('all')) {
            setFilterProduct(product)
        } else {
            setFilterProduct(() => {
                return product.filter(item => item.category.id == event.target.value)
            })
        }
    }
    return (
        <div>
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Watch Shop</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="popular-items latest-padding">
                <div className="container">
                    <div className="row product-btn justify-content-between mb-40">
                        {/* <div className="properties__button">
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <Link onClick={onClickHandler} className="nav-item nav-link" id="nav-name-tab" data-toggle="tab" href="#nav-name"
                                        role="tab" aria-controls="nav-name" aria-selected="true">Alphabetical
                        </Link>
                                    <Link onClick={onClickHandler} className="nav-item nav-link" id="nav-price-tab" data-toggle="tab" href="#nav-price"
                                        role="tab" aria-controls="nav-price" aria-selected="false"> Price
                        high to low</Link>
                                    <Link onClick={onClickHandler} className="nav-item nav-link" id="nav-pricelow-tab" data-toggle="tab" href="#nav-pricelow"
                                        role="tab" aria-controls="nav-pricelow" aria-selected="false"> Price
                        low to high</Link>
                                </div>
                            </nav>
                        </div> */}
                        <div className="grid-list-view">
                        </div>
                        <div className="select-this">
                            <form action="#">
                                <div className="select-itms">
                                    <select onChange={onChangeCate} className="custom-select">
                                        <option
                                            value={'all'}
                                        >
                                            All
                                        </option>
                                        {category && category.map(item => {
                                            console.log(item);
                                            return (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        })}

                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
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
                                                    <div className="img-cap">
                                                        <span onClick={()=>toDetailProduct(value)}>Thêm vào giỏ hàng</span>
                                                    </div>
                                                </div>
                                                <div className="popular-caption">
                                                    <h3>
                                                        <Link to={`/detail/${value.id}`}>{value.name}</Link>
                                                    </h3>
                                                    <span>${value.price}</span>
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
                </div>
            </section>
        </div>
    )
}

export default Shop;