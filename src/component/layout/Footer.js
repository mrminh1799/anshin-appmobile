import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {useGetParentCate, useGetProductParentCate} from "../../service/product";


function Footer() {

    const list = useHistory()
    const [idCateParent,setIdCateParent] = useState()

    const productParentCate=useGetProductParentCate({
        id: idCateParent
    })
    const categoryNav = useGetParentCate({})

    useEffect(()=>{
       categoryNav.refetch()
    },[])

    const detailListParent=(value)=>{
        setIdCateParent(value?.idCategory)
    }

    useEffect(() => {
        if(idCateParent){
            productParentCate.refetch().then(res=>{
                if (res){
                    list.push(`/findProduct`,{
                        item: res?.data
                    })
                }
            })
        }
    },[idCateParent])

    return (
        <div className="footer-area footer-padding pb-2">
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                        <div className="single-footer-caption">
                            <div className="single-footer-caption">
                                <div className="footer-logo">
                                    <Link to="/">
                                        <span style={{ fontSize: 28, fontWeight: "bold", color: "black" }} >
                                            Anshin <span style={{ color: "red" }}>Zone</span>
                                        </span>
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