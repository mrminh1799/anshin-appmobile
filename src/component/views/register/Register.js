import React, {useState} from "react";
import {useAuth} from "../../../context";
import {Link} from "react-router-dom";


function Register() {

    const {setUserInfo} = useAuth()

    const [formData, setFormData] = useState({
        username: null,
        password: null
    });

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(JSON.parse(localStorage.getItem('userData')))
        // login()
    };

    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const login = () =>{
    //     callApi('authenticate','POST',formData)
    //     .then(res => {
    //         if(res?.data){
    //             Storage.save('userData', res?.data)
    //             setUserInfo(res.data)
    //         }
    //     })
    // }

    return (
        <div>
            <section className="login_part mt-5 pt-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="login_part_text text-center">
                                <div className="login_part_text_iner">
                                    <h2>Bạn đã có tài khoản chưa?</h2>
                                    <p>Ashin Store có rất nhiều sản phẩm phong phú, đa dạng, mẫu mã đẹp mà bạn có thể
                                        tham khảo và mua ngay</p>
                                    <Link to={'/login'} className="btn_3">Đăng nhập</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="login_part_form">
                                <div className="login_part_form_iner">
                                    <h3>Xin chào bạn ! <br/>
                                        Hãy đăng ký ngay thôi</h3>
                                    <form className="row contact_form" action="#" method="post" novalidate="novalidate"
                                          onSubmit={onSubmitHandler}>
                                        <div className="col-md-12 form-group p_star">
                                            <input onChange={onChangeHandler} value={formData.username} type="text"
                                                   className="form-control" id="name" name="username"
                                                   placeholder="Tài khoản"/>
                                        </div>
                                        <div className="col-md-12 form-group p_star">
                                            <input onChange={onChangeHandler} value={formData.password} type="password"
                                                   className="form-control" id="password" name="password"
                                                   placeholder="Mật khẩu"/>
                                        </div>
                                        <div className="col-md-12 form-group p_star">
                                            <input onChange={onChangeHandler} value={formData.confirmPassword}
                                                   type="password" className="form-control" id="password"
                                                   name="password" placeholder="Nhập lại mật khẩu"/>
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <button type="submit" value="submit" className="btn_3">
                                                Đăng ký
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register;