import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";
import { ProfileUpdateRequest } from "@/types/user";
import { setResponseAuthCookies } from "@/functions/set-response-auth-cookies";

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

    const username = request.url.slice(request.url.lastIndexOf("/") + 1);

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.get(`/user/public/${username}`, config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { detail: "Cannot get profile" },
            {
                status: 404,
            }
        );
    }
}
