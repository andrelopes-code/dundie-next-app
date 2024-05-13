import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";

export async function POST(request: NextRequest) {
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

    const data = await request.json();

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.post("/admin/shop/product", data, config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            {
                detail:
                    error?.response?.data?.detail ||
                    "Error while creating product",
            },
            {
                status: error.response.status || 500,
            }
        );
    }
}

export async function PATCH(request: NextRequest) {
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

    const data = await request.json();

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.patch("/admin/shop/product", data, config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            {
                detail:
                    error?.response?.data?.detail ||
                    "Error while editing product",
            },
            {
                status: error.response.status || 500,
            }
        );
    }
}
