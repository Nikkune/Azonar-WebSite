import React from 'react';
import {useNavigate} from "react-router-dom";
import {Form} from "react-bootstrap";
import {getUserViaPseudonym, updatePassword} from "../Managers/M_Users";
import {toast, ToastContainer} from "react-toastify";

const sha1 = require('sha1');

const ResetPassWord = () => {
    const navigate = useNavigate();
    const ID = window.location.href.split("/")[4];
    const Token = window.location.href.split("/")[5];
    const Pseudo = window.location.href.split("/")[6];

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
                        updatePassword(res.pseudonym, password).then((res) => {
                            navigate("/auth");
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
            </Form>
        </div>
    );
};

export default ResetPassWord;