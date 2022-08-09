const axios = require("axios");

export function isLogged() {
    return window.sessionStorage.getItem("isLogged");
}

export function setIsLogged(boolean) {
    window.sessionStorage.setItem("isLogged", boolean);
}

export async function getUser() {
    if (isLogged() === "true") {
        const pseudonym = getPseudonym();
        const userInDB = await getUserInDB(pseudonym);
        if (!userInDB.isEmpty) {
            if (getPassword() === userInDB.password) {
                return {
                    "id": userInDB._id,
                    "pseudonym": userInDB.pseudonym,
                    "password": userInDB.password,
                    "status": userInDB.status,
                    "error": false
                };
            } else
                return {"error": true, "text": "Wrong Pseudonym Or Password !"};
        } else
            return {"error": true, "text": "User doesn't exist !"};
    }
}

export async function getUserInDB(pseudonym) {
    let user = {};
    await axios.get("https://www.api.azonar.fr/users/" + pseudonym).then((res) => {
        user = res.data
    })
    return user;
}

export function setUser(id, pseudonym, password, status) {
    setIsLogged(true);
    setID(id);
    setPseudonyme(pseudonym);
    setPassword(password);
    setStatus(status);
}

export function deleteUser() {
    setIsLogged(false);
    setID("");
    setPseudonyme("");
    setPassword("");
    setStatus("");
}

export function getID() {
    return window.sessionStorage.getItem("id");
}

export function getPseudonym() {
    return window.sessionStorage.getItem("pseudonym");
}

export function getPassword() {
    return window.sessionStorage.getItem("password");
}

export function getStatus() {
    return window.sessionStorage.getItem("status");
}

export function setID(id) {
    window.sessionStorage.setItem("id", id);
}

export function setPseudonyme(pseudonym) {
    window.sessionStorage.setItem("pseudonym", pseudonym);
}

export function setPassword(password) {
    window.sessionStorage.setItem("password", password);
}

export function setStatus(status) {
    window.sessionStorage.setItem("status", status);
}