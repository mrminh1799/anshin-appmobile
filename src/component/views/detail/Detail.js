import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, NavLink, BrowserRouter, Switch, useParams } from "react-router-dom";
import callApi from "../../callAPI/apiCaller";


function Detail() {
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const onChangeHandler = (event) => {
        setQuantity(event.target.value)
    }
    useEffect(() => {
        callApi(`categories/1/products/${id}`, "GET", null)
            .then((response) => {
                const { data } = response
                setProduct(data)
            })
    }, [])

    const addToCart = ()=>{
        if(quantity<1){
            alert("Số lượng phải lớn hơn 0");
            return;
        }
        if(localStorage.getItem(product.id)==null) localStorage.setItem(product.id,quantity);
        else{
            localStorage.setItem(product.id,Number(localStorage.getItem(product.id))+Number(quantity))
        }
    }
    return (
        <div>
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Watch Shop</h2>
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
                                <img src={product.image} alt="#" className="w-100" />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="single_product_text text-center">
                                <h3>{product.name}</h3>
                                <p>
                                    Seamlessly empower fully researched growth strategies and interoperable internal or
                                    “organic” sources. Credibly innovate granular internal or “organic” sources whereas high
                                    standards in web-readiness. Credibly innovate granular internal or organic sources whereas
                                    high standards in web-readiness. Energistically scale future-proof core competencies
                                    vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal
                                    networks.
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
                                        <Link onClick={addToCart} className="btn_3">add to cart</Link>
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