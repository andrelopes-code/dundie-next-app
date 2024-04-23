"use client";
import { FormEvent, useState, useEffect } from "react";
import API_URL from "@/constants/apiRoute";
import { VscLoading } from "react-icons/vsc";

/**
 * Renders a login form component.
 *
 * This component displays a login form with username and password input fields.
 * When the form is submitted, it sends a POST request to the API_URL/login endpoint
 * with the entered username and password. If the response is successful, it redirects
 * the user to the home page. Otherwise, it displays an alert message indicating invalid credentials.
 *
 * @returns {JSX.Element} The login form component.
 */
export default function Login() {
    const [msg, setMsg] = useState("Sign in to your account");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const uname = (event.target as any)[0].value;
        const pass = (event.target as any)[1].value;
        setLoading(true);
        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: uname,
                password: pass,
            }),
        })
            .then((res) => {
                if (res?.ok) {
                    window.location.href = "/";
                } else {
                    setLoading(false);
                    setAlert();
                }
            })
            .catch((err) => console.log(err));
    };

    const setAlert = () => {
        setMsg("Invalid credentials!");
        const btn = document.getElementById("btn");
        //@ts-ignore
        btn.disabled = true;

        setTimeout(() => {
            setMsg("Sign in to your account");
            //@ts-ignore
            btn.disabled = false;
        }, 2000);
    };

    return (
        <div className="h-screen bg-background">
            <div className="flex justify-center items-center h-screen">
                <div className="w-1/3 p-4 bg-background-light shadow-lg rounded-md min-w-80 max-w-96 flex flex-col flex-nowrap justify-center">
                    <h1 className="font-bold text-2xl mb-6 text-center bg-gradient-to-r from-gray-400 to-indigo-500 bg-clip-text text-transparent">
                        {msg}
                    </h1>
                    <form
                        id="loginForm"
                        className="flex flex-col gap-3 mb-5 justify-center"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="transition-all ease duration-300 border outline-gray-300 border-gray-300 p-2 rounded-md focus:outline-primary-light"
                            type="text"
                            placeholder="username"
                            name="username"
                            id="username"
                            autoComplete="off"
                            required
                        />
                        <input
                            className="transition-all ease duration-300 border outline-gray-300 border-gray-300 p-2 rounded-md focus:outline-primary-light"
                            type="password"
                            placeholder="password"
                            name="password"
                            id="password"
                            required
                        />
                        <a
                            className="font-medium text-xs ml-1 text-secondary-dark mb-4"
                            href="/forgot-password"
                        >
                            Forgot Password?
                        </a>
                        <button
                            form="loginForm"
                            type="submit"
                            id="btn"
                            className="transition font-semibold flex justify-center h-10 items-center ease duration-300 border border-gray-300 text-text-invert p-2 rounded-md bg-primary hover:bg-primary-dark cursor-pointer"
                        >
                            {loading && (
                                <VscLoading
                                    size={20}
                                    className="animate-spin"
                                />
                            )}
                            {!loading && "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
