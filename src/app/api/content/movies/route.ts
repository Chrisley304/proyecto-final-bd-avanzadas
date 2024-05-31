import mockContent from "@/data/mock-content.json";

export async function GET() {
    const movies = mockContent.filter((content) => content.type === "pelicula");
    return Response.json(movies);
}
