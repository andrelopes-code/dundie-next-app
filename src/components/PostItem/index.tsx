import { User } from "@/types/user";
import { Post } from "@/types/post";
import { AiFillLike } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { useEffect, useState } from "react";
import getTimeDeltaString from "@/functions/get-time-delta";
import API_URL from "@/constants/apiRoute";
import Image from "next/image";
import Link from "next/link";
import getById from "@/functions/get-element-by-id";
import { CgShare } from "react-icons/cg";

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
    post: Post,
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
    if (post.liked) {
        post.liked = false;
        unlike();
        const result = await UnlikePost(post.id);
        if (result !== true) {
            like();
        }
    } else {
        post.liked = true;
        like();
        const result = await LikePost(post.id);
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
    setPosts,
}: {
    user: User;
    post: Post;
    setPosts: any;
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
     * @param {number} post The id of the post to delete
     */
    async function handleDeletePost(post: Post) {
        const element = document.getElementById(
            "post" + post.id
        ) as HTMLLIElement;

        const isDeleted = await DeletePost(post.id);

        if (isDeleted) {
            element.classList.add("postRemove");
            setTimeout(() => {
                setPosts((prev: Post[]) =>
                    prev.filter((p: Post) => p.id !== post.id)
                );
            }, 1000);
        }
    }

    function likedOrNot(isLiked: boolean) {
        if (isLiked) {
            return "text-primary";
        }
        return "text-text-inactive";
    }

    return (
        <li
            id={"post" + post.id}
            className={
                "w-full border-background pt-5 flex h-full border-t-2 first:border-none flex-col gap-3 mb-8 " +
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
                    <div className="relative z-50 flex justify-center items-center">
                        <div
                            className={
                                "absolute bg-background shadow-md right-8 -top-2 rounded-lg" +
                                (showPostOptions
                                    ? " animate-SlideRL"
                                    : " hidden")
                            }
                        >
                            {/* POST OPTIONS LIST */}
                            <ul className="flex flex-row items-center justify-center">
                                {/* DELETE BUTTON OPTION */}
                                {(user.username === post.user.username ||
                                    user.dept === "management") && (
                                    <li
                                        onClick={() => {
                                            handleDeletePost(post);
                                            getById(
                                                "postOptions" + post.id
                                            )?.blur();
                                            setShowPostOptions(false);
                                        }}
                                        className="py-1 px-3 text-text-inactive hover:text-red-500 hover:bg-background-100 first:rounded-l-lg last:rounded-r-lg font-normal text-sm transition-all duration-200"
                                    >
                                        <MdDeleteSweep size={22} />
                                    </li>
                                )}
                                {/* SHARE BUTTON OPTION */}
                                <li
                                    onClick={() => {
                                        setShowPostOptions(false);
                                        getById(
                                            "postOptions" + post.id
                                        )?.blur();
                                    }}
                                    className="py-1 px-3 text-text-inactive hover:bg-background-100 first:rounded-l-lg last:rounded-r-lg font-normal text-sm transition-all duration-200"
                                >
                                    <CgShare size={20} />
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
                        id={"postLikeButton" + post.id}
                        onClick={(e) =>
                            LikeButton(
                                e.currentTarget,
                                setPostLikes,
                                post,
                                setLikeButtonLocked
                            )
                        }
                        disabled={likeButtonLocked}
                        className={
                            "transition-all duration-300 cursor-pointer hover:scale-105 fixtransition " +
                            likedOrNot(post.liked)
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
                        <div className="absolute -top-8 right-0 bg-background rounded-lg px-3 py-1 opacity-50 z-50">
                            <p className="text-text font-medium text-center text-nowrap shadow-md text-sm">
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
