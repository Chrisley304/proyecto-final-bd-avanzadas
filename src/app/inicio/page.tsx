"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { strangerThingsHeader } from "@/image-paths";
import ContentPreviewCard from "@/components/General/ContentPreviewCard";

export default function Inicio() {
    return (
        <>
            <header className="flex container mx-auto py-10">
                <div className="flex w-1/2 flex-col justify-center">
                    <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                        Stranger Dings
                    </h2>
                    <div className="flex gap-2 my-5 text-lg">
                        <span>2016</span>
                        <span>|</span>
                        <span>16+</span>
                        <span>|</span>
                        <span>5 temporadas</span>
                    </div>
                    <p className="my-5 text-base">
                        Cuando un niño desaparece, sus amigos, su familia y la
                        policía se ven envueltos en una serie de eventos
                        misteriosos.
                    </p>
                    <div>
                        <Button
                            size="lg"
                            color="danger"
                            variant="shadow"
                            className="mr-4"
                        >
                            Ver ahora
                        </Button>
                        <Button size="lg" variant="bordered">
                            Ver trailer
                        </Button>
                    </div>
                </div>
                <div className="w-1/2">
                    <Image
                        src={strangerThingsHeader}
                        className="rounded-xl"
                        alt="Stranger Dings"
                    />
                </div>
            </header>
            <main className="container mx-auto mt-5">
                <section>
                    <h3 className="text-xl font-extrabold">
                        Nuevos lanzamientos
                    </h3>
                    <div className="py-2 flex gap-5">
                        <ContentPreviewCard />
                        <ContentPreviewCard />
                        <ContentPreviewCard />
                        <ContentPreviewCard />
                    </div>
                </section>
            </main>
        </>
    );
}
