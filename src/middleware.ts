import { NextRequest, NextResponse } from "next/server";
import { validateUserToken } from "./functions/validate-user-token";
import { tryRefreshToken } from "./functions/try-refresh-token";

const allowedOrigins = ["http://localhost:3000/", "http://localhost:3000"];

export async function middleware(request: NextRequest, res: NextResponse) {
    // Bypass para as seguintes rotas:
    if (request.nextUrl.pathname.startsWith("/api/login")) {
        return NextResponse.next();
    }
    if (request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.next();
    }

    const access_token = request.cookies.get("access_token")?.value;
    const refresh_token = request.cookies.get("refresh_token")?.value;
    const LoginPage = NextResponse.redirect(new URL("/login", request.url));

    // Caso não existam os tokens, redireciona para a rota de login
    if (!access_token && !refresh_token) {
        return LoginPage;
    }
    // Caso apenas o refresh token exista, tenta realizar o refresh do token
    if (!access_token && refresh_token) {

        let response = NextResponse.redirect(request?.nextUrl?.href);

        try {
            const newTokens = await tryRefreshToken(refresh_token);

            response.cookies.set({
                name: "access_token",
                value: newTokens.access_token,
                maxAge: 60 * 5, // 5 minutes
                httpOnly: true,
                sameSite: "strict",
            });

            response.cookies.set({
                name: "refresh_token",
                value: newTokens.refresh_token,
                maxAge: 60 * 60 * 10, // 10 hours
                httpOnly: true,
                sameSite: "strict",
            });

            return response;
        } catch (error) {
            return LoginPage;
        }
    }

    // Verifica se o token é valido, caso não seja,
    //redireciona para a rota de login
    const isValid = await validateUserToken(access_token as string);
    if (!isValid) {
        return LoginPage;
    }

    // Continua com a requisição
    const response = NextResponse.next();

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
