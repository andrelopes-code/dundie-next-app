import { NextResponse } from "next/server";
import { api } from "@/api/axios";
import { setResponseAuthCookies } from "@/functions/set-response-auth-cookies";

export async function POST(request: Request) {
    const data = await request.json();

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    try {
        const res = await api.post("/token", data, config);
        let response = NextResponse.json(res.data, { status: res.status });

        setResponseAuthCookies(response, res.data);

        return response;
    } catch (error: any) {
        return NextResponse.json(error.response.data, {
            status: error.response.status,
        });
    }
}
