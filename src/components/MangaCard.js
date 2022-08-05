import React from 'react';
import {Card, Col, Image, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const MangaCard = ({manga}) => {
    let name = manga.name
    if (manga.name.length >= 20)
        name = manga.name.substring(0, 35) + " ..."
    const date = new Intl.DateTimeFormat('en-US', {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(manga.last_update));

    return (
        <Col>
            <NavLink to={"/manga/" + manga._id} style={{textDecoration: "none", color:"var(--text-color)"}} >
                <Card className="float-right mb-3" style={{minHeight: 13 + "rem"}}>
                    <Row style={{minHeight: 13 + "rem"}}>
                        <Col sm="6" className="align-content-center align-items-center d-flex">
                            <Image fluid src="https://via.placeholder.com/300X400"/>
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