/**
 * Hook for getting user details from User ID 
 */

// Username set is admin
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type userQuery = {
    username: string,
    displayName: string,
    avatarURL: string,
    headline: string,
    tagline: string
}

const API_URL = "/api/user/admin";

const useUser = () => {
    const queryClient = useQueryClient();

    // API to get all blocks
    const { data: user, isLoading: userIsLoading, error: userErr } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(API_URL)
            return data as userQuery
        },
        queryKey: ['user']
    })

    return {
        user,
        userIsLoading,
        userErr
    }
}

export default useUser;
