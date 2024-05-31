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
import YoutubeEmbedVideo from "@/components/General/YoutubeEmbedVideo";

export default function Peliculas() {
    const router = useRouter();
    const { auth } = useAuth();
    const [content, setContent] = useState<Content[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("/api/content/movies");
                setContent(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, []);

    const higlightedContent = content[0];

    return isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
            <Spinner size="lg" />
        </div>
    ) : (
        <>
            {showTrailer && (
                <YoutubeEmbedVideo
                    videoLink={higlightedContent?.trailerLink || ""}
                    closeTrailer={() => setShowTrailer(false)}
                />
            )}
            <ContentPageHeader
                content={higlightedContent}
                actionButtonText="Ver trailer"
                onActionButtonClick={() => setShowTrailer(true)}
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
                        {content.map((content) => (
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
                        {content.slice(0, 1).map((content) => (
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
