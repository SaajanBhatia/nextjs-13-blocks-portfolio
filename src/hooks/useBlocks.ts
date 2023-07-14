/**
 * Hook file for CRUD operations on blocks
 */

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

    return {
        blocks,
        blocksIsLoading,
        blocksErr
    }

}

export default useBlocks;

