"use client";
import React, { useEffect, useState } from "react";
import ContentPreviewCard from "@/components/General/ContentPreviewCard";
import { strangerThingsHeader } from "@/image-paths";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { Content } from "@/types/Content";
import ContentPageHeader from "@/components/General/ContentPageHeader";

type Props = {
    params: { contentId: string };
};

export default function DetailPage({ params }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState<Content | null>(null);
    const seasons: string[] =
        content && content.type === "serie"
            ? Array.from(
                  { length: content?.info.duration },
                  (_, i) => `Temporada ${i + 1}`
              )
            : [];
    const launchYear = content
        ? new Date(content?.launchDate).getFullYear()
        : 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/content/detail/${params.contentId}`
                );
                console.log(response);
                setContent(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return isLoading && !content ? (
        <Spinner size="lg" />
    ) : (
        <>
            <ContentPageHeader
                content={content}
                actionButtonText="Ver ahora"
                onActionButtonClick={() => console.log("Ver ahora")}
                secondaryButtonText="Ver trailer"
                onSecondaryButtonClick={() => console.log("Ver trailer")}
            />
            {content?.type === "serie" && (
                <main className="container mx-auto mt-0 px-5 md:px-0 md:mt-5">
                    <section className="mt-5">
                        <h3 className="text-xl font-extrabold">Capítulos</h3>
                        <Select
                            label="Temporada"
                            placeholder="Temporada"
                            defaultSelectedKeys={[seasons[0]]}
                            className="max-w-xs mt-5"
                        >
                            {seasons.map((season) => (
                                <SelectItem key={season}>{season}</SelectItem>
                            ))}
                        </Select>
                        <div className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-5">
                            {/* TODO: Create a component for the chapters */}
                            {content.info.chapters.map((chapter) => (
                                <ContentPreviewCard
                                    key={chapter.id}
                                    content={content}
                                />
                            ))}
                        </div>
                    </section>
                </main>
            )}
        </>
    );
}
