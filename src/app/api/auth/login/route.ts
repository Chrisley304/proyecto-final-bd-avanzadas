import { Content } from "@/types/Content";
import { Auth, Profile } from "@/types/User";
import { db } from "@/utils/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return Response.json(
                {
                    message: "Email and password are required",
                },
                {
                    status: 400,
                }
            );
        }

        const results: any[] = await db.query(
            "SELECT * FROM User_View WHERE email = ? and password = ?",
            [email, password]
        );

        if (results.length === 0) {
            return Response.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        const profilesResults: any[] = await db.query(
            "SELECT * FROM Perfil WHERE Id_Usuario = ?",
            [results[0].id]
        );

        const profiles: Profile[] =
            profilesResults.length === 0
                ? []
                : profilesResults.map((profile) => ({
                      id: profile.Id_Perfil,
                      profileImage: `data:image/jpeg;base64,${Buffer.from(
                          profile.PERF_Img
                      ).toString("base64")}`,
                      profileNickname: profile.PERF_Nombre,
                  }));

        const auth: Auth = {
            user: {
                id: results[0].id,
                bankInfo: {
                    expirationDate: results[0].expirationDate,
                    cardFullName: results[0].cardFullName,
                    cardNumber: results[0].cardNumber,
                    cvv: results[0].cvv,
                },
                email: results[0].email,
                lastName: results[0].lastName,
                name: results[0].name,
                password: results[0].password,
                profiles,
            },
        };

        return Response.json(auth);
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
