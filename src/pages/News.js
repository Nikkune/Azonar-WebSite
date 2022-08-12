import React, {useEffect, useState} from 'react';
import Navigations from "../components/Navigations";
import {getNavId} from "../Managers/M_Navigations";
import Loader from "../components/Loader";
import {useNavigate} from "react-router-dom";
import {getID, getPseudonym, isLogged} from "../Managers/M_Sessions";
import {getUserList} from "../Managers/M_List";
import ULTableRow from "../components/ULTableRow";
import {Table} from "react-bootstrap";
import {getUserViaPseudonym} from "../Managers/M_Users";

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

        if (isLogged() === "true"){
            if (getPseudonym() === pseudonym){
                getUserList(getID()).then((res) => {
                    setUserList(res.filter(manga => !manga.is_read));
                })
            }else navigate("/")
        }else navigate("/")
    }, [])

    function reloadUL() {
        if (isLogged() === "true"){
            if (getPseudonym() === pseudonym){
                getUserList(getID()).then((res) => {
                    setUserList(res.filter(manga => !manga.is_read));
                })
            }else navigate("/")
        }else navigate("/")
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <Navigations type={navID}/>
            <div className="home">
                <h1>News</h1>
                {
                    userList.length === 0 ? <h3>No new chapters in your list</h3> : <Table striped className="table-light" variant="perso" bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Current Chapter</th>
                            <th>Last Update</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            userList.map((manga) => <ULTableRow key={manga._id} list_id={manga._id} manga_id={manga.manga_id} manga_name={manga.manga_name} last_update={manga.last_update} current={manga.current_chapter} status={manga.status_id} current_chapter_link={manga.current_chapter_link} reload={reloadUL} news={true}/>)
                        }
                        </tbody>
                    </Table>
                }
            </div>
        </div>
    );
};

export default News;