import React, {useEffect, useState} from 'react';
import {Spinner, Table} from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";
import LTableRow from "./LTableRow";

const LTable = () => {
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
        return <Spinner animation="border" variant="primary" />
    }

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Manga ID</th>
                <th>Name</th>
                <th>Site</th>
                <th>Chapter Number</th>
                <th>Last Update</th>
            </tr>
            </thead>
            <tbody>
            {mangas.sort((a, b) => new Date(b.last_update) - new Date(a.last_update)).slice(0, 6).map((manga) => <LTableRow key={manga._id} manga={manga}/>)}
            </tbody>
        </Table>
    );
};

export default LTable;