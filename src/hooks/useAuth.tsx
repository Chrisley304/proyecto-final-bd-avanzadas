"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Auth } from "@/types/User";
import { useLocalStorage } from "./useLocalStorage";

export const AuthContext = createContext<{
    auth: Auth | null;
    setAuth: (newAuth: Auth | null) => void;
}>({
    auth: null,
    setAuth: () => null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setStoredAuth] = useState<Auth | null>(null);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem("auth");
            if (item) {
                setStoredAuth(JSON.parse(item));
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const setAuth = (newAuth: Auth | null) => {
        try {
            setStoredAuth(newAuth);
            window.localStorage.setItem("auth", JSON.stringify(newAuth));
        } catch (error) {
            console.log(error);
        }
    };

    const value = { auth, setAuth };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
}
