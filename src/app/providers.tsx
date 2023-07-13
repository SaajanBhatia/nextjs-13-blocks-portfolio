// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import {
    ChakraProvider,
    ColorModeScript,
    ColorModeProvider
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

import theme from "@/styles/theme";

// React Query Declaration
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} type="cookie" />
                    {children}
                </ChakraProvider>
            </QueryClientProvider>
        </SessionProvider>

    );
}