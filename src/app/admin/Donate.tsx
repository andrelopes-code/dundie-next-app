"use client";

import { useEffect, useRef } from "react";
import API_URL from "@/constants/apiRoute";
import RequestAdminPassword from "@/components/requestAdminPassword";
import {
    setSuccessWithTimeout,
    setErrorWithTimeout,
} from "@/functions/set-error-and-success";
import { useState } from "react";

export function AdminDonate({
    setError,
    setSuccess,
}: {
    setError: (errorMessage: string) => void;
    setSuccess: (successMessage: string) => void;
}) {
    const [adminPassword, setAdminPassword] = useState("");
    const [passwordModal, setPasswordModal] = useState(false);
    const donateForm = useRef<HTMLFormElement>(null);

    const handleSubmit = async (form: HTMLFormElement) => {
        // Get form data
        const target = form.target_username.value;
        const amount = form.donation_amount.value;
        const usePointDeliveryMan = true;

        const data = {
            target,
            amount,
            usepdm: usePointDeliveryMan,
        };

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Admin-Password": adminPassword,
            },
            body: JSON.stringify(data),
        };

        // Make the donation API call
        fetch(API_URL + "/donate", config)
            .then(async (res) => {
                if (res.ok) {
                    setSuccessWithTimeout(
                        `Transfered ${amount} points to ${target}!`,
                        setSuccess
                    );
                } else {
                    const data = await res.json();
                    setErrorWithTimeout(
                        data?.detail || "Something went wrong",
                        setError
                    );
                }
            })
            .catch((err: Error) => setErrorWithTimeout(err?.message, setError));

        // Reset the form and clear the admin password
        setAdminPassword("");
        form.reset();
    };

    useEffect(() => {
        const canSubmitForm = adminPassword && donateForm.current;
        if (canSubmitForm) {
            handleSubmit(donateForm.current);
        }
    }, [adminPassword]);

    return (
        <>
            {/* Request password modal */}
            {passwordModal && (
                <RequestAdminPassword
                    setAdminPassword={setAdminPassword}
                    setPasswordModal={setPasswordModal}
                />
            )}
            {/* Donation form */}
            <form
                ref={donateForm}
                onSubmit={(e) => {
                    e.preventDefault();
                    setPasswordModal(true);
                }}
            >
                <h1 className="text-text font-medium text-lg pb-2">
                    Give Points
                </h1>
                <section className="flex flex-col text-sm gap-2">
                    <div className="flex w-full flex-row justify-between">
                        {/* TARGET USERNAME */}
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
                {/* SEND BUTTON */}
                <div className="flex flex-row justify-end mt-5">
                    <button className="w-28 text-text-invert font-medium bg-primary p-1 rounded-lg">
                        Send
                    </button>
                </div>
            </form>
        </>
    );
}
