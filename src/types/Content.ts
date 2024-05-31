export type Content = {
    id: number;
    type: "pelicula" | "serie";
    title: string;
    description: string;
    coverImage: string;
    info?: Serie | Movie;
    trailerLink: string;
    category: "terror" | "acción" | "aventura" | "eduación" | string;
    launchDate: string;
};

export type Serie = {
    id: number;
    chapters?: Chapter[];
    duration: number;
};

export type Chapter = {
    id: number;
    duration: string;
    season: number;
    number: number;
    source?: string;
    coverImage: string | null;
};

export type Movie = {
    id: number;
    duration: string;
    source?: string;
};

export type History = {
    id: number;
    profileId: number;
    userId: number;
    contentId: number;
};
