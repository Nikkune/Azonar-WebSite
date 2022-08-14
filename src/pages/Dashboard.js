import React, {useEffect, useState} from 'react';
import Navigations from "../components/Navigations";
import {getNavId} from "../Managers/M_Navigations";
import Loader from "../components/Loader";
import Widget from "../components/Widget";
import Featured from "../components/Featured";
import Chart from "../components/Chart";
import LTable from "../components/LTable";
import NavigationsSM from "../components/NavigationsSM";

const Dashboard = () => {
    const [navID, setNavID] = useState(1);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        getNavId().then((res) => {
            setNavID(res);
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <NavigationsSM type={navID}/>
            <Navigations type={navID}/>
            <div className="home">
                <div className="widgets">
                    <Widget type="user"/>
                    <Widget type="bot"/>
                    <Widget type="manga"/>
                </div>
                <div className="charts">
                    <Featured/>
                    <Chart/>
                </div>
                <div className="l-container d-none d-lg-block shadow">
                    <div className="l-title">Latest Mangas</div>
                    <LTable/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;