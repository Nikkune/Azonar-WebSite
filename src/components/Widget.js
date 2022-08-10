import React from 'react';

const Widget = ({type}) => {
    let data;

    const amount = 300
    const percentage = 300

    switch (type) {
        case "user":
            data = {title: "Users", isMoney: false, link:"See all users", icon: "fa-user", colorBG: "#ffa0a0", color: "#950000"}
            break
        case "order":
            data = {title: "Orders", isMoney: false, link:"See all orders", icon: "fa-cart-shopping", colorBG: "#ffe9a0", color: "#957c00"}
            break
        case "earning":
            data = {title: "Earnings", isMoney: true, link:"See net earnings", icon: "fa-circle-dollar", colorBG: "#b1ffa0", color: "#009507"}
            break
        case "balance":
            data = {title: "Users", isMoney: true, link:"See details", icon: "fa-scale-balanced", colorBG: "#f9a0ff", color: "#7a0095"}
            break
        default:
            break
    }

    return (
        <div className="widget shadow">
            <div className="w-left">
                <span className="w-title">{data.title}</span>
                <span className="w-counter">{amount}{data.isMoney && "€"}</span>
                <span className="w-link">{data.link}</span>
            </div>
            <div className="w-right">
                <div className="w-percentage w-positive">
                    <i className="fa-duotone fa-angle-up"/>
                    {percentage}
                    <i className="fa-duotone fa-percent"/>
                </div>
                <i className={"fa-duotone " + data.icon + " w-icon"} style={{backgroundColor: data.colorBG, color: data.color}}/>
            </div>
        </div>
    );
};

export default Widget;