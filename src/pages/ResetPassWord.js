// noinspection ES6CheckImport

import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {getUserViaPseudonym, updatePassword} from "../Managers/M_Users";
import {toast, ToastContainer} from "react-toastify";
import Navigations from "../components/Navigations";
import {getNavId} from "../Managers/M_Navigations";
import NavigationsSM from "../components/NavigationsSM";

const sha1 = require('sha1');

const ResetPassWord = () => {
    const navigate = useNavigate();
    const [navID, setNavID] = useState(1);
    const ID = window.location.href.split("/")[4];
    const Token = window.location.href.split("/")[5];
    const Pseudo = window.location.href.split("/")[6];

    useEffect(() => {
        getNavId().then((res) => {
            setNavID(res)
        })
    }, [])

    if (ID === "" || Token === "" || Pseudo === "")
        navigate("/")

    async function handleSubmit(event) {
        event.preventDefault(true);

        getUserViaPseudonym(Pseudo).then((res) => {
            if (res.token === Token) {
                if (res._id === ID) {
                    const password = sha1(event.target[0].value);
                    const password2 = sha1(event.target[1].value);

                    if (password === password2) {
                        updatePassword(Pseudo, password).then(() => {
                            toast.success("Successfully Update PassWord");
                            setTimeout(() => {
                                navigate("/auth");
                            }, 5000)
                        })
                    } else {
                        errorToast("Password are not the same !");
                    }
                } else {
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        })
    }

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

    return (
        <div>
            <NavigationsSM type={navID}/>
            <Navigations type={navID}/>
            <div className="home">
                <ToastContainer/>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default ResetPassWord;