import { BrowserRouter as Router, Route, Link, NavLink, BrowserRouter, Switch } from "react-router-dom";


function Footer() {
    return (
        <div className="footer-area footer-padding">
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                        <div className="single-footer-caption mb-50">
                            <div className="single-footer-caption mb-30">
                                <div className="footer-logo">
                                    <Link to="/">
                                        <span style={{ fontSize: 28, fontWeight: "bold", color: "black" }} >
                                            Anshin <span style={{ color: "red" }}>Zone</span>
                                        </span>
                                    </Link>
                                </div>
                                <div className="footer-tittle">
                                    <div className="footer-pera">
                                        <p>Asorem ipsum adipolor sdit amet, consectetur adipisicing elitcf sed do eiusmod tem.</p>
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
                                    <li><Link href="#">About</Link></li>
                                    <li><Link href="#"> Offers & Discounts</Link></li>
                                    <li><Link href="#"> Get Coupon</Link></li>
                                    <li><Link href="#"> Contact Us</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-7">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>New Products</h4>
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
                                <h4>Support</h4>
                                <ul>
                                    <li><Link href="#">Frequently Asked Questions</Link></li>
                                    <li><Link href="#">Terms & Conditions</Link></li>
                                    <li><Link href="#">Privacy Policy</Link></li>
                                    <li><Link href="#">Report a Payment Issue</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-xl-7 col-lg-8 col-md-7">
                    </div>
                    <div className="col-xl-5 col-lg-4 col-md-5">
                        <div className="footer-copy-right f-right">
                            <div className="footer-social">
                                <Link href="#"><i className="fab fa-twitter"></i></Link>
                                <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                                <Link href="#"><i className="fab fa-behance"></i></Link>
                                <Link href="#"><i className="fas fa-globe"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;