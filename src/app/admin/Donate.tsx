"use client";

import { FormEvent } from "react";
import API_URL from "@/constants/apiRoute";

/**
 * Create User form component.
 */
export function AdminDonate({
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
        const target = (event.target as any)[0].value;
        const amount = (event.target as any)[1].value;
        const usepdm = true;

        const data = {
            target,
            amount,
            usepdm,
        };

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        // Make the donation API call
        fetch(API_URL + "/donate", config)
            .then(async (res) => {
                if (res.ok) {
                    setSuccessWithTimeout(
                        `Transfered ${amount} points to ${target}!`
                    );
                } else {
                    const data = await res.json();
                    setErrorWithTimeout(data?.detail || "Something went wrong");
                }
            })
            .catch((err: Error) => setErrorWithTimeout(err?.message));

        // Reset the form
        (event.target as HTMLFormElement).reset();
    };

    return (
        <>
            <form id="donate_user_form" onSubmit={handleSubmit}>
                <h1 className="text-text font-medium text-lg pb-2">
                    Give Points
                </h1>
                <section className="flex flex-col text-sm gap-2">
                    <div className="flex w-full flex-row justify-between">
                        {/* TARGET USERNAMEs */}
                        <div className="w-full">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="text"
                                name="target_username"
                                spellCheck="false"
                                placeholder="username"
                                id="target_username"
                                pattern="[a-z]+"
                                minLength={3}
                                maxLength={50}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex w-full flex-row justify-between">
                        {/* AMOUNT */}
                        <div className="w-full">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="number"
                                name="donation_amount"
                                spellCheck="false"
                                placeholder="amount"
                                id="donation_amount"
                                required
                            />
                        </div>
                    </div>
                </section>
                {/* CREATE BUTTON */}
                <div className="flex flex-row justify-end mt-5">
                    <button
                        className="w-28 text-text-invert font-medium bg-primary p-1 rounded-lg"
                        form="donate_user_form"
                    >
                        Send
                    </button>
                </div>
            </form>
        </>
    );
}
