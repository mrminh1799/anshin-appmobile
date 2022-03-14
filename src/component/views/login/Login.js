import React, { useEffect, useState } from "react";
import callApi from "../../callAPI/apiCaller";


function Login() {
    
    const [formData, setFormData] = useState({
        username: null,
        password: null
    });

    const onSubmitHandler = (event) => {
        event.preventDefault();
        login()
    };
    
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const login = () =>{
        callApi('authenticate','POST',formData)
        .then(res => {
            console.log(res);
        })
    }

    return (
        <div>
            <div class="slider-area ">
                <div class="single-slider slider-height2 d-flex align-items-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="hero-cap text-center">
                                    <h2>Login</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="login_part section_padding ">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-md-6">
                            <div class="login_part_text text-center">
                                <div class="login_part_text_iner">
                                    <h2>New to our Shop?</h2>
                                    <p>There are advances being made in science and technology
                                        everyday, and a good example of this is the</p>
                                    <a href="#" class="btn_3">Create an Account</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="login_part_form">
                                <div class="login_part_form_iner">
                                    <h3>Welcome Back ! <br />
                                        Please Sign in now</h3>
                                    <form class="row contact_form" action="#" method="post" novalidate="novalidate" onSubmit={onSubmitHandler} >
                                        <div class="col-md-12 form-group p_star">
                                            <input onChange={onChangeHandler} value={formData.username} type="text" class="form-control" id="name" name="username" placeholder="Username" />
                                        </div>
                                        <div class="col-md-12 form-group p_star">
                                            <input onChange={onChangeHandler} value={formData.password} type="password" class="form-control" id="password" name="password" placeholder="Password" />
                                        </div>
                                        <div class="col-md-12 form-group">
                                            <div class="creat_account d-flex align-items-center">
                                                <input type="checkbox" id="f-option" name="selector" />
                                                <label for="f-option">Remember me</label>
                                            </div>
                                            <button type="submit" value="submit" class="btn_3">
                                                log in
                                            </button>
                                            <a class="lost_pass" href="#">forget password?</a>
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

export default Login;