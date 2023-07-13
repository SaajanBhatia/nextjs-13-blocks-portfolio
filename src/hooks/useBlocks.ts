/**
 * Hook file for CRUD operations on blocks
 */

import { CreateBlockReq, UpdateBlockReq } from "@/types/requests";
import { Block } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "/api/blocks";


const useBlocks = () => {
    const queryClient = useQueryClient();

    // API to get all blocks
    const { data: blocks, isLoading, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(API_URL)
            return data as Block[]
        },
        queryKey: ['blocks']
    })

    return {
        blocks,
        isLoading,
        error
    }

}

export default useBlocks;

