import { Button, Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export default function ContentPreviewCard({}) {
    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none w-[300px] h-[175px] cursor-pointer"
        >
            <Image
                width={100}
                height={300}
                alt="Woman listing to music"
                className="z-0 w-full h-full object-cover"
                src="https://nextui.org/images/hero-card.jpeg"
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div>
                    <p className="text-sm text-white">Mujer con audifonos</p>
                    <p className="text-tiny text-white/80">2019 | Terror</p>
                    <p className="text-tiny text-white/80">5 temporadas</p>
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
