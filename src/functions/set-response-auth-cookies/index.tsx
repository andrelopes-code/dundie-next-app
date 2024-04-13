import { NextResponse } from "next/server";

export const setResponseAuthCookies = (
    response: NextResponse,
    tokens: { access_token: string; refresh_token: string; token_type?: string }
) => {
    response.cookies.set({
        name: "access_token",
        value: tokens.access_token,
        maxAge: 60 * 5, // 5 minutes
        httpOnly: true,
        sameSite: "strict",
    });

    response.cookies.set({
        name: "refresh_token",
        value: tokens.refresh_token,
        maxAge: 60 * 60 * 10, // 10 hours
        httpOnly: true,
        sameSite: "strict",
    });

    return response;
};
