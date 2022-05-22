import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {useGetDetailProduct} from "../../../service/product";
import {Skeleton} from "@mui/material";
import Image from "../../../utils/Image";

const ListProductFindByCate = () => {
    const location = useLocation()
    let detail = useHistory();
    const {item} = location.state
    const [lstProduct, setLstProduct] = useState([])
    const [idProduct, setIdProduct] = useState()
    const detailProduct = useGetDetailProduct({
        id: idProduct
    })
    const toDetailProduct = (value) => {
        setIdProduct(value?.id)
    }

    useEffect(() => {
        setLstProduct([])
        setTimeout(()=>{
            setLstProduct([...item])
        },1)
        return clearTimeout()
    }, [item])

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

    return (
        <div>
            <section className="popular-items">
                <div className="container">
                    {
                        lstProduct?.length > 0 ?
                            <div className="tab-content" id="nav-tabContent" style={{marginTop: 50}}>
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                     aria-labelledby="nav-home-tab">
                                    <div className="row">
                                        {lstProduct?.map((value, index) => {
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
                            </div>
                            :
                            <div className="tab-content" id="nav-tabContent" style={{marginTop: 50}}>
                                <text>Sản phẩm hiện không còn</text>
                            </div>
                    }
                </div>
            </section>
        </div>

    )
}
export default ListProductFindByCate