import { authOptions } from "../auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Handler, HandlerConfig } from "@/types/helpers";

export const apiHandler = (handler: Handler, config: HandlerConfig) => async (request: NextRequest, params: any, response: NextResponse) => {
    // Auth
    if (config.requireAuth) {
        const session = await getServerSession(authOptions)
        if (!session) {
            return new Response("Missing Authentication", {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }
    }

    // Hydrate
    try {
        return await handler(request, params);
    } catch (err) {
        console.log("API Error: ", err);
        return new Response(JSON.stringify(err), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export const _requiresAuth: HandlerConfig = { requireAuth: true }
export const _requiresNoAuth: HandlerConfig = { requireAuth: false }