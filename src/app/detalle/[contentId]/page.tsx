"use client";
import ContentPreviewCard from "@/components/General/ContentPreviewCard";
import { strangerThingsHeader } from "@/image-paths";
import { Button, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

type Props = {
    params: { contentId: string };
};

export default function DetailPage({ params }: Props) {
    const seasons = ["1ra temporada", "2da temporada"];

    return (
        <>
            <header className="grid md:grid-cols-2 container mx-auto py-10">
                <div className="order-2 md:order-1 flex w-full flex-col justify-center p-5 md:p-0">
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
                <div className="order-1 md:order-2 w-full px-5 md:px-0">
                    <Image
                        src={strangerThingsHeader}
                        className="rounded-xl"
                        alt="Stranger Dings"
                    />
                </div>
            </header>
            <main className="container mx-auto mt-0 px-5 md:px-0 md:mt-5">
                <section className="mt-5">
                    <h3 className="text-xl font-extrabold">Capítulos</h3>
                    <Select
                        label="Temporada"
                        placeholder="Temporada"
                        defaultSelectedKeys={["1ra temporada"]}
                        className="max-w-xs mt-5"
                    >
                        {seasons.map((season) => (
                            <SelectItem key={season}>{season}</SelectItem>
                        ))}
                    </Select>
                    <div className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-5">
                        <ContentPreviewCard
                            title="Mujer con audifonos"
                            category="Drama"
                            image="https://nextui.org/images/hero-card.jpeg"
                            duration="5 temporadas"
                            year="2019"
                        />
                        <ContentPreviewCard
                            title="Mujer con audifonos"
                            category="Drama"
                            image="https://nextui.org/images/hero-card.jpeg"
                            duration="5 temporadas"
                            year="2019"
                        />
                        <ContentPreviewCard
                            title="Mujer con audifonos"
                            category="Drama"
                            image="https://nextui.org/images/hero-card.jpeg"
                            duration="5 temporadas"
                            year="2019"
                        />
                        <ContentPreviewCard
                            title="Mujer con audifonos"
                            category="Drama"
                            image="https://nextui.org/images/hero-card.jpeg"
                            duration="5 temporadas"
                            year="2019"
                        />
                        <ContentPreviewCard
                            title="Mujer con audifonos"
                            category="Drama"
                            image="https://nextui.org/images/hero-card.jpeg"
                            duration="5 temporadas"
                            year="2019"
                        />
                        <ContentPreviewCard
                            title="Mujer con audifonos"
                            category="Drama"
                            image="https://nextui.org/images/hero-card.jpeg"
                            duration="5 temporadas"
                            year="2019"
                        />
                        <ContentPreviewCard
                            title="Mujer con audifonos"
                            category="Drama"
                            image="https://nextui.org/images/hero-card.jpeg"
                            duration="5 temporadas"
                            year="2019"
                        />
                    </div>
                </section>
            </main>
        </>
    );
}
