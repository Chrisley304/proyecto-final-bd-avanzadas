import { Content } from "@/types/Content";
import { db } from "@/utils/db";

export async function GET() {
    try {
        const results = await db.query(
            "SELECT * FROM Contenido_View WHERE type='pelicula'"
        );

        const movies: Content[] = await Promise.all(
            results.map(async (item) => {
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
                        coverImage: `data:image/jpeg;base64,${Buffer.from(
                            item.coverImage
                        ).toString("base64")}`,
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
            })
        );

        return Response.json(movies);
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
