import {
    Route,
    BrowserRouter,
    Switch,
    Redirect,
    useHistory
} from "react-router-dom";
import {Provider} from 'react-redux';
import {store} from './store';
import Home from "./component/views/home/Home"
import Shop from "./component/views/shop/Shop"
import SideBar from "./component/layout/SideBar"
import Products from "./component/products/Products"
import React, {useEffect, useState} from "react";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import Detail from "./component/views/detail/Detail";
import Cart from "./component/views/cart/Cart";
import Checkout from "./component/views/checkout/Checkout";
import Users from "./component/users/Users";
import Login from "./component/views/login/Login";
import {QueryClient, QueryClientProvider} from 'react-query'
import {useAuth} from "./context";
import Storage from "./utils/Storage";
import Order from "./component/views/Order";
import Orders from "./component/orders/Orders";
import ProductDiscount from "./component/views/ProductDiscount";
import ListProductFindByCate from "./component/views/ListProductFindByCate";
import DetailProduct from "./component/products/DetailProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailProductForUpdate from "./component/products/DetailProductForUpdate";

const queryClient = new QueryClient()

function App() {
    const {userInfo, setUserInfo} = useAuth()
    const userData = Storage.get('userData')
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([]);
    const [role, setRole] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let userData = Storage.get('userData')
        if (userData) {
            setUserInfo(userData)
        }
    }, [])

    return (
        <Provider store={store}>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/admin">
                            {
                                !!userData && userData?.roles.includes('Admin')
                                    ?
                                    <div className="App d-flex h-100">
                                        <SideBar/>
                                        <Route path="/admin/orders/:id">
                                            <Orders
                                                loading={loading}
                                                setLoading={setLoading}
                                            />
                                        </Route>
                                        <Route path="/admin/products" >
                                            <Products
                                                product={product}
                                                setProduct={setProduct}
                                                loading={loading}
                                                setLoading={setLoading}
                                            />
                                        </Route>

                                        <Route path="/admin/productDetail/:id" >
                                           <DetailProduct></DetailProduct>
                                        </Route>
                                        <Route path="/admin/productDetailUD/:id" >
                                           <DetailProductForUpdate/>
                                        </Route>

                                        <Route path="/abc">
                                            <DetailProduct/>
                                        </Route>
                                        <Route path="/admin/users">
                                            <Users
                                                user={user}
                                                setUser={setUser}
                                                loading={loading}
                                                setLoading={setLoading}
                                                role={role}
                                            />
                                        </Route>
                                    </div>
                                    :
                                    <Redirect to="/"/>
                            }
                        </Route>
                        <Route>
                            <Header/>
                            <Switch>
                                <Route path="/" exact>
                                    <Home/>
                                </Route>
                                <Route path="/shop" exact>
                                    <Shop/>
                                </Route>
                                <Route path="/login" exact>
                                    {!userData ? <Login/> : <Redirect to="/"/>}
                                </Route>
                                <Route path="/detail/:id" exact>
                                    <Detail/>
                                </Route>
                                <Route path="/cart" exact>
                                    <Cart/>
                                </Route>
                                <Route path="/order" exact>
                                    <Order/>
                                </Route>
                                <Route path="/discount" exact>
                                    <ProductDiscount/>
                                </Route>
                                <Route path="/checkout" exact>
                                    <Checkout/>
                                </Route>
                                <Route path="/findProduct" exact>
                                    <ListProductFindByCate/>
                                </Route>
                            </Switch>
                            <Footer/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    )
}

export default App;
