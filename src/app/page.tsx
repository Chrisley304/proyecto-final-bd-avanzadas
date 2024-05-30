"use client";
import React, { useState } from "react";
import { Button, DateInput, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "@/components/Icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/Icons/EyeFilledIcon";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { Auth } from "@/types/User";
import { BsCreditCard, BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function Home() {
    const { auth, setAuth } = useAuth();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [creditCard, setCreditCard] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const router = useRouter();

    const passwordValidationError = password !== verifyPassword;

    const isButtonDisabled =
        email === "" ||
        password === "" ||
        verifyPassword === "" ||
        passwordValidationError ||
        name === "" ||
        lastName === "" ||
        creditCard === "" ||
        expirationDate === "" ||
        cvv === "";

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isButtonDisabled) return;
        const newAuth: Auth = {
            user: {
                id: 1,
                email,
                password,
                lastName,
                name,
                profiles: [],
                bankInfo: {
                    id: 1,
                    cardFullName: `${name} ${lastName}`,
                    cardNumber: creditCard,
                    cvv,
                    expirationDate: new Date(expirationDate),
                },
            },
            isLogged: true,
        };
        setAuth(newAuth);
        router.push("/inicio");
    };

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
                    ¿Quieres ver MexFlix ya? Registrate ahora con tu información
                    o{" "}
                    <Link href="/login" className="font-bold text-red-600">
                        Inicia sesión
                    </Link>
                    .
                </h3>
            </header>
            <main className="container mx-auto mb-5">
                <form
                    className="flex flex-col items-center gap-5"
                    onSubmit={handleSubmit}
                >
                    <Input
                        type="text"
                        label="Nombre(s)"
                        placeholder="Ingresa tu nombre(s)"
                        variant="faded"
                        className="w-2/3"
                        value={name}
                        onValueChange={setName}
                    />
                    <Input
                        type="text"
                        label="Apellido(s)"
                        placeholder="Ingresa tus apellidos"
                        variant="faded"
                        className="w-2/3"
                        value={lastName}
                        onValueChange={setLastName}
                    />
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Ingresa tu email"
                        variant="faded"
                        className="w-2/3"
                        value={email}
                        onValueChange={setEmail}
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 w-2/3 gap-5">
                        <Input
                            type="text"
                            label="Tarjeta de crédito"
                            placeholder="1111 2222 4444 5555"
                            variant="faded"
                            className="col-span-2"
                            maxLength={16}
                            value={creditCard}
                            onValueChange={setCreditCard}
                            startContent={
                                <BsCreditCard className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />
                        <Input
                            type="text"
                            label="Fecha vencimiento"
                            placeholder="MM/YY"
                            variant="faded"
                            maxLength={5}
                            value={expirationDate}
                            onValueChange={setExpirationDate}
                        />
                        <Input
                            type="text"
                            label="CVV"
                            placeholder="CVV"
                            variant="faded"
                            maxLength={3}
                            value={cvv}
                            onValueChange={setCvv}
                            startContent={
                                <BsThreeDots className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />
                    </div>
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
                                onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                }
                            >
                                {isPasswordVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isPasswordVisible ? "text" : "password"}
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
                                onClick={() =>
                                    setIsConfirmPasswordVisible(
                                        !isConfirmPasswordVisible
                                    )
                                }
                            >
                                {isConfirmPasswordVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        maxLength={16}
                        className="w-2/3"
                    />
                    <Button
                        color="success"
                        className="text-white"
                        isDisabled={isButtonDisabled}
                        type="submit"
                    >
                        Registrarse
                    </Button>
                </form>
            </main>
        </div>
    );
}
