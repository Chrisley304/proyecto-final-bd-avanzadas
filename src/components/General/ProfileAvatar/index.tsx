import useAuth from "@/hooks/useAuth";
import { Profile } from "@/types/User";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsPersonAdd } from "react-icons/bs";

type ProfileAvatarProps = {
    profile?: Profile | null;
    createNewProfile?: boolean;
};

export default function ProfileAvatar({
    profile,
    createNewProfile = false,
}: ProfileAvatarProps) {
    const { auth, setAuth } = useAuth();
    const router = useRouter();

    const handleClick = () => {
        if (createNewProfile) {
            console.log("Crear nuevo perfil");
        } else {
            if (!profile) return;
            const newAuth = {
                ...auth,
                selectedProfile: profile,
            };
            setAuth(newAuth);
            router.push("/inicio");
        }
    };

    return (
        <div className="flex flex-col gap-5 items-center" onClick={handleClick}>
            <div className="relative inline-flex items-center justify-center w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
                {createNewProfile ? (
                    <BsPersonAdd className="text-5xl" />
                ) : (
                    <Image
                        src={profile?.profileImage || ""}
                        alt={profile?.profileNickname || "Profile image"}
                        layout="fill"
                    />
                )}
            </div>
            <div className="font-medium text-gray-600 dark:text-gray-300 text-2xl w-full text-center">
                {createNewProfile
                    ? "Crear nuevo perfil"
                    : profile?.profileNickname}
            </div>
        </div>
    );
}
