/**
 * The CreatePost component renders a form for creating a new post.
 *
 * @prop {User} user - An object containing the user's data. (Readonly)
 * @prop {Post[]} posts - An array of all the posts.
 * @prop {Function} setPosts - A function to update the posts array state.
 *
 * @state {number} countTextareaChars - The number of characters in the textarea.
 * @state {boolean} loading - Shows a loading indicator while making the API call.
 *
 * @function CountChars - A function that counts the number of characters in a textarea
 * and updates the countTextareaChars state.
 * @function handleSubmit - A function that handles form submission and makes an API
 * call to create the new post.
 *
 * @return {JSX.Element} Renders the create post form.
 */
import { User } from "@/types/user";
import { useState } from "react";
import React from "react";
import { Post } from "@/types/post";
import API_URL from "@/constants/apiRoute";
import Loading from "../Loading";
import Image from "next/image";

function CountChars(target: HTMLTextAreaElement, setCountTextareaChars: any) {
    /**
     * Counts the number of characters in a textarea and updates the
     * countTextareaChars state.
     *
     * @param {HTMLTextAreaElement} target - The textarea element.
     * @param {Function} setCountTextareaChars - A function to update the countTextareaChars state.
     */
    const count = target.value.length;
    const text = document.getElementById("countChars") as HTMLElement;
    if (count === 1000) {
        text.classList.remove("text-text-inactive");
        text.classList.add("text-red-500");
    } else {
        text.classList.remove("text-red-500");
        text.classList.add("text-text-inactive");
    }
    setCountTextareaChars(count);
}

export default function CreatePost({
    user,
    posts,
    setPosts,
}: {
    user: User;
    posts: Post[];
    setPosts: any;
}) {
    const [countTextareaChars, setCountTextareaChars] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: any) => {
        /**
         * Handles form submission and makes an API call to create the new post.
         *
         * @param {FormEvent} e - The form event.
         */
        e.preventDefault();
        setLoading(true);

        const content = e.target[1].value;

        const reqData = {
            content: content,
        };

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqData),
        };
        // Make the post API call
        async function createPostApiCall() {
            await fetch(`${API_URL}/post`, config)
                .then(async (res) => {
                    if (res.ok) {
                        const data = await res.json();
                        // Add the new post to the posts array
                        data.new = true;
                        setPosts([data, ...posts]);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.error(
                        "An error occurred while creating the post:",
                        error
                    );
                    setLoading(false);
                });
        }
        createPostApiCall();
        // Add the new post to the posts array

        // Reset the form
        e.target.reset();
    };

    return (
        <div className="p-5">
            <div className="text-text p-5 bg-background-light rounded-lg w-full">
                <form id="postForm" onSubmit={handleSubmit}>
                    <header className="flex flex-row justify-between items-center mb-5">
                        <div className="flex flex-row items-center gap-3">
                            <div className="w-10 overflow-hidden rounded-full">
                                <Image
                                    src={
                                        user?.avatar || "/images/no_avatar.jpg"
                                    }
                                    width={72}
                                    height={72}
                                    alt="testImage"
                                    className="w-10"
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center -space-y-1">
                                <p className="text-text font-semibold">
                                    {user?.name || ""}
                                </p>
                                <p className="text-text-inactive text-[0.65rem]">
                                    @{user?.username || ""}
                                </p>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-text-invert transition-all duration-500 ease font-medium px-3 py-1 w-16 h-8 flex justify-center items-center rounded-lg hover:shadow-[#9495ee99] hover:shadow-[0_0_22px_-1px] bg-primary"
                        >
                            {loading ? (
                                <div className="scale-50">
                                    <Loading color="white" />
                                </div>
                            ) : (
                                <p className="text-sm">Post</p>
                            )}
                        </button>
                    </header>

                    <textarea
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                        }}
                        name="postContent"
                        id="postContent"
                        cols={30}
                        rows={5}
                        className="w-full h-full rounded-lg noscrollbar resize-none bg-background-light text-text transition-all p-3 outline-none"
                        placeholder="What's on your mind?"
                        required
                        maxLength={1000}
                        onChange={(e) => {
                            CountChars(e.target, setCountTextareaChars);
                        }}
                        spellCheck="false"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                    ></textarea>
                </form>
                <div className="flex flex-row items-center">
                    <hr className="border-[1.5px] w-[85%] rounded-full border-background" />
                    <p
                        id="countChars"
                        className=" font-semibold text-center text-text-inactive text-sm w-[10%]"
                    >
                        {countTextareaChars} / 1000
                    </p>
                    <hr className="border-[1.5px] w-[5%] rounded-full border-background" />
                </div>
            </div>
        </div>
    );
}
