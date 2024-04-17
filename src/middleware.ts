import { NextRequest, NextResponse } from "next/server";
import { validateUserToken } from "./functions/validate-user-token";
import { tryRefreshToken } from "./functions/try-refresh-token";
import { setResponseAuthCookies } from "./functions/set-response-auth-cookies";

const allowedOrigins = ["http://localhost:3000/", "http://localhost:3000"];

/**
 * Middleware function for handling authentication and authorization.
 * 
 * @param request - The NextRequest object representing the incoming request.
 * @param res - The NextResponse object representing the outgoing response.
 * @returns A NextResponse object or a Promise that resolves to a NextResponse object.
 */
export async function middleware(request: NextRequest, res: NextResponse) {
    // Bypass para as seguintes rotas:
    if (request.nextUrl.pathname.startsWith("/api/login")) {
        return NextResponse.next();
    }
    if (request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get("access_token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;
    const LoginPage = NextResponse.redirect(new URL("/login", request.url));

    // Caso não existam os tokens, redireciona para a rota de login
    if (!accessToken && !refreshToken) {
        return LoginPage;
    }
    // Caso apenas o refresh token exista, tenta realizar o refresh do token
    if (!accessToken && refreshToken) {
        let response = NextResponse.redirect(request?.nextUrl?.href);

        try {
            const newTokens = await tryRefreshToken(refreshToken);

            setResponseAuthCookies(response, newTokens);

            return response;
        } catch (error) {
            return LoginPage;
        }
    }

    // Continua com a requisição
    const response = NextResponse.next();
    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
