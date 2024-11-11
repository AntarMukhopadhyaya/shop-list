"use client";

import { SessionProvider } from "next-auth/react";

interface ClientProviderProps {
    children: React.ReactNode;
}
const ClientProvider = ({children}:ClientProviderProps) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
export default ClientProvider;