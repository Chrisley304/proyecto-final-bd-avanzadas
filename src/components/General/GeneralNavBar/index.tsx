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
} from "@nextui-org/react";
import { logoMexFlix } from "@/image-paths";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";
import { usePathname } from "next/navigation";

type Props = {};

export default function GeneralNavbar({}: Props) {
    const isLoggedIn = true;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const actualPath = usePathname();

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
                    <NavbarItem isActive={actualPath === "/inicio"}>
                        <Link
                            href="/inicio"
                            color={
                                actualPath !== "/inicio"
                                    ? "foreground"
                                    : "danger"
                            }
                        >
                            Inicio
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive={actualPath === "/peliculas"}>
                        <Link
                            href="/peliculas"
                            color={
                                actualPath !== "/peliculas"
                                    ? "foreground"
                                    : "danger"
                            }
                            aria-current="page"
                        >
                            Películas
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive={actualPath === "/series"}>
                        <Link
                            color={
                                actualPath !== "/series"
                                    ? "foreground"
                                    : "danger"
                            }
                            href="/series"
                        >
                            Series
                        </Link>
                    </NavbarItem>
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
        </Navbar>
    );
}
