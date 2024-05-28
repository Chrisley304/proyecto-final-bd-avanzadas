"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "@/components/Icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/Icons/EyeFilledIcon";

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);
    const passwordValidationError = password !== verifyPassword;

    const isButtonDisabled =
        email === "" ||
        password === "" ||
        verifyPassword === "" ||
        passwordValidationError;

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8),
                rgba(0, 0, 0, 0.75)), url(/img/backgrounds/movies_background.jpg)`,
            }}
            className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        >
            <header className="container mx-auto text-center p-10">
                <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Películas y series ilimitadas y mucho más
                </h2>
                <h3 className="mb-6 text-lg font-normal text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Disfruta donde quieras. Cancela cuando quieras.
                    <br />
                    ¿Quieres ver MexFlix ya? Registrate ahora con tu correo y
                    contraseña o Inicia sesión.
                </h3>
            </header>
            <main className="container mx-auto">
                <form className="flex flex-col items-center gap-5">
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Ingresa tu email"
                        variant="faded"
                        className="w-2/3"
                        value={email}
                        onValueChange={setEmail}
                    />
                    <Input
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        variant="faded"
                        value={password}
                        onValueChange={setPassword}
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                        errorMessage="La contraseña debe tener al menos 8 caracteres, una mayúscula, una minuscula, un numero y un caracter especial."
                        endContent={
                            <button
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        maxLength={16}
                        className="w-2/3"
                    />
                    <Input
                        label="Verificar contraseña"
                        placeholder="Ingresa nuevamente tu contraseña"
                        variant="faded"
                        value={verifyPassword}
                        onValueChange={setVerifyPassword}
                        isInvalid={passwordValidationError}
                        errorMessage="La contraseña es diferente a la ingresada anteriormente."
                        endContent={
                            <button
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        maxLength={16}
                        className="w-2/3"
                    />
                    <Button
                        color="success"
                        className="text-white"
                        isDisabled={isButtonDisabled}
                    >
                        Registrarse
                    </Button>
                </form>
            </main>
        </div>
    );
}
