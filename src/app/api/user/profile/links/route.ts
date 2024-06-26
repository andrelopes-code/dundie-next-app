import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";
import { ProfileLinksRequest } from "@/types/user";


export async function PATCH(request: Request) {
    // Verifica o token de autenticação
    const accessToken = cookies().get("access_token")?.value;
    if (!accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data: ProfileLinksRequest = await request.json();

    // Configura os headers da requisição
    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${accessToken}`,
        },
    };

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.patch("/user/links", data, config);

        let response = NextResponse.json(
            { detail: res.data?.detail },
            { status: res.status }
        );

        return response;
    } catch (error: any) {
        console.error(
            "Error while updating links [PATCH /api/user/profile/links]:",
            error?.response?.data
        );
        return NextResponse.json(
            { detail: error?.response?.data?.detail || "failed to " },
            {
                status: error?.response?.status,
            }
        );
    }
}
