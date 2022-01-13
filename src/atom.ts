import { atom } from "recoil";

export const isLoggedState = atom({
    key: "isLogged",
    default: false,
});
