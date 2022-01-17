export interface IPhoto {
    id: number;
    title: string;
    createdAt: string;
    description?: string;
    hashTags: string[];
    url: string;
}

export interface IAlbum {
    id: number;
    name: string;
    createdAt: string;
    description?: string;
    password?: string;
    imagePath?: string;
    photos: IPhoto[];
}
