import React, {useEffect, useState} from 'react';
import {Spinner, Table} from "react-bootstrap";
import LTableRow from "./LTableRow";
import {getLastMangas} from "../Managers/M_Mangas";

const LTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [mangas, setMangas] = useState([]);

    useEffect(() => {
        getLastMangas().then((res) => {
            setMangas(res);
            setIsLoading(false);
        })

        setInterval(() => {
            setIsLoading(true);
            getLastMangas().then((res) => {
                setMangas(res);
                setIsLoading(false);
            })
        }, 1000 * 10)
    }, [])

    if (isLoading) {
        return <Spinner animation="border" variant="primary"/>
    }

    return (
        <Table striped bordered variant="perso">
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
            {mangas.sort((a, b) => new Date(b.last_update) - new Date(a.last_update)).slice(0, 6).map((manga) =>
                <LTableRow key={manga._id} manga={manga}/>)}
            </tbody>
        </Table>
    );
};

export default LTable;