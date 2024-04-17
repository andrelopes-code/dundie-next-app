"use client";

import { User } from "@/types/user";
import { RiUpload2Fill } from "react-icons/ri";
import { useState } from "react";
import { AlertError } from "@/components/alert";
import { FormEvent } from "react";
import API_URL from "@/constants/apiRoute";

export function EditAvatarForm({
    user,
    setEditAvatar,
}: Readonly<{ user: User; setEditAvatar: any }>) {
    const [error, setError] = useState<string>("");

    const setErrorWithTimeout = (errorMessage: string) => {
        setError(errorMessage);
        setTimeout(() => {
            setError("");
        }, 2000);
    };

    // Case click on the background, close the edit box
    document.addEventListener("mousedown", (event: any) => {
        if (event.target.id === "background_div") {
            setEditAvatar(false);
        }
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let avatarUrl = (event.target as any)[0].value;

        const doTheAPICall = async () => {
            fetch(`${API_URL}/user/profile/avatar`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ avatar_url: avatarUrl }),
            })
                .then(async (res) => {
                    if (res.ok) {
                        user.avatar = avatarUrl;
                        setEditAvatar(false);
                    } else {
                        const data = await res.json();
                        setErrorWithTimeout(data?.detail);
                    }
                })
                .catch((err: Error) => setErrorWithTimeout(err?.message));
        };
        // If the avatar URL has changed, make the API call
        if (avatarUrl !== user.avatar) {
            doTheAPICall();
        } else {
            setEditAvatar(false);
        }
    };

    return (
        <div
            id="background_div"
            className="transition-all duration-200 bg-[rgba(0,0,0,0.1)] animate-fadeIn top-0 left-0 flex flex-col backdrop-blur-sm z-20 items-center h-screen w-screen justify-center absolute"
        >
            {error && <AlertError msg={error} />}
            <div className="bg-background-light opacity-85 animate-scaleIn backdrop-blur-lg shadow-lg rounded-lg w-1/3 p-5">
                <form id="avatar_form" onSubmit={handleSubmit}>
                    {/* IMAGE URL FIELD */}

                    <input
                        className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                        type="text"
                        name="imageUrl"
                        spellCheck="false"
                        placeholder="https://i.imgur.com/..."
                        id="imageUrl"
                        defaultValue={user?.avatar as string}
                        pattern="https://.*"
                        title="enter a valid image url"
                    />
                    <p className="text-xs text-justify mt-5">
                        Upload a image to <strong>imgur.com</strong> and paste
                        the link here.{" "}
                        <strong>
                            Make sure it is a DIRECT LINK to an image
                        </strong>
                        , otherwise it will not work. Please enter a DIRECT LINK
                        for a <strong>square image</strong>, otherwise it will
                        be <strong>stretched</strong>. Note that this method{" "}
                        <strong>is not the optimal way</strong> to implement
                        image uploading.
                    </p>

                    {/* SAVE BUTTON */}
                    <div className="flex flex-row justify-end mt-8">
                        <button
                            className="w-28 text-text-invert font-medium flex justify-center items-center bg-primary p-1 rounded-lg"
                            form="avatar_form"
                        >
                            <RiUpload2Fill className="mb-[1px]" size={22} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
