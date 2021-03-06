import {useHistory} from "react-router-dom";
import {useGetDetailProduct, useGetTop10, useGetTop10Sell} from "../../../service/product";
import React, {useEffect, useState} from "react";
import Image from "../../../utils/Image";
import useWindowDimensions from "../../../utils/Screen";


function Home() {
    let detail = useHistory();
    const top10Products = useGetTop10({})
    const [idProduct, setIdProduct] = useState()
    const {width, height} = useWindowDimensions()
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
                    <Image style={{
                        width: '100%',
                        height: width / 1425 * 474
                    }}
                           src="https://firebasestorage.googleapis.com/v0/b/anshin-b910b.appspot.com/o/images%2F1900x632_copy_min.jpg?alt=media&token=30930929-3074-466b-a58f-edb56a15283f "/>
                </div>
                <div className="popular-items pt-5">
                    <div className="container">
                        <div className="section-tittle mb-70 text-center">
                            <h2 style={{textTransform: 'uppercase', fontSize: 40, marginTop: 20}}>sản phẩm mới ra
                                mắt</h2>
                        </div>
                        <div className="row justify-content-around">
                            {
                                top10Products?.data?.map((item, index) => {
                                    return index < 8 && (
                                        <div
                                            onClick={() => toDetailProduct(item)} key={index}
                                            className="col-xl-3 popular-img">
                                            <div className="single-popular-items mb-50 text-center">
                                                <div className="popular-img" style={{
                                                    minWidth: 260,
                                                    minHeight: 260 / 212 * 319,
                                                    overFlow: "hidden",
                                                    borderWidth: 0
                                                }}>
                                                    <Image src={item?.image} style={{height: '100%', width: '100%'}}/>
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
                                                    }}>{item?.price}<span style={{
                                                        textDecoration: 'underline',
                                                        fontSize: 14
                                                    }}>đ</span></span>
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
                                        <div onClick={() => toDetailProduct(item)} className="col-xl-3 popular-img">
                                            <div className="single-popular-items mb-50 text-center">
                                                <div className="popular-img" style={{
                                                    minWidth: 260,
                                                    minHeight: 260 / 212 * 319,
                                                    overFlow: "hidden",
                                                    borderWidth: 0
                                                }}>
                                                    <Image src={item?.image} style={{height: '100%', width: '100%'}}/>
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
                                                    }}>{item?.price}<span style={{
                                                        textDecoration: 'underline',
                                                        fontSize: 14
                                                    }}>đ</span></span>
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