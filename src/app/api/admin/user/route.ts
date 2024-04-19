import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";

/*
 * ROTA PARA LISTAR TODOS OS USUÁRIOS COM PAGINAÇÃO
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
            `/admin/user?page=${page}&size=${size}`,
            config
        );
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { detail: "Cannot get users" },
            {
                status: 404,
            }
        );
    }
}

/*
 * ROTA PARA CRIAR UM NOVO USUÁRIO NO BANCO DE DADOS
 */

export async function POST(request: NextRequest) {
    // Verifica o token de autenticação
    const access_token = cookies().get("access_token")?.value;
    if (!access_token) {
        return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${access_token}`,
        },
    };

    const data = await request.json();

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.post("/admin/user", data, config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { detail: error?.response?.data?.detail },
            {
                status: error.response.status || 500,
            }
        );
    }
}

export async function PUT(request: NextRequest) {
    // Verifica o token de autenticação
    const access_token = cookies().get("access_token")?.value;
    if (!access_token) {
        return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${access_token}`,
        },
    };

    const data = await request.json();

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.put("/admin/user/visibility", data, config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { detail: error?.response?.data?.detail },
            {
                status: error.response.status || 500,
            }
        );
    }
}
