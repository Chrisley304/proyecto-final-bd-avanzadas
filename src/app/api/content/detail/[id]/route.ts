import mockContent from "@/data/mock-content.json";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const content = mockContent.find(
        (content) => content.id === Number(params.id)
    );
    return Response.json(content);
}
