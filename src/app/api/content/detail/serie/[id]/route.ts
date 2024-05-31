import { Chapter, Content } from "@/types/Content";
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
                    message: "Serie not found",
                },
                {
                    status: 404,
                }
            );
        }

        const serieResults = await db.query(
            "SELECT * FROM Serie WHERE Id_Contenido = ?",
            [params.id]
        );

        if ((serieResults as any[]).length === 0) {
            return Response.json(
                {
                    message: "Serie not found",
                },
                {
                    status: 404,
                }
            );
        }

        const serieInfo = serieResults[0];
        const contentInfo = contentResults[0];

        const chaptersResults = await db.query(
            "SELECT * FROM Capitulo WHERE Id_Serie = ?",
            [serieInfo.Id_Serie]
        );

        const chapters: Chapter[] =
            (chaptersResults as any[]).length === 0
                ? []
                : chaptersResults.map((chapter) => ({
                      id: chapter.Id_Capitulo,
                      duration: chapter.CAP_Duracion,
                      coverImage: `data:image/jpeg;base64,${Buffer.from(
                          chapter.CAP_Cover
                      ).toString("base64")}`,
                      season: chapter.CAP_Temporada,
                      number: chapter.CAP_Number,
                  }));

        const serie: Content = {
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
                id: serieInfo.Id_Serie,
                duration: serieInfo.SERIE_Temporadas,
                chapters,
            },
        };

        return Response.json(serie);
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
