// noinspection ES6CheckImport

import React, {useEffect, useState} from 'react';
import Navigations from "../components/Navigations";
import {getNavId} from "../Managers/M_Navigations";
import Loader from "../components/Loader";
import {useNavigate} from "react-router-dom";
import {getID, getPseudonym, isLogged} from "../Managers/M_Sessions";
import {getUserList} from "../Managers/M_List";
import {getUserViaPseudonym} from "../Managers/M_Users";
import Error404 from "./Error404";
import {Container, Nav, Table} from "react-bootstrap";
import ULTableRow from "../components/ULTableRow";
import NavigationsSM from "../components/NavigationsSM";

const Lists = () => {
    const navigate = useNavigate();
    const pseudonym = window.location.href.split("/")[4];

    const [navID, setNavID] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFailed, setHasFailed] = useState(false);
    const [statusSelect, setStatusSelect] = useState(5);
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
                    setUserList(res);
                })
            } else {
                getUserViaPseudonym(pseudonym).then((usr) => {
                    getUserList(usr._id).then((res) => {
                        setUserList(res);
                    }).catch(() => {
                        setIsLoading(false);
                        setHasFailed(true)
                    });
                }).catch(() => {
                    setIsLoading(false);
                    setHasFailed(true)
                });
            }
        } else {
            getUserViaPseudonym(pseudonym).then((usr) => {
                getUserList(usr._id).then((res) => {
                    setUserList(res);
                }).catch(() => {
                    setIsLoading(false);
                    setHasFailed(true)
                });
            }).catch(() => {
                setIsLoading(false);
                setHasFailed(true)
            });
        }
    }, [navigate, pseudonym])

    if (isLoading) {
        return <Loader/>
    }

    if (hasFailed) {
        return <Error404/>
    }

    let aff = pseudonym + " has";
    if (isLogged() === "true")
        if (getPseudonym() === pseudonym)
            aff = "You have"

    function handelChange(event) {
        const select = event.target.id.split("!!")[1];
        setStatusSelect(parseInt(select));
    }

    let statu;
    switch (statusSelect) {
        case 0:
            statu = "Reading";
            break;
        case 1:
            statu = "Completed";
            break;
        case 2:
            statu = "On Hold";
            break;
        case 3:
            statu = "Dropped";
            break;
        case 4:
            statu = "Plan to Read";
            break;
        case 5:
            statu = "all manga";
            break;
        default:
            break;
    }

    function reloadUL() {
        if (isLogged() === "true") {
            if (getPseudonym() === pseudonym) {
                getUserList(getID()).then((res) => {
                    setUserList(res);
                })
            } else {
                getUserViaPseudonym(pseudonym).then((usr) => {
                    getUserList(usr._id).then((res) => {
                        setUserList(res);
                    }).catch(() => {
                        setIsLoading(false);
                        setHasFailed(true)
                    });
                }).catch(() => {
                    setIsLoading(false);
                    setHasFailed(true)
                });
            }
        } else {
            getUserViaPseudonym(pseudonym).then((usr) => {
                getUserList(usr._id).then((res) => {
                    setUserList(res);
                }).catch(() => {
                    setIsLoading(false);
                    setHasFailed(true)
                });
            }).catch(() => {
                setIsLoading(false);
                setHasFailed(true)
            });
        }
    }

    if (userList.length === 0) {
        return (
            <div>
                <NavigationsSM type={navID}/>
                <Navigations type={navID}/>
                <div className="home">
                    <h1>Lists</h1>
                    <Container className="rounded rounded-3 p-3 shadow text-center mb-3" style={{
                        color: "var(--text-color)",
                        backgroundColor: "var(--sidebar-color)"
                    }}>
                        <h4>{aff + " no manga in the list !"}</h4>
                    </Container>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NavigationsSM type={navID}/>
            <Navigations type={navID}/>
            <div className="home">
                <h1>Lists</h1>
                <Container className="rounded rounded-3 p-3 shadow text-center mb-3" style={{
                    color: "var(--text-color)",
                    backgroundColor: "var(--sidebar-color)"
                }}>
                    <Nav fill variant="tabs" className="mb-3" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link id="filter!!5" onClick={handelChange} active={statusSelect === 5}>All Mangas</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link id="filter!!0" onClick={handelChange} active={statusSelect === 0}>Currently Reading</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link id="filter!!1" onClick={handelChange} active={statusSelect === 1}>Completed</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link id="filter!!2" onClick={handelChange} active={statusSelect === 2}>On Hold</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link id="filter!!3" onClick={handelChange} active={statusSelect === 3}>Dropped</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link id="filter!!4" onClick={handelChange} active={statusSelect === 4}>Plan to Read</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {
                        userList.filter(manga => statusSelect !== 5 ? manga.status_id === statusSelect : true).length === 0 ?
                            <h3>{aff + " no " + statu + " manga in the list !"}</h3> :
                            <Table striped className="table-light" variant="perso" bordered hover>
                                <thead>
                                <tr>
                                    <th>Images</th>
                                    <th>Name</th>
                                    <th>Current Chapter</th>
                                    <th>Last Update</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    userList.filter(manga => statusSelect !== 5 ? manga.status_id === statusSelect : true).sort((a, b) => {
                                        if (a.manga_name.replace(/[^\w\s]/gi, '') < b.manga_name.replace(/[^\w\s]/gi, '')) {
                                            return -1;
                                        }
                                        if (a.manga_name.replace(/[^\w\s]/gi, '') > b.manga_name.replace(/[^\w\s]/gi, '')) {
                                            return 1;
                                        }
                                        return 0;
                                    }).map((manga) =>
                                        <ULTableRow key={manga._id} list_id={manga._id} current_chapter_link={manga.current_chapter_link} news={false} manga_id={manga.manga_id} manga_name={manga.manga_name} last_update={manga.last_update} current={manga.current_chapter} status={manga.status_id} reload={reloadUL}/>)
                                }
                                </tbody>
                            </Table>
                    }
                </Container>
            </div>
        </div>
    );
};

export default Lists;