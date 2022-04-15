import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {Pagination} from "@material-ui/lab";
import {useGetDetailProduct} from "../../../service/product";
const ListProductFindByCate =()=>{
    const location = useLocation()
    let detail = useHistory();
    const {item} = location.state
    const [idProduct, setIdProduct] = useState()
    const detailProduct = useGetDetailProduct({
        id: idProduct
    })
    const toDetailProduct =(value)=>{
        setIdProduct(value?.id)
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
    return(
        <div >
            <section className="popular-items latest-padding">
                <div className="container">
                    {
                        item?.length>0 ?
                            <div className="tab-content" id="nav-tabContent" style={{marginTop: 50}}>
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                     aria-labelledby="nav-home-tab">
                                    <div className="row">
                                        {item?.map((value, index) => {
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
                                                                    <span onClick={() => toDetailProduct(value)} style={{padding: '10px 0'}}>Xem chi tiết</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                {/*<Pagination*/}
                                {/*    count={totalPage}*/}
                                {/*    onChange={onChangePage}*/}
                                {/*    className="py-4 d-flex justify-content-center"*/}
                                {/*/>*/}
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