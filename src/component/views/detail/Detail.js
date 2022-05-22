import {useEffect, useState} from "react";
import styles from '../../../style/productStyle.module.css'

import {useHistory, useLocation} from "react-router-dom";
import {addCart, useGetCheckProduct, useGetColorProduct, useGetSizeProduct} from "../../../service/product";
import Storage from "../../../utils/Storage";
import {useAuth} from "../../../context";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useGetProductId} from "../../../service/productService2";
import {toast} from "react-toastify";
import _ from "lodash";
import Image from "../../../utils/Image";


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
    const [selectColor, setSelectColor] = useState(null)
    const [selectSize, setSelectSize] = useState(null)
    const [listColor, setListColor] = useState([])
    const [listSize, setListSize] = useState([])
    const [currentImage, setCurrentImage] = useState({})

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

    useEffect(() => {
        if (selectColor && selectSize) {
            let cur = curProduct?.listDetailProduct.filter(item => item.color.id === selectColor.id && item.size.id === selectSize.id)
            setCurrentImage(...cur)
            setProduct(prev => ({
                ...prev,
                quantity: 1
            }))
        }else{
            setCurrentImage({})
        }
    }, [selectColor, selectSize])

    const onChangeHandler = (event) => {
        if(selectColor && selectSize && event.target.value > currentImage.quantity){
            toast.warn('Số lượng phải nhỏ hơn kho')
            return
        }
        if (event.target.value < 1) {
            toast.warn('Số lượng phải lớn hơn 0')
            return
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
        if (item?.id === selectSize?.id) {
            setSelectSize(null)
            setProduct(prev => ({
                ...prev,
                sizeId: '',
                size: ''
            }))
        } else {
            setSelectSize(item)
            setProduct(prev => ({
                ...prev,
                sizeId: item?.id,
                size: item?.size_name
            }))
        }
    }
    const handleClickColors = (item) => {
        if (item?.id === selectColor?.id) {
            setSelectColor(null)
            setCheckImage(true)
            setProduct(prev => ({
                ...prev,
                colorId: '',
                color: '',
                imageDetail: ''
            }))
        }else{
            setSelectColor(item)
            setCheckImage(false)
            setProduct(prev => ({
                ...prev,
                colorId: item?.id,
                color: item?.color_name,
                imageDetail: item?.image
            }))
        }
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
                    dispatch(addCart({
                        id: userInfo?.id,
                        idProduct: res?.data?.id,
                        quantity: product?.quantity,
                    }, () => {
                        toast.success("Thêm vào giỏ hàng thành công")
                    }))
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

    return (
        <div>
            <div className="container">

                <div className={styles.card}>
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-7">
                                <div className="preview-pic tab-content">
                                    <div id="pic-1">
                                        <Image width={'500px'} height={500 / 212 * 319}
                                               src={selectColor && selectSize ? currentImage?.image : item?.image}/>
                                    </div>
                                </div>

                            </div>
                            <div className="details col-md-5">
                                <h3 className={styles.productTitle}>{item?.name}</h3>
                                <h4 className={styles.price}>Giá: <span>{item?.price} đ</span></h4>
                                <h4 className={styles.sizes}>Size
                                    <br className={'mb-2'}></br>
                                    {
                                        size?.data?.map((item, index) => {
                                            return (
                                                <button className={'pt-2 px-4 mr-2 mb-2'} style={{
                                                    border: '1px solid',
                                                    borderColor: item?.id === selectSize?.id ? '#3880ff' : '#d7d6d6',
                                                    color: item?.id === selectSize?.id ? '#3880ff' : 'black',
                                                    backgroundColor: 'white',
                                                    textAlign: 'center',
                                                    fontSize: 15,
                                                    fontWeight: 400,
                                                }} onClick={() => handleClickSizes(item)}>
                                                    {item?.size_name}
                                                </button>
                                            )
                                        })
                                    }
                                </h4>
                                <div className="boder">
                                    <h5 className={styles.colors}>Màu sắc
                                        <br className={'mb-2'}></br>
                                        {
                                            color?.data?.map((item, index) => {
                                                return (
                                                    <button className={'pt-2 px-4 mr-2 mb-2'} style={{
                                                        border: '1px solid',
                                                        borderColor: item?.id === selectColor?.id ? '#3880ff' : '#d7d6d6',
                                                        color: item?.id === selectColor?.id ? '#3880ff' : 'black',
                                                        backgroundColor: 'white',
                                                        textAlign: 'center',
                                                        fontSize: 15,
                                                        fontWeight: 400,
                                                    }} onClick={() => handleClickColors(item)}>
                                                        {item?.color_name}
                                                    </button>
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
                                        <h5 className={styles.colors}>Kho: <span>{currentImage?.quantity}</span></h5>
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