/**
 * Delete a social
 * Update a social
 * Read a social
 */

import prisma from "@/lib/models/prisma";
import { _requiresAuth, _requiresNoAuth, apiHandler } from "@/lib/helpers/apiHandler";
import { NextRequest } from "next/server";

const deleteSocial = async (request: NextRequest, { params }: { params: { socialID: string } }) => {
    const socialID = params.socialID
    try {
        const deletedSocial = await prisma.socials.delete({
            where: {
                id: socialID
            }
        })
        return new Response(JSON.stringify(deletedSocial))
    } catch (err) {
        return new Response("Error deleting block: " + err, { status: 500 })
    }
}

const updateSocial = async (request: NextRequest, { params }: { params: { socialID: string } }) => {
    const socialID = params.socialID
    try {
        const { socialName, socialURL } = await request.json()
        const updatedSocial = await prisma.socials.update({
            where: {
                id: socialID
            },
            data: {
                name: socialName,
                url: socialURL
            }
        })
        return new Response(JSON.stringify(updateSocial))
    } catch (err) {
        return new Response("Error updating block: " + err, { status: 500 })
    }
}

const readSocial = async (request: NextRequest, { params }: { params: { socialID: string } }) => {
    const socialID = params.socialID
    const social = await prisma.socials.findUnique({
        where: { id: socialID }
    })

    if (!social) {
        return new Response("Invalid ID", { status: 500 })
    }
    return new Response(JSON.stringify(social))
}

const _get = apiHandler(readSocial, _requiresNoAuth)
const _delete = apiHandler(deleteSocial, _requiresAuth)
const _put = apiHandler(updateSocial, _requiresAuth)

export {
    _get as GET,
    _delete as DELETE,
    _put as PUT
}