import axios from "axios";

export async function getMangas() {
    let mangas;
    await axios.get("https://www.api.azonar.fr/mangas").then((res) => {
        mangas = res.data
    })
    return mangas;
}

export async function getLastMangas() {
    let mangas;
    await axios.get("https://www.api.azonar.fr/mangas/last").then((res) => {
        mangas = res.data
    })
    return mangas;
}

export async function getMangaViaID(ID) {
    let manga;
    await axios.get("https://www.api.azonar.fr/mangas/viaID/" + ID).then((res) => {
        manga = res.data
    })
    return manga;
}

export async function getGenres() {
    let genres;
    await axios.get("https://www.api.azonar.fr/mangas/genres").then((res) => {
        genres = res.data
    })
    return genres;
}

export async function mangasCount() {
    let mangas;
    await axios.get("https://www.api.azonar.fr/mangas").then((res) => {
        mangas = res.data
    })
    return mangas.length;
}

export async function deleteManga(ID) {
    let manga;
    await axios.delete("https://www.api.azonar.fr/mangas/" + ID).then((res) => {
        manga = res.data
    })
    return manga;
}