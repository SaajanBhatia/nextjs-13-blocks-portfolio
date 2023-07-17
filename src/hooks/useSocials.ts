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

    const postData = async (data: { socialName: string, socialURL: string }) => {
        const response = await axios.post(API_URL, data);
        return response.data
    }

    const createSocialMutation = useMutation(postData, {
        onSuccess: () => {
            queryClient.invalidateQueries(['socials']); // Invalidate the 'blocks' query key
        },
    })

    const putData = async (social: Socials) => {
        const response = await axios.put(API_URL + `/${social.id}`, {
            socialName: social.name,
            socialURL: social.url
        })
        return response.data
    }

    const updateSocialMutation = useMutation(putData, {
        onSuccess: () => {
            queryClient.invalidateQueries(['socials']); // Invalidate the 'blocks' query key
        },
    })

    const deleteData = async (socialID: string) => {
        const response = await axios.delete(API_URL + `/${socialID}`)
        return response.data
    }

    const deleteSocialMutation = useMutation(deleteData, {
        onSuccess: () => {
            queryClient.invalidateQueries(['socials']); // Invalidate the 'blocks' query key
        },
    })

    return {
        socials,
        isSocialsLoading,
        socialsErr,
        createSocialMutation,
        updateSocialMutation,
        deleteSocialMutation
    }
}

export default useSocials;