// noinspection ES6CheckImport

import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import Navigations from "../components/Navigations";
import {toast, ToastContainer} from "react-toastify";
import {creatUser, getUserViaEmail, getUserViaPseudonym} from "../Managers/M_Users";
import {isLogged, setUser} from "../Managers/M_Sessions";
import {getNavId} from "../Managers/M_Navigations";
import emailjs from '@emailjs/browser';

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/
    );
};

const sha1 = require('sha1');

function errorToast(error) {
    toast.error(error, {
        position: "top-center",
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
        const [navID, setNavID] = useState(1);

        useEffect(() => {
            if (isLogged() === "true") {
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

            getNavId().then((res) => {
                setNavID(res)
            })
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
                        if (validateEmail(email)) {
                            creatUser(pseudonym, email, password).then((res) => {
                                emailjs.send('service_fssxtol', 'template_9fwwbgl', {
                                    to_name: res.pseudonym,
                                    link: "https://azonar.fr/validate/"+ res.token +"/" + res.pseudonym,
                                    user_email: res.email,
                                }, 'r6FdVXupbGUorznSl')
                                    .then((result) => {
                                        toast.success("Success create User, Please Verify Your To Sing In ! " + result.text , {
                                            position: "top-center",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                        setTimeout(() => {
                                            navigate("/");
                                        }, 5000)
                                    }, (error) => {
                                        errorToast(error.text);
                                    });
                            });
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

        async function handleSignIn(event) {
            event.preventDefault(true);
            const authInfo = event.target[0].value;
            let password = event.target[1].value;

            if (authInfo !== "") {
                if (password !== "") {
                    password = sha1(password);
                    if (validateEmail(authInfo)) {
                        const userInDB = await getUserViaEmail(authInfo);
                        if (!userInDB.isEmpty) {
                            if (password === userInDB.password) {
                                if (userInDB.status_id !== 0){
                                    setUser(userInDB._id, userInDB.pseudonym, userInDB.password);
                                    navigate("/");
                                }else{
                                    errorToast("Please Validate Your Email Before Connecting")
                                }
                            } else {
                                errorToast("Wrong Password !")
                            }
                        } else {
                            errorToast("User Doesn't Exist !")
                        }
                    } else {
                        const userInDB = await getUserViaPseudonym(authInfo);
                        if (!userInDB.isEmpty) {
                            if (password === userInDB.password) {
                                if (userInDB.status_id !== 0){
                                    setUser(userInDB._id, userInDB.pseudonym, userInDB.password);
                                    navigate("/");
                                }else{
                                    errorToast("Please Validate Your Email Before Connecting")
                                }
                            } else {
                                errorToast("Wrong Password !")
                            }
                        } else {
                            errorToast("User Doesn't Exist !")
                        }
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
                <Navigations type={navID}/>
                <div className="home">
                    <ToastContainer/>
                    <div className="form-body">
                        <div className="container_form" id="container">
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
                                    <NavLink className="link-form" to="/forget">Forgot your password?</NavLink>
                                    <button className="form-btn">Sign In</button>
                                </form>
                            </div>
                            <div className="overlay-container">
                                <div className="overlay">
                                    <div className="overlay-panel overlay-left">
                                        <h1 className="title-form">Welcome Back!</h1>
                                        <p className="text-form">To keep connected with us please login with your personal
                                                                 info</p>
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