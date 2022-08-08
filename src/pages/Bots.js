import React, {useState, useEffect} from 'react';
import Navigations from "../components/Navigations";
import {NAV_ADMIN} from "../enum/NavTypes";
import Loader from "../components/Loader";
import axios from "axios";
import {Card, Col, Container, Row} from "react-bootstrap";

const Bots = () => {
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
        <div>
            <Navigations type={NAV_ADMIN}/>
            <div className="home">
                <h1>Bots</h1>
                <h1>In Progress</h1>
                <Container>
                    <Row xs={1}>
                        {
                            bots.filter((bot) => bot.status === 1).map((bot) =>
                                <Col key={bot._id} className="mb-3">
                                    <Card style={{background: bot.color}}>
                                        <div className="card-statistic-3 p-4">
                                            <div className="card-icon card-icon-large"><i className={bot.icon}></i>
                                            </div>
                                            <div className="mb-4">
                                                <h5 className="card-title mb-0">{bot.name}</h5>
                                            </div>
                                            <Row className="align-items-center mb-2 d-flex">
                                                <Col xs={4}>
                                                    <h2 className="d-flex align-items-center mb-0">
                                                        {bot.progress + "%"}
                                                    </h2>
                                                </Col>
                                                <Col xs={8} className="text-right">
                                                    <span>{bot.description}</span>
                                                </Col>
                                            </Row>
                                            <div className="progress mt-1 " data-height="8" style={{height: 8 + "px"}}>
                                                <div className="progress-bar" role="progressbar" data-width={bot.progress + "%"} aria-valuenow={bot.progress} aria-valuemin="0" aria-valuemax="100" style={{width: bot.progress + "%"}}/>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>
                </Container>
                <h1>Finish</h1>
                <Container>
                    <Row xs={1}>
                        {
                            bots.filter((bot) => bot.status === 0).map((bot) =>
                                <Col key={bot._id} className="mb-3">
                                    <Card style={{background: bot.color}}>
                                        <div className="card-statistic-3 p-4">
                                            <div className="card-icon card-icon-large"><i className={bot.icon}></i>
                                            </div>
                                            <div className="mb-4">
                                                <h5 className="card-title mb-0">{bot.name}</h5>
                                            </div>
                                            <Row className="align-items-center mb-2 d-flex">
                                                <Col xs={4}>
                                                    <h2 className="d-flex align-items-center mb-0">
                                                        {bot.progress + "%"}
                                                    </h2>
                                                </Col>
                                                <Col xs={8} className="text-right">
                                                    <span>{bot.description}</span>
                                                </Col>
                                            </Row>
                                            <div className="progress mt-1 " data-height="8" style={{height: 8 + "px"}}>
                                                <div className="progress-bar" role="progressbar" data-width={bot.progress + "%"} aria-valuenow={bot.progress} aria-valuemin="0" aria-valuemax="100" style={{width: bot.progress + "%"}}/>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Bots;