"use client";
import { AuthProvider } from "@/hooks/useAuth";
import { NextUIProvider } from "@nextui-org/react";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <AuthProvider>{children}</AuthProvider>
        </NextUIProvider>
    );
}
