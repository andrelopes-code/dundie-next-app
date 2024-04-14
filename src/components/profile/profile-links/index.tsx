"use client";
import { User } from "@/types/user";
import { FaSquareGithub, FaLinkedin, FaSquareInstagram } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { EditLinksForm } from "../edit-profile-links";
import BeutifyLink from "@/functions/beutify-link";

/**
 * @description
 * The `ProfileLinks` component displays a user's social media links and provides an edit button to toggle the `EditLinksForm` component.
 *
 * @prop {Readonly<{ user: User }>} user - An object containing the user's information, including optional social media links (e.g., GitHub, LinkedIn, Instagram). The `user` object is expected to adhere to the `User` interface defined in `src/types/user.ts` (or the equivalent path).
 *
 * @returns {JSX.Element}
 * Renders the profile links section with social media icons, link text, and an edit button.
 */

export default function ProfileLinks({ user }: Readonly<{ user: User }>) {
    const [editLinks, setEditLinks] = useState(false);

    const toggleEditLinks = () => {
        setEditLinks(!editLinks);
    };

    return (
        <div className="flex flex-col gap-3 shadow-lg p-5 overflow-hidden bg-background-light rounded-lg">
            {editLinks && (
                <EditLinksForm user={user} setEditLinks={setEditLinks} />
            )}

            {/* GITHUB */}

            <div className="py-1 px-4 bg-background w-full items-center mx-auto flex flex-row justify-between rounded-lg ">
                <FaSquareGithub className="text-text mt-[2px]" size={24} />
                <div className="flex flex-row items-center gap-4">
                    <Link
                        className="transition-all duration-500 hover:-translate-x-1 text-text hover:text-primary font-medium text-sm"
                        href={`${user?.github || "/user/profile"}`}
                    >
                        <p>{BeutifyLink(user?.github || "empty")}</p>
                    </Link>
                    <button
                        className="text-text mt-[2px] hover:text-primary"
                        onClick={toggleEditLinks}
                    >
                        <MdEdit size={20} />
                    </button>
                </div>
            </div>

            {/* LINKEDIN */}

            <div className="py-1 px-4 bg-background w-full items-center mx-auto flex flex-row justify-between rounded-lg ">
                <FaLinkedin className="text-text mt-[2px]" size={24} />
                <div className="flex flex-row items-center gap-4">
                    <Link
                        className="transition-all duration-500 hover:-translate-x-1 text-text hover:text-primary font-medium text-sm"
                        href={`${user?.linkedin || "/user/profile"}`}
                    >
                        <p>{BeutifyLink(user?.linkedin || "empty")}</p>
                    </Link>
                    <button
                        className="text-text mt-[2px] hover:text-primary"
                        onClick={toggleEditLinks}
                    >
                        <MdEdit size={20} />
                    </button>
                </div>
            </div>

            {/* INSTAGRAM */}

            <div className="py-1 px-4 bg-background w-full items-center mx-auto flex flex-row justify-between rounded-lg ">
                <FaSquareInstagram className="text-text mt-[2px]" size={24} />
                <div className="flex flex-row items-center gap-4">
                    <Link
                        className="transition-all duration-500 hover:-translate-x-1 text-text hover:text-primary font-medium text-sm"
                        href={`${user?.instagram || "/user/profile"}`}
                    >
                        <p>{BeutifyLink(user?.instagram || "empty")}</p>
                    </Link>
                    <button
                        className="text-text mt-[2px] hover:text-primary"
                        onClick={toggleEditLinks}
                    >
                        <MdEdit size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
