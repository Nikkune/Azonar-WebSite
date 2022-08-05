import React, {useEffect, useState} from 'react';
import Navigations from "../components/Navigations";
import {NAV_ADMIN} from "../enum/NavTypes";
import Loader from "../components/Loader";
import axios from "axios";
import {Col, Container, Pagination, Row, Stack} from "react-bootstrap";
import MangaCard from "../components/MangaCard";

const Catalog = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [mangas, setMangas] = useState([]);

    useEffect(() => {
        axios.get("https://www.api.azonar.fr/mangas").then((res) => {
            setMangas(res.data);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <Navigations type={NAV_ADMIN}/>
            <div className="home">
                <h1>Catalog</h1>
                <Container className="text-center">
                    <h3><i className="fa-duotone fa-hourglass-clock"/> Dernières Mise À Jour</h3>
                    <Row xs={1} lg={3} className="justify-content-center">
                        {
                            mangas.sort((a, b) => new Date(b.last_update)- new Date(a.last_update)).slice(0, 6).map((manga) =>
                                <MangaCard key={manga._id} manga={manga}/>)
                        }
                    </Row>
                    <hr/>
                    <h3><i className="fa-duotone fa-shelves"/> Etagere</h3>
                    <Row>
                        <div><i className="fa-duotone fa-filter"></i> Genres</div>
                    </Row>
                    <Stack direction="horizontal" gap={3} className="mb-3">
                        <div><i className="fa-duotone fa-hashtag"/> 1637 Mangas</div>
                        <div className="ms-auto"><span><i className="fa-duotone fa-arrow-down-arrow-up"/> Trier Par :</span></div>
                        <div><i className="fa-duotone fa-hourglass-clock"/> Dernières Mise À Jour</div>
                        <div><i className="fa-duotone fa-arrow-down-a-z"/> Nom</div>
                    </Stack>
                    <Row xs={1} lg={3} className="justify-content-center">
                        {
                            mangas.sort((a, b) => new Date(b.last_update)- new Date(a.last_update)).slice(0, 12).map((manga) =>
                                <MangaCard key={manga._id} manga={manga}/> )
                        }
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Catalog;