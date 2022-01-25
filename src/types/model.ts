export interface IUser {
    id?: number;
    email: string;
    nick: string;
    password?: string;
}

export interface IAuthUser {
    account: string;
    password: string;
}

export interface IAlbum {
    id?: number;
    name: string;
    createdAt?: string;
    description?: string;
    password?: string;
    locked?: boolean;
    url?: string;
    Photos?: IPhoto[];
}

export interface IPhoto {
    id?: number;
    title: string;
    createdAt?: string;
    description?: string;
    Hashtags: string[];
    url: string;
}
