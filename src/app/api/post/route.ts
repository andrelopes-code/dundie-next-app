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

    const data = await request.json();

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.post("/post", data, config);
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

export async function GET(request: NextRequest) {
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
        const res = await api.get("/post", config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        console.error(
            "Error while getting posts [/api/post]:",
            error?.response?.data
        );
        return NextResponse.json(
            { detail: error?.response?.data?.detail || "failed to get posts." },
            {
                status: error?.response?.status || 500,
            }
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
        const res = await api.delete(`/post/${postId}`, config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        console.error(
            "Error while deleting post [/api/post]:",
            error?.response?.data
        );
        return NextResponse.json(
            { detail: error?.response?.data?.detail || "failed to get posts." },
            {
                status: error?.response?.status || 500,
            }
        );
    }
}
