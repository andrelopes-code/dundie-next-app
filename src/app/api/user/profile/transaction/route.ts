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

    const match = request.url.match(/user\/profile\/transaction\/([^/]+)\/?$/);
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
        console.error(
            "Error while getting profile transactions [/api/user/profile/transaction]:",
            error?.response?.data
        );
        return NextResponse.json(
            { detail: "Cannot get profile" },
            {
                status: error.response.status,
            }
        );
    }
}
