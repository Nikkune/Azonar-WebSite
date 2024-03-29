import React from 'react';
import {NavLink} from "react-router-dom";
import {NAV_ADMIN, NAV_DEFAULT, NAV_LOGGED} from "../Managers/M_Navigations";
import NavigationsItem from "./NavigationsItem";
import {getPseudonym, isLogged} from "../Managers/M_Sessions";

const Navigations = ({type}) => {
    function toggleBody() {
        const body = document.querySelector("body");
        const modeText = document.querySelector(".mode-text");
        const toggle = body.classList.toggle("dark");
        if (toggle)
            modeText.textContent = "Light Mode"
        else
            modeText.textContent = "Dark Mode"
    }

    function toggleSidebar() {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("close");
    }

    function getNavigationItems() {
        switch (type) {
            case NAV_DEFAULT:
                return (
                    <ul className="menu-links">
                        <NavigationsItem to="/" icon="fa-duotone fa-house" name="Home"/>
                        <NavigationsItem to="/catalog" icon="fa-duotone fa-books" name="Library"/>
                        <NavigationsItem to="/bots" icon="fa-duotone fa-user-robot" name="Bots"/>
                        <NavigationsItem to="/about" icon="fa-duotone fa-info" name="About"/>
                    </ul>
                )
            case NAV_LOGGED :
                return (
                    <ul className="menu-links">
                        <NavigationsItem to="/" icon="fa-duotone fa-house" name="Home"/>
                        <NavigationsItem to="/catalog" icon="fa-duotone fa-books" name="Library"/>
                        <NavigationsItem to="/bots" icon="fa-duotone fa-user-robot" name="Bots"/>
                        <NavigationsItem to={"/list/" + getPseudonym()} icon="fa-duotone fa-rectangle-list" name="My List"/>
                        <NavigationsItem to={"/new/" + getPseudonym()} icon="fa-duotone fa-file-circle-plus" name="New Chapters"/>
                        <NavigationsItem to="/about" icon="fa-duotone fa-info" name="About"/>
                    </ul>
                )
            case NAV_ADMIN :
                return (
                    <ul className="menu-links">
                        <NavigationsItem to="/" icon="fa-duotone fa-house" name="Home"/>
                        <NavigationsItem to="/dashboard" icon="fa-duotone fa-gears" name="Dashboard"/>
                        <NavigationsItem to="/catalog" icon="fa-duotone fa-books" name="Library"/>
                        <NavigationsItem to="/bots" icon="fa-duotone fa-user-robot" name="Bots"/>
                        <NavigationsItem to={"/list/" + getPseudonym()} icon="fa-duotone fa-rectangle-list" name="My List"/>
                        <NavigationsItem to={"/new/" + getPseudonym()} icon="fa-duotone fa-file-circle-plus" name="New Chapters"/>
                        <NavigationsItem to="/about" icon="fa-duotone fa-info" name="About"/>
                    </ul>
                )
            default :
                return (
                    <ul className="menu-links">
                        <NavigationsItem to="/" icon="fa-duotone fa-house" name="Home"/>
                        <NavigationsItem to="/catalog" icon="fa-duotone fa-books" name="Library"/>
                        <NavigationsItem to="/bots" icon="fa-duotone fa-user-robot" name="Bots"/>
                        <NavigationsItem to="/about" icon="fa-duotone fa-info" name="About"/>
                    </ul>
                )
        }
    }

    function getLogBTN() {
        if (isLogged() === "true") {
            return (
                <NavLink to="/disconnect" className="">
                    <i className="fa-duotone fa-right-from-bracket icon"/>
                    <span className="text nav-text">Logout</span>
                </NavLink>
            )
        } else {
            return (
                <NavLink to="/auth" className="">
                    <i className="fa-duotone fa-right-to-bracket icon"/>
                    <span className="text nav-text">Login / Sign in</span>
                </NavLink>
            )
        }
    }


    return (
        <nav className="sidebar close">
            <header>
                <div className="image-text">
                    <span className="image">
                        <img src="/logo.png" alt="Azonar"/>
                    </span>

                    <div className="text header-text">
                        <span className="name">Azonar</span>
                    </div>
                </div>

                <i className="fa-light fa-angle-right toggle" onClick={toggleSidebar}/>
            </header>
            <div className="menu-bar">
                <div className="menu">
                    {
                        getNavigationItems()
                    }
                </div>
                <div className="bottom-content">
                    <li className="">
                        {
                            getLogBTN()
                        }
                    </li>

                    <li className="mode">
                        <div className="sun-moon">
                            <i className="fa-duotone fa-moon-stars icon moon"/>
                            <i className="fa-duotone fa-sun-bright icon sun"/>
                        </div>
                        <span className="mode-text text">Dark Mode</span>
                        <div className="toggle-switch" id="btn-dark-mode" onClick={toggleBody}>
                            <span className="switch">
                            </span>
                        </div>
                    </li>
                </div>
            </div>
        </nav>
    );
};

export default Navigations;