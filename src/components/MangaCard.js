import React from 'react';
import {Card, Col, Image, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const MangaCard = ({manga}) => {
    let name = manga.name
    if (manga.name.length >= 30)
        name = manga.name.substring(0, 30) + " ..."
    const date = new Intl.DateTimeFormat('en-US', {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(manga.last_update));

    return (
        <Col>
            <NavLink to={"/manga/" + manga._id} style={{textDecoration: "none", color: "var(--text-color)"}}>
                <Card className="float-right mb-3" style={{
                    height: 15 + "rem",
                    backgroundColor: "var(--sidebar-color)"
                }}>
                    <Row style={{height: 15 + "rem"}}>
                        <Col sm="6" className="align-content-center align-items-center d-flex">
                            <Image fluid srcSet={manga.cover_link} alt={manga.name} style={{maxHeight: 14 + "rem"}}/>
                        </Col>
                        <Col sm="6">
                            <div className="card-block">
                                <Card.Title>{name}</Card.Title>
                                <p>Last Update : {date}</p>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </NavLink>
        </Col>
    );
};

export default MangaCard;