import React from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {isLogged} from "../Managers/M_Sessions";

const MangaCard = ({manga}) => {
    let name = manga.name
    if (manga.name.length >= 30)
        name = manga.name.substring(0, 30) + " ..."
    const date = new Intl.DateTimeFormat('en-US', {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(manga.last_update));

    let btns = [];
    if (isLogged())
        btns = ["Quick Add"]

    function handleQuickAdd(event) {
        event.preventDefault(true);
    }

    return (
        <Col>
            <NavLink to={"/manga/" + manga._id} style={{textDecoration: "none", color: "var(--text-color)"}}>
                <Card className="float-right mb-3" style={{
                    backgroundColor: "var(--sidebar-color)"
                }}>
                    <Row>
                        <Col sm="6" className="align-content-center align-items-center d-flex">
                            <Image fluid className="rounded rounded-3 m-auto" srcSet={manga.cover_link} alt={manga.name} style={{height: 14 + "rem"}}/>
                        </Col>
                        <Col sm="6">
                            <div className="card-block">
                                <Card.Title>{name}</Card.Title>
                                <p>Last Update : {date}</p>
                                {
                                    btns.map((btn) => <Button key={btn.toLowerCase().split(" ").join("")} className="w-100" onClick={handleQuickAdd} variant="outline-secondary" >{btn}</Button>)
                                }
                            </div>
                        </Col>
                    </Row>
                </Card>
            </NavLink>
        </Col>
    );
};

export default MangaCard;