import { Content } from "@/types/Content";
import { db } from "@/utils/db";

export async function GET(
    request: Request,
    { params }: { params: { id: number } }
) {
    try {
        const contentResults = await db.query(
            "SELECT * FROM Contenido_View WHERE id = ?",
            [params.id]
        );

        if ((contentResults as any[]).length === 0) {
            return Response.json(
                {
                    message: "Movie not found",
                },
                {
                    status: 404,
                }
            );
        }

        const movieResults = await db.query(
            "SELECT * FROM Pelicula WHERE Id_Contenido = ?",
            [params.id]
        );

        if ((movieResults as any[]).length === 0) {
            return Response.json(
                {
                    message: "Movie not found",
                },
                {
                    status: 404,
                }
            );
        }

        const contentInfo = contentResults[0];
        const movieInfo = movieResults[0];

        const movie: Content = {
            id: contentInfo.id,
            title: contentInfo.title,
            description: contentInfo.description,
            launchDate: contentInfo.launchDate,
            type: contentInfo.type,
            coverImage: `data:image/jpeg;base64,${Buffer.from(
                contentInfo.coverImage
            ).toString("base64")}`,
            trailerLink: contentInfo.trailerLink,
            category: contentInfo.category,
            info: {
                id: movieInfo.Id_Pelicula,
                duration: `${movieInfo.PELI_Duracion}`,
            },
        };

        return Response.json(movie);
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
