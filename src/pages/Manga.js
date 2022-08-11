import React, {useEffect, useState} from 'react';
import Navigations from "../components/Navigations";
import {getNavId} from "../Managers/M_Navigations";
import Loader from "../components/Loader";
import {getMangaViaID} from "../Managers/M_Mangas";
import {useNavigate} from "react-router-dom";
import {Col, Container, Image, Row} from "react-bootstrap";
import Tags from "../components/Tags";

const Manga = () => {
    const navigate = useNavigate();
    const ID = window.location.href.split("/")[4];

    const [navID, setNavID] = useState(1);
    const [manga, setManga] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNavId().then((res) => {
            setNavID(res)
        });

        if (ID === undefined || ID === "") navigate("/catalog");

        getMangaViaID(ID).then((res) => {
            setManga(res);
            setIsLoading(false);
        });
    })

    if (isLoading) {
        return <Loader/>
    }


    const date = new Intl.DateTimeFormat('en-US', {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(manga.last_update));

    return (
        <div>
            <Navigations type={navID}/>
            <div className="home">
                <Container>
                    <Container className="rounded rounded-3 p-3 shadow text-center mb-3" style={{
                        color: "var(--text-color)",
                        backgroundColor: "var(--sidebar-color)"
                    }}>
                        <h1 className="mb-0">{manga.name}</h1>
                    </Container>
                    <Row xs={1} lg={2}>
                        <Col className="d-flex">
                            <Image fluid className="rounded rounded-3 shadow m-auto" style={{
                                height: 30 + "rem",
                                objectFit: "contain"
                            }} srcSet={manga.cover_link} alt={manga.name}/>
                        </Col>
                        <Col>
                            <Container className="rounded rounded-3 p-3 shadow mb-3" style={{
                                color: "var(--text-color)",
                                backgroundColor: "var(--sidebar-color)"
                            }}>
                                <h5 className="mb-0">
                                    Genres : {manga.genres.map((genre, index) =>
                                    <Tags key={"genres" + index} genres={genre}/>)}
                                </h5>
                            </Container>
                            <Container className="rounded rounded-3 p-3 shadow" style={{
                                color: "var(--text-color)",
                                backgroundColor: "var(--sidebar-color)"
                            }}>
                                <p>Synopsis :</p>
                                <p>{manga.synopsis}</p>
                            </Container>
                        </Col>
                    </Row>
                    <Row className="text-center mt-5">
                        <Container className="rounded rounded-3 p-3 shadow text-center mb-3" style={{
                            color: "var(--text-color)",
                            backgroundColor: "var(--sidebar-color)"
                        }}>
                            <p>Last Update : {date}</p>
                            <p>Chapter number : {manga.chapter_number}</p>
                            <a href={manga.site_link} rel="noreferrer" className="btn btn-outline-secondary w-50" target="_blank">Read This Manga !</a>
                        </Container>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Manga;