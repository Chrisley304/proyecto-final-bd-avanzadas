"use client";
import React, { createContext, useContext, useState } from "react";
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
    const [auth, setStoredAuth] = useState<Auth>(() => {
        try {
            const item = window.localStorage.getItem("auth");
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    });

    const setAuth = (newAuth: Auth | null) => {
        try {
            const valueToStore =
                newAuth instanceof Function ? newAuth(auth) : newAuth;
            setStoredAuth(valueToStore);
            window.localStorage.setItem("auth", JSON.stringify(valueToStore));
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
