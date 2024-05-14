"use client";

import { FormEvent, useEffect } from "react";
import API_URL from "@/constants/apiRoute";
import {
    setErrorWithTimeout,
    setSuccessWithTimeout,
} from "@/functions/set-error-and-success";
import { AdminUser } from "@/types/user";
import { isEqual } from "underscore";
import getById from "@/functions/get-element-by-id";
import { IoMdClose } from "react-icons/io";

/**
 * Create User form component.
 */
export function EditUser({
    user,
    setError,
    setSuccess,
    setEditUserData,
}: {
    /**
     * User to edit.
     */
    user: AdminUser;
    /**
     * Function to show error message.
     */
    setError: (errorMessage: string) => void;
    /**
     * Function to show success message.
     */
    setSuccess: (successMessage: string) => void;
    /**
     * Function to set edit user data
     */
    setEditUserData: (data: any) => void;
}) {
    /**
     * Handles the form submit event.
     * @param event Form event
     */
    const handleSubmit = async (e: any) => {
        // Prevent the form from submitting
        e.preventDefault();

        // Get form data
        const form = e.target;
        const name = form.edit_name.value;
        const username = form.edit_username.value;
        const email = form.edit_email.value;
        const dept = form.edit_department.value;
        const password = form.edit_pass.value;
        const confirmPassword = form.edit_confirm_pass.value;
        const isActive = form.edit_active.checked;
        const isPrivate = form.edit_private.checked;
        const adminPassword = form.edit_admin_password.value;

        const originalData = {
            name: user.name,
            username: user.username,
            email: user.email,
            dept: user.dept,
            new_password: password,
            is_active: user.is_active,
            private: user.private,
            admin_password: adminPassword,
        };

        const editData = {
            name: name,
            username: username,
            email: email,
            dept: dept,
            new_password: password,
            is_active: isActive,
            private: isPrivate,
            admin_password: adminPassword,
        };

        // Check if there are any changes
        if (isEqual(editData, originalData)) {
            setSuccessWithTimeout("No changes", setSuccess);
            return;
        }

        // Check if the passwords match
        if (password !== confirmPassword) {
            setErrorWithTimeout("Passwords do not match", setError);
            return;
        }

        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editData),
        };

        function updateLocalUserFields(data: any) {
            user.name = data.name;
            user.username = data.username;
            user.email = data.email;
            user.dept = data.dept;
            user.private = data.private;
            user.is_active = data.is_active;
        }

        async function updateUser() {
            try {
                const response = await fetch(
                    `${API_URL}/admin/user/?username=${user.username}`,
                    config
                );

                const data = await response.json();

                if (!response.ok) {
                    throw data;
                }
                setSuccessWithTimeout(
                    data?.detail || "User updated successfully",
                    setSuccess
                );
                updateLocalUserFields(editData);
                setEditUserData(undefined);
            } catch (error: any) {
                setErrorWithTimeout(
                    error?.detail || "Error while updating user",
                    setError
                );
            }
        }

        updateUser();
    };

    // Set initial form values when user changes
    useEffect(() => {
        const form = getById("edit_user_form") as any;
        form.edit_name.value = user.name;
        form.edit_username.value = user.username;
        form.edit_email.value = user.email;
        form.edit_department.value = user.dept;
        form.edit_active.checked = user.is_active;
        form.edit_private.checked = user.private;
    }, [user]);

    return (
        <>
            <form id="edit_user_form" onSubmit={handleSubmit}>
                <div className="pb-5 text-text text-lg font-medium flex flex-row items-center justify-between">
                    <h1>Edit User</h1>
                    <button
                        onClick={() => setEditUserData(undefined)}
                        className="text-text-inactive hover:text-primary font-bold"
                        type="button"
                    >
                        <IoMdClose />
                    </button>
                </div>
                <section className="flex flex-col text-sm gap-2">
                    <div className="flex w-full flex-row justify-between">
                        <div className="w-[49%]">
                            <input
                                autoFocus
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="text"
                                name="edit_name"
                                spellCheck="false"
                                placeholder="name"
                                id="edit_name"
                                pattern="[a-zA-Z ]+"
                                minLength={8}
                                maxLength={50}
                                required
                            />
                        </div>
                        <div className="w-[49%]">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="text"
                                name="edit_username"
                                spellCheck="false"
                                placeholder="username"
                                id="edit_username"
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
                                name="edit_email"
                                spellCheck="false"
                                placeholder="email"
                                id="edit_email"
                                required
                            />
                        </div>
                        <div className="w-[49%]">
                            <select
                                id="edit_department"
                                name="edit_department"
                                className="w-full appearance-none bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                required
                            >
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
                                name="edit_pass"
                                spellCheck="false"
                                placeholder="new password"
                                id="edit_pass"
                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                                title="Minimum eight characters, at least one letter and one number"
                                minLength={8}
                                maxLength={50}
                            />
                        </div>
                        <div className="w-[49%]">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="password"
                                name="edit_confirm_pass"
                                spellCheck="false"
                                placeholder="confirm new password"
                                id="edit_confirm_pass"
                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                                title="Minimum eight characters, at least one letter and one number"
                                minLength={8}
                                maxLength={50}
                            />
                        </div>
                    </div>
                    <div className="flex w-full mt-2 text-text-inactive flex-row items-center justify-end">
                        <input
                            type="checkbox"
                            name="edit_active"
                            id="edit_active"
                            className="w-4 h-4 rounded accent-primary"
                        />
                        <label
                            htmlFor="edit_active"
                            className="ml-2 mr-5 text-sm font-medium text-text-inactive"
                        >
                            Active
                        </label>
                        <input
                            type="checkbox"
                            name="edit_private"
                            id="edit_private"
                            className="w-4 h-4 rounded accent-primary"
                        />
                        <label
                            htmlFor="edit_private"
                            className="ml-2 text-sm font-medium text-text-inactive"
                        >
                            Private
                        </label>
                    </div>
                </section>
                {/* CREATE BUTTON */}
                <div className="flex flex-row justify-between gap-5 mt-10">
                    <div className="w-[49%] text-sm">
                        <input
                            className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                            type="password"
                            name="edit_admin_password"
                            spellCheck="false"
                            placeholder="admin password"
                            id="edit_admin_password"
                            minLength={8}
                            maxLength={50}
                            required
                        />
                    </div>

                    <button
                        className="w-28 text-text-invert font-medium bg-primary p-1 rounded-lg"
                        type="submit"
                        form="edit_user_form"
                    >
                        Edit
                    </button>
                </div>
            </form>
        </>
    );
}
