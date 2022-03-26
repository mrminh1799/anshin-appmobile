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