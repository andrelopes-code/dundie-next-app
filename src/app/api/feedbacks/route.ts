import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";

/*
 * ROTA PARA LISTAR TODOS OS FEEDBACKS COM PAGINAÇÃO
 */

export async function GET(request: NextRequest) {
    // Verifica o token de autenticação
    const access_token = cookies().get("access_token")?.value;
    if (!access_token) {
        return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

    // Configura os headers da requisição
    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${access_token}`,
        },
    };

    const page = request.nextUrl.searchParams.get("page") || 1;
    const size = request.nextUrl.searchParams.get("size") || 10;

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.get(
            `/feedback/all/?page=${page}&size=${size}`,
            config
        );
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { detail: "Cannot get feedbacks" },
            {
                status: 404,
            }
        );
    }
}

export async function POST(request: NextRequest) {
    // Verifica o token de autenticação
    const access_token = cookies().get("access_token")?.value;
    if (!access_token) {
        return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Configura os headers da requisição
    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${access_token}`,
        },
    };

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.post(`/feedback/send`, data, config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { detail: "Cannot send feedback" },
            {
                status: 404,
            }
        );
    }
}
