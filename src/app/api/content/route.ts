import mockContent from "@/data/mock-content.json";
import { Content } from "@/types/Content";
import { db } from "@/utils/db";

export async function GET() {
    try {
        const results = await db.query("SELECT * FROM Contenido_View");

        const content: Content[] = await Promise.all(
            results.map(async (item) => {
                if (item.type == "serie") {
                    try {
                        const serieResult = await db.query(
                            "SELECT * FROM Serie where Id_Contenido = ?",
                            [item.id]
                        );
                        return {
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            launchDate: item.launchDate,
                            type: item.type,
                            coverImage: item.coverImage,
                            trailerLink: item.trailerLink,
                            category: item.category,
                            info: {
                                id: serieResult[0].Id_Serie,
                                duration: serieResult[0].SERIE_Temporadas,
                            },
                        };
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    try {
                        const movieResult = await db.query(
                            "SELECT * FROM Pelicula where Id_Contenido = ?",
                            [item.id]
                        );
                        return {
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            launchDate: item.launchDate,
                            type: item.type,
                            coverImage: item.coverImage,
                            trailerLink: item.trailerLink,
                            category: item.category,
                            info: {
                                id: movieResult[0].Id_Pelicula,
                                duration: `${movieResult[0].PELI_Duracion}`,
                            },
                        };
                    } catch (error) {
                        console.error(error);
                    }
                }
            })
        );

        return Response.json(content);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: error?.message || "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}
