"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/react";
import ProfileAvatar from "@/components/General/ProfileAvatar";
import { Profile } from "@/types/User";

export default function QuienEstaViendo() {
    const testProfiles: Profile[] = [
        {
            id: 1,
            profileNickname: "Chris",
            profileImage: "https://randomuser.me/api/portraits/lego/6.jpg",
        },
    ];

    return (
        <div className="h-full w-full flex justify-center items-center flex-col gap-10">
            <div className="text-4xl font-bold text-gray-600 dark:text-gray-300">
                ¿Quién está viendo?
            </div>
            <div className="flex gap-16">
                {testProfiles.map((profile) => (
                    <ProfileAvatar key={profile.id} profile={profile} />
                ))}
                <ProfileAvatar createNewProfile />
            </div>
        </div>
    );
}
