"use client";
import React, { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownItem,
    DropdownMenu,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
} from "@nextui-org/react";
import { logoMexFlix } from "@/image-paths";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type Props = {};

export default function GeneralNavbar({}: Props) {
    const { auth, setAuth } = useAuth();
    const isLoggedIn = auth?.isLogged || false;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const actualPath = usePathname();
    const router = useRouter();

    const menuItems = [
        { name: "Inicio", url: "/inicio" },
        { name: "Peliculas", url: "/peliculas" },
        { name: "Series", url: "/series" },
    ];

    const handleLogout = () => {
        setAuth(null);
        router.push("/");
    };

    return (
        <Navbar position="sticky">
            <NavbarBrand>
                <Link href={isLoggedIn ? "/inicio" : "/"}>
                    <Image src={logoMexFlix} alt="MexFlix" width={75} />
                </Link>
            </NavbarBrand>
            {isLoggedIn && (
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
                                color={
                                    actualPath === item.url
                                        ? "danger"
                                        : "foreground"
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
                    <NavbarItem className="flex">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="light">
                                    Christian Leyva <BsChevronDown />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem
                                    key="edit-profile"
                                    href="/editar-perfil"
                                >
                                    Editar perfil
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
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
