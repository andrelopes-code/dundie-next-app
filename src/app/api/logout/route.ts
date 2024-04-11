import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        let response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("access_token");
        response.cookies.delete("refresh_token");
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { detail: "Cannot logout" },
            {
                status: 500,
            }
        );
    }
}
