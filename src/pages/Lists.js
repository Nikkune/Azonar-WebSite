import React from 'react';
import Navigations from "../components/Navigations";
import {NAV_ADMIN} from "../enum/NavTypes";

const Lists = () => {
    return (
        <div>
            <Navigations type={NAV_ADMIN}/>
            <div className="home">
                <h1>Lists</h1>
            </div>
        </div>
    );
};

export default Lists;