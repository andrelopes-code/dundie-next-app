"use client";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/profile/profile-card";
import ProfileDetails from "@/components/profile/profile-datails";
import ProfileLinks from "@/components/profile/profile-links";
import { useState, useEffect, useRef } from "react";
import Loading from "@/components/Loading";
import { User } from "@/types/user";
import UserProfileTransactions from "@/components/profile/user-transactions";
import API_URL from "@/constants/apiRoute";

export default function Profile() {
    const isFirstRender = useRef(true);
    const [user, setUser] = useState<User>();
    useEffect(() => {
        const getProfile = () => {
            fetch(`${API_URL}/user/profile`)
                .then(async (res) => {
                    if (res.ok) {
                        const data = await res.json();
                        setUser(data);
                    }
                })
                .catch((error) => {
                    console.error(
                        "Ocorreu um erro ao buscar o usuário:",
                        error
                    );
                });
        };
        isFirstRender.current && getProfile();
        isFirstRender.current = false;
    }, []);

    useEffect(() => {
        if (user) {
            document.title = `Dundie - ${user.username}`;
        }
    }, [user]);

    return (
        <div className="h-screen bg-background">
            <div>
                <Navbar />
            </div>
            <div className="bg-background px-24 h-content grid grid-cols-[1fr_2fr]">
                <div className="grid grid-rows-[65%_35%] min-h-[650px] h-content">
                    {/* PROFILE CARD */}
                    <div className="shadow-lg flex flex-col gap-3 min-w-80 p-5 items-center justify-center overflow-hidden bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg">
                        {user && <ProfileCard user={user} />}
                        {!user && <Loading />}
                    </div>
                    {/* PROFILE LINKS */}
                    <div className="overflow-hidden m-[0.75rem_0.75rem_0.75rem_0]">
                        {user && <ProfileLinks user={user} />}
                    </div>
                </div>
                <div className="grid grid-rows-[50%_50%] min-h-[650px] h-content">
                    {/* PROFILE DETAILS */}
                    <div className="shadow-lg p-5 overflow-scroll noscrollbar bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg">
                        {user && <ProfileDetails user={user} />}
                        {!user && <Loading />}
                    </div>
                    {/* USER TRANSACTIONS */}
                    <div className="shadow-lg overflow-hidden bg-background-light m-[0.75rem_0.75rem_0.75rem_0] rounded-lg">
                        {user && <UserProfileTransactions />}
                        {!user && <Loading />}
                    </div>
                </div>
            </div>
        </div>
    );
}
