import { Button, Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

type Props = {
    title: string;
    year: string;
    category: string;
    duration: string;
    image: string;
};

export default function ContentPreviewCard({
    title,
    year,
    duration,
    image,
    category,
}: Props) {
    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none mb-5 w-full h-[175px] cursor-pointer hover:scale-110"
        >
            <Image
                width={200}
                height={175}
                alt={title + " cover"}
                className="z-0 w-full h-full object-cover"
                src={image}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div>
                    <p className="text-sm text-white">{title}</p>
                    <p className="text-tiny text-white/80">
                        {year} | {category}
                    </p>
                    <p className="text-tiny text-white/80">{duration}</p>
                </div>
                <Button
                    className="text-tiny text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                >
                    Ver detalles
                </Button>
            </CardFooter>
        </Card>
    );
}
