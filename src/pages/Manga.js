import React, {useEffect, useState} from 'react';
import Navigations from "../components/Navigations";
import {getNavId} from "../Managers/M_Navigations";
import Loader from "../components/Loader";
import {getMangaViaID} from "../Managers/M_Mangas";
import {useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, Image, Modal, Row, Spinner} from "react-bootstrap";
import Tags from "../components/Tags";
import Error404 from "./Error404";
import {getID, isLogged} from "../Managers/M_Sessions";
import {addMangaToUserList, getMangaIDListOfUserList} from "../Managers/M_List";
import {toast, ToastContainer} from "react-toastify";

const Manga = () => {
    const navigate = useNavigate();
    const ID = window.location.href.split("/")[4];

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [navID, setNavID] = useState(1);
    const [show, setShow] = useState(false);
    const [manga, setManga] = useState({})
    const [hasFailed, setHasFailed] = useState(false);
    const [statusID, setStatusID] = useState(0);
    const [currentChapter, setCurrentChapter] = useState("");
    const [mangaInList, setMangaInList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNavId().then((res) => {
            setNavID(res)
        });

        if (ID === undefined || ID === "") navigate("/catalog");

        getMangaViaID(ID).then((res) => {
            setManga(res);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            setHasFailed(true)
        });

        if (isLogged() === "true"){
            getMangaIDListOfUserList(getID()).then((mga) => {
                setMangaInList(mga);
                setIsLoading(false);
            })
        }

    }, [])

    if (isLoading) {
        return <Loader/>
    }

    if (hasFailed) {
        return <Error404/>
    }

    const date = new Intl.DateTimeFormat('en-US', {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(manga.last_update));

    let btns = [];
    if (isLogged() === "true" && !mangaInList.includes(manga._id))
        btns = ["Add To List"];


    function isNumeric(str) {
        if (typeof str != "string") return false
        return !isNaN(str) &&
            !isNaN(parseFloat(str))
    }

    function errorToast(error) {
        toast.error(error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function successToast(msg) {
        toast.success(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function handleSubmit(event) {
        event.preventDefault(true);
        if (isNumeric(currentChapter)){
            addMangaToUserList(getID(), manga._id, currentChapter, statusID).then((res) => {
                handleClose();
                successToast("Successfully add : " + res.manga_name + " to your list !");
            }).catch((err) => {
                handleClose();
                errorToast("An Error as occurred : " + err);
            });
        }else{
            errorToast(currentChapter + " isn't a number ! Example : 8 OR 8.1");
        }
    }

    function handleQuickAdd(event) {
        event.preventDefault(true);
        handleShow()
    }

    return (
        <div>
            <Navigations type={navID}/>
            <div className="home">
                <Container>
                    <Container className="rounded rounded-3 p-3 shadow text-center mb-3" style={{
                        color: "var(--text-color)",
                        backgroundColor: "var(--sidebar-color)"
                    }}>
                        <h1 className="mb-0">{manga.name}</h1>
                    </Container>
                    <Row xs={1} lg={2}>
                        <Col className="d-flex">
                            <Image fluid className="rounded rounded-3 shadow m-auto" style={{
                                height: 30 + "rem",
                                objectFit: "contain"
                            }} srcSet={manga.cover_link} alt={manga.name}/>
                        </Col>
                        <Col>
                            <Container className="rounded rounded-3 p-3 shadow mb-3" style={{
                                color: "var(--text-color)",
                                backgroundColor: "var(--sidebar-color)"
                            }}>
                                <h5 className="mb-0">
                                    Genres : {manga.genres.map((genre, index) =>
                                    <Tags key={"genres" + index} genres={genre}/>)}
                                </h5>
                            </Container>
                            <Container className="rounded rounded-3 p-3 shadow" style={{
                                color: "var(--text-color)",
                                backgroundColor: "var(--sidebar-color)"
                            }}>
                                <p>Synopsis :</p>
                                <p>{manga.synopsis}</p>
                            </Container>
                        </Col>
                    </Row>
                    <Row className="text-center mt-5">
                        <Container className="rounded rounded-3 p-3 shadow text-center mb-3" style={{
                            color: "var(--text-color)",
                            backgroundColor: "var(--sidebar-color)"
                        }}>
                            <p>Last Update : {date}</p>
                            <p>Chapter number : {manga.chapter_number}</p>
                            <a href={manga.site_link} rel="noreferrer" className="btn btn-outline-secondary w-50" target="_blank">Read This Manga !</a>
                            <br/>
                            {
                                btns.map((btn) =><Button key={btn.toLowerCase().split(" ").join("")} className="w-50 mt-3" onClick={handleQuickAdd} variant="outline-secondary"><i className="fa-duotone fa-circle-plus"/> {btn}</Button>)
                            }
                        </Container>
                    </Row>
                </Container>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{manga.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={event => event.preventDefault()}>
                        <Row className="d-flex flex-row mb-3">
                            <Col>
                                Status :
                            </Col>
                            <Col>
                                <Form.Select size="sm" aria-label="Status" onChange={event => setStatusID(parseInt(event.target.value))}>
                                    <option value={0}>Reading</option>
                                    <option value={1}>Competed</option>
                                    <option value={2}>On-Hold</option>
                                    <option value={3}>Dropped</option>
                                    <option value={4}>Plan To Read</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="d-flex flex-row mb-3">
                            <Col>
                                Current Chapter :
                            </Col>
                            <Col>
                                <Form.Control size="sm" type="text" onChange={event => {setCurrentChapter(event.target.value)}}/>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleSubmit} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer/>
        </div>
    );
};

export default Manga;