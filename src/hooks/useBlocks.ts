/**
 * Hook file for CRUD operations on blocks
 */

import { CreateBlockReq } from "@/types/requests";
import { Block } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "/api/blocks";


const useBlocks = () => {
    const queryClient = useQueryClient();

    // API to get all blocks
    const { data: blocks, isLoading: blocksIsLoading, error: blocksErr } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(API_URL)
            return data as Block[]
        },
        queryKey: ['blocks']
    })

    const postData = async (data: CreateBlockReq) => {
        const response = await axios.post(API_URL, data);
        return response.data;
    };

    const createBlockMutation = useMutation(postData, {
        onSuccess: () => {
            queryClient.invalidateQueries(['blocks']); // Invalidate the 'blocks' query key
        },
    });

    const deleteData = async (blockID: string) => {
        const response = await axios.delete(API_URL + "/" + blockID)
        return response.data
    }

    const deleteBlockMutation = useMutation(deleteData, {
        onSuccess: () => {
            queryClient.invalidateQueries(['blocks']); // Invalidate the 'blocks' query key
        },
    }) 

    const updateBlock = async (block: Block) => {
        const response = await axios.put(API_URL + "/" + block.id, {
            headline: block.headline,
            description: block.description,
            url: block.url,
            icon: block.icon
        })
        return response.data
    }

    const updateBlockMutation = useMutation(updateBlock, {
        onSuccess: () => {
            queryClient.invalidateQueries(['blocks']); // Invalidate the 'blocks' query key
        },
    });

    return {
        blocks,
        blocksIsLoading,
        blocksErr,
        createBlockMutation,
        deleteBlockMutation,
        updateBlockMutation
    }

}

export default useBlocks;

