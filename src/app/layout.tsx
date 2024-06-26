import type { Metadata } from "next";
import "./globals.css";
import "@/../public/css/loader.css";
import React from "react";
import FeedbackSideButton from "@/components/FeedbackSideButton";

export const metadata: Metadata = {
    title: "Dundie",
    description: "A reward system!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className="bg-background" lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Reddit+Mono:wght@200..900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <FeedbackSideButton />
                {children}
            </body>
        </html>
    );
}
