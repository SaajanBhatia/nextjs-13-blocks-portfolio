/**
 * GET all blocks
 * CREATE new block
 */
import prisma from "@/lib/models/prisma";
import { NextRequest } from "next/server";
import { _requiresAuth, _requiresNoAuth, apiHandler } from "@/lib/helpers/apiHandler";

// Get all blocks
const getBlocks = async (request: NextRequest) => {
    const blocks = await prisma.block.findMany()
    return new Response(JSON.stringify(blocks))
}

const createBlock = async (request: NextRequest) => {
    const { headline, description, url, icon } = await request.json()

    if (!headline) {
        return new Response(JSON.stringify("Missing headline field"), { status: 500 })
    }

    const block = await prisma.block.create({
        data: {
            headline: headline,
            url: ""
        }
    })

    if (description) {
        block.description = description
    }

    if (url) {
        block.url = url
    }

    if (icon) {
        block.icon = icon
    }

    const updatedBlock = await prisma.block.update({
        where: { id: block.id },
        data: block
    })

    return new Response(JSON.stringify(updatedBlock))
}

const _get = apiHandler(getBlocks, _requiresNoAuth)
const _post = apiHandler(createBlock, _requiresNoAuth)

export {
    _get as GET,
    _post as POST
}