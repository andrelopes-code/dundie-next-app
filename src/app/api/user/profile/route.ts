import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";
import { ProfileUpdateRequest } from "@/types/user";

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

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.get("/user/profile", config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { detail: "Cannot get profile" },
            {
                status: error.response.status,
            }
        );
    }
}

export async function PATCH(request: Request) {
    // Verifica o token de autenticação
    const access_token = cookies().get("access_token")?.value;
    if (!access_token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data: ProfileUpdateRequest = await request.json();
    console.log(data);

    // Configura os headers da requisição
    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${access_token}`,
        },
    };

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.patch("/user/profile", data, config);
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(
            { detail: error?.response?.data?.detail || "nada" },
            {
                status: error?.response?.status,
            }
        );
    }
}
