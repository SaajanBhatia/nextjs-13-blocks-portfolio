/**
 * Create a social
 * Read all socials
 * 
 * Not using API handler, need to access server sessions
 */

import prisma from "@/lib/models/prisma";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { _requiresAuth, _requiresNoAuth, apiHandler } from "@/lib/helpers/apiHandler";

const getAllSocials = async (request: NextRequest) => {
    const socials = await prisma.socials.findMany()
    return new Response(JSON.stringify(socials))
}

// Create
const createSocial = async (request: NextRequest) => {
    const { socialName, socialURL } = await request.json()
    if (!(socialName && socialURL)) {
        return new Response("Missing Params", { status: 500 })
    }
    const newSocial = await prisma.socials.create({
        data: {
            name: socialName,
            url: socialURL
        }
    })
    return new Response(JSON.stringify(newSocial))
}

const _get = apiHandler(getAllSocials, _requiresNoAuth)
const _post = apiHandler(createSocial, _requiresAuth)

export { _get as GET, _post as POST }