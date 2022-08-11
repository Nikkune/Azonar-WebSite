import React, {useEffect, useState} from 'react';
import {Container, Row, Spinner} from "react-bootstrap";
import Loader from "./Loader";
import BotCard from "./BotCard";
import {getBots} from "../Managers/M_Bots";

const Chart = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [bots, setBots] = useState([]);

    useEffect(() => {
        getBots().then((res) => {
            setBots(res);
            setIsLoading(false);
        })

        setInterval(() => {
            getBots().then((res) => {
                setBots(res);
            })
        }, 1000 * 10)
    }, [])

    if (isLoading) {
        return <Spinner animation="border" variant="primary"/>
    }

    return (
        <div className="chart shadow">
            <Container>
                <Row className="d-flex flex-column justify-content-center align-items-center h-100">
                    <h3 className="mt-2">Bots</h3>
                    {bots.map((bot) =>
                        <BotCard key={bot._id + " Card"} id={bot._id} name={bot.name} icon={bot.icon} color={bot.color} progress={bot.progress} desc={bot.description}/>)}
                </Row>
            </Container>
        </div>
    );
};

export default Chart;