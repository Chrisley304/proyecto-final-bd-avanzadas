import { db } from "@/utils/db";

export async function DELETE(
    request: Request,
    { params }: { params: { profileId: string } }
) {
    const profileId = params.profileId;
    console.log("profileId: ", profileId);

    try {
        if (!profileId) {
            return Response.json(
                {
                    message: "User id is required",
                    success: false,
                },
                {
                    status: 400,
                }
            );
        }

        const result = await db.query(
            "DELETE FROM Perfil WHERE Id_Perfil = ?",
            [profileId]
        );

        if (result.affectedRows === 0) {
            return Response.json(
                {
                    message: "No se creo el perfil",
                    sucess: false,
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json({ success: true });
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
