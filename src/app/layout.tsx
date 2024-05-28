import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import GeneralNavbar from "@/components/General/GeneralNavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MexFlix",
    description: "MexFlix: Proyecto final de Bases de datos avanzadas",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} dark`}>
                <Providers>
                    <GeneralNavbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
