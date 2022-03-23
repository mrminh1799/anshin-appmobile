import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {
    useGetAllProducts,
    useGetDetailProduct,
    useGetListColor,
    useGetListSize, useGetProductDiscount
} from "../../../service/product";


function ProductDiscount() {
    const [productDiscount, setProductDiscount] = useState([]);
    const [totalPage, setTotalPage] = useState(1);

    const getProductDiscount = useGetProductDiscount({})
    useEffect(() => {
        getProductDiscount.refetch()
    },[])
    useEffect(() => {
        if(getProductDiscount?.data){
            setProductDiscount(getProductDiscount?.data)
        }
    },[getProductDiscount?.data])
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
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                             aria-labelledby="nav-home-tab">
                            <div className="row">
                                {productDiscount?.map((value, index) => {
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
                                                <button
                                                        className="popular-caption">
                                                    <h3>
                                                        <span>{value?.saleEvent?.nameEvent}</span>
                                                        <span>{value?.saleEvent?.startTime}</span>
                                                        <span>{value?.saleEvent?.endTime}</span>
                                                    </h3>
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

                            className="py-4 d-flex justify-content-center"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductDiscount;