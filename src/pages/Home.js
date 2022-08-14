import React, {useEffect, useState} from 'react';
import Navigations from "../components/Navigations";
import {getNavId} from "../Managers/M_Navigations";
import Loader from "../components/Loader";
import {getLastMangas} from "../Managers/M_Mangas";
import MangaCard from "../components/MangaCard";
import {Container, Row} from "react-bootstrap";
import NavigationsSM from "../components/NavigationsSM";

const Home = () => {
    const [navID, setNavID] = useState(1);
    const [mangas, setMangas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNavId().then((res) => {
            setNavID(res)
        });

        getLastMangas().then((res) => {
            setMangas(res)
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <NavigationsSM type={navID}/>
            <Navigations type={navID}/>
            <div className="home">
                <h1>Home</h1>
                <Container className="rounded rounded-3 p-3 shadow text-center mb-3" style={{
                    color: "var(--text-color)",
                    backgroundColor: "var(--sidebar-color-light)"
                }}>
                    <h3 className="mb-3"><i className="fa-duotone fa-hourglass-clock"/> Last Updates</h3>
                    <Row xs={1} lg={3} className="justify-content-center">
                        {
                            mangas.map((manga) =>
                                <MangaCard key={manga._id} manga={manga}/>)
                        }
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Home;