/**
 * Hook for using socials
 */

import { Socials } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "/api/socials";

const useSocials = () => {
    const queryClient = useQueryClient();

    // API to get all blocks
    const { data: socials, isLoading: isSocialsLoading, error: socialsErr } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(API_URL)
            return data as Socials[]
        },
        queryKey: ['socials']
    })

    return {
        socials,
        isSocialsLoading,
        socialsErr
    }
}

export default useSocials;