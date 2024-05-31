"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { Content } from "@/types/Content";
import ContentPageHeader from "@/components/General/ContentPageHeader";
import YoutubeEmbedVideo from "@/components/General/YoutubeEmbedVideo";

type Props = {
    params: { contentId: string };
};

export default function DetailPage({ params }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState<Content | null>(null);
    const [showTrailer, setShowTrailer] = useState(false);

    const launchYear = content
        ? new Date(content?.launchDate).getFullYear()
        : 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/content/detail/movie/${params.contentId}`
                );
                console.log(response);
                setContent(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [params.contentId]);

    const handleTrailerClick = () => {
        setShowTrailer(true);
    };

    return isLoading && !content ? (
        <div className="w-full h-full flex items-center justify-center">
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
        </>
    );
}
