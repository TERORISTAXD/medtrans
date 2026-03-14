import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";


import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "MedTrans — Medical Transport & Private Ambulance | 24/7 Service",
    description:
        "Professional medical transport and private ambulance services available 24/7. Hospital transfers, medical events, international transport, and disabled patient transport.",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico"
    }
};

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();

    return (
        <html lang={locale} className={inter.variable}>
            <body className="flex min-h-screen flex-col bg-white font-sans antialiased">
                <NextIntlClientProvider locale={locale} messages={messages}>

                    <Toaster
                        position="top-center"
                        toastOptions={{
                            duration: 5000,
                            style: {
                                background: "#e02424",
                                color: "#fff",
                                fontWeight: "600",
                                borderRadius: "10px",
                                padding: "14px 20px",
                            },
                            success: {
                                style: {
                                    background: "#c81e1e",
                                },
                                iconTheme: {
                                    primary: "#fff",
                                    secondary: "#c81e1e",
                                },
                            },
                            error: {
                                style: {
                                    background: "#e02424",
                                },
                            },
                        }}
                    />
                    <Header />
                    <main className="flex-1 overflow-x-hidden">{children}</main>
                    <Footer />

                </NextIntlClientProvider>
            </body>
        </html>
    );
}
