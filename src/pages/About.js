import React, {useEffect, useState} from 'react';
import Navigations from "../components/Navigations";
import {getNavId} from "../Managers/M_Navigations";
import Loader from "../components/Loader";
import NavigationsSM from "../components/NavigationsSM";

const About = () => {
    const [navID, setNavID] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNavId().then((res) => {
            setNavID(res)
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
                <h1>About</h1>
                <p>Hello, I am Nikkune and I created this website.</p>
                <p>I created it, because to read my manga on my favorite websites, I had to bookmark them, but ending up with 210 bookmarks was too much, so I started looking for a site like "MyAnimeList", but for manga. Not having found any, I decided to create my own. In addition, this site checks on its own if there are new chapters for all manga and redirects to the website with the most chapters.</p>
                <br/>
                <p>List of website support on 10/19/2022:</p>
                <ul style={{paddingLeft: 2 + "rem", marginTop: -1+"rem"}}>
                    <li>JapScan</li>
                    <li>Mangas Origines</li>
                </ul>
            </div>
        </div>
    );
};

export default About;