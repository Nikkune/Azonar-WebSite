// noinspection ES6CheckImport

import React, {useEffect, useState} from 'react';
import Navigations from "../components/Navigations";
import {getNavId} from "../Managers/M_Navigations";
import Loader from "../components/Loader";
import {useNavigate} from "react-router-dom";
import {getID, getPseudonym, isLogged} from "../Managers/M_Sessions";
import {getUserList} from "../Managers/M_List";
import ULTableRow from "../components/ULTableRow";
import {Table} from "react-bootstrap";
import NavigationsSM from "../components/NavigationsSM";

const News = () => {
    const navigate = useNavigate();
    const pseudonym = window.location.href.split("/")[4];

    const [navID, setNavID] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getNavId().then((res) => {
            setNavID(res)
            setIsLoading(false);
        })

        if (pseudonym === undefined || pseudonym === "") navigate("/");

        if (isLogged() === "true") {
            if (getPseudonym() === pseudonym) {
                getUserList(getID()).then((res) => {
                    setUserList(res.filter(manga => !manga.is_read));
                })
            } else navigate("/")
        } else navigate("/")
    }, [navigate, pseudonym])

    function reloadUL() {
        if (isLogged() === "true") {
            if (getPseudonym() === pseudonym) {
                getUserList(getID()).then((res) => {
                    setUserList(res.filter(manga => !manga.is_read));
                })
            } else navigate("/")
        } else navigate("/")
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <NavigationsSM type={navID}/>
            <Navigations type={navID}/>
            <div className="home">
                <h1>News</h1>
                {
                    userList.length === 0 ? <h3>No new chapters in your list</h3> :
                        <Table striped className="table-light" size="sm" variant="perso" bordered hover>
                            <thead>
                            <tr>
                                <th className="text-center">Images</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Current Chapter</th>
                                <th className="text-center">Last Update</th>
                                <th className="text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                userList.filter(manga => manga.status_id === 0).sort((a, b) => {
                                    if (a.manga_name.replace(/[^\w\s]/gi, '') < b.manga_name.replace(/[^\w\s]/gi, '')) {
                                        return -1;
                                    }
                                    if (a.manga_name.replace(/[^\w\s]/gi, '') > b.manga_name.replace(/[^\w\s]/gi, '')) {
                                        return 1;
                                    }
                                    return 0;
                                }).map((manga) =>
                                    <ULTableRow key={manga._id} list_id={manga._id} manga_id={manga.manga_id} manga_name={manga.manga_name} last_update={manga.last_update} current={manga.current_chapter} status={manga.status_id} current_chapter_link={manga.current_chapter_link} reload={reloadUL} news={true}/>)
                            }
                            </tbody>
                        </Table>
                }
            </div>
        </div>
    );
};

export default News;