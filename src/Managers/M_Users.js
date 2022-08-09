import axios from "axios";

export async function creatUser(pseudonym, email, password) {
    let response;
    await axios.post("https://www.api.azonar.fr/users", {
        pseudonym: pseudonym,
        email: email,
        password: password
    }).then((res) => {
        response = res.data
    })
    return response;
}

export async function getUserViaEmail(email) {
    let user;
    await axios.get("https://www.api.azonar.fr/users/email/" + email).then((res) => {
        user = res.data
    })
    return user;
}

export async function getUserViaPseudonym(pseudonym) {
    let user;
    await axios.get("https://www.api.azonar.fr/users/" + pseudonym).then((res) => {
        user = res.data
    })
    return user;
}

export async function updateEmail(pseudonym, email) {
    let response;
    const userId = getUserViaPseudonym(pseudonym)._id;
    await axios.put("https://www.api.azonar.fr/users/" + userId, {
        email: email
    }).then((res) => {
        response = res.data
    })
    return response;
}

export async function updatePassword(pseudonym, password) {
    let response;
    const userId = getUserViaPseudonym(pseudonym)._id;
    await axios.put("https://www.api.azonar.fr/users/" + userId, {
        password: password
    }).then((res) => {
        response = res.data
    })
    return response;
}

export async function updateStatus(pseudonym, status) {
    let response;
    const userId = getUserViaPseudonym(pseudonym)._id;
    await axios.put("https://www.api.azonar.fr/users/" + userId, {
        status: status
    }).then((res) => {
        response = res.data
    })
    return response;
}

export async function deleteUser(pseudonym) {
    let response;
    const userId = getUserViaPseudonym(pseudonym)._id;
    await axios.delete("https://www.api.azonar.fr/users/" + userId).then((res) => {
        response = res.data
    })
    return response;
}