import { NextRequest, NextResponse } from "next/server";
import { validateUserToken } from "./functions/validate-user-token";
import { tryRefreshToken } from "./functions/try-refresh-token";
import { setResponseAuthCookies } from "./functions/set-response-auth-cookies";

async function verifyAdminRoute(
    request: NextRequest,
    accessToken: string | undefined
) {
    // * Verifica se o usário tem permissão para acessar a rota admin
    if (
        request.nextUrl.pathname.startsWith("/admin") ||
        request.nextUrl.pathname.startsWith("/api/admin")
    ) {
        const result = await validateUserToken(accessToken as string);
        if (result?.detail?.dept != "management") {
            // Caso não tenha permissão, redireciona para a pagina principal
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
    }
}

/**
 * Middleware function for handling authentication and authorization.
 *
 * @param request - The NextRequest object representing the incoming request.
 * @param res - The NextResponse object representing the outgoing response.
 * @returns A NextResponse object or a Promise that resolves to a NextResponse object.
 */
export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("access_token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;
    const LoginPage = NextResponse.redirect(new URL("/login", request.url));

    // * Caso não existam os tokens, redireciona para a rota de login
    if (!accessToken && !refreshToken) {
        return LoginPage;
    }
    // * Caso apenas o refresh token exista, tenta realizar o refresh do token
    if (!accessToken && refreshToken) {
        let response = NextResponse.redirect(request?.nextUrl?.href);
        try {
            const newTokens = await tryRefreshToken(refreshToken);
            setResponseAuthCookies(response, newTokens);

            // * Verifica se o usuário tem permissão para acessar a rota admin
            verifyAdminRoute(request, newTokens.access_token);

            return response;
        } catch (error) {
            return LoginPage;
        }
    }

    // * Verifica se o usário tem permissão para acessar a rota admin
    const unauthorized = await verifyAdminRoute(request, accessToken);
    if (unauthorized) {
        return unauthorized;
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
        "/((?!_next/static|_next/image|favicon.ico|forgot-password|login|api/login|api/forgot-password).*)",
    ],
};
