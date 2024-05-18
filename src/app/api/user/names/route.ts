import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";

export async function GET(request: NextRequest) {
    // Verifica o token de autenticação
    const accessToken = cookies().get("access_token")?.value;
    if (!accessToken) {
        return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }
    // Configura os headers da requisição
    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${accessToken}`,
        },
    };

    const query = request.nextUrl.searchParams.get("query");
    if (!query) {
        return NextResponse.json(
            { detail: "Param query not found" },
            { status: 404 }
        );
    }

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.get(`/user/names?query=${query}`, config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { detail: "Cannot get names" },
            {
                status: error.response.status || 500,
            }
        );
    }
}
