"use client";
import { FormEvent } from "react";

export default function Login() {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const uname = (event.target as any)[0].value;
        const pass = (event.target as any)[1].value;

        fetch("http://localhost:3000/api/login", {
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
                if (res.status === 200) {
                    window.location.assign("/");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container text-black">
            <form
                onSubmit={handleSubmit}
                className="bg-blue text-center w-1/3 px-3 py-4 text-white mx-auto rounded"
            >
                <input
                    type="text"
                    placeholder="Username"
                    id="Username"
                    className="block text-black w-full mx-auto text-sm py-2 px-3 rounded"
                />
                <input
                    type="text"
                    placeholder="Password"
                    id="Password"
                    className="block text-black w-full mx-auto text-sm py-2 px-3 rounded my-3"
                />
                <button
                    type="submit"
                    className="bg-blue text-white font-bold py-2 px-4 rounded border block mx-auto w-full"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
