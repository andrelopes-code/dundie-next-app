import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";

export async function GET(request: Request) {
    // Verifica o token de autenticação
    const accessToken = cookies().get("access_token")?.value;
    if (!accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Configura os headers da requisição
    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${accessToken}`,
        },
    };

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.get("/ranking", config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        console.error(
            "Error while fetching ranking [/api/ranking]:",
            error?.response?.data
        );
        return NextResponse.json(
            { detail: "Failed to retrieve ranking" },
            {
                status: 500,
            }
        );
    }
}
