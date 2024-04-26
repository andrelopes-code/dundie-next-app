import { User } from "@/types/user";
import { Post } from "@/types/post";
import { AiFillLike } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { useEffect, useState, useRef } from "react";
import getTimeDeltaString from "@/functions/get-time-delta";
import API_URL from "@/constants/apiRoute";
import Image from "next/image";
import Link from "next/link";
import getById from "@/functions/get-element-by-id";

/**
 * Function that handles the hover effect on the post date
 * @param {string} postId The id of the post
 * @param {string} stage The stage of the hover effect. Can be "IN" or "OUT"
 */
function handleMouseOverDate(postId: string, stage: "IN" | "OUT") {
    const elem = document.getElementById("postDate" + postId) as HTMLElement;
    if (stage === "IN") {
        elem.classList.remove("hidden");
        elem.classList.add("animate-scaleIn");
    } else {
        elem.classList.add("hidden");
    }
}

/**
 * Function that likes a post. Returns true if the like was successful,
 * false otherwise.
 * @param {number} postId The id of the post to like
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating
 * if the like was successful
 */
async function LikePost(postId: number): Promise<boolean> {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let result = false;

    await fetch(`${API_URL}/post/like?postId=${postId}`, config).then(
        async (res) => {
            if (res.ok) {
                result = true;
            } else {
                result = false;
            }
        }
    );

    return result;
}

/**
 * Function that unlikes a post. Returns true if the unlike was successful,
 * false otherwise.
 * @param {number} postId The id of the post to unlike
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating
 * if the unlike was successful
 */
async function UnlikePost(postId: number): Promise<boolean> {
    const config = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let result = false;

    await fetch(`${API_URL}/post/like?postId=${postId}`, config).then(
        async (res) => {
            if (res.ok) {
                result = true;
            } else {
                result = false;
            }
        }
    );

    return result;
}

/**
 * Function that handles the like button logic.
 * @param {HTMLButtonElement} e The button element of the like button
 * @param {any} setPostLikes The function to update the post likes state
 * @param {number} postId The id of the post that was liked
 * @param {any} setLikeButtonLocked The function to update the like button locked state
 */
async function LikeButton(
    e: HTMLButtonElement,
    setPostLikes: any,
    postId: number,
    setLikeButtonLocked: any
) {
    /**
     * Function that likes a post
     */
    function like() {
        setPostLikes((prev: any) => prev + 1);
        e.classList.remove("text-text-inactive");
        e.classList.add("text-primary");
    }
    /**
     * Function that unlikes a post
     */
    function unlike() {
        setPostLikes((prev: any) => prev - 1);
        e.classList.remove("text-primary");
        e.classList.add("text-text-inactive");
    }

    setLikeButtonLocked(true);

    // Check if the user has liked the post
    // If the user has liked the post, unlike it
    if (e.classList.contains("text-primary")) {
        unlike();
        const result = await UnlikePost(postId);
        if (result !== true) {
            like();
        }
    } else {
        like();
        const result = await LikePost(postId);
        if (result !== true) {
            unlike();
        }
    }

    setLikeButtonLocked(false);
}

/**
 * Function that deletes a post. Returns true if the deletion was successful,
 * false otherwise.
 * @param {number} postId The id of the post to delete
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating
 * if the deletion was successful
 */
async function DeletePost(postId: number): Promise<boolean> {
    const config = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };

    let result = false;

    await fetch(`${API_URL}/post?postId=${postId}`, config)
        .then(async (res) => {
            if (res.ok) {
                result = true;
            }
        })
        .catch((error) => {
            console.error("An error occurred while deleting the post:", error);
        });

    return result;
}

/**
 * The PostItem component. Displays a single post.
 * @param {{user: User, post: Post, className?: string}} props The props
 * of the component
 */
export default function PostItem({
    user,
    post,
    className,
}: {
    user: User;
    post: Post;
    className?: string;
}) {
    const [postDate, setPostDate] = useState<string>("");
    const [rawDate, setRawDate] = useState<string>("");
    const [postLikes, setPostLikes] = useState<number>(post.likes);
    const [likeButtonLocked, setLikeButtonLocked] = useState<boolean>(false);
    const [showPostOptions, setShowPostOptions] = useState<boolean>(false);

    // Get the date of the post and format it
    useEffect(() => {
        // Get the current time and the time of the post
        const timeNow = new Date();
        const postTime = new Date(post?.date);
        // Get the difference between the current time and the post time
        const delta = timeNow.getTime() - postTime.getTime();
        const formattedTime = getTimeDeltaString(delta);
        // Set the date of the post and the raw date
        setRawDate(postTime.toDateString());
        setPostDate(formattedTime);
    }, [post?.date, user]);

    /**
     * Function that handles the deletion of a post
     * @param {number} postId The id of the post to delete
     */
    async function handleDeletePost(postId: number) {
        const element = document.getElementById(
            "post" + postId
        ) as HTMLLIElement;

        const isDeleted = await DeletePost(postId);

        if (isDeleted) {
            element.classList.add("postRemove");
            setTimeout(() => {
                element.remove();
            }, 1000);
        }
    }

    return (
        <li
            id={"post" + post.id}
            className={
                className +
                " w-full border-background pt-5 flex h-full first:border-none flex-col gap-3 mb-8 " +
                (post?.new ? "postAdd" : "")
            }
        >
            <header className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Link href={`/user/${post.user.username}`}>
                            <Image
                                src={
                                    post.user.avatar || "/images/no_avatar.jpg"
                                }
                                width={72}
                                height={72}
                                alt="post avatar"
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col items-start justify-center -space-y-1">
                        <p className="text-text font-semibold">
                            {post.user.name || ""}
                        </p>
                        <p className="text-text-inactive text-[0.65rem]">
                            @{post.user.username || ""}
                        </p>
                    </div>
                </div>
                <button
                    id={"postOptions" + post.id}
                    onFocus={() => setShowPostOptions(true)}
                    onBlur={() => setShowPostOptions(false)}
                    className="text-text-inactive transition-all duration-300 focus:text-primary"
                >
                    <div className="relative z-50">
                        <div
                            className={
                                "absolute bg-background shadow-md right-8 -top-4 rounded-lg" +
                                (showPostOptions
                                    ? " animate-scaleIn"
                                    : " hidden")
                            }
                        >
                            <ul className="flex flex-col first:rounded-t-lg last:rounded-b-lg">
                                {user.username === post.user.username && (
                                    <li
                                        onClick={() => {
                                            handleDeletePost(post.id);
                                            getById(
                                                "postOptions" + post.id
                                            )?.blur();
                                            setShowPostOptions(false);
                                        }}
                                        className="py-1 px-6 text-text-inactive hover:text-red-500 hover:bg-background-100 first:rounded-t-lg last:rounded-b-lg font-normal text-sm transition-all duration-200"
                                    >
                                        Delete
                                    </li>
                                )}
                                <li
                                    onClick={() => {
                                        setShowPostOptions(false);
                                        getById(
                                            "postOptions" + post.id
                                        )?.blur();
                                    }}
                                    className="py-1 px-6 text-text-inactive hover:bg-background-100 first:rounded-t-lg last:rounded-b-lg font-normal text-sm transition-all duration-200"
                                >
                                    Share
                                </li>
                            </ul>
                        </div>
                    </div>
                    <SlOptions
                        className={showPostOptions ? "optionsIn" : "optionsOut"}
                        size={18}
                    />
                </button>
            </header>
            <p className="p-text text-pretty my-3 overflow-x-hidden">
                {post.content}
            </p>
            <div className="flex flex-row items-center justify-between text-sm">
                <div className="flex flex-row items-center gap-3">
                    <button
                        onClick={(e) =>
                            LikeButton(
                                e.currentTarget,
                                setPostLikes,
                                post.id,
                                setLikeButtonLocked
                            )
                        }
                        disabled={likeButtonLocked}
                        className={
                            "transition-all duration-300 cursor-pointer hover:scale-105 fixtransition" +
                            (post?.liked
                                ? " text-primary"
                                : " text-text-inactive ")
                        }
                    >
                        <AiFillLike size={18} />
                    </button>
                    <p className="text-text-inactive pt-1">{postLikes} likes</p>
                </div>
                <div
                    className="cursor-pointer"
                    onMouseOver={() =>
                        // Show the date of the post when the mouse is over it
                        handleMouseOverDate(post.id.toString(), "IN")
                    }
                    onMouseLeave={() =>
                        // Hide the date of the post when the mouse is not over it
                        handleMouseOverDate(post.id.toString(), "OUT")
                    }
                >
                    <div
                        className="relative hidden origin-bottom"
                        id={"postDate" + post.id.toString()}
                    >
                        <div className="absolute -top-10 right-0 bg-background rounded-lg px-3 py-1 shadow-lg opacity-50 z-50">
                            <p className="text-text font-medium text-center text-nowrap">
                                {rawDate}
                            </p>
                        </div>
                    </div>
                    <p className="text-text-inactive pt-1">{postDate}</p>
                </div>
            </div>
        </li>
    );
}
