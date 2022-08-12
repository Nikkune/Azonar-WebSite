import axios from "axios";
import {getMangaViaID} from "./M_Mangas";

export async function getUserList(user_id) {
    let list;
    await axios.get("https://www.api.azonar.fr/lists/" + user_id).then((res) => {
        list = res.data;
    })
    return list;
}

export async function getMangaIDListOfUserList(user_id) {
    let list;
    await axios.get("https://www.api.azonar.fr/lists/mangaID/" + user_id).then((res) => {
        list = res.data;
    })
    return list;
}

export async function addMangaToUserList(user_id, manga_id, current_chapter, status_id) {
    let results;
    let current_link;
    let is_read;
    let manga = await getMangaViaID(manga_id);

    if (manga.site_id.toString() === "1") current_link = manga.site_link + current_chapter + "/"
    else if (manga.site_id.toString() === "2") current_link = manga.site_link + "chapitre-" + current_chapter + "/"

    is_read = status_id.toString() === "1" || current_chapter.toString() === manga.chapter_number.toString();

    await axios.post("https://www.api.azonar.fr/lists/", {
        user_id: user_id,
        manga_id: manga._id,
        manga_name: manga.name,
        current_chapter_link: current_link,
        current_chapter: current_chapter,
        is_read: is_read,
        status_id: status_id
    }).then((res) => {
        results = res.data;
    })
    return results;
}

export async function updateChapter(user_id, manga_id, current_chapter) {
    let results;
    let current_link;
    let manga = await getMangaViaID(manga_id);

    if (manga.site_id.toString() === "1") current_link = manga.site_link + current_chapter + "/"
    else if (manga.site_id.toString() === "2") current_link = manga.site_link + "chapitre-" + current_chapter + "/"

    const is_read = current_chapter.toString() === manga.chapter_number.toString();

    await axios.put("https://www.api.azonar.fr/lists/current/" + user_id, {
        manga_id: manga._id,
        current_chapter_link: current_link,
        current_chapter: current_chapter,
        is_read: is_read
    }).then((res) => {
        results = res.data;
    })
    return results;
}

export async function updateReed(user_id, manga_id, is_read) {
    let list;
    let manga = await getMangaViaID(manga_id);
    await axios.put("https://www.api.azonar.fr/lists/read/" + user_id, {
        manga_id: manga._id,
        is_read: is_read
    }).then((res) => {
        list = res.data;
    })
    return list;
}

export async function updateStatus(user_id, manga_id, status_id) {
    let list;
    let manga = await getMangaViaID(manga_id);
    await axios.put("https://www.api.azonar.fr/lists/status/" + user_id, {
        manga_id: manga._id,
        status_id: status_id
    }).then((res) => {
        list = res.data;
    })
    return list;
}

export async function deleteMangaFromUserList(list_id) {
    let results;
    await axios.delete("https://www.api.azonar.fr/lists/" + list_id).then((res) => {
        results = res.data;
    })
    return results;
}