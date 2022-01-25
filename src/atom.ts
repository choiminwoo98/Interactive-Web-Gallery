import { atom } from "recoil";
import { IUser } from "./types/model";
export const cacheUserState = atom<IUser | undefined>({
    key: "cacheUser",
    default: undefined,
});

export const checkState = atom({
    key: "isCheck",
    default: false,
});
