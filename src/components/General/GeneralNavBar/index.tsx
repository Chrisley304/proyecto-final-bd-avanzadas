"use client";
import React, { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownItem,
    DropdownMenu,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    Avatar,
} from "@nextui-org/react";
import { logoMexFlix } from "@/image-paths";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

export default function GeneralNavbar({}: Props) {
    const { auth, setAuth } = useAuth();
    const isLoggedIn = auth?.isLogged || false;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const actualPath = usePathname();
    const router = useRouter();
    const userProfile = auth?.selectedProfile || null;

    const menuItems = [
        { name: "Inicio", url: "/inicio" },
        { name: "Peliculas", url: "/peliculas" },
        { name: "Series", url: "/series" },
    ];

    const handleLogout = () => {
        setAuth(null);
        router.push("/");
    };

    const handleProfileChange = () => {
        setAuth({ ...auth, selectedProfile: null });
        router.push("/quien-esta-viendo");
    };

    return (
        <Navbar className="fixed">
            <NavbarBrand>
                <Link href={isLoggedIn ? "/inicio" : "/"}>
                    <Image src={logoMexFlix} alt="MexFlix" width={75} />
                </Link>
            </NavbarBrand>
            {isLoggedIn && userProfile && (
                <NavbarContent
                    className="hidden sm:flex gap-4"
                    justify="center"
                >
                    {menuItems.map((item) => (
                        <NavbarItem
                            key={item.name}
                            isActive={actualPath === item.url}
                        >
                            <Link
                                href={item.url}
                                className={
                                    actualPath === item.url
                                        ? "text-red-600"
                                        : ""
                                }
                            >
                                {item.name}
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>
            )}
            <NavbarContent justify="end">
                {!isLoggedIn ? (
                    <NavbarItem className="flex">
                        <Button
                            as={Link}
                            color="primary"
                            href="/login"
                            variant="flat"
                        >
                            Iniciar sesión
                        </Button>
                    </NavbarItem>
                ) : (
                    userProfile && (
                        <NavbarItem className="flex">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="light">
                                        <Avatar
                                            src={userProfile?.profileImage}
                                            size="sm"
                                        />
                                        {userProfile?.profileNickname}
                                        <BsChevronDown />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem
                                        key="edit-profile"
                                        onClick={handleProfileChange}
                                    >
                                        Seleccionar perfil
                                    </DropdownItem>
                                    <DropdownItem
                                        key="delete"
                                        className="text-danger"
                                        color="danger"
                                        onClick={handleLogout}
                                    >
                                        Cerrar sesión
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarItem>
                    )
                )}
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem
                        key={`${item}-${index}`}
                        isActive={actualPath === item.url}
                    >
                        <Link
                            color={
                                actualPath === item.url
                                    ? "danger"
                                    : "foreground"
                            }
                            className="w-full"
                            href={item.url}
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
