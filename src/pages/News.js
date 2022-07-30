import React from 'react';
import Navigations from "../components/Navigations";
import {NAV_ADMIN} from "../enum/NavTypes";

const News = () => {
    return (
        <div>
            <Navigations type={NAV_ADMIN}/>
            <div className="home">
                <h1>News</h1>
            </div>
        </div>
    );
};

export default News;