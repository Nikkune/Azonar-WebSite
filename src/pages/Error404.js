import React from 'react';
import {NavLink} from "react-router-dom";

const Error404 = () => {
    return (<div id="not-found">
            <div className="not-found">
                <div className="not-found-404">
                    <h1>404</h1>
                    <h2>Page not found</h2>
                </div>
                <NavLink to="/">
                    Home
                </NavLink>
            </div>
        </div>
    );
};

export default Error404;