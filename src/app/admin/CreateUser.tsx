"use client";

import API_URL from "@/constants/apiRoute";
import {
    setErrorWithTimeout,
    setSuccessWithTimeout,
} from "@/functions/set-error-and-success";
import { useRef, useState, useEffect } from "react";
import RequestAdminPassword from "@/components/requestAdminPassword";

export function CreateUser({
    setError,
    setSuccess,
}: {
    setError: (errorMessage: string) => void;
    setSuccess: (successMessage: string) => void;
}) {
    const [adminPassword, setAdminPassword] = useState("");
    const [passwordModal, setPasswordModal] = useState(false);
    const createUserForm = useRef<HTMLFormElement>(null);

    const handleSubmit = async (form: HTMLFormElement) => {
        // Get form data
        const name = form.create_name.value;
        const username = form.create_username.value;
        const email = form.create_email.value;
        const dept = form.create_department.value;
        const password = form.create_pass.value;
        const confirmPassword = form.create_confirm_pass.value;

        const data = {
            name,
            username,
            email,
            dept,
            password,
        };

        const passwordMatch = password === confirmPassword;
        if (!passwordMatch) {
            setErrorWithTimeout("Passwords do not match", setError);
            return;
        }

        // Make the API call to create the user
        fetch(`${API_URL}/admin/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Admin-Password": adminPassword,
            },
            body: JSON.stringify(data),
        })
            .then(async (res) => {
                if (res.ok) {
                    setSuccessWithTimeout(
                        "User created successfully",
                        setSuccess
                    );
                    form.reset();
                } else {
                    const data = await res.json();
                    setErrorWithTimeout(data?.detail, setError);
                }
            })
            .catch((err: Error) => setErrorWithTimeout(err?.message, setError));

        setAdminPassword("");
    };

    useEffect(() => {
        const canSubmitForm = adminPassword && createUserForm.current;
        if (canSubmitForm) {
            handleSubmit(createUserForm.current);
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
            {/* Create User form */}
            <form
                ref={createUserForm}
                onSubmit={(e) => {
                    e.preventDefault();
                    setPasswordModal(true);
                }}
            >
                <h1 className="text-text font-medium text-lg pb-2">
                    Create User
                </h1>
                <section className="flex flex-col text-sm gap-2">
                    <div className="flex w-full flex-row justify-between">
                        <div className="w-[49%]">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="text"
                                name="create_name"
                                spellCheck="false"
                                placeholder="name"
                                id="create_name"
                                pattern="[a-zA-Zà-úÀ-ÚçÇ ]+"
                                minLength={8}
                                maxLength={50}
                                required
                            />
                        </div>
                        <div className="w-[49%]">
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
                        <div className="w-[49%]">
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
                        <div className="w-[49%]">
                            <select
                                id="create_department"
                                name="create_department"
                                defaultValue={""}
                                className="w-full appearance-none bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                required
                            >
                                <option value="" disabled hidden>
                                    department
                                </option>
                                <option
                                    className="bg-background"
                                    value="finance"
                                >
                                    finance
                                </option>
                                <option
                                    className="bg-background"
                                    value="humanresources"
                                >
                                    humanresources
                                </option>
                                <option className="bg-background" value="it">
                                    it
                                </option>
                                <option
                                    className="bg-background"
                                    value="logistics"
                                >
                                    logistics
                                </option>
                                <option
                                    className="bg-background"
                                    value="management"
                                >
                                    management
                                </option>
                                <option
                                    className="bg-background"
                                    value="marketing"
                                >
                                    marketing
                                </option>
                                <option
                                    className="bg-background"
                                    value="operations"
                                >
                                    operations
                                </option>
                                <option className="bg-background" value="sales">
                                    sales
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="flex w-full flex-row justify-between">
                        <div className="w-[49%]">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="password"
                                name="create_pass"
                                spellCheck="false"
                                placeholder="password"
                                id="create_pass"
                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                                title="Minimum eight characters, at least one letter and one number"
                                minLength={8}
                                maxLength={50}
                                required
                            />
                        </div>
                        <div className="w-[49%]">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="password"
                                name="create_confirm_pass"
                                spellCheck="false"
                                placeholder="confirm password"
                                id="create_confirm_pass"
                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                                title="Minimum eight characters, at least one letter and one number"
                                minLength={8}
                                maxLength={50}
                                required
                            />
                        </div>
                    </div>
                </section>
                {/* CREATE BUTTON */}
                <div className="flex flex-row justify-end mt-5">
                    <button className="w-28 text-text-invert font-medium bg-primary p-1 rounded-lg">
                        Create
                    </button>
                </div>
            </form>
        </>
    );
}
