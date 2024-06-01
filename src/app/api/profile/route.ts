import { Auth, Profile } from "@/types/User";
import { db } from "@/utils/db";

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const profileImage: File | string | null = data.get("profileImage");
        const profileName = data.get("profileName");
        const userId = data.get("userId");

        if (
            !userId ||
            !profileImage ||
            !profileName ||
            typeof profileImage === "string"
        ) {
            return Response.json(
                {
                    message:
                        "User id, profile name and profile image are required",
                    success: false,
                },
                {
                    status: 400,
                }
            );
        }

        const profileBuffer = Buffer.from(await profileImage.arrayBuffer());

        const result: any[] = await db.query(
            "INSERT INTO PERFIL (Id_Usuario, PERF_Img, PERF_Nombre) VALUES (?, ?, ?)",
            [userId, profileBuffer, profileName]
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

        const profileIdData = await db.query("SELECT LAST_INSERT_ID() as id");
        const profileId = profileIdData[0].id;

        return Response.json({ success: true, profileId });
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
