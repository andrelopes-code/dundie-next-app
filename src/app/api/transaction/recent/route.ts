import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";

export async function GET(request: Request) {
    // Verifica o token de autenticação
    const access_token = cookies().get("access_token")?.value;
    if (!access_token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Configura os headers da requisição
    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${access_token}`,
        },
    };

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.get("/transaction/recent", config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { detail: "Cannot get ranking" },
            {
                status: error.response.status,
            }
        );
    }
}