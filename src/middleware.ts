import { NextRequest, NextResponse } from "next/server";
import { validateUserToken } from "./functions/validate-user-token";
import { tryRefreshToken } from "./functions/try-refresh-token";
import { setResponseAuthCookies } from "./functions/set-response-auth-cookies";

const allowedOrigins = ["http://localhost:3000/", "http://localhost:3000"];

export async function middleware(request: NextRequest, res: NextResponse) {

    const initialTime = new Date().getTime();

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

            setResponseAuthCookies(response, newTokens);

            return response;
        } catch (error) {
            return LoginPage;
        }
    }

    // Verifica se o token é valido, caso não seja,
    //redireciona para a rota de login
    // const isValid = await validateUserToken(access_token as string);
    // if (!isValid) {
    //     return LoginPage;
    // }

    // Continua com a requisição
    const response = NextResponse.next();
    console.log(`Process Time: ${new Date().getTime() - initialTime} ms`);
    console.log("For: " + request.nextUrl.pathname + "\n");
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
