import React, {useEffect, useState} from 'react';
import Navigations from "../components/Navigations";
import {getNavId} from "../Managers/M_Navigations";
import Loader from "../components/Loader";

const Manga = () => {
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

    return (
        <div>
            <Navigations type={navID}/>
            <div className="home">
                <h1>Manga</h1>
            </div>
        </div>
    );
};

export default Manga;