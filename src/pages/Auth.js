import React, {useEffect} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import Navigations from "../components/Navigations";
import {NAV_ADMIN} from "../enum/NavTypes";
import {toast, ToastContainer} from "react-toastify";

import axios from "axios";

const sha1 = require('sha1');

function errorToast(error) {
    toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const Auth = () => {
        const navigate = useNavigate();

        useEffect(() => {
            if (window.sessionStorage.getItem("isLogged") === "true") {
                navigate("/");
            }

            const signUpButton = document.getElementById('signUp');
            const signInButton = document.getElementById('signIn');
            const container = document.getElementById('container');

            signUpButton.addEventListener('click', () => {
                container.classList.add("right-panel-active");
            });

            signInButton.addEventListener('click', () => {
                container.classList.remove("right-panel-active");
            });
        }, []);

        function handleSignUp(event) {
            event.preventDefault(true);
            const pseudonym = event.target[0].value;
            const email = event.target[1].value;
            let password = event.target[2].value;

            if (pseudonym !== "") {
                if (email !== "") {
                    if (password !== "") {
                        password = sha1(password);
                        if (email.match(/^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                            /*axios.post("https://api.azonar.fr/user/add", {}).then((res) => {
                            const id = res.data._id;
                            const password2 = res.data.password;
                            const username1 = res.data.username;


                            window.sessionStorage.setItem("isLogged", "true");
                            window.sessionStorage.setItem("username", username1);
                            window.sessionStorage.setItem("password", password2);
                            window.sessionStorage.setItem("_id", id);
                            navigate('/');
                        });*/
                        } else {
                            errorToast(email + " is not valid !");
                        }
                    } else {
                        errorToast("Empty Password !");
                    }
                } else {
                    errorToast("Empty Email !");
                }
            } else {
                errorToast("Empty Pseudonym !");
            }
        }

        function handleSignIn(event) {
            event.preventDefault(true);
            const authInfo = event.target[0].value;
            let password = event.target[1].value;

            if (authInfo !== "") {
                if (password !== "") {
                    password = sha1(password);
                    if (authInfo.match(/^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {

                    } else {

                    }
                } else {
                    errorToast("Empty Password !");
                }
            } else {
                errorToast("Empty Pseudonym Or Email !");
            }
        }

        return (
            <div>
                <Navigations type={NAV_ADMIN}/>
                <div className="home">
                    <ToastContainer/>
                    <div className="form-body">
                        <div className="container" id="container">
                            <div className="form-container sign-up-container">
                                <form className="form-lr" onSubmit={handleSignUp} action="#">
                                    <h1 className="title-form">Create Account</h1>
                                    <input className="form-lr-input" type="text" placeholder="Pseudonym"/>
                                    <input className="form-lr-input" type="email" placeholder="Email"/>
                                    <input className="form-lr-input" type="password" placeholder="Password"/>
                                    <button className="form-btn">Sign Up</button>
                                </form>
                            </div>
                            <div className="form-container sign-in-container">
                                <form className="form-lr" onSubmit={handleSignIn} action="#">
                                    <h1 className="title-form">Sign in</h1>
                                    <input className="form-lr-input" type="text" placeholder="Pseudonym Or Email"/>
                                    <input className="form-lr-input" type="password" placeholder="Password"/>
                                    <NavLink className="link-form" to="#">Forgot your password?</NavLink>
                                    <button className="form-btn">Sign In</button>
                                </form>
                            </div>
                            <div className="overlay-container">
                                <div className="overlay">
                                    <div className="overlay-panel overlay-left">
                                        <h1 className="title-form">Welcome Back!</h1>
                                        <p className="text-form">To keep connected with us please login with your personal info</p>
                                        <button className="form-btn ghost" id="signIn">Sign In</button>
                                    </div>
                                    <div className="overlay-panel overlay-right">
                                        <h1 className="title-form">Hello, Friend!</h1>
                                        <p className="text-form">Enter your personal details and start journey with us</p>
                                        <button className="form-btn ghost" id="signUp">Sign Up</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

export default Auth;