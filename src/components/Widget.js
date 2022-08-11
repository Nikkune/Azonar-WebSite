import React, {useEffect, useState} from 'react';
import {usersCount} from "../Managers/M_Users";
import {botsCount} from "../Managers/M_Bots";
import {mangasCount} from "../Managers/M_Mangas";
import {Spinner} from "react-bootstrap";

const Widget = ({type}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [usersAmount, setUsersAmount] = useState(1);
    const [botsAmount, setBotsAmount] = useState(1);
    const [mangasAmount, setMangaAmount] = useState(1);

    let data;
    let amount;

    useEffect(() => {
        usersCount().then((res) => {
            setUsersAmount(res);
            setIsLoading(false);
        })
        botsCount().then((res) => {
            setBotsAmount(res);
            setIsLoading(false);
        })
        mangasCount().then((res) => {
            setMangaAmount(res);
            setIsLoading(false);
        })
    },[])

    switch (type) {
        case "user":
            data = {
                title: "Users",
                isMoney: false,
                link: "See all users",
                icon: "fa-user",
                colorBG: "#ffa0a0",
                color: "#950000"
            }
            amount = usersAmount;
            break
        case "bot":
            data = {
                title: "Bots",
                isMoney: false,
                link: "See all bots",
                icon: "fa-robot",
                colorBG: "#ffe9a0",
                color: "#957c00"
            }
            amount = botsAmount;
            break
        case "manga":
            data = {
                title: "Mangas",
                isMoney: false,
                link: "See all mangas",
                icon: "fa-books",
                colorBG: "#b1ffa0",
                color: "#009507"
            }
            amount = mangasAmount;
            break
        default:
            break
    }

    if (isLoading) {
        return <Spinner animation="border" variant="primary"/>
    }

    return (
        <div className="widget shadow">
            <div className="w-left">
                <span className="w-title">{data.title}</span>
                <span className="w-counter">{amount}{data.isMoney && "€"}</span>
                <span className="w-link">{data.link}</span>
            </div>
            <div className="w-right">
                <i className={"fa-duotone " + data.icon + " w-icon"} style={{
                    backgroundColor: data.colorBG,
                    color: data.color
                }}/>
            </div>
        </div>
    );
};

export default Widget;