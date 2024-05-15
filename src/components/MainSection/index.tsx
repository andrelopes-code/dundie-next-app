import CreatePost from "../CreatePost";
import { useState, useEffect, useRef } from "react";
import { User } from "@/types/user";
import API_URL from "@/constants/apiRoute";
import PostItem from "../PostItem";
import Loading from "../Loading";
import { Post, PostPage } from "@/types/post";
import getById from "@/functions/get-element-by-id";

/**
 * The MainSection component. Renders the main section of the page,
 * including the create post form and the list of posts.
 */

let sort = "date_desc";
let currentPage = 1;
let totalPages = 0;

export default function MainSection() {
    const [user, setUser] = useState<User>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    let isFirstRender = true;
    let isFetchingNewPosts = false;

    // Function to get the specific posts page
    const getPostsPage = async (page: number): Promise<PostPage | null> => {
        // Make an API call to get the posts page
        try {
            const res = await fetch(
                `${API_URL}/post?page=${page}&sort=${sort}`
            );
            if (res.ok) {
                const data = await res.json();

                // Set the current page as the page returned
                currentPage = data.page;
                sort = data.sort;

                return data;
            }
        } catch (error) {
            console.error("Error while getting posts:", error);
        }
        return null;
    };

    // UseEffect to fetch the user's profile and posts when the component mounts
    useEffect(() => {
        const getProfile = async () => {
            // Make an API call to get the user's profile
            await fetch(`${API_URL}/user/profile`)
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

        const getPosts = async () => {
            // Make an API call to get the posts
            const data = await getPostsPage(1);
            if (data) {
                totalPages = data.pages;
                setPosts(data?.items || []);
            }
        };
        isFirstRender && getProfile();
        isFirstRender && getPosts();
        isFirstRender = false;
    }, []);

    // Function to handle scroll event and fetch new posts
    const handleScroll = async (e: HTMLDivElement) => {
        if (isFetchingNewPosts) return; // Returns if there is a request in progress
        if (currentPage >= totalPages) return;

        const fullSize = e.scrollHeight;
        const scrollPercentage = (e.scrollTop + e.clientHeight) / fullSize;

        if (scrollPercentage > 0.98) {
            isFetchingNewPosts = true;
            setLoading(true);
            try {
                // Make an API call to get the next page
                const data = await getPostsPage(currentPage + 1);
                // Add the new posts to the existing ones
                if (data) {
                    setPosts((prev) => [...prev, ...(data?.items || [])]);
                    totalPages = data.pages;
                }
            } catch (error) {
                console.error("Erro ao fazer a requisição:", error);
            } finally {
                isFetchingNewPosts = false;
                setLoading(false);
            }
        }
    };

    // Add event listener to the main section scroll event
    useEffect(() => {
        const elem = getById("mainSectionWrapper");
        if (!elem) return;

        elem.addEventListener("scroll", (e) =>
            handleScroll(e.target as HTMLDivElement)
        );

        return () => {
            elem.removeEventListener("scroll", (e) =>
                handleScroll(e.target as HTMLDivElement)
            );
        };
    }, []);

    // Function to handle the sort select change
    const handleSortSelect = async (value: string) => {
        if (value === sort) return;
        sort = value;
        const data = await getPostsPage(1);
        if (data) {
            setPosts([]);
            setPosts(data?.items);
            currentPage = 1;
            totalPages = data.pages;
        }
    };

    return (
        <section
            id="mainSection"
            className="flex w-full h-full bg-background-light justify-start flex-col"
        >
            {/* LOADING */}
            {!user && (
                <div className="w-full h-full flex justify-center items-center">
                    <Loading />
                </div>
            )}
            {user && (
                <main className="flex flex-col w-full">
                    {/* POST FORM */}
                    <CreatePost user={user} posts={posts} setPosts={setPosts} />
                    {/* POSTS */}
                    <div className="w-full text-text flex justify-end pr-10 mb-10">
                        <div className="px-1 bg-background rounded-lg">
                            <select
                                className="w-32 bg-background focus:outline-none"
                                onClick={(e) =>
                                    handleSortSelect(
                                        (e.target as HTMLSelectElement)
                                            .selectedOptions[0].value
                                    )
                                }
                            >
                                <option
                                    className="bg-background"
                                    value="date_desc"
                                >
                                    Newest
                                </option>
                                <option
                                    className="bg-background"
                                    value="date_asc"
                                >
                                    Oldest
                                </option>
                                <option
                                    className="bg-background"
                                    value="like_desc"
                                >
                                    most liked
                                </option>
                                <option
                                    className="bg-background"
                                    value="like_asc"
                                >
                                    least liked
                                </option>
                            </select>
                        </div>
                    </div>
                    <ul
                        id="postsList"
                        className="mx-10 h-56 items-center transition-all duration-300"
                    >
                        {posts.length === 0 ? (
                            <h1 className="text-text-inactive my-40">
                                No posts yet.
                            </h1>
                        ) : (
                            posts.map((post, index) => (
                                <PostItem
                                    key={post.id}
                                    user={user}
                                    post={post}
                                    setPosts={setPosts}
                                    index={index}
                                />
                            ))
                        )}
                        {loading && <Loading />}
                    </ul>
                </main>
            )}
        </section>
    );
}
