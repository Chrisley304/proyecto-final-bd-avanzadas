import { Button } from "@nextui-org/react";
import React from "react";
import { BsXLg } from "react-icons/bs";

type Props = {
    videoLink: string;
    closeTrailer: () => void;
};

const YoutubeEmbedVideo = ({ videoLink, closeTrailer }: Props) => {
    const embedId = videoLink.split("=")[1];

    return (
        <div className="z-20 w-full h-full fixed backdrop-brightness-50 overflow-hidden flex justify-center items-center">
            <div className="relative w-full md:w-3/4">
                <Button
                    onClick={closeTrailer}
                    variant="solid"
                    className="absolute -top-12 right-0 text-white text-xl"
                >
                    <BsXLg />
                </Button>
                <div className="aspect-video min-w-10">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${embedId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        modestbranding
                        allowFullScreen
                        title="trailer"
                    />
                </div>
            </div>
        </div>
    );
};

export default YoutubeEmbedVideo;
