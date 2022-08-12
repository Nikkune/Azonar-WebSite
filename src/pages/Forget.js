import React, {useEffect, useState} from 'react';
import {getNavId} from "../Managers/M_Navigations";
import Loader from "../components/Loader";
import Navigations from "../components/Navigations";
import {Button, Container, Form} from "react-bootstrap";
import {getUserViaEmail} from "../Managers/M_Users";
import {toast, ToastContainer} from "react-toastify";

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Forget = () => {
    const [navID, setNavID] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNavId().then((res) => {
            setNavID(res)
            setIsLoading(false);
        })
    })

    if (isLoading) {
        return <Loader/>
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

    async function handleSubmit(event) {
        event.preventDefault(true);
        const email = event.target[0].value

        if (validateEmail(email)) {
            const userInDB = await getUserViaEmail(email);
            if (!userInDB.isEmpty) {
                toast.info("Send an reset email to : " + email, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                //TODO Send Mail
            } else {
                errorToast("User Doesn't Exist !")
            }
        } else {
            errorToast(email + " is not valid !");
        }
    }

    return (
        <div>
            <Navigations type={navID}/>
            <div className="home">
                <ToastContainer/>
                <Container>
                    <h1>Forget Password</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com"/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
    );
};

export default Forget;