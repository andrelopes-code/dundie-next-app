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

    const target = data?.target;
    const amount = data?.amount;

    if (!target) {
        return NextResponse.json(
            { detail: "Target is required" },
            {
                status: 400,
            }
        );
    }

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.post(
            `/transaction/${target}?points=${amount}`,
            null,
            config
        );
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        console.error(
            "Error while donating [/api/donate]:",
            error?.response?.data
        );
        return NextResponse.json(
            { detail: error?.response?.data?.detail || "failed to donate." },
            {
                status: error?.response?.status || 500,
            }
        );
    }
}
