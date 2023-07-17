/**
 * GET a single block
 * DELETE a single block
 * UPDATE a single block
 */
 
import { _requiresAuth, _requiresNoAuth, apiHandler } from "@/lib/helpers/apiHandler";
import prisma from "@/lib/models/prisma";
import { Block } from "@prisma/client";
import { NextRequest } from "next/server";

const getBlock = async (request: NextRequest, { params }: { params: { blockID: string } }) => {
    const blockID = params.blockID;
    const block = await prisma.block.findUnique({
        where: { id: blockID }
    });

    if (block) {
        return new Response(JSON.stringify(block));
    }
    return new Response("Block not found", { status: 500 }); // If the block does not exist
}; 

const deleteBlock = async (request: NextRequest, { params }: { params: { blockID: string } }) => {
    const blockID = params.blockID

    try {
        const deletedBlock = await prisma.block.delete({
            where: { id: blockID }
        })
        return new Response(JSON.stringify(deleteBlock))
    } catch (err) {
        return new Response(JSON.stringify(err), { status: 500 }) // If the block does not exist
    }
} 

const updateBlock = async (request: NextRequest, { params }: { params: { blockID: string } }) => {
    const blockID = params.blockID
    const block = await prisma.block.findUnique({
        where: { id: blockID }
    })

    if (!block) {
        return new Response("Block not found", { status: 500 }) // If the block does not exist
    }

    const { headline, description, url, icon } = await request.json()
    const updateBlock: Block = {
        id: block.id,
        headline: headline ? headline : block.headline,
        description: description ? description : block.description,
        url: url ? url : block.url,
        icon: icon ? icon : block.icon
    }

    const updateBlockReq = await prisma.block.update({
        where: { id: updateBlock.id },
        data: updateBlock
    })

    return new Response(JSON.stringify(updateBlockReq))
}

const _get = apiHandler(getBlock, _requiresNoAuth)
const _delete = apiHandler(deleteBlock, _requiresAuth)
const _put = apiHandler(updateBlock, _requiresAuth)

export {
    _get as GET,
    _put as PUT,
    _delete as DELETE
}
