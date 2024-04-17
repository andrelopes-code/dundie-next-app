import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        let response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("access_token");
        response.cookies.delete("refresh_token");
        return response;
    } catch (error: any) {
        console.error(
            "Error while logging out [/api/logout]:",
            error?.response?.data
        );
        return NextResponse.json(
            { detail: "Failed to logout" },
            {
                status: 500,
            }
        );
    }
}
