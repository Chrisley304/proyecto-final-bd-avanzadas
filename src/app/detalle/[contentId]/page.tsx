"use client";
import React, { useEffect, useState } from "react";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import axios from "axios";
import { Chapter, Content } from "@/types/Content";
import ContentPageHeader from "@/components/General/ContentPageHeader";
import ChapterPreviewCard from "@/components/General/ChapterPreviewCard";
import YoutubeEmbedVideo from "@/components/General/YoutubeEmbedVideo";

type Props = {
    params: { contentId: string };
};

export default function DetailPage({ params }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState<Content | null>(null);
    const [selectedSeason, setSelectedSeason] = useState<string>("Temporada 1");
    const [showTrailer, setShowTrailer] = useState(false);

    const seriesDuration =
        typeof content?.info.duration === "number" ? content?.info.duration : 1;

    const chapters: Chapter[] = content?.info?.chapters || [];

    const seasons: string[] =
        content && content.type === "serie"
            ? Array.from(
                  { length: seriesDuration },
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
    }, [params.contentId]);

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSeason(e.target.value);
    };

    const handleTrailerClick = () => {
        setShowTrailer(true);
    };

    return isLoading && !content ? (
        <div className="w-screen h-screen flex items-center justify-center">
            <Spinner size="lg" />
        </div>
    ) : (
        <>
            {showTrailer && (
                <YoutubeEmbedVideo
                    videoLink={content?.trailerLink || ""}
                    closeTrailer={() => setShowTrailer(false)}
                />
            )}
            <ContentPageHeader
                content={content}
                actionButtonText="Ver ahora"
                onActionButtonClick={() => console.log("Ver ahora")}
                secondaryButtonText="Ver trailer"
                onSecondaryButtonClick={handleTrailerClick}
                showBackButton
            />
            {content?.type === "serie" && (
                <main className="container mx-auto mt-0 px-5 md:px-0 md:mt-5">
                    <section className="mt-5">
                        <h3 className="text-xl font-extrabold">Capítulos</h3>
                        <Select
                            label="Temporada"
                            placeholder="Temporada"
                            className="max-w-xs mt-5"
                            selectedKeys={[selectedSeason]}
                            onChange={handleSelectionChange}
                        >
                            {seasons.map((season) => (
                                <SelectItem key={season}>{season}</SelectItem>
                            ))}
                        </Select>
                        <div className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-5">
                            {chapters
                                .filter(
                                    (chapter) =>
                                        `Temporada ${chapter.season}` ===
                                        selectedSeason
                                )
                                .map((chapter) => (
                                    <ChapterPreviewCard
                                        key={chapter.id}
                                        chapter={chapter}
                                    />
                                ))}
                        </div>
                    </section>
                </main>
            )}
        </>
    );
}
