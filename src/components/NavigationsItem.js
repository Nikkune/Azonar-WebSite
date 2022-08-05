import React from 'react';
import {NavLink} from "react-router-dom";

const NavigationsItem = ({to, name, icon}) => {
    return (
        <li>
            <NavLink to={to}>
                <i className={icon + " icon"}/>
                <span className="text nav-text">{name}</span>
            </NavLink>
        </li>
    );
};

export default NavigationsItem;