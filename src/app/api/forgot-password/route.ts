import { NextResponse, NextRequest } from "next/server";
import { api } from "@/api/axios";

export async function POST(request: NextRequest) {
    const data = await request.json();
    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.post("/user/pwd_reset_token", data);
        const res_data = res.data;
        const response = NextResponse.json(
            res_data?.detail || "check your email",
            {
                status: res.status,
            }
        );
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

export async function PATCH(request: NextRequest) {
    const data = await request.json();

    const username = request.nextUrl.searchParams.get("username");
    if (!username) {
        return NextResponse.json(
            { message: "Missing username" },
            { status: 400 }
        );
    }
    const pwd_reset_token = request.nextUrl.searchParams.get("pwd_reset_token");
    if (!pwd_reset_token) {
        return NextResponse.json({ message: "Missing token" }, { status: 400 });
    }

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.post(
            `/user/${username}/password?pwd_reset_token=${pwd_reset_token}`,
            data
        );
        const res_data = res.data;
        const response = NextResponse.json(
            res_data?.detail || "successfully changed password",
            {
                status: res.status,
            }
        );
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
