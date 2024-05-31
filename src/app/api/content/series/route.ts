import mockContent from "@/data/mock-content.json";

export async function GET() {
    const series = mockContent.filter((content) => content.type === "serie");
    return Response.json(series);
}
