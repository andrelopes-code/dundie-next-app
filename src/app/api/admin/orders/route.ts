import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/api/axios";

/*
 * ROTA PARA LISTAR TODOS OS PEDIDOS COM PAGINAÇÃO
 */

export async function GET(request: NextRequest) {
    // Verifica o token de autenticação
    const access_token = cookies().get("access_token")?.value;
    if (!access_token) {
        return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

    // Configura os headers da requisição
    const config = {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${access_token}`,
        },
    };

    const page = request.nextUrl.searchParams.get("page") || 1;
    const size = request.nextUrl.searchParams.get("size") || 10;
    const status = request.nextUrl.searchParams.get("status") || "all";

    // Tenta realizar a requisição e retorna o resultado
    try {
        const res = await api.get(
            `/admin/shop/orders?page=${page}&size=${size}&status=${status}`,
            config
        );
        const response = NextResponse.json(res.data, { status: res.status });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { detail: "Cannot get orders" },
            {
                status: 404,
            }
        );
    }
}
