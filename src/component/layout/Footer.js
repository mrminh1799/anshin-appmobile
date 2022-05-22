import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {GetProductParentCate, useGetParentCate, useGetProductParentCate} from "../../service/product";
import {useDispatch} from "react-redux";


function Footer() {

    const list = useHistory()
    const [idCateParent,setIdCateParent] = useState()

    const dispatch = useDispatch()
    const categoryNav = useGetParentCate({})

    useEffect(()=>{
       categoryNav.refetch()
    },[])

    const detailListParent=(value)=>{
        dispatch(GetProductParentCate({
            id: value.idCategory
        },res=>{
            if (res){
                list.push(`/findProduct`,{
                    item: res
                })
            }
        }))
    }

    return (
        <div className="footer-area footer-padding pb-2">
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                        <div className="single-footer-caption">
                            <div className="single-footer-caption">
                                <div className="footer-logo">
                                    <Link to="/">
                                        <img width="200px" height={'80px'} style={{objectFit: 'cover'}} src="https://firebasestorage.googleapis.com/v0/b/anshin-b910b.appspot.com/o/images%2F1-removebg-preview.png?alt=media&token=5b68e872-12d6-4096-a655-4f3fe40fd9ca"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-5">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Danh mục</h4>
                                <ul>
                                    {
                                        categoryNav?.data?.map(item=> <li onClick={()=>detailListParent(item)}><Link>{item?.nameCategory}</Link></li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-7">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Sản phẩm mới</h4>
                                <ul>
                                    <li><Link href="#">Woman Cloth</Link></li>
                                    <li><Link href="#">Fashion Accessories</Link></li>
                                    <li><Link href="#"> Man Accessories</Link></li>
                                    <li><Link href="#"> Rubber made Toys</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-5 col-sm-7">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Liên hệ</h4>
                                <ul>
                                    <li><Link href="https://www.facebook.com/ashin.store.68">https://www.facebook.com/ashin.store.68</Link></li>
                                    <li><Link href="#">0359530143</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;