import { atom } from "recoil";
import { IAlbum } from "./types";

export const isLoggedState = atom({
    key: "isLogged",
    default: false,
});

export const albumState = atom<IAlbum[]>({
    key: "albums",
    default: [],
});
