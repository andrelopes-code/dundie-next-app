"use client";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/profile/profile-card";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";

interface User {
    id: number;
    name: string;
    avatar: string;
    username: string;
    bio: string;
    points: number;
    dept: string;
}

function getUser(): Promise<User> {
    return new Promise<User>((resolve) => {
        setTimeout(() => {
            const user: User = {
                id: 1,
                name: "Taylor Swift",
                username: "taylorswift",
                avatar: "https://i.pravatar.cc/300",
                bio: "Explorador do desconhecido. Envolvido em uma dança constante com as palavras. Sempre em busca de novas histórias para contar e horizontes para desbravar.",
                points: 100,
                dept: "management",
            };
            resolve(user);
        }, 500); // 0.5 segundos
    });
}

export default function Profile() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        let isMounted = true;

        if (!user) {
            getUser()
                .then((userData) => {
                    if (isMounted) {
                        setUser(userData);
                    }
                })
                .catch((error) => {
                    console.error(
                        "Ocorreu um erro ao buscar o usuário:",
                        error
                    );
                });
        }

        return () => {
            isMounted = false;
        };
    }, []); // Executa apenas quando o usuário for nulo

    useEffect(() => {}, [user]);

    return (
        <div className="h-screen bg-background">
            <div>
                <Navbar />
            </div>
            <div className="bg-background px-24 h-content grid grid-cols-[1fr_2fr]">
                <div className="grid grid-rows-[50%_50%] min-h-[650px] h-content">
                    {/* PROFILE CARD */}
                    <div className="shadow-lg flex flex-col gap-3 min-w-80 p-5 items-center justify-center overflow-hidden bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg">
                        {user && <ProfileCard user={user} />}
                        {!user && <Loading />}
                    </div>
                    {/* PROFILE LINKS */}
                    <div className="shadow-lg overflow-hidden bg-background-light m-[0.75rem_0.75rem_0.75rem_0] rounded-lg"></div>
                </div>

                <div className="grid grid-rows-[50%_50%] min-h-[650px] h-content">
                    {/* PROFILE DETAILS */}
                    <div className="shadow-lg overflow-hidden bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg"></div>
                    {/* ALL TRANSACTIONS */}
                    <div className="shadow-lg overflow-hidden bg-background-light m-[0.75rem_0.75rem_0.75rem_0] rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}
