"use client";

import { User } from "@/types/user";
import { FaSquareGithub, FaLinkedin, FaSquareInstagram } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { EditLinksForm } from "../edit-profile-links";
import BeutifyLink from "@/functions/beutify-link";

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
            {user?.github && (
                <div className="py-1 px-4 bg-background w-full items-center mx-auto flex flex-row justify-between rounded-lg ">
                    <FaSquareGithub className="text-text mt-[2px]" size={24} />
                    <div className="flex flex-row items-center gap-4">
                        <Link
                            className="transition-all duration-500 hover:-translate-x-1 text-text hover:text-primary font-medium text-sm"
                            href={`${user?.github}`}
                        >
                            <p>{BeutifyLink(user?.github)}</p>
                        </Link>
                        <button
                            className="text-text mt-[2px] hover:text-primary"
                            onClick={toggleEditLinks}
                        >
                            <MdEdit size={20} />
                        </button>
                    </div>
                </div>
            )}
            {/* LINKEDIN */}
            {user?.linkedin && (
                <div className="py-1 px-4 bg-background w-full items-center mx-auto flex flex-row justify-between rounded-lg ">
                    <FaLinkedin className="text-text mt-[2px]" size={24} />
                    <div className="flex flex-row items-center gap-4">
                        <Link
                            className="transition-all duration-500 hover:-translate-x-1 text-text hover:text-primary font-medium text-sm"
                            href={`${user?.linkedin}`}
                        >
                            <p>{BeutifyLink(user?.linkedin)}</p>
                        </Link>
                        <button
                            className="text-text mt-[2px] hover:text-primary"
                            onClick={toggleEditLinks}
                        >
                            <MdEdit size={20} />
                        </button>
                    </div>
                </div>
            )}
            {/* INSTAGRAM */}
            {user?.instagram && (
                <div className="py-1 px-4 bg-background w-full items-center mx-auto flex flex-row justify-between rounded-lg ">
                    <FaSquareInstagram
                        className="text-text mt-[2px]"
                        size={24}
                    />
                    <div className="flex flex-row items-center gap-4">
                        <Link
                            className="transition-all duration-500 hover:-translate-x-1 text-text hover:text-primary font-medium text-sm"
                            href={`${user?.instagram}`}
                        >
                            <p>{BeutifyLink(user?.instagram)}</p>
                        </Link>
                        <button
                            className="text-text mt-[2px] hover:text-primary"
                            onClick={toggleEditLinks}
                        >
                            <MdEdit size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
