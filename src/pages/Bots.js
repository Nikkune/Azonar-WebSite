import React, {useEffect, useState} from 'react';
import Navigations from "../components/Navigations";
import Loader from "../components/Loader";
import axios from "axios";
import {Card, Col, Container, Row} from "react-bootstrap";
import {getNavId} from "../Managers/M_Navigations";
import BotCard from "../components/BotCard";

const Bots = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [bots, setBots] = useState([]);
    const [navID, setNavID] = useState(1);

    useEffect(() => {
        getNavId().then((res) => {
            setNavID(res)
        })

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
        <div>
            <Navigations type={navID}/>
            <div className="home">
                <h1>Bots</h1>
                <h1>In Progress</h1>
                <Container>
                    <Row xs={1}>
                        {
                            bots.filter((bot) => bot.status === 1).map((bot) =>
                                <BotCard key={"bots " + bot._id} id={bot._id} name={bot.name} icon={bot.icon} color={bot.color} progress={bot.progress} desc={bot.description}/>
                            )
                        }
                    </Row>
                </Container>
                <h1>Finish</h1>
                <Container>
                    <Row xs={1}>
                        {
                            bots.filter((bot) => bot.status === 0).map((bot) =>
                                <BotCard key={"bots " + bot._id} id={bot._id} name={bot.name} icon={bot.icon} color={bot.color} progress={bot.progress} desc={bot.description}/>
                            )
                        }
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Bots;