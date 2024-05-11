"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/profile/profile-card";
import ProfileDetails from "@/components/profile/profile-datails";
import ProfileLinks from "@/components/profile/profile-links";
import { useState, useRef, useEffect } from "react";
import Loading from "@/components/Loading";
import { User } from "@/types/user";
import UserProfileTransactions from "@/components/profile/user-transactions";

export default function PublicProfile({
    params,
}: {
    params: { username: string };
}) {
    const isFirstRender = useRef(true);
    const [user, setUser] = useState<User>();
    const [noUser, setNoUser] = useState<boolean>(false);

    useEffect(() => {
        const getPublicProfile = () => {
            fetch(`http://localhost:3000/api/user/public/${params.username}`)
                .then(async (res) => {
                    if (res.ok) {
                        const data = await res.json();
                        setUser(data);
                    } else {
                        setNoUser(true);
                        console.log("user not found");
                    }
                })
                .catch((error) => {
                    console.error(
                        "Ocorreu um erro ao buscar o usuário:",
                        error
                    );
                });
        };
        isFirstRender.current && getPublicProfile();
        isFirstRender.current = false;
    });

    useEffect(() => {
        if (user) {
            document.title = `Dundie - ${user.username}`;
        }
    }, [user]);

    return (
        <div className="h-screen">
            <div>
                <Navbar />
            </div>
            {/* IF USER NOT FOUND */}
            {noUser && (
                <div className="flex flex-col items-center text-text justify-center h-[85%]">
                    <div className="flex flex-col gap-6 max-w-md text-center">
                        <h2 className="font-extrabold text-9xl ">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-2xl md:text-3xl">
                            Sorry, user &apos;{params.username}&apos; not found.
                        </p>
                        <Link
                            href="/"
                            className="px-8 py-4 text-xl font-semibold rounded bg-primary text-gray-50 hover:text-gray-200"
                        >
                            Back to home
                        </Link>
                    </div>
                </div>
            )}
            {/* IF USER FOUND */}
            {!noUser && (
                <div className="px-24 h-content grid grid-cols-[1fr_2fr]">
                    <div className="grid grid-rows-[65%_35%] min-h-[650px] h-content">
                        {/* PROFILE CARD */}
                        <div className="shadow-lg flex flex-col gap-3 min-w-80 p-5 items-center justify-center overflow-hidden bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg">
                            {user && <ProfileCard user={user} isPublic />}
                            {!user && <Loading />}
                        </div>
                        {/* PROFILE LINKS */}
                        <div className="overflow-hidden m-[0.75rem_0.75rem_0.75rem_0]">
                            {user && <ProfileLinks user={user} isPublic />}
                        </div>
                    </div>
                    <div className="grid grid-rows-[50%_50%] min-h-[650px] h-content">
                        {/* PROFILE DETAILS */}
                        <div className="shadow-lg p-5 overflow-scroll noscrollbar bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg">
                            {user && <ProfileDetails user={user} isPublic />}
                            {!user && <Loading />}
                        </div>
                        {/* USER TRANSACTIONS */}
                        <div className="shadow-lg overflow-hidden bg-background-light m-[0.75rem_0.75rem_0.75rem_0] rounded-lg">
                            {user && (
                                <UserProfileTransactions
                                    targetUser={user.username}
                                />
                            )}
                            {!user && <Loading />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
