import React, {useEffect, useRef, useState} from 'react';
import Navigations from "../components/Navigations";
import Loader from "../components/Loader";
import {Col, Container, Form, PageItem, Pagination, Row, Stack} from "react-bootstrap";
import MangaCard from "../components/MangaCard";
import {getNavId} from "../Managers/M_Navigations";
import {getMangas} from "../Managers/M_Mangas";
import NavigationsSM from "../components/NavigationsSM";

const Catalog = () => {
        const [isLoading, setIsLoading] = useState(true);
        const [mangas, setMangas] = useState([]);
        const [mangasFiltered, setMangasFiltered] = useState([]);
        const [sorter, setSorter] = useState(["name", "asc"]);
        const [page, setPage] = useState(1);
        const [lastPage, setLastPage] = useState(1);
        const [targetPage, setTargetPage] = useState(1);
        const [chevronDir, setChevronDir] = useState("down");
        const [search, setSearch] = useState("");
        const [navID, setNavID] = useState(1);
        const shelves = useRef(null)

        let btnColor;
        let paginations;
        let arrowDir;
        const genresEN = ["action", "alien", "friendship", "love", "art", "martial arts", "adventure", "camping", "fight", "comedy", "kitchen", "detective", "doujinshi", "drama", "ecchi", "fantasy", "fantastic", "gore", "harem", "historical", "horror", "isekai", "video game", "josei", "loli", "magic", "mature", "mecha", "medical", "mystery", "post-apocalyptic", "psychological", "reincarnation", "romance", "school", "seinen", "science fiction", "shojo", "shojo ai", "shonen", "shonen ai", "sport", "supernatural", "survival game", "thriller", "tragedy", "slice of life", "love triangle", "school life", "yaoi", "yuri", "zombie"];

        useEffect(() => {
            getNavId().then((res) => {
                setNavID(res)
            })

            getMangas().then((res) => {
                setMangas(res);
                setMangasFiltered(res);
                setLastPage(Math.ceil(res.length / 12));
                setIsLoading(false);
            })
        }, [])

        function nextPage(lastPage = 200) {
            if (page !== lastPage)
                setPage(page + 1);
            shelves.current.scrollIntoView();
        }

        function setNewPage(event) {
            setPage(parseInt(event.target.innerText));
            shelves.current.scrollIntoView();
        }

        function previousPage() {
            if (page !== 1)
                setPage(page - 1);
            shelves.current.scrollIntoView();
        }

        function sort(a, b) {
            if (sorter.includes("name") && sorter.includes("asc")) {
                if (a.name.replace(/[^\w\s]/gi, '') < b.name.replace(/[^\w\s]/gi, '')) {
                    return -1;
                }
                if (a.name.replace(/[^\w\s]/gi, '') > b.name.replace(/[^\w\s]/gi, '')) {
                    return 1;
                }
                return 0;
            } else if (sorter.includes("name") && sorter.includes("dsc")) {
                if (a.name.replace(/[^\w\s]/gi, '') > b.name.replace(/[^\w\s]/gi, '')) {
                    return -1;
                }
                if (a.name.replace(/[^\w\s]/gi, '') < b.name.replace(/[^\w\s]/gi, '')) {
                    return 1;
                }
                return 0;
            } else if (sorter.includes("last") && sorter.includes("asc")) {
                if (new Date(a.last_update) > new Date(b.last_update)) {
                    return -1;
                }
                if (new Date(a.last_update) < new Date(b.last_update)) {
                    return 1;
                }
                return 0;
            } else if (sorter.includes("last") && sorter.includes("dsc")) {
                if (new Date(a.last_update) < new Date(b.last_update)) {
                    return -1;
                }
                if (new Date(a.last_update) > new Date(b.last_update)) {
                    return 1;
                }
                return 0;
            }
        }

        function filter(filterName) {
            setIsLoading(true);
            const btnNone = document.getElementById("btnNone");
            if (filterName !== "" || filterName !== null) {
                if (filterName.toString() !== "none") {
                    if (btnNone.classList.contains("d-none"))
                        btnNone.classList.remove("d-none");
                    let filteredMangas = []
                    for (const manga of mangasFiltered) {
                        if (manga.genres.includes(filterName))
                            filteredMangas.push(manga)
                    }
                    setMangasFiltered(filteredMangas);
                    setLastPage(Math.ceil(filteredMangas.length / 12));
                    setIsLoading(false)
                } else {
                    if (!btnNone.classList.contains("d-none"))
                        btnNone.classList.add("d-none");
                    updateSearch(search);
                    setIsLoading(false)
                }
            } else {
                if (!btnNone.classList.contains("d-none"))
                    btnNone.classList.add("d-none");
                updateSearch(search);
                setIsLoading(false)
            }
        }

        function handelClick(event) {
            switch (event.target.id) {
                case "last":
                    if (sorter.includes("asc"))
                        setSorter(["last", "dsc"]);
                    else setSorter(["last", "asc"])
                    break;
                case "name":
                    if (sorter.includes("asc"))
                        setSorter(["name", "dsc"]);
                    else setSorter(["name", "asc"])
                    break;
                default:
                    if (sorter.includes("asc"))
                        setSorter(["last", "dsc"]);
                    else setSorter(["last", "asc"])
                    break;
            }
        }

        function handelGenresClick(event) {
            filter(event.target.id);
            const drawer = document.getElementById("genreDrawer");
            drawer.classList.toggle("active");
        }

        function handelNoneClick() {
            filter("none");
        }

        function handelChange(event) {
            let target = event.target.value;
            if (target <= 0) target = 1;
            if (target >> lastPage) target = lastPage;
            setTargetPage(target)
        }

        function handelSubmit() {
            setPage(targetPage);
            shelves.current.scrollIntoView();
        }

        function handelClickGenre() {
            const drawer = document.getElementById("genreDrawer");
            if (drawer.classList.toggle("active"))
                setChevronDir("up")
            else setChevronDir("down")
        }

        if (sorter[1] === "asc") {
            arrowDir = "up"
        } else {
            arrowDir = "down"
        }

        function updateSearch(searchTerm) {
            setSearch(searchTerm);
            let filteredManga = [];
            for (const manga of mangas) {
                if (manga.name.toLowerCase().startsWith(searchTerm))
                    filteredManga.push(manga)
            }
            setMangasFiltered(filteredManga);
            setLastPage(Math.ceil(filteredManga.length / 12));
        }

        function handleSearch(event) {
            const searchTerm = event.target.value.toLowerCase();
            const btnNone = document.getElementById("btnNone");
            if (!btnNone.classList.contains("d-none"))
                btnNone.classList.add("d-none");
            setSearch(searchTerm);
            let filteredManga = [];
            for (const manga of mangas) {
                if (manga.name.toLowerCase().startsWith(searchTerm))
                    filteredManga.push(manga)
            }
            setMangasFiltered(filteredManga);
            let last = Math.ceil(filteredManga.length / 12)
            if (last === 0) last = 1
            setLastPage(last);
        }


        if (sorter.includes("name")) {
            btnColor = [
                {icon: "fa-hourglass-clock", text: " Dernières Mise À Jour", id: "last", active: ""},
                {icon: "fa-arrow-" + arrowDir + "-a-z", text: " Nom", id: "name", active: "active"}
            ];
        } else if (sorter.includes("last")) {
            btnColor = [
                {icon: "fa-hourglass-clock", text: " Dernières Mise À Jour", id: "last", active: "active"},
                {icon: "fa-arrow-" + arrowDir + "-a-z", text: " Nom", id: "name", active: ""}
            ];
        }

        if (lastPage > 5) {
            switch (page) {
                case 1:
                    paginations = [
                        {nbr: 1, active: true, disable: false},
                        {nbr: 2, active: false, disable: false},
                        {nbr: 3, active: false, disable: false},
                        {nbr: 4, active: false, disable: false},
                        {nbr: 5, active: false, disable: false}
                    ];
                    break;
                case 2:
                    paginations = [
                        {nbr: 1, active: false, disable: false},
                        {nbr: 2, active: true, disable: false},
                        {nbr: 3, active: false, disable: false},
                        {nbr: 4, active: false, disable: false},
                        {nbr: 5, active: false, disable: false}
                    ];
                    break;
                case lastPage:
                    paginations = [
                        {nbr: lastPage - 4, active: false, disable: false},
                        {nbr: lastPage - 3, active: false, disable: false},
                        {nbr: lastPage - 2, active: false, disable: false},
                        {nbr: lastPage - 1, active: false, disable: false},
                        {nbr: lastPage, active: true, disable: false}
                    ];
                    break;
                case lastPage - 1:
                    paginations = [
                        {nbr: lastPage - 4, active: false, disable: false},
                        {nbr: lastPage - 3, active: false, disable: false},
                        {nbr: lastPage - 2, active: false, disable: false},
                        {nbr: lastPage - 1, active: true, disable: false},
                        {nbr: lastPage, active: false, disable: false}
                    ];
                    break;
                default:
                    paginations = [
                        {nbr: page - 2, active: false, disable: false},
                        {nbr: page - 1, active: false, disable: false},
                        {nbr: page, active: true, disable: false},
                        {nbr: parseInt(page.toString()) + 1, active: false, disable: false},
                        {nbr: parseInt(page.toString()) + 2, active: false, disable: false}
                    ];
                    break;
            }
        } else {
            paginations = [
                {nbr: 1, active: true, disable: false},
                {nbr: 2, active: false, disable: true},
                {nbr: 3, active: false, disable: true},
                {nbr: 4, active: false, disable: true},
                {nbr: 5, active: false, disable: true}
            ];
        }

        if (page > lastPage)
            setPage(lastPage);

        if (isLoading) {
            return <Loader/>
        }

        return (
            <div>
                <NavigationsSM type={navID}/>
                <Navigations type={navID}/>
                <div className="home">
                    <h1>Library</h1>
                    <Container className="text-center">
                        <h3><i className="fa-duotone fa-hourglass-clock"/> Last Updates</h3>
                        <Row xs={1} lg={3} className="justify-content-center">
                            {
                                mangas.sort((a, b) => new Date(b.last_update) - new Date(a.last_update)).slice(0, 6).map((manga) =>
                                    <MangaCard key={manga._id} manga={manga}/>)
                            }
                        </Row>
                        <hr ref={shelves}/>
                        <h3><i className="fa-duotone fa-shelves"/> Shelf</h3>
                        <Form.Group className="mb-3" controlId="searchForm">
                            <Form.Label>Search</Form.Label>
                            <Form.Control type="text" onChange={handleSearch} value={search} placeholder="Search..."/>
                        </Form.Group>
                        <Row className="justify-content-center">
                            <button className="btn btn-perso w-25 mb-3" onClick={handelClickGenre}>
                                <i className="fa-duotone fa-filter"/> Genres <i className={"fa-duotone fa-chevron-" + chevronDir}/>
                            </button>
                            <button id="btnNone" className="btn btn-perso mb-2 d-none" onClick={handelNoneClick}>None</button>
                            <div id="genreDrawer" className="drawer">
                                {
                                    genresEN.map((genre, index) =>
                                        <button key={"genre" + index} className="btn btn-perso m-1" id={genre} onClick={handelGenresClick}>
                                            {genre}
                                        </button>
                                    )
                                }
                            </div>
                        </Row>
                        <Stack direction="horizontal" gap={3} className="mb-3">
                            <div><i className="fa-duotone fa-hashtag"/> {mangasFiltered.length} Mangas
                            </div>
                            <div className="ms-auto">
                                <span><i className="fa-duotone fa-arrow-down-arrow-up"/> Trier Par :</span>
                            </div>
                            {
                                btnColor.map((btn, index) => {
                                    return (
                                        <div key={"btn-" + index}>
                                            <button id={btn.id} className={"btn btn-perso " + btn.active} onClick={handelClick}>
                                                <i id={btn.id} className={"fa-duotone " + btn.icon}/>{btn.text}
                                            </button>
                                        </div>
                                    )
                                })
                            }
                            <div>{sorter[1].toUpperCase()}</div>
                        </Stack>
                        <Row xs={1} lg={3} className="justify-content-center">
                            {
                                mangasFiltered.sort(sort).slice(page * 12 - 12, page * 12).map((manga) =>
                                    <MangaCard key={manga._id} manga={manga}/>)
                            }
                        </Row>
                        <Row className="justify-content-center">
                            <Col>
                                <Pagination>
                                    <Pagination.Prev onClick={previousPage}/>
                                    <PageItem onClick={setNewPage}>{1}</PageItem>
                                    <Pagination.Ellipsis/>
                                    {
                                        paginations.map((pageItem, index) =>
                                            <PageItem key={"pagination-" + index} onClick={setNewPage} active={pageItem.active} disabled={pageItem.disable}>{pageItem.nbr}</PageItem>)
                                    }
                                    <Pagination.Ellipsis/>
                                    <PageItem onClick={setNewPage}>{Math.ceil(mangasFiltered.length / 12) !== 0 ? Math.ceil(mangasFiltered.length / 12) : 1}</PageItem>
                                    <Pagination.Next onClick={nextPage}/>
                                </Pagination>
                            </Col>
                            <Col>
                                <Form className="d-flex" action="" onSubmit={(event) => event.preventDefault(true)}>
                                    <input className="form-control" style={{
                                        backgroundColor: "var(--sidebar-color)",
                                        borderColor: "var(--sidebar-color-light)",
                                        color: "var(--text-color)"
                                    }} type="number" max={Math.ceil(mangasFiltered.length / 12) !== 0 ? Math.ceil(mangasFiltered.length / 12) : 1} min={1} onChange={handelChange}/>
                                    <button className="btn btn-perso" onClick={handelSubmit}>Jump</button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
;

export default Catalog;