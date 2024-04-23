"use client";

import { FormEvent } from "react";
import API_URL from "@/constants/apiRoute";

/**
 * Create User form component.
 */
export function EditUser({
    setError,
    setSuccess,
}: {
    /**
     * Function to show error message.
     */
    setError: (errorMessage: string) => void;
    /**
     * Function to show success message.
     */
    setSuccess: (successMessage: string) => void;
}) {
    /**
     * Function to show error message with timeout.
     */
    const setErrorWithTimeout = (errorMessage: string) => {
        setError(errorMessage);
        setTimeout(() => {
            setError("");
        }, 2000);
    };

    /**
     * Function to show success message with timeout.
     */
    const setSuccessWithTimeout = (successMessage: string) => {
        setSuccess(successMessage);
        setTimeout(() => {
            setSuccess("");
        }, 2000);
    };

    /**
     * Handles the form submit event.
     * @param event Form event
     */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // Prevent the form from submitting
        event.preventDefault();

        // Get form data
        const name = (event.target as any)[0].value;
        const username = (event.target as any)[1].value;
        const email = (event.target as any)[2].value;
        const dept = (event.target as any)[3].value;
        const password = (event.target as any)[4].value;
        const confirmPassword = (event.target as any)[5].value;

        const data = {
            name,
            username,
            email,
            dept,
            password,
        };

        // Check if the passwords match
        if (password !== confirmPassword) {
            setErrorWithTimeout("Passwords do not match");
            return;
        }

        // Make the API call to create the user
        fetch(`${API_URL}/admin/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async (res) => {
                if (res.ok) {
                    setSuccessWithTimeout("User created successfully");
                } else {
                    const data = await res.json();
                    setErrorWithTimeout(data?.detail);
                }
            })
            .catch((err: Error) => setErrorWithTimeout(err?.message));

        // Reset the form
        (event.target as HTMLFormElement).reset();
    };

    return (
        <>
            <form id="create_user_form" onSubmit={handleSubmit}>
                <h1 className="text-text font-medium text-xl pb-6">
                    Edit User
                </h1>
                <section className="flex flex-col gap-5">
                    <div className="flex w-full flex-row justify-between">
                        <div className="w-[48%]">
                            {/* NAME */}
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="text"
                                name="create_name"
                                spellCheck="false"
                                placeholder="name"
                                id="create_name"
                                pattern="[a-zA-Z ]+"
                                minLength={8}
                                maxLength={50}
                                required
                            />
                        </div>
                        {/* USERNAME */}
                        <div className="w-[48%]">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="text"
                                name="create_username"
                                spellCheck="false"
                                placeholder="username"
                                id="create_username"
                                pattern="[a-z]+"
                                minLength={3}
                                maxLength={50}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex w-full flex-row justify-between">
                        {/* EMAIL */}
                        <div className="w-[48%]">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="email"
                                name="create_email"
                                spellCheck="false"
                                placeholder="email"
                                id="create_email"
                                required
                            />
                        </div>
                        {/* DEPARTMENT */}
                        <div className="w-[48%]">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="text"
                                name="create_dept"
                                spellCheck="false"
                                placeholder="department"
                                id="create_dept"
                                pattern="[a-z]+"
                                minLength={3}
                                maxLength={50}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-row justify-between">
                        {" "}
                        <div className="w-[100%]">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="text"
                                name="create_dept"
                                spellCheck="false"
                                placeholder="avatar"
                                id="create_dept"
                                pattern="[a-z]+"
                                minLength={3}
                                maxLength={50}
                                required
                            />
                        </div>
                    </div>
                </section>
                {/* CREATE BUTTON */}
                <div className="flex flex-row justify-end mt-8">
                    <button
                        className="w-28 text-text-invert font-medium bg-primary p-1 rounded-lg"
                        form="create_user_form"
                    >
                        Create
                    </button>
                </div>
            </form>
        </>
    );
}
