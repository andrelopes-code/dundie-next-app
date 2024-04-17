import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";

export async function GET(request: Request) {
    // Verifica o token de autenticação
    const accessToken = cookies().get("access_token")?.value;
    if (!accessToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Configura os headers da requisição
    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${accessToken}`,
        },
    };

    // Obtém o pathname da URL
    const url = new URL(request.url);
    const match = url.pathname.match(/\/transaction\/([^\/]+)$/);

    // Extrai o username se encontrado
    const username = match ? match[1] : "";

    // Constrói a query string
    const queryParams = new URLSearchParams({ username });

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.get(
            `/transaction/list?${queryParams.toString()}`,
            config
        );
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        console.error(
            `Error while getting public profile for ${username} [/api/user/profile/username]:`,
            error?.response?.data
        );
        const status = error.response?.status || 500;
        return NextResponse.json(
            { detail: "Cannot get public profile transactions" },
            {
                status,
            }
        );
    }
}
