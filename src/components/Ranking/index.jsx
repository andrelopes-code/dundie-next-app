"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const ItemRanking = ({ name, points, pos, username, avatar }) => {
    return (
        <div className="flex flex-row bg-background items-center justify-between py-1 px-4 rounded-lg border-border">
            <div className="flex flex-row gap-4 items-center">
                <div className="w-7">
                    <p className="text-text font-semibold">{pos}.</p>
                </div>
                <a
                    href={`/user/${username}`}
                    className="flex justify-center rounded-full w-8 overflow-hidden"
                >
                    <img className="h-8" src={avatar} alt="userImage" />
                </a>
                <p className="text-text font-medium text-nowrap max-w-32 overflow-hidden">
                    {name}
                </p>
            </div>
            <p className="text-text font-bold">
                {points} <span className="font-normal text-sm pl-1">pts</span>
            </p>
        </div>
    );
};

const Ranking = () => {
    let hasData = false;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getRanking = async () => {
            fetch("http://localhost:3000/api/ranking")
                .then(async (res) => await res.json())
                .then((data) => setUsers(data))
                .catch((err) => console.log(err));
        };
        !hasData && getRanking();
        hasData = true;
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users]);

    return (
        <>
            {!users.length ? (
                <Loading />
            ) : (
                <div className="h-full m-4">
                    <div className="h-1/6 flex items-center justify-center">
                        <h2 className="bg-background text-center w-full py-3 rounded-lg font-semibold text-primary text-2xl">TOP USERS</h2>
                    </div>
                    <div className="h-[70%] overflow-auto noscrollbar flex flex-col gap-2">
                        {users.map((user, pos) => (
                            <ItemRanking
                                key={user.id}
                                name={user.name}
                                points={user.points}
                                avatar={user.avatar}
                                pos={pos + 1}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Ranking;
