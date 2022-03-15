import {TextField} from "@material-ui/core";
import {useEffect, useState} from "react";
import styles from '../../../style/productStyle.module.css'

import {
    Link,
    useParams,
    useLocation
} from "react-router-dom";
import {useGetCheckProduct, useGetColorProduct, useGetSizeProduct} from "../../../service/product";
import Storage from "../../../utils/Storage";


const Detail = () => {
    const location = useLocation()
    const {item} = location.state

    const [product, setProduct] = useState({
        productId: item?.id,
        colorId: "",
        sizeId: "",
        color: "",
        size: "",
        quantity: 1,
        image: item?.image
    });

    const checkProduct = useGetCheckProduct({
        idColor: product?.colorId,
        idSize: product?.sizeId,
        idProduct: product?.productId
    })

    const onChangeHandler = (event) => {
        if (event.target.value < 1) {

        } else {
            setProduct(prev => ({
                ...prev,
                quantity: event.target.value
            }))
        }

    }

    const size = useGetSizeProduct({
        id: item?.id
    })
    const color = useGetColorProduct({
        id: item?.id
    })
    const handleClickSizes = (item) => {
        setProduct(prev => ({
            ...prev,
            sizeId: item?.id,
            size: item?.size_name
        }))
    }
    const handleClickColors = (item) => {
        setProduct(prev => ({
            ...prev,
            colorId: item?.id,
            color: item?.color_name
        }))
    }
    const addToCart = () => {
        if (product?.colorId === '') {
            alert("Vui lòng chọn màu sắc");
            return;
        }
        if (product?.sizeId === '') {
            alert("Vui lòng chọn size");
            return;
        }
        // checkProduct.refetch().then((res) => {
        //     if(res.data){
        //         if (localStorage.getItem(item.id) == null) localStorage.setItem(item.id, product?.quantity);
        //         else {
        //             localStorage.setItem(item.id, 0)
        //             localStorage.setItem(item.id, Number(localStorage.getItem(item.id)) + Number(product?.quantity))
        //         }
        //         alert("Sản phầm đã thêm vào giỏ hàng");
        //     }else {
        //         alert("Sản phầm này đã hết");
        //     }
        // })
        // if (localStorage.getItem(item.id) == null) localStorage.setItem(item.id, product?.quantity, product?.productId, product?.colorId, product?.sizeId);
        // else {
        //     localStorage.setItem(item.id, 0)
        //     localStorage.setItem(item.id, Number(localStorage.getItem(item.id)) + Number(product?.quantity), product?.productId, product?.colorId, product?.sizeId)
        // }
        if (!!Storage.get('cart')) {
            console.log('vaotren')
            let check = true
            let cart = Storage.get('cart')?.map((item, i) => {
                if (item.id == product.productId) {
                    console.log('id',item.id,product.productId)
                    check = false
                    item.quantity = Number(item.quantity) + Number(product.quantity)
                }
                return item
            })

            if (check) {
                Storage.save('cart', [...Storage.get('cart'), product])
            }else {
                Storage.save('cart',cart)
            }
        } else {
            console.log('vaoday')
            Storage.save('cart', [product])
        }
        // Storage.delete('cart')
        alert("Sản phầm đã thêm vào giỏ hàng");
    }
    console.log('getcart', Storage.get('cart'))
    return (
        <div>
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Anshin Shop</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">

                <div className={styles.card}>
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-7">
                                <div className="preview-pic tab-content">
                                    <div id="pic-1">
                                        <img src={item?.image}/></div>
                                </div>

                            </div>
                            <div className="details col-md-5">
                                <h3 className={styles.productTitle}>{item?.name}</h3>
                                {/*<div className={styles.rating}>*/}

                                {/*    <span className="review-no">41 reviews</span>*/}
                                {/*</div>*/}

                                <h4 className={styles.price}>current price: <span>{product.price} $</span></h4>
                                <h5 className={styles.sizes}>size:
                                    {
                                        size?.data?.map((item, index) => {
                                            return (
                                                <input className="btn btn-primary ml-1"
                                                       onClick={() => handleClickSizes(item)} type="button"
                                                       value={item?.size_name}></input>
                                            )
                                        })
                                    }


                                </h5>
                                <h5 className={styles.colors}>colors:

                                    {
                                        color?.data?.map((item, index) => {
                                            return (
                                                <input type="button" onClick={() => handleClickColors(item)}
                                                       value={item?.color_name}></input>
                                            )
                                        })
                                    }
                                </h5>

                                <br></br>
                                <div className="action">
                                    <div>
                                        Size: <span>{product?.size}</span>
                                        <br/>
                                        Màu sắc: <span>{product?.color}</span>
                                        <br/>
                                        <div className="product_count_area">
                                            <TextField
                                                onChange={onChangeHandler}
                                                name="quantity"
                                                value={product?.quantity}
                                                label="Số lượng"
                                                className="mb-2"
                                                type="number"
                                            />
                                        </div>


                                    </div>
                                    <br/>
                                    <div>
                                        <button className="btn btn-primary ml-1" type="button">Mua ngay</button>
                                        <button onClick={addToCart} className="btn btn-primary ml-1" type="button">Thêm
                                            vào giỏ hàng
                                        </button>
                                        {/*<button className='btn btn-primary ml-1' type="button">Thích</button>*/}
                                    </div>
                                </div>

                                <br/>
                                <h2>Description</h2>
                                <p className={styles.productDescription}>{item?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Detail;