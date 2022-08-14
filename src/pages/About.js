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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis ipsum nisi reprehenderit sint. Laboriosam nisi repudiandae voluptas voluptate. Amet aspernatur culpa cum dicta ex explicabo in modi molestias natus nemo neque, numquam odit provident quasi, quos reiciendis repudiandae saepe unde, vel velit! A adipisci eius quos vitae? Dignissimos explicabo nihil nisi quisquam sint. Adipisci atque beatae corporis cum cupiditate dignissimos dolorem dolorum eveniet exercitationem illum laboriosam minima nam nesciunt numquam, perferendis perspiciatis porro praesentium quis quo quos repellendus saepe sequi tenetur ut vitae voluptas voluptatum. A accusantium cupiditate eaque facilis illo ipsa, ipsam, odio provident quae suscipit tempore voluptates. Impedit, libero, reprehenderit. Amet corporis cum officia rem vitae. Ab accusantium aperiam at cumque debitis deleniti dicta dignissimos doloribus eligendi eveniet ex facere hic, placeat praesentium quae quaerat quia quisquam repellat sequi sint suscipit tenetur totam voluptatem! A ab accusamus aliquid assumenda commodi consectetur dolor et exercitationem incidunt nobis nulla optio reiciendis rerum sed, sunt unde, vero. Aliquid aut culpa deserunt eum expedita fugit, minima, molestiae mollitia nemo nihil nostrum omnis porro, possimus quam qui quia quisquam. Atque exercitationem fuga nobis. Amet animi corporis debitis deleniti, distinctio facilis id iure nesciunt, nihil nobis nulla odit perspiciatis praesentium quibusdam sunt vel voluptas!</p>
            </div>
        </div>
    );
};

export default About;