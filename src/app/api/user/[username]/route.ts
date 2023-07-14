/**
 * GET the User details
 * UPDATE the User details
 */

import { _requiresAuth, _requiresNoAuth, apiHandler } from "@/lib/helpers/apiHandler";
import prisma from "@/lib/models/prisma";
import { NextRequest } from "next/server";

const getUserDetails = async (request: NextRequest, { params }: { params: { username: string } }) => {
    const username = params.username

    const user = await prisma.user.findUnique({
        where: { username: username },
        select: {
            username: true,
            displayName: true,
            avatarURL: true,
            headline: true,
            tagline: true
        }
    })

    if (!user) {
        return new Response("Invalid Error", { status: 500 })
    }
    return new Response(JSON.stringify(user))
}

const updateUserDetails = async (request: NextRequest, { params }: { params: { username: string } }) => {
    const username = params.username

    const { displayName, avatarURL, headline, tagline } = await request.json()
    const user = await prisma.user.findUnique({
        where: { username: username }
    })

    if (!user) {
        return new Response("Invalid Error", { status: 500 })
    }

    if (displayName) user.displayName = displayName;
    if (avatarURL) user.avatarURL = avatarURL;
    if (headline) user.headline = headline;
    if (tagline) user.tagline = tagline;

    const updatedUser = await prisma.user.update({
        where: { username: username },
        data: user
    })

    if (updatedUser) return new Response(JSON.stringify(updatedUser))

    return new Response("Error updating user", { status: 500 })
}



const _get = apiHandler(getUserDetails, _requiresNoAuth)
const _put = apiHandler(updateUserDetails, _requiresAuth)

export {
    _get as GET,
    _put as PUT
}