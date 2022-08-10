import React from 'react';
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
    return (
        <div className="featured shadow">
            <div className="f-top">
                <h1 className="f-title">Total Revenue</h1>
                <i className="fa-duotone fa-ellipsis-vertical"></i>
            </div>
            <div className="f-bottom">
                <div className="f-progress">
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
                </div>
                <p className="f-title">Total sales made today</p>
                <p className="f-amount">420 €</p>
                <p className="f-desc">
                    Previous transactions processing. Last payments may not be included.
                </p>
                <div className="f-summary">
                    <div className="f-item">
                        <div className="i-title">Target</div>
                        <div className="i-result i-negative">
                            <i className="fa-duotone fa-angle-up"/>
                            <div className="r-amount">12.4k €</div>
                        </div>
                    </div>
                    <div className="f-item">
                        <div className="i-title">Last Week</div>
                        <div className="i-result i-positive">
                            <i className="fa-duotone fa-angle-up"/>
                            <div className="r-amount">12.4k €</div>
                        </div>
                    </div>
                    <div className="f-item">
                        <div className="i-title">Last Month</div>
                        <div className="i-result i-positive">
                            <i className="fa-duotone fa-angle-up"/>
                            <div className="r-amount">12.4k €</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;