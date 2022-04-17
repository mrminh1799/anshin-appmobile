import {Link, Link as RouterLink, useHistory} from "react-router-dom";
import {useGetDetailProduct, useGetTop10, useGetTop10Sell} from "../../../service/product";
import React, {useEffect, useState} from "react";
import {Button, Drawer} from "@mui/material";


function Home() {
    let detail = useHistory();
    const top10Products = useGetTop10({})
    const [idProduct, setIdProduct] = useState()
    const detailProduct = useGetDetailProduct({
        id: idProduct
    })

    
    const toDetailProduct = (item) => {
        setIdProduct(item?.id)
    }
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
                        src="https://firebasestorage.googleapis.com/v0/b/anshin-b910b.appspot.com/o/sale50%25.jpg?alt=media&token=e5503710-23f7-472c-b530-5b017bd0f93f"/>
                </div>
                <div className="popular-items pt-5">
                    <div className="container">
                                <div className="section-tittle mb-70 text-center">
                                    <h2 style={{textTransform: 'uppercase', fontSize: 40, marginTop: 20}}>sản phẩm yêu thích</h2>
                                </div>
                        <div className="row justify-content-around">
                            {
                                top10Products?.data?.map((item, index) => {
                                    return index < 8 && (
                                        <div 
                                        onClick={() => toDetailProduct(item)} key={index} 
                                        className="col-xl-3 popular-img">
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
                
                <div className="popular-items mt-5 pt-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-8 col-md-10">
                                <div className="section-tittle mb-70 text-center">
                                    <h2 style={{textTransform: 'uppercase', fontSize: 40}}>sản phẩm bán chạy</h2>
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
            </div>
        </div>
    )
}

export default Home;