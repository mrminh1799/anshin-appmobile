import React, { useEffect, useState } from "react";
import callApi from "../../callAPI/apiCaller";
import Storage from '../../../utils/Storage'
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
        const { name, value } = event.target;
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
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Register</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="login_part section_padding ">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="login_part_text text-center">
                                <div className="login_part_text_iner">
                                    <h2>New to our Shop?</h2>
                                    <p>There are advances being made in science and technology
                                        everyday, and a good example of this is the</p>
                                    <Link to={'/login'} className="btn_3">Login an Account</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="login_part_form">
                                <div className="login_part_form_iner">
                                    <h3>Welcome Friend ! <br />
                                        Please Register now</h3>
                                    <form className="row contact_form" action="#" method="post" novalidate="novalidate" onSubmit={onSubmitHandler} >
                                        <div className="col-md-12 form-group p_star">
                                            <input onChange={onChangeHandler} value={formData.username} type="text" className="form-control" id="name" name="username" placeholder="Username" />
                                        </div>
                                        <div className="col-md-12 form-group p_star">
                                            <input onChange={onChangeHandler} value={formData.password} type="password" className="form-control" id="password" name="password" placeholder="Password" />
                                        </div>
                                        <div className="col-md-12 form-group p_star">
                                            <input onChange={onChangeHandler} value={formData.confirmPassword} type="password" className="form-control" id="password" name="password" placeholder="Confirm password" />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <button type="submit" value="submit" className="btn_3">
                                                Register
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