"use client";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { strangerThingsHeader } from "@/image-paths";
import ContentPreviewCard from "@/components/General/ContentPreviewCard";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import ContentPageHeader from "@/components/General/ContentPageHeader";
import { Content } from "@/types/Content";

export default function Inicio() {
    const router = useRouter();
    const { auth, setAuth } = useAuth();
    const [content, setContent] = useState<Content[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!auth?.isLogged) {
            router.push("/");
        }
    }, [auth, router]);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("/api/content");
                setContent(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, []);

    console.log("Content: ", content);
    const higlightedContent = content[0];

    return isLoading ? (
        <Spinner size="lg" />
    ) : (
        <>
            <ContentPageHeader
                content={higlightedContent}
                actionButtonText="Ver ahora"
                onActionButtonClick={() => console.log("Ver ahora")}
                secondaryButtonText="Ver detalles"
                onSecondaryButtonClick={() =>
                    router.push(`/detalle/${higlightedContent.id}`)
                }
            />
            <main className="container mx-auto mt-0 px-5 md:px-0 md:mt-5">
                <section className="mt-5">
                    <h3 className="text-xl font-extrabold">
                        Nuevos lanzamientos
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-5">
                        {content.slice(0, 4).map((content) => (
                            <ContentPreviewCard
                                key={content.id}
                                content={content}
                            />
                        ))}
                    </div>
                </section>
                <section className="mt-5">
                    <h3 className="text-xl font-extrabold">Historial</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-5">
                        {content.slice(4).map((content) => (
                            <ContentPreviewCard
                                key={content.id}
                                content={content}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
