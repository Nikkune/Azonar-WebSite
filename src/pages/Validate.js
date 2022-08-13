import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Loader from "../components/Loader";
import {getUserViaPseudonym, updateStatus} from "../Managers/M_Users";
import {toast, ToastContainer} from "react-toastify";
import {setUser} from "../Managers/M_Sessions";

const Validate = () => {
    const navigate = useNavigate();
    const Token = window.location.href.split("/")[4];
    const Pseudonym = window.location.href.split("/")[5];

    if (Token === "" || Pseudonym === "")
        navigate("/");

    useEffect(() => {
        getUserViaPseudonym(Pseudonym).then((res) => {
            if (res.token === Token) {
                updateStatus(res.pseudonym, 1).then((res) => {
                    successToast("Successfully Confirm Email");
                    setUser(res._id,res.pseudonym,res.password);
                    setTimeout(() => {
                        navigate("/");
                    }, 5000)
                }).catch((err) => {
                    errorToast("Failed To update Status : " + err)
                    setTimeout(() => {
                        navigate("/");
                    }, 5000)
                });
            }else{
                errorToast("Bad Token ! ");
                setTimeout(() => {
                    navigate("/");
                }, 5000)
            }
        }).catch(() => {
            errorToast("Unknown User !")
            setTimeout(() => {
                navigate("/");
            }, 5000)
        })
    }, [])

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

    function successToast(msg) {
        toast.success(msg, {
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
            <Loader/>
        </div>
    );
};

export default Validate;