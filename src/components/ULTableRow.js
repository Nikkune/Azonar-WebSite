import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Image, Modal, Row} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import {deleteMangaFromUserList, updateChapter, updateStatus} from "../Managers/M_List";
import {getID} from "../Managers/M_Sessions";
import {NavLink} from "react-router-dom";
import {getMangaViaID} from "../Managers/M_Mangas";

const ULTableRow = ({
                        list_id,
                        manga_id,
                        current,
                        status,
                        manga_name,
                        last_update,
                        current_chapter_link,
                        reload,
                        news,
                        isUser
                    }) => {
    if (news === undefined)
        news = false;

    const [show, setShow] = useState(false);
    const [showC, setShowC] = useState(false);
    const [statusID, setStatusID] = useState(status);
    const [currentChapter, setCurrentChapter] = useState(current);
    const [manga, setManga] = useState({});

    useEffect(() => {
        getMangaViaID(manga_id).then((res) => {
            setManga(res);
        })
    }, [manga_id])

    const handleClose = () => setShow(false);
    const handleShow = (event) => {
        event.preventDefault(true)
        setShow(true)
    };
    const handleCloseC = () => setShowC(false);
    const handleShowC = () => setShowC(true);

    const date = new Intl.DateTimeFormat('en-US', {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(last_update));

    function isNumeric(str) {
        if (typeof str != "string") return false
        return !isNaN(str) &&
            !isNaN(parseFloat(str))
    }

    function errorToast(error, toastID) {
        toast.error(error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId : toastID
        });
    }

    function successToast(msg, toastID) {
        toast.success(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId : toastID
        });
    }

    function handleSubmitC(event) {
        event.preventDefault(true);
        deleteMangaFromUserList(list_id).then((res) => {
            handleClose();
            reload();
            successToast("Successfully delete : " + res.manga_name + " from list !",res._id);
        });
    }

    function handleSubmit(event) {
        event.preventDefault(true);
        console.log(currentChapter)
        if (isNumeric(currentChapter.toString())) {
            if (currentChapter !== current) {
                updateChapter(getID(), manga_id, currentChapter).then((res) => {
                    successToast("Successfully update : " + res.manga_name + " current chapter to " + currentChapter + " !",res._id);
                    handleClose();
                    reload();
                })
            }
            if (statusID.toString() !== status.toString()) {
                updateStatus(getID(), manga_id, statusID).then((res) => {
                    successToast("Successfully update : " + res.manga_name + " status to " + statusID + " !",res._id);
                    handleClose();
                    reload();
                })
            }
        } else {
            errorToast(currentChapter + " isn't a number ! Example : 8 OR 8.1","0189410e0e48f");
        }
    }

    let btns;

    if (!news) {
        btns = [
            {
                text: "Edit",
                icon: "pen-to-square",
                action: handleShow,
                href: null
            },
            {
                text: "Delete",
                icon: "trash",
                action: handleShowC,
                href: null
            }
        ]
    } else {
        btns = [
            {
                text: "Edit",
                icon: "pen-to-square",
                action: handleShow,
                href: null
            }, {
                text: "Continue",
                icon: "arrow-up-right-from-square",
                action: null,
                href: current_chapter_link
            }
        ]
    }

    return (
        <tr>
            <td className="text-center">
                <Image fluid src={manga.cover_link} style={{height: 70+"px"}}/>
            </td>
            <td className="text-center">
                <NavLink to={"/manga/" + manga_id} className="text-decoration-none" style={{color: "var(--text-color)", wordWrap: "break-word"}}>{manga_name}</NavLink>
            </td>
            <td className="text-center">{current} / {manga.chapter_number}</td>
            <td className="text-center">{date}</td>
            {isUser ?
                <td key={manga_id + " Action"} className="text-center">
                {
                    btns.map((btn) =>
                        <Button variant="perso" className="me-3" size="sm" onClick={btn.action !== null ? btn.action : null} href={btn.href !== null ? btn.href : "#"} target={btn.href !== null ? "_blank" : "_self"}><i className={"fa-duotone fa-" + btn.icon}/> {btn.text}
                        </Button>)
                }
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton
                                  style={{backgroundColor: "var(--sidebar-color"}}>
                        <Modal.Title>{manga_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                        style={{backgroundColor: "var(--sidebar-color"}}>
                        <Form onSubmit={event => event.preventDefault()}>
                            <Row className="d-flex flex-row mb-3">
                                <Col>
                                    Status :
                                </Col>
                                <Col>
                                    <Form.Select size="sm" aria-label="Status" value={statusID.toString()} onChange={event => setStatusID(parseInt(event.target.value))}>
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
                                <Col className="d-flex">
                                    <Form.Control size="sm" type="text" value={currentChapter.toString()} onChange={event => {
                                        setCurrentChapter(event.target.value)
                                    }}/>
                                    <div className="ms-2">
                                        {
                                            "/" + manga.chapter_number
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer
                        style={{backgroundColor: "var(--sidebar-color"}}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={handleSubmit} variant="primary">Save</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={showC}
                    onHide={handleCloseC}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header
                        style={{backgroundColor: "var(--sidebar-color"}}>
                        <Modal.Title>{manga_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                        style={{backgroundColor: "var(--sidebar-color"}}>
                        <h5>You are sure you want to delete this manga !</h5>
                    </Modal.Body>
                    <Modal.Footer
                        style={{backgroundColor: "var(--sidebar-color"}}>
                        <Button variant="secondary" onClick={handleCloseC}>
                            No
                        </Button>
                        <Button onClick={handleSubmitC} variant="danger">Yes</Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer
                    theme="colored"
                />
            </td>
            :""}
        </tr>
    );
};

export default ULTableRow;