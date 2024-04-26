import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";

export async function POST(request: NextRequest) {
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

    const postId = request.nextUrl.searchParams.get("postId");

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.post(`/post/${postId}/like`, null, config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        console.error(
            "Error while creating post [/api/post]:",
            error?.response?.data
        );
        return NextResponse.json(
            {
                detail:
                    error?.response?.data?.detail || "failed to create post.",
            },
            { status: error?.response?.status || 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
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

    const postId = request.nextUrl.searchParams.get("postId");

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.delete(`/post/${postId}/like`, config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        console.error(
            "Error while creating post [/api/post]:",
            error?.response?.data
        );
        return NextResponse.json(
            {
                detail:
                    error?.response?.data?.detail || "failed to create post.",
            },
            { status: error?.response?.status || 500 }
        );
    }
}
