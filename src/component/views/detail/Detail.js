import {useEffect, useState} from "react";
import styles from '../../../style/productStyle.module.css'

import {useHistory, useLocation} from "react-router-dom";
import {useAddCart, useGetCheckProduct, useGetColorProduct, useGetSizeProduct} from "../../../service/product";
import Storage from "../../../utils/Storage";
import {useAuth} from "../../../context";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useGetProductId} from "../../../service/productService2";
import {toast} from "react-toastify";
import _ from "lodash";


const Detail = () => {
    const location = useLocation()
    const {userInfo, setUserInfo} = useAuth()
    const dispatch = useDispatch()
    const {item} = location.state
    const checkout = useHistory()
    const curProduct = useSelector(state => state.globalReducer.product_by_id)
    const [cart, setCart] = useState(null)
    const [checkImage, setCheckImage] = useState(true)
    const [product, setProduct] = useState({
        productId: item?.id,
        productIdDetail: "",
        colorId: "",
        sizeId: "",
        color: "",
        size: "",
        quantity: 1,
        image: item?.image,
        name: item?.name,
        price: item?.price,
        imageDetail: ""
    });
    const addToCartApi = useAddCart({
        id: userInfo?.id,
        idProduct: product?.productIdDetail,
        quantity: product?.quantity,
    })
    const checkProduct = useGetCheckProduct({
        idColor: product?.colorId,
        idSize: product?.sizeId,
        idProduct: product?.productId,
    })

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        dispatch(useGetProductId({
            id: item.id
        }))
    }, [])

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
        setCheckImage(false)
        setProduct(prev => ({
            ...prev,
            colorId: item?.id,
            color: item?.color_name,
            imageDetail: item?.image
        }))
    }

    const toCheckout = () => {
        if (product?.sizeId === '') {
            toast.warn("Vui lòng chọn size")
            return;
        }
        if (product?.colorId === '') {
            toast.warn("Vui lòng chọn màu sắc")
            return;
        }
        checkProduct.refetch().then((res) => {
            if (res?.data) {
                setCart([{
                        quantity: product?.quantity,
                        productName: product?.name,
                        image: product?.image,
                        price: product?.price ? product?.price : 0,
                        productId: product?.productId,
                        color: product?.color,
                        size: product?.size,
                        colorName: product?.color,
                        sizeName: product?.size,
                        [!_.isEmpty(userInfo) ? 'idProduct' : 'productId']: res?.data?.id,
                        isKeep: true
                    }]
                )
            } else {
                toast.error("Sản phẩm này đã hết")
            }
        })

    }
    useEffect(() => {
        if (cart !== null) {
            checkProduct.refetch().then(res => {
                if (res?.data) {
                    checkout.push('/checkout', {
                        item: cart
                    })
                } else {
                    toast.error("Sản phẩm này đã hết")
                }
            })

        }
    }, [cart])


    const addToCart = () => {
        if (product?.colorId === '') {
            toast.warn("Vui lòng chọn màu sắc")
            return;
        }
        if (product?.sizeId === '') {
            toast.warn("Vui lòng chọn size")
            return;
        }
        checkProduct.refetch().then((res) => {
            if (res?.data) {
                if (userInfo) {
                    setProduct((prev) => ({
                            ...prev,
                            productIdDetail: res?.data?.id,
                        })
                    )
                } else {
                    if (!_.isEmpty(Storage.get('cart'))) {
                        let check = true
                        let cart = Storage.get('cart')?.map((item, i) => {
                            if (item?.productIdDetail == res?.data?.id) {
                                check = false
                                item.quantity = Number(item.quantity) + Number(product.quantity)
                            }
                            return item
                        })

                        if (check) {
                            Storage.save('cart', [...Storage.get('cart'), {...product, productIdDetail: res?.data?.id}])
                        } else {
                            Storage.save('cart', cart)
                        }
                    } else {
                        let data = [{...product, productIdDetail: res?.data?.id}]
                        Storage.save('cart', data)
                    }
                    toast.success("Thêm vào giỏ hàng thành công")
                }
            } else {
                toast.error("Sản phẩm này đã hết")
            }
        })
    }
    useEffect(() => {
        if (product?.productIdDetail) {
            addToCartApi.refetch().then(
                (res) => {
                    if (res?.data) {
                        toast.success("Thêm vào giỏ hàng thành công")

                    }
                }
            )
        }
    }, [product])

    console.log(curProduct)

    return (
        <div>
            <div className="container">

                <div className={styles.card}>
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-7">
                                <div className="preview-pic tab-content">
                                    <div id="pic-1">
                                        <img width={'500px'} src={checkImage ? item?.image : product?.imageDetail}/>
                                    </div>
                                </div>

                            </div>
                            <div className="details col-md-5">
                                <h3 className={styles.productTitle}>{item?.name}</h3>
                                <h4 className={styles.price}>Giá: <span>{item?.price} đ</span></h4>
                                <h4 className={styles.sizes}>Size
                                    <br></br>
                                    {
                                        size?.data?.map((item, index) => {
                                            return (
                                                <Button onClick={() => handleClickSizes(item)}
                                                        type="button">{item?.size_name}</Button>

                                            )
                                        })
                                    }

                                </h4>
                                <div className="boder">
                                    <h5 className={styles.colors}>Màu sắc
                                        <br></br>
                                        {
                                            color?.data?.map((item, index) => {
                                                return (
                                                    <Button className="btn btn-dark"
                                                            onClick={() => handleClickColors(item)}
                                                    >{item?.color_name}</Button>
                                                )
                                            })
                                        }
                                    </h5>
                                </div>

                                <br></br>
                                <div className="action">
                                    <div className="border">
                                        <h5 className={styles.sizes}>Size: <span>{product?.size}</span></h5>

                                        <h5 className={styles.colors}>Màu sắc: <span>{product?.color}</span></h5>
                                        <h5 className={styles.sizes}>Số lượng:
                                            <input
                                                onChange={onChangeHandler}
                                                InputProps={{inputProps: {min: 0, max: 10}}}
                                                name="quantity"
                                                value={product?.quantity}
                                                label="Số lượng"
                                                className="mb-2"
                                                type="number"
                                            /></h5>
                                        <div className="product_count_area">
                                        </div>
                                    </div>
                                    <br/>
                                    <div>
                                        <Button type="primary" className="btn btn-primary ml-1" onClick={toCheckout}>Mua
                                            ngay
                                        </Button>
                                        <Button type="primary" onClick={addToCart} className="btn btn-primary ml-1">Thêm
                                            vào giỏ hàng
                                        </Button>
                                    </div>
                                </div>
                                <br/>
                                <h2>Mô tả</h2>
                                <p dangerouslySetInnerHTML={{__html: curProduct?.description}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Detail;