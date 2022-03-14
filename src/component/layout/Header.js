
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

function Header() {
    return (
        <div className="header-area">
            <div className="main-header header-sticky">
                <div className="container-fluid">
                    <div className="menu-wrapper">
                        <div className="logo">
                            <Link to="/">
                                <span style={{ fontSize: 28, fontWeight: "bold", color: "black" }} >
                                    Mlem <span style={{ color: "red" }}>Zone</span>
                                </span>
                            </Link>
                        </div>
                        <div className="main-menu d-none d-lg-block">
                            <nav>
                                <ul id="navigation">
                                    <li><Link to="/" >Home</Link></li>
                                    <li><Link to="/shop">Shop</Link></li>
                                    <li><Link to="/cart">Cart</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="header-right">
                            <ul>
                                <li> <Link to="/login" style={{ color: "white" }}><span className="flaticon-user"></span></Link></li>
                                <li><Link to="/cart" style={{ color: "white" }}><span className="flaticon-shopping-cart"></span></Link> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mobile_menu d-block d-lg-none"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;