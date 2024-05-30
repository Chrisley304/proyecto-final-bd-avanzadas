import React from "react";
import { Content } from "@/types/Content";
import { Button, Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
    content: Content;
};

export default function ContentPreviewCard({ content }: Props) {
    const launchYear = new Date(content?.launchDate).getFullYear();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/detalle/${content.id}`);
    };

    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none mb-5 w-full h-[175px] cursor-pointer hover:scale-110"
        >
            <Image
                width={200}
                height={175}
                alt={content.title + " cover"}
                className="z-0 w-full h-full object-cover"
                src={content.coverImage}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div>
                    <p className="text-sm text-white">{content.title}</p>
                    <p className="text-tiny text-white/80">
                        {launchYear} | {content.category}
                    </p>
                    <p className="text-tiny text-white/80">
                        {content.type} |{" "}
                        {`${content.info?.duration}${
                            content.type === "serie" ? " temporadas" : ""
                        }`}
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
                    Ver detalles
                </Button>
            </CardFooter>
        </Card>
    );
}
