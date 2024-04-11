import { NextResponse } from "next/server";
import { api } from "@/api/axios";

export async function POST(request: Request) {
    const data = await request.json();

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    try {
        const res = await api.post("/token", data, config);
        const response = NextResponse.json(res.data, { status: res.status });

        response.cookies.set({
            name: "access_token",
            value: res?.data?.access_token,
            maxAge: 60 * 5, // 5 minutes
            httpOnly: true,
            sameSite: "strict",
        });

        response.cookies.set({
            name: "refresh_token",
            value: res?.data?.refresh_token,
            maxAge: 60 * 60 * 10, // 10 hours
            httpOnly: true,
            sameSite: "strict",
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(error.response.data, {
            status: error.response.status,
        });
    }
}
