import axios from "axios";

export async function getBots() {
    let bots;
    await axios.get("https://www.api.azonar.fr/bots").then((res) => {
        bots = res.data
    })
    return bots;
}

export async function addBots(name, descriptions, color, icon) {
    let bots;
    await axios.post("https://www.api.azonar.fr/bots", {
        name: name,
        descriptions: descriptions,
        color: color,
        icon: icon,
        status: 0,
        progress: 0
    }).then((res) => {
        bots = res.data
    })
    return bots;
}

export async function updateBot(ID, name, descriptions, color, icon) {
    let bots;
    let data = {};
    if (name !== undefined) data.name = name;
    if (descriptions !== undefined) data.descriptions = descriptions;
    if (color !== undefined) data.color = color;
    if (icon !== undefined) data.icon = icon;
    await axios.put("https://www.api.azonar.fr/bots/" + ID, data).then((res) => {
        bots = res.data
    })
    return bots;
}

export async function botsCount() {
    let bots;
    await axios.get("https://www.api.azonar.fr/bots").then((res) => {
        bots = res.data
    })
    return bots.length;
}

export async function deleteBots() {
    let bots;
    await axios.delete("https://www.api.azonar.fr/bots").then((res) => {
        bots = res.data
    })
    return bots;
}