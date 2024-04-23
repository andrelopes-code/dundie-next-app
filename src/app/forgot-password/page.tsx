"use client";
import { FormEvent, useState } from "react";
import API_URL from "@/constants/apiRoute";
import { VscLoading } from "react-icons/vsc";
import Link from "next/link";

export function EnterYourEmail({ setStage }: any) {
    const [loading, setLoading] = useState(false);

    const setErrorWithTimeout = (errorMessage: string) => {
        const title = document.getElementById(
            "titleMessageEmail"
        ) as HTMLElement;
        title.innerText = errorMessage;
        title?.classList.add("text-red-500");
        setTimeout(() => {
            title.innerText = "Enter your email and username";
            title?.classList.remove("text-red-500");
        }, 2000);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const email = (event.target as any)[0].value;

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        };

        fetch(`${API_URL}/forgot-password`, config).then(async (res) => {
            if (res.ok) {
                setStage(1);
            } else {
                setLoading(false);
                setErrorWithTimeout("Something went wrong");
            }
        });
    };

    return (
        <main className="bg-background flex flex-col items-center justify-center h-screen">
            <div className="bg-background-light shadow-lg p-8 rounded-lg text-primary flex flex-col gap-4">
                <h1
                    id="titleMessageEmail"
                    className="text-center font-semibold text-xl mb-3"
                >
                    Enter your email address
                </h1>
                <form
                    id="sendEmailForm"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 text-text min-w-80"
                >
                    <input
                        className="transition-all text-sm ease duration-300 border outline-gray-300 border-gray-300 p-2 rounded-md focus:outline-primary-light"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="your email"
                        required
                    />
                    <button
                        form="sendEmailForm"
                        type="submit"
                        className="px-3 py-2 h-9 flex items-center justify-center bg-primary cursor-pointer text-text-invert text-sm rounded-lg"
                    >
                        {loading && (
                            <VscLoading size={20} className="animate-spin" />
                        )}
                        {!loading && "Send email"}
                    </button>
                </form>
            </div>
        </main>
    );
}

export function ResetPassword({ resetPasswordToken, setStage }: any) {
    const [loading, setLoading] = useState(false);

    const setErrorWithTimeout = (errorMessage: string) => {
        const title = document.getElementById("titleMessage") as HTMLElement;
        title.innerText = errorMessage;
        title?.classList.add("text-red-500");
        setTimeout(() => {
            title.innerText = "Enter your new password";
            title?.classList.remove("text-red-500");
        }, 2000);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = (event.target as any)[0].value;
        const password = (event.target as any)[1].value;
        const confirmPassword = (event.target as any)[2].value;

        if (password !== confirmPassword) {
            setErrorWithTimeout("Passwords do not match");
            return;
        }
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                password_confirm: password,
            }),
        };

        setLoading(true);

        fetch(
            `${API_URL}/forgot-password?username=${username}&pwd_reset_token=${resetPasswordToken}`,
            config
        ).then(async (res) => {
            if (res.ok) {
                setStage(2);
            } else {
                setLoading(false);
                const data = await res.json();
                setErrorWithTimeout(data?.detail);
            }
        });
    };

    return (
        <main className="bg-background flex flex-col items-center justify-center h-screen">
            <div className="bg-background-light w-96 shadow-lg p-8 rounded-lg text-primary flex flex-col gap-4">
                <h1
                    id="titleMessage"
                    className="text-center font-semibold text-xl mb-3"
                >
                    Enter your new password
                </h1>
                <form
                    id="resetPasswordForm"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2 text-text"
                >
                    <input
                        className="transition-all text-sm ease duration-300 border outline-gray-300 border-gray-300 p-2 rounded-md focus:outline-primary-light"
                        type="text"
                        name="username"
                        id="username"
                        pattern="[a-z]+"
                        placeholder="current username"
                        required
                    />
                    <input
                        className="transition-all text-sm ease duration-300 border outline-gray-300 border-gray-300 p-2 rounded-md focus:outline-primary-light"
                        type="password"
                        name="password"
                        id="password"
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        placeholder="new password"
                        required
                    />
                    <input
                        className="transition-all text-sm ease duration-300 border outline-gray-300 border-gray-300 p-2 rounded-md focus:outline-primary-light"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        placeholder="confirm new password"
                        required
                    />
                    <button
                        form="resetPasswordForm"
                        type="submit"
                        className="px-3 py-2 h-9 flex items-center justify-center bg-primary cursor-pointer text-text-invert text-sm rounded-lg"
                    >
                        {loading && (
                            <VscLoading size={20} className="animate-spin" />
                        )}
                        {!loading && "submit"}
                    </button>
                </form>
            </div>
        </main>
    );
}

export function EmailSent() {
    return (
        <main className="bg-background flex flex-col items-center justify-center h-screen">
            <div className="bg-background-light shadow-lg p-8 rounded-lg text-text flex flex-col gap-4">
                <h1 className="text-center font-semibold text-xl mb-3">
                    If we found your account, we&apos;ll send you an email.
                </h1>
                <p>
                    click the link in the email to reset your password. Check
                    your spam folder if you can&apos;t find it.
                </p>
            </div>
        </main>
    );
}

export function SuccessfullChanged() {
    return (
        <main className="bg-background flex flex-col items-center justify-center h-screen">
            <div className="bg-background-light shadow-lg p-8 rounded-lg text-text flex flex-col gap-4">
                <h1 className="text-center font-semibold text-xl mb-3">
                    Password changed successfully!
                </h1>
                <Link
                    className="transition-all duration-300 ease-in-out text-center px-3 py-1 rounded-lg hover:text-primary hover:bg-background"
                    href={"/login"}
                >
                    Click here to login
                </Link>
            </div>
        </main>
    );
}

export default function ForgotPassword(req: any) {
    // * The stage of the donation process:
    // * 0 = EnterYourEmail
    // * 1 = EmailSent
    // * 2 = ResetPassword
    const [stage, setStage] = useState(0);

    const resetPasswordToken = req.searchParams?.rt;

    if (stage === 2) {
        return <SuccessfullChanged />;
    }

    if (resetPasswordToken) {
        return (
            <ResetPassword
                setStage={setStage}
                resetPasswordToken={resetPasswordToken}
            />
        );
    } else {
        if (stage === 0) {
            return <EnterYourEmail setStage={setStage} />;
        }
        if (stage === 1) {
            return <EmailSent />;
        }
        if (stage === 2) {
            return <SuccessfullChanged />;
        }
    }
}
