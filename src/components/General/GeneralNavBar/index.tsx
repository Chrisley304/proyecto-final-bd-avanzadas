import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import { logoMexFlix } from "@/image-paths";
import Image from "next/image";

export default function GeneralNavbar({}) {
    const isLoggedin = false;

    return (
        <Navbar position="static">
            <NavbarBrand>
                <Link href="/">
                    <Image src={logoMexFlix} alt="MexFlix" width={80} />
                </Link>
            </NavbarBrand>
            {isLoggedin && (
                <NavbarContent
                    className="hidden sm:flex gap-4"
                    justify="center"
                >
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Inicio
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href="#" aria-current="page">
                            Películas
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Series
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            )}
            <NavbarContent justify="end">
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
            </NavbarContent>
        </Navbar>
    );
}
