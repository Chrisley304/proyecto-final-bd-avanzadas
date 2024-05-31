import React from "react";
import { Chapter } from "@/types/Content";
import { Button, Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { BsPlayCircle } from "react-icons/bs";

type Props = {
    chapter: Chapter;
};

export default function ChapterPreviewCard({ chapter }: Props) {
    const handleClick = () => {
        console.log("Reproduciendo capítulo", chapter.number);
    };

    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none mb-5 w-full h-[175px] hover:scale-110"
        >
            <Image
                width={200}
                height={175}
                alt={"Chapter " + chapter.number + " cover"}
                className="z-0 w-full h-full object-cover"
                src={chapter.coverImage || ""}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div>
                    <p className="text-sm text-white">
                        Capitulo {chapter.number}
                    </p>
                    <p className="text-tiny text-white/80">
                        Temporada {chapter.season} | {chapter.duration}
                    </p>
                </div>
                <Button
                    className="text-tiny text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                    onClick={handleClick}
                >
                    Reproducir <BsPlayCircle />
                </Button>
            </CardFooter>
        </Card>
    );
}
