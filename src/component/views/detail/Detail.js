import {TextField} from "@material-ui/core";
import {useEffect, useState} from "react";
import {
    Link,
    useParams,
    useLocation
} from "react-router-dom";



const Detail = () => {
    const location = useLocation()
    const {item} = location.state
    console.log('item', item);
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const onChangeHandler = (event) => {
        setQuantity(event.target.value)
    }


    const addToCart = () => {
        // if(quantity<1){
        //     alert("Số lượng phải lớn hơn 0");
        //     return;
        // }
        // if(localStorage.getItem(item.id)==null) localStorage.setItem(item.id,quantity);
        // else{
        //     localStorage.setItem(item.id,Number(localStorage.getItem(item.id))+Number(quantity))
        // }
    }
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
            <div className="product_image_area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div>
                                <img src={item?.image} alt="#" className="w-100"/>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="single_product_text text-center">
                                <h3>{item?.name}</h3>
                                <p>
                                    {item?.description}
                                </p>
                                <div className="card_area">
                                    <div className="product_count_area">
                                        <TextField
                                            onChange={onChangeHandler}
                                            name="quantity"
                                            value={quantity}
                                            label="Quantity"
                                            className="mb-2"
                                            type="number"
                                        />
                                    </div>

                                    <div className="add_to_cart">
                                        <Link onClick={addToCart} className="btn_3">Thêm vào giỏ hàng</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;