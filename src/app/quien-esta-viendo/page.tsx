"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Input } from "@nextui-org/react";
import ProfileAvatar from "@/components/General/ProfileAvatar";
import { Profile } from "@/types/User";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";

export default function QuienEstaViendo() {
    const { auth } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [file, setFile] = useState<File | null>(null);
    const [profileName, setProfileName] = useState<string>("");
    const [profileToEdit, setProfileToEdit] = useState<Profile | null>(null);

    const profiles: Profile[] = auth?.user?.profiles || [];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file as Blob);
        formData.append("profileName", profileName);

        // try {
        //     // const response = await axios.post("/api/profiles", formData, {
        //     //     headers: {
        //     //         "Content-Type": "multipart/form-data",
        //     //     },
        //     // });
        //     // console.log(response);
        // } catch (error) {
        //     console.error(error);
        // }
        onClose();
    };

    const handleEditProfile = (profile: Profile) => {
        setProfileToEdit(profile);
        setProfileName(profile.profileNickname);
        onOpen();
    };

    const handleNewProfile = () => {
        setProfileToEdit(null);
        setProfileName("");
        onOpen();
    };

    return (
        <>
            <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {profileToEdit
                                    ? "Editar perfil"
                                    : "Crear nuevo perfil"}
                            </ModalHeader>
                            <ModalBody>
                                <form className="flex flex-col gap-5">
                                    <Input
                                        label="Nombre perfil"
                                        placeholder="Escribe el nombre del perfil"
                                        maxLength={12}
                                        value={profileName}
                                        onChange={(e) =>
                                            setProfileName(e.target.value)
                                        }
                                    />
                                    <div>
                                        <p className="text-sm pb-1">
                                            Selecciona una imagen de perfil
                                        </p>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={handleUpload}
                                    isDisabled={
                                        profileName === "" || file === null
                                    }
                                >
                                    Crear perfil
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="h-full w-full flex justify-center items-center flex-col gap-10">
                <div className="text-4xl font-bold text-gray-600 dark:text-gray-300">
                    ¿Quién está viendo?
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
                    {profiles.map((profile) => (
                        <ProfileAvatar
                            key={profile.id}
                            profile={profile}
                            handleEditProfile={handleEditProfile}
                        />
                    ))}
                    <ProfileAvatar
                        createNewProfile
                        handleNewProfile={handleNewProfile}
                    />
                </div>
            </div>
        </>
    );
}
