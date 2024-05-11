import { NextResponse, NextRequest } from "next/server";
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
        const res = await api.get("/shop/products", config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        console.error(
            "Error while fetching products [/api/products]:",
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

export async function POST(request: NextRequest) {
    // Verifica o token de autenticação
    const accessToken = cookies().get("access_token")?.value;
    if (!accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
        return NextResponse.json({ message: "Missing id" }, { status: 400 });
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
        const res = await api.post(`/shop/${id}/buy`, null, config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        console.error(
            "Error while doing purchase [/api/products]:",
            error?.response?.data
        );
        return NextResponse.json(
            {
                detail:
                    error?.response?.data?.detail || "failed to get products.",
            },
            {
                status: 500,
            }
        );
    }
}
