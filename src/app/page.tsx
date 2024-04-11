"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

interface RankingUser {
    name: string;
    username: string;
    avatar: string;
    id: number;
    points: number;
}

export default function Home() {
    const [ranking, setRanking] = useState<RankingUser[]>();

    useEffect(() => {
        const getRanking = async () => {
            fetch("http://localhost:3000/api/ranking")
                .then(async (res) => setRanking(await res.json()))
                .catch((err) => console.log("RANKING ERROR: ", err));
        };
        getRanking();
    }, []);

    return (
        <>
            <Navbar />
            {ranking && <div>{ranking.map((user) => (<p key={user.id} >{user.name}</p>))}</div>}
            <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
        </>
    );
}
