import {Link} from "react-router-dom";
import {useGetTop10, useGetTop10Sell} from "../../../service/product";
import React, {useEffect, useState} from "react";
import {Button, Drawer} from "@mui/material";


function Home() {
    const top10Products = useGetTop10({})

    useEffect(() => {
        top10Products.refetch()
    }, [])
    const top10ProductsSell = useGetTop10Sell({})
    useEffect(() => {
        top10ProductsSell.refetch()
    }, [])


    return (
        <div>
            <div className="section">
                <div className="slider-area ">
                    <img style={{
                        maxWidth: '100%'
                    }}
                        src="https://lh4.googleusercontent.com/-qW3mCh8EuAg/YUNWrZEC8tI/AAAAAAAAAt0/zheiI52e8DIXUYI1ggoeiIHYRCekpMdCwCLcBGAsYHQ/s0/BANNER%2BWEB.11112.1.jpg"/>
                </div>
                <div className="popular-items pt-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-8 col-md-10">
                                <div className="section-tittle mb-70 text-center">
                                    <h2 style={{textTransform: 'uppercase', fontSize: 40, marginTop: 20}}>sản phẩm yêu thích</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-around">
                            {
                                top10Products?.data?.map((item, index) => {
                                    return index < 8 && (
                                        <div className="col-xl-3 popular-img">
                                            <div className="single-popular-items mb-50 text-center">
                                                <div className="popular-img">
                                                    <img src={item?.image}/>
                                                    <div className="favorit-items">
                                                        <span className="flaticon-heart"></span>
                                                    </div>
                                                </div>
                                                <button style={{
                                                    borderWidth: 0,
                                                    backgroundColor: 'white',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold'
                                                }}>
                                                    <h5>
                                                        <span className={'threeDot'} color={'white'}>{item.name}</span>
                                                    </h5>
                                                    <span style={{
                                                        color: 'darkRed',
                                                        fontSize: 18
                                                    }} >{item?.price}<span style={{textDecoration: 'underline', fontSize: 14}}>đ</span></span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="gallery-area">
                    <div className="container-fluid p-0 fix">
                        <div className="row">
                            <div className="col-xl-6 col-lg-4 col-md-6 col-sm-6">
                                <div className="single-gallery mb-30">
                                    <div className="gallery-img big-img"
                                         style={{backgroundImage: `url("https://mcdn.nhanh.vn/store/2071/bn/SP_moi_Desk_2z.jpg")`}}></div>

                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                <div className="single-gallery mb-30">
                                    <div className="gallery-img big-img"
                                         style={{backgroundImage: `url("https://mcdn.nhanh.vn/store/2071/ps/20211115/KNN01518_1_copyaaaa.jpg")`,
                                             backgroundPosition: "center"}}></div>

                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-12">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-6 col-sm-6">
                                        <div className="single-gallery mb-30">
                                            <div className="gallery-img small-img"
                                                 style={{backgroundImage: `url("https://360boutique.vn/wp-content/uploads/2022/04/Capture-2.png")`}}></div>

                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12  col-md-6 col-sm-6">
                                        <div className="single-gallery mb-30">
                                            <div className="gallery-img small-img"
                                                 style={{backgroundImage: `url("https://mcdn.nhanh.vn/store/2071/ps/20220210/KNN03337_1_copya.jpg")`}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="popular-items mt-5 pt-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-8 col-md-10">
                                <div className="section-tittle mb-70 text-center">
                                    <h2 style={{textTransform: 'uppercase', fontSize: 40}}>sản phẩm yêu thích</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                top10ProductsSell?.data?.map((item, index) => {
                                    return index < 8 && (
                                        <div className="col-xl-3 popular-img">
                                            <div className="single-popular-items mb-50 text-center">
                                                <div className="popular-img">
                                                    <img src={item?.image}/>
                                                    <div className="favorit-items">
                                                        <span className="flaticon-heart"></span>
                                                    </div>
                                                </div>
                                                <button style={{
                                                    borderWidth: 0,
                                                    backgroundColor: 'white',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold'
                                                }}>
                                                    <h5>
                                                        <span className={'threeDot'} color={'white'}>{item.name}</span>
                                                    </h5>
                                                    <span style={{
                                                        color: 'darkRed',
                                                        fontSize: 18
                                                    }} >{item?.price}<span style={{textDecoration: 'underline', fontSize: 14}}>đ</span></span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="shop-method-area">
                    <div className="container">
                        <div className="method-wrapper">
                            <div className="row d-flex justify-content-between">
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="single-method mb-40">
                                        <i className="ti-package"></i>
                                        <h6>Free Shipping Method</h6>
                                        <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="single-method mb-40">
                                        <i className="ti-unlock"></i>
                                        <h6>Secure Payment System</h6>
                                        <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="single-method mb-40">
                                        <i className="ti-reload"></i>
                                        <h6>Secure Payment System</h6>
                                        <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;