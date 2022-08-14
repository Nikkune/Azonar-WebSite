import React, {useState} from 'react';
import {Button, Card, Col, Form, Image, Modal, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {getID, isLogged} from "../Managers/M_Sessions";
import {toast, ToastContainer} from "react-toastify";
import {addMangaToUserList, getMangaIDListOfUserList} from "../Managers/M_List";

const MangaCard = ({manga}) => {
    const [show, setShow] = useState(false);

    const [statusID, setStatusID] = useState(0);
    const [currentChapter, setCurrentChapter] = useState("");
    const [mangaInList, setMangaInList] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let name = manga.name
    if (manga.name.length >= 30)
        name = manga.name.substring(0, 30) + " ..."
    const date = new Intl.DateTimeFormat('en-US', {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(manga.last_update));

    if (isLogged() === "true") {
        getMangaIDListOfUserList(getID()).then((mga) => {
            setMangaInList(mga);
        })
    }

    let btns = [];
    if (isLogged() === "true" && !mangaInList.includes(manga._id))
        btns = ["Add To List"]

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
        if (isNumeric(currentChapter)) {
            addMangaToUserList(getID(), manga._id, currentChapter, statusID).then((res) => {
                handleClose();
                successToast("Successfully add : " + res.manga_name + " to your list !");
            }).catch((err) => {
                handleClose();
                errorToast("An Error as occurred : " + err);
            });
        } else {
            errorToast(currentChapter + " isn't a number ! Example : 8 OR 8.1");
        }
    }

    function handleQuickAdd(event) {
        event.preventDefault(true);
        handleShow()
    }

    return (
        <Col>
            <NavLink to={"/manga/" + manga._id} style={{textDecoration: "none", color: "var(--text-color)"}}>
                <Card className="float-right mb-3" style={{
                    backgroundColor: "var(--sidebar-color)"
                }}>
                    <Row>
                        <Col sm="6" className="align-content-center align-items-center d-flex">
                            <Image fluid className="rounded rounded-3 m-auto" srcSet={manga.cover_link} alt={manga.name} style={{height: 14 + "rem"}}/>
                        </Col>
                        <Col sm="6">
                            <div className="card-block">
                                <Card.Title>{name}</Card.Title>
                                <p>Last Update : {date}</p>
                                {
                                    btns.map((btn) =>
                                        <Button key={btn.toLowerCase().split(" ").join("")} className="w-100" onClick={handleQuickAdd} variant="outline-secondary"><i className="fa-duotone fa-circle-plus"/> {btn}
                                        </Button>)
                                }
                            </div>
                        </Col>
                    </Row>
                </Card>
            </NavLink>
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
                                <Form.Control size="sm" type="text" onChange={event => {
                                    setCurrentChapter(event.target.value)
                                }}/>
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
        </Col>
    );
};

export default MangaCard;