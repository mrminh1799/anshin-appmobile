import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import {useGetInforUser, useGetTop10, useGetTop10Sell} from "../../../service/product";
import {useEffect} from "react";
import {useAuth} from "../../../context";



function Home() {
    const top10Products = useGetTop10({})

    useEffect(() => {
        top10Products.refetch()
    }, [])
    const top10ProductsSell = useGetTop10Sell({})
    useEffect(() => {
        top10ProductsSell.refetch()
    }, [])


    return (
        <div>
            <div className="section">
                <div className="slider-area ">
                    <div className="slider-active">
                        <div className="single-slider slider-height d-flex align-items-center slide-bg">
                            <div className="container">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
                                        <div className="hero__caption">
                                            <h1 data-animation="fadeInLeft" data-delay=".4s"
                                                data-duration="2000ms">Select Your
                                                New Perfect Style</h1>
                                            <p data-animation="fadeInLeft" data-delay=".7s" data-duration="2000ms">Ut
                                                enim ad
                                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                                ex ea
                                                commodo consequat is aute irure.</p>
                                            <div className="hero__btn" data-animation="fadeInLeft" data-delay=".8s"
                                                 data-duration="2000ms">
                                                <Link style={{color: "white"}} href="industries.html"
                                                      className="btn hero-btn">Shop Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 d-none d-sm-block">
                                        <div className="hero__img" data-delay=".4s">
                                            <img src="./assets/img/hero/watch.png"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="popular-items section-padding30">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-8 col-md-10">
                                <div className="section-tittle mb-70 text-center">
                                    <h2>Top 10 sản phẩm yêu thích</h2>
                                    <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna
                                        aliqua. Quis ipsum suspendisse ultrices gravida.</p>
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            {
                                top10Products?.data?.map((item, index) => {
                                    return (
                                        <div className="col-lg-2">
                                            <div className="single-popular-items mb-50 text-center">
                                                <div className="popular-img">
                                                    <img src={item?.image}/>
                                                    <div className="favorit-items">
                                                        <span className="flaticon-heart"></span>
                                                    </div>
                                                </div>
                                                <div className="popular-caption">

                                                    <span>$ {item?.name}</span>
                                                    <span>$ {item?.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                        <div className="row justify-content-center">
                            <div className="room-btn pt-70">
                                <Link style={{color: "white"}} href="catagori.html" className="btn view-btn1">View More
                                    Products</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gallery-area">
                    <div className="container-fluid p-0 fix">
                        <div className="row">
                            <div className="col-xl-6 col-lg-4 col-md-6 col-sm-6">
                                <div className="single-gallery mb-30">
                                    <div className="gallery-img big-img"
                                         style={{backgroundImage: `url("assets/img/gallery/gallery1.png")`}}></div>

                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                <div className="single-gallery mb-30">
                                    <div className="gallery-img big-img"
                                         style={{backgroundImage: `url("assets/img/gallery/gallery2.png")`}}></div>

                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-12">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-6 col-sm-6">
                                        <div className="single-gallery mb-30">
                                            <div className="gallery-img small-img"
                                                 style={{backgroundImage: `url("assets/img/gallery/gallery3.png")`}}></div>

                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12  col-md-6 col-sm-6">
                                        <div className="single-gallery mb-30">
                                            <div className="gallery-img small-img"
                                                 style={{backgroundImage: `url("assets/img/gallery/gallery3.png")`}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="popular-items section-padding30">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-8 col-md-10">
                                <div className="section-tittle mb-70 text-center">
                                    <h2>Top 10 sản phẩm bán chạy</h2>
                                    <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna
                                        aliqua. Quis ipsum suspendisse ultrices gravida.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                top10ProductsSell?.data?.map((item, index) => {
                                    return (
                                        <div className="col-lg-2">
                                            <div className="single-popular-items mb-50 text-center">
                                                <div className="popular-img">
                                                    <img src={item?.image}/>
                                                    <div className="favorit-items">
                                                        <span className="flaticon-heart"></span>
                                                    </div>
                                                </div>
                                                <div className="popular-caption">

                                                    <span>$ {item?.name}</span>
                                                    <span>$ {item?.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="row justify-content-center">
                            <div className="room-btn pt-70">
                                <Link style={{color: "white"}} href="catagori.html" className="btn view-btn1">View More
                                    Products</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="video-area">
                </div>
                <div className="watch-area section-padding30">
                    <div className="container">
                        <div className="row align-items-center justify-content-between padding-130">
                            <div className="col-lg-5 col-md-6">
                                <div className="watch-details mb-40">
                                    <h2>Watch of Choice</h2>
                                    <p>Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                        ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse.</p>
                                    <Link style={{color: "white"}} href="shop.html" className="btn">Show Watches</Link>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-10">
                                <div className="choice-watch-img mb-40">
                                    <img src="assets/img/gallery/choce_watch1.png"/>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center justify-content-between">
                            <div className="col-lg-6 col-md-6 col-sm-10">
                                <div className="choice-watch-img mb-40">
                                    <img src="assets/img/gallery/choce_watch2.png"/>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-6">
                                <div className="watch-details mb-40">
                                    <h2>Watch of Choice</h2>
                                    <p>Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                        ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse.</p>
                                    <Link style={{color: "white"}} href="shop.html" className="btn">Show Watches</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shop-method-area">
                    <div className="container">
                        <div className="method-wrapper">
                            <div className="row d-flex justify-content-between">
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="single-method mb-40">
                                        <i className="ti-package"></i>
                                        <h6>Free Shipping Method</h6>
                                        <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="single-method mb-40">
                                        <i className="ti-unlock"></i>
                                        <h6>Secure Payment System</h6>
                                        <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="single-method mb-40">
                                        <i className="ti-reload"></i>
                                        <h6>Secure Payment System</h6>
                                        <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-area footer-padding">
                <div className="container">
                    <div className="row d-flex justify-content-between">
                        <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                            <div className="single-footer-caption mb-50">
                                <div className="single-footer-caption mb-30">
                                    <div className="footer-logo">
                                        <Link style={{color: "white"}} to="/"><img
                                            src="assets/img/logo/logo2_footer.png"/></Link>
                                    </div>
                                    <div className="footer-tittle">
                                        <div className="footer-pera">
                                            <p>Asorem ipsum adipolor sdit amet, consectetur adipisicing elitcf sed do
                                                eiusmod tem.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-5">
                            <div className="single-footer-caption mb-50">
                                <div className="footer-tittle">
                                    <h4>Quick Links</h4>
                                    <ul>
                                        <li><Link style={{color: "white"}} href="#">About</Link></li>
                                        <li><Link style={{color: "white"}} href="#"> Offers & Discounts</Link></li>
                                        <li><Link style={{color: "white"}} href="#"> Get Coupon</Link></li>
                                        <li><Link style={{color: "white"}} href="#"> Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-7">
                            <div className="single-footer-caption mb-50">
                                <div className="footer-tittle">
                                    <h4>New Products</h4>
                                    <ul>
                                        <li><Link style={{color: "white"}} href="#">Woman Cloth</Link></li>
                                        <li><Link style={{color: "white"}} href="#">Fashion Accessories</Link></li>
                                        <li><Link style={{color: "white"}} href="#"> Man Accessories</Link></li>
                                        <li><Link style={{color: "white"}} href="#"> Rubber made Toys</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-5 col-sm-7">
                            <div className="single-footer-caption mb-50">
                                <div className="footer-tittle">
                                    <h4>Support</h4>
                                    <ul>
                                        <li><Link style={{color: "white"}} href="#">Frequently Asked Questions</Link>
                                        </li>
                                        <li><Link style={{color: "white"}} href="#">Terms & Conditions</Link></li>
                                        <li><Link style={{color: "white"}} href="#">Privacy Policy</Link></li>
                                        <li><Link style={{color: "white"}} href="#">Report a Payment Issue</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;