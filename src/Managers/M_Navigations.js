import {getUser, isLogged} from "./M_Sessions";

export const NAV_DEFAULT = 1;
export const NAV_LOGGED = 2;
export const NAV_ADMIN = 3;

export async function getNavId() {
    if (isLogged() === "true") {
        if (!await getUser().error) {
            const user = await getUser();
            switch (user.status) {
                case 1:
                    return NAV_DEFAULT;
                case 2:
                    return NAV_LOGGED;
                case 3:
                    return NAV_ADMIN;
                default:
                    return NAV_DEFAULT;
            }
        } else
            return NAV_DEFAULT;
    } else
        return NAV_DEFAULT;
}