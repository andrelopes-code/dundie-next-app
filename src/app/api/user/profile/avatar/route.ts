import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";
import { ProfileAvatarRequest } from "@/types/user";

export async function PATCH(request: Request) {
    // Verifica o token de autenticação
    const accessToken = cookies().get("access_token")?.value;
    if (!accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data: ProfileAvatarRequest = await request.json();

    // Configura os headers da requisição
    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${accessToken}`,
        },
    };

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.patch("/user/profile/avatar", data, config);

        let response = NextResponse.json(
            { detail: res.data?.detail },
            { status: res.status }
        );

        return response;
    } catch (error: any) {
        console.error(
            "Error while updating avatar [PATCH /api/user/profile/avatar]:",
            error?.response?.data
        );
        return NextResponse.json(
            {
                detail:
                    error?.response?.data?.detail || "failed to update avatar",
            },
            {
                status: error?.response?.status || 500,
            }
        );
    }
}
