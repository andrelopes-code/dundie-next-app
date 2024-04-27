import CreatePost from "../CreatePost";
import { useState, useEffect, useRef } from "react";
import { User } from "@/types/user";
import API_URL from "@/constants/apiRoute";
import PostItem from "../PostItem";
import Loading from "../Loading";
import { Post } from "@/types/post";

/**
 * The MainSection component. Renders the main section of the page,
 * including the create post form and the list of posts.
 */
export default function MainSection() {
    const isFirstRender = useRef(true);
    const [user, setUser] = useState<User>();
    const [posts, setPosts] = useState<Post[]>([]);
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
            await fetch(`${API_URL}/post`)
                .then(async (res) => {
                    if (res.ok) {
                        const data = await res.json();
                        setPosts(data);
                    }
                })
                .catch((error) => {
                    console.error(
                        "An error occurred while fetching posts:",
                        error
                    );
                });
        };
        isFirstRender.current && getProfile();
        isFirstRender.current && getPosts();
        isFirstRender.current = false;
    }, []);

    return (
        <section className="flex w-full bg-background-light justify-start flex-col">
            {!user && (
                <div className="w-full h-[90vh] flex justify-center items-center">
                    <Loading />
                </div>
            )}
            {user && (
                <main className="flex flex-col">
                    {/* POST FORM */}
                    <CreatePost user={user} posts={posts} setPosts={setPosts} />
                    {/* POSTS */}
                    <ul
                        id="postsList"
                        className="flex flex-col gap-10 mx-10 items-center transition-all duration-300"
                    >
                        {posts.length === 0 ? (
                            <h1 className="text-text-inactive my-40">
                                No posts yet.
                            </h1>
                        ) : (
                            posts.map((post) => (
                                <PostItem
                                    key={post.id}
                                    user={user}
                                    post={post}
                                    setPosts={setPosts}
                                />
                            ))
                        )}
                    </ul>
                </main>
            )}
        </section>
    );
}
