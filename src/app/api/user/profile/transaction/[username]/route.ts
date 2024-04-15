import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";

export async function GET(request: Request) {
    // Verifica o token de autenticação
    const access_token = cookies().get("access_token")?.value;

    // Configura os headers da requisição
    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${access_token}`,
        },
    };

    // Obtém o pathname da URL
    const url = new URL(request.url);
    const match = url.pathname.match(/\/transaction\/([^\/]+)$/);

    // Extrai o username se encontrado
    const username = match ? match[1] : "";

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.get(
            `/transaction/list?username=${username}`,
            config
        );
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { detail: "Cannot get public profile transactions" },
            {
                status: error.response.status,
            }
        );
    }
}
