import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NAV_ADMIN, NAV_DEFAULT, NAV_LOGGED} from "../Managers/M_Navigations";
import NavigationsItem from "./NavigationsItem";
import {getPseudonym, isLogged} from "../Managers/M_Sessions";
import {NavLink} from "react-router-dom";

const NavigationsSM = ({type}) => {
    const mode = document.querySelector("body").classList.contains("dark");

    function toggleBody() {
        const body = document.querySelector("body");
        const modeText = document.querySelector("#tgl-btn");
        const toggle = body.classList.toggle("dark");
        const navbar = document.querySelector("#navbar");

        if (toggle){
            modeText.textContent = "Light Mode"
            navbar.classList.remove("bg-light");
            navbar.classList.add("bg-dark");
        }
        else{
            modeText.textContent = "Dark Mode"
            navbar.classList.add("bg-light");
            navbar.classList.remove("bg-dark");
        }
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
        <Navbar collapseOnSelect expand="sm" bg={mode ? "dark" : "light"} className="navig fixed-bottom" id="navbar" variant="dark">
            <Container>
                <NavLink to="/" className="text-decoration-none" style={{color: "var(--text-color)"}}><h3>Azonar</h3></NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{backgroundColor: "var(--quinary-color)"}}/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {
                            getNavigationItems()
                        }
                    </Nav>
                    <Nav>
                        {
                            getLogBTN()
                        }
                    </Nav>
                    <Nav className="mt-3">
                        <Button variant="outline-secondary" id="tgl-btn" onClick={toggleBody}>Light Mode</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationsSM;