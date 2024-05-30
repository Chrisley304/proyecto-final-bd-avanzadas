"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { Content } from "@/types/Content";
import { log } from "console";

type Props = {
    content: Content | null;
    actionButtonText: string;
    onActionButtonClick: () => void;
    secondaryButtonText: string;
    onSecondaryButtonClick: () => void;
};

export default function ContentPageHeader({
    content,
    actionButtonText,
    onActionButtonClick,
    secondaryButtonText,
    onSecondaryButtonClick,
}: Props) {
    const launchYear = content
        ? new Date(content?.launchDate).getFullYear()
        : 0;

    return (
        <header className="grid md:grid-cols-2 container mx-auto py-10">
            <div className="order-2 md:order-1 flex w-full flex-col justify-center p-5 md:p-0">
                <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    {content?.title}
                </h2>
                <div className="flex gap-2 my-5 text-lg">
                    <span>{launchYear}</span>
                    <span>|</span>
                    <span>{content?.category}</span>
                    <span>|</span>
                    <span>{content?.type}</span>
                </div>
                <p className="my-5 text-base">{content?.description}</p>
                <div>
                    <Button
                        size="lg"
                        color="danger"
                        variant="shadow"
                        className="mr-4"
                        onClick={onActionButtonClick}
                    >
                        {actionButtonText}
                    </Button>
                    <Button
                        size="lg"
                        variant="flat"
                        onClick={onSecondaryButtonClick}
                    >
                        {secondaryButtonText}
                    </Button>
                </div>
            </div>
            <div className="order-1 md:order-2 w-full px-5 md:px-0">
                <Image
                    width={700}
                    height={500}
                    src={content?.coverImage || ""}
                    className="rounded-xl"
                    alt={`${content?.title} cover`}
                />
            </div>
        </header>
    );
}
