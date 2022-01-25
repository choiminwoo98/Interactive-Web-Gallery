import { IAlbum, IAuthUser, IPhoto, IUser } from "./types/model";
import { IResMessage } from "./types/response";

const BASE_URL = "http://localhost:8000";

const requrestApi = (addUrl: string, method: string, body?: string) =>
    fetch(`${BASE_URL}/${addUrl}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
        credentials: "include",
    }).then((response) => response.json() as Promise<IResMessage>);

export const createUser = (newUser: IUser) =>
    requrestApi("user", "post", JSON.stringify(newUser));

export const authLogin = (user: IAuthUser) =>
    requrestApi("auth/login", "post", JSON.stringify(user));

export const getUser = () => requrestApi("user", "get");
