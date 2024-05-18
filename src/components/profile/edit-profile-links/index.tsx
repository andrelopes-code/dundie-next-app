"use client";

import { User } from "@/types/user";
import { FaSquareGithub, FaLinkedin, FaSquareInstagram } from "react-icons/fa6";
import { useState } from "react";
import { AlertError } from "@/components/alert";
import { FormEvent } from "react";
import API_URL from "@/constants/apiRoute";

export function EditLinksForm({
    user,
    setEditLinks,
}: Readonly<{ user: User; setEditLinks: any }>) {
    const [error, setError] = useState<string>("");

    const setErrorWithTimeout = (errorMessage: string) => {
        setError(errorMessage);
        setTimeout(() => {
            setError("");
        }, 2000);
    };

    // Desativa a caixa de edição
    const disableEditLinks = () => {
        setEditLinks(false);
    };

    // Caso clique no fundo, fecha a caixa de edição
    document.addEventListener("mousedown", (event: any) => {
        if (event.target.id === "background_div") {
            disableEditLinks();
        }
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let github = (event.target as any)[0].value;
        let linkedin = (event.target as any)[1].value;
        let instagram = (event.target as any)[2].value;

        fetch(`${API_URL}/user/profile/links`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ github, linkedin, instagram }),
        })
            .then(async (res) => {
                if (res.ok) {
                    setEditLinks(false);
                } else {
                    const data = await res.json();
                    setErrorWithTimeout(data?.detail);
                }
            })
            .catch((err: Error) => setErrorWithTimeout(err?.message));
    };

    return (
        <div
            id="background_div"
            className="transition-all z-[51] duration-200 bg-[rgba(0,0,0,0.1)] animate-fadeIn top-0 left-0 flex flex-col backdrop-blur-sm items-center h-screen w-screen justify-center absolute"
        >
            {error && <AlertError msg={error} />}
            <div className="bg-background-light opacity-85 animate-scaleIn backdrop-blur-lg shadow-lg rounded-lg w-1/3 p-5">
                <form id="links_form" onSubmit={handleSubmit}>
                    {/* GITHUB FIELD */}
                    <label
                        htmlFor="github"
                        className="flex flex-row gap-2 items-center text-text text-base mb-1"
                    >
                        <FaSquareGithub className="mb-[1px]" size={22} />
                        <p>Github</p>
                    </label>

                    <input
                        className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                        type="text"
                        name="github"
                        spellCheck="false"
                        placeholder="https://github.com/..."
                        id="github"
                        defaultValue={user?.github as string}
                        pattern="https://github.com/.*"
                        minLength={19}
                        maxLength={70}
                        title="enter a valid github link with https://github.com/"
                    />
                    {/* LINKEDIN FIELD */}
                    <label
                        htmlFor="linkedin"
                        className="mt-5 flex flex-row gap-2 items-center text-text text-base mb-1"
                    >
                        <FaLinkedin className="mb-[1px]" size={22} />
                        <p>Linkedin</p>
                    </label>

                    <input
                        className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                        type="text"
                        name="linkedin"
                        spellCheck="false"
                        placeholder="https://linkedin.com/in/..."
                        id="linkedin"
                        defaultValue={user?.linkedin as string}
                        pattern="https://linkedin.com/in/.*"
                        minLength={25}
                        maxLength={70}
                        title="enter a valid linkedin link with https://linkedin.com/in/"
                    />
                    {/* INSTAGRAM FIELD */}
                    <label
                        htmlFor="instagram"
                        className="mt-5 flex flex-row gap-2 items-center text-text text-base mb-1"
                    >
                        <FaSquareInstagram className="mb-[1px]" size={22} />
                        <p>Instagram</p>
                    </label>
                    <input
                        className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                        type="text"
                        name="instagram"
                        spellCheck="false"
                        placeholder="https://instagram.com/..."
                        id="instagram"
                        defaultValue={user?.instagram as string}
                        pattern="https://instagram.com/.*"
                        minLength={23}
                        maxLength={70}
                        title="enter a valid linkedin link with https://instagram.com/"
                    />
                    {/* SAVE BUTTON */}
                    <div className="flex flex-row justify-end mt-8">
                        <button
                            className="w-28 text-text-invert font-medium bg-primary p-1 rounded-lg"
                            form="links_form"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
