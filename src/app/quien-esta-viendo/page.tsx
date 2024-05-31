"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function QuienEstaViendo() {
    const router = useRouter();
    const { auth } = useAuth();

    useEffect(() => {
        if (!auth?.isLogged) {
            router.push("/");
        }
    }, [auth, router]);

    return <div className="container">page</div>;
}
