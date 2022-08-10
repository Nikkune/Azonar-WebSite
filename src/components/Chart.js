import React, {useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {getNavId} from "../Managers/M_Navigations";
import axios from "axios";
import Loader from "./Loader";
import BotCard from "./BotCard";

const Chart = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [bots, setBots] = useState([]);

    useEffect(() => {
        axios.get("https://www.api.azonar.fr/bots").then((res) => {
            setBots(res.data);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
        })

        setInterval(() => {
            axios.get("https://www.api.azonar.fr/bots").then((res) => {
                setBots(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }, 1000 * 10)
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className="chart shadow">
            <Container>
                <Row className="d-flex flex-column justify-content-center align-items-center h-100">
                    <h3 className="mt-2">Bots</h3>
                    {bots.map((bot) => <BotCard key={bot._id + " Card"} id={bot._id} name={bot.name} icon={bot.icon} color={bot.color} progress={bot.progress} desc={bot.description}/>)}
                </Row>
            </Container>
        </div>
    );
};

export default Chart;