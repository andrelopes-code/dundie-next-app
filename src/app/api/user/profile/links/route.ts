import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";
import { ProfileLinksRequest } from "@/types/user";


export async function PATCH(request: Request) {
    // Verifica o token de autenticação
    const access_token = cookies().get("access_token")?.value;
    if (!access_token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data: ProfileLinksRequest = await request.json();

    // Configura os headers da requisição
    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${access_token}`,
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
        return NextResponse.json(
            { detail: error?.response?.data?.detail || "error" },
            {
                status: error?.response?.status,
            }
        );
    }
}
