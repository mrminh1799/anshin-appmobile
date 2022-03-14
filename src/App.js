import { BrowserRouter as Router, Route, Link, NavLink, BrowserRouter, Switch } from "react-router-dom";
import Home from "./component/views/home/Home"
import Shop from "./component/views/shop/Shop"
import SideBar from "./component/layout/SideBar"
import Products from "./component/products/Products"
import Categories from "./component/categories/Categories";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import Detail from "./component/views/detail/Detail";
import Cart from "./component/views/cart/Cart";
import Checkout from "./component/views/checkout/Checkout";
import callApi from "./component/callAPI/apiCaller";
import Users from "./component/users/Users";
import Login from "./component/views/login/Login";

function App() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin">
          <div className="App d-flex h-100">
            <SideBar
              category={category}
            />
            <Route path="/admin/categories">
              <Categories
                category={category}
                setCategory={setCategory}
                loading={loading}
                setLoading={setLoading}
              />
            </Route>
            <Route path="/admin/products">
              <Products
                product={product}
                setProduct={setProduct}
                loading={loading}
                setLoading={setLoading}
                category={category}
              />
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
        </Route>
        <Route>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/shop" exact>
              <Shop/>
            </Route>
            <Route path="/login" exact>
              <Login/>
            </Route>
            <Route path="/detail/:id" exact>
              <Detail />
            </Route>
            <Route path="/cart" exact>
              <Cart />
            </Route>
            <Route path="/checkout" exact>
              <Checkout />
            </Route>
          </Switch>
          <Footer/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
export default App;