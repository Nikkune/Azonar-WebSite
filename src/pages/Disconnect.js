// noinspection ES6CheckImport

import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Loader from "../components/Loader";
import {deleteUser, isLogged} from "../Managers/M_Sessions";

const Disconnect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged() === "true") {
            deleteUser();
            navigate("/");
        }
    })

    return (
        <Loader/>
    );
};

export default Disconnect;