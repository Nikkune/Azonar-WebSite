import React from 'react';
import {Card, Col, Row} from "react-bootstrap";

const BotCard = ({id, name, color, icon, progress, desc, className}) => {
    if (!className)
        className = "";
    else
        className = " " + className;
    return (
        <Col key={id} className={"row h-100" + className}>
            <Card className="my-auto overflow-hidden" style={{background: color}}>
                <div className="card-statistic-3 p-4">
                    <div className="card-icon card-icon-large"><i className={icon}></i>
                    </div>
                    <div className="mb-4">
                        <h5 className="card-title mb-0">{name}</h5>
                    </div>
                    <Row className="align-items-center mb-2 d-flex">
                        <Col xs={4}>
                            <h2 className="d-flex align-items-center mb-0">
                                {progress + "%"}
                            </h2>
                        </Col>
                        <Col xs={8} className="text-right">
                            <span>{desc}</span>
                        </Col>
                    </Row>
                    <div className="progress mt-1 " data-height="8" style={{height: 8 + "px"}}>
                        <div className="progress-bar" role="progressbar" data-width={progress + "%"} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{width: progress + "%"}}/>
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default BotCard;