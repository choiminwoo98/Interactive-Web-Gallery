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

export const getAlbums = () => requrestApi(`album`, "get");

export const createAlbum = (newAlbum: IAlbum) =>
    requrestApi(`album`, "post", JSON.stringify(newAlbum));

export const authAlbum = (albumId: number, password: string) =>
    requrestApi(`auth/album/${albumId}`, "post", JSON.stringify({ password }));

export const getAlbum = (albumId: number) =>
    requrestApi(`album/${albumId}`, "get");

export const addPhoto = (albumId: number, newPhoto: IPhoto) =>
    requrestApi(`album/${albumId}`, "post", JSON.stringify(newPhoto));

export const uploadAlbumImage = (fd: FormData) =>
    fetch(`${BASE_URL}/post/album`, { method: "post", body: fd }).then(
        (response) => response.json() as Promise<IResMessage>
    );

export const uploadPhotoImage = (fd: FormData) =>
    fetch(`${BASE_URL}/post/photo`, { method: "post", body: fd }).then(
        (response) => response.json() as Promise<IResMessage>
    );
