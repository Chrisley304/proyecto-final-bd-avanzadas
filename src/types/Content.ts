export type Content = {
    id: number;
    type: "pelicula" | "serie" | "documental";
    title: string;
    description: string;
    coverImage: string;
    info: Serie | Movie;
    trailerLink: string;
    category: "terror" | "acción" | "aventura" | "eduación" | string;
    launchDate: string;
};

export type Serie = {
    id: number;
    contentId: number;
    chapters: Chapter[];
    duration: number;
};

export type Chapter = {
    id: number;
    serieId: number;
    duration: string;
    season: number;
    number: number;
    source: string | null;
    coverImage: string | null;
};

export type Movie = {
    id: number;
    contentId: number;
    duration: string;
    source: string | null;
};

export type History = {
    id: number;
    profileId: number;
    userId: number;
    contentId: number;
};
