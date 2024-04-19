"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import API_URL from "@/constants/apiRoute";
import { UserPage } from "@/types/user";
import { CreateUser } from "./CreateUser";
import { AlertError, AlertSuccess } from "@/components/alert";
import ListUsers from "./ListUser";

/**
 * The admin panel page displays two main components:
 * A list of all users in the system, and a form to create a new user.
 * The admin panel is only accessible to users with admin rights.
 */
export default function AdminPanel() {
    // The error and success messages to display on the page
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    // The current page of users to display in the list
    const [users, setUsers] = useState<UserPage>();

    /**
     * Get the next page of users from the backend.
     * @param page The page number to get
     */
    function getPage(page: number) {
        fetch(`${API_URL}/admin/user?page=${page}`)
            .then(async (res) => await res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.log(err));
    }

    /**
     * When the component mounts, get the first page of users
     */
    useEffect(() => {
        getPage(1);
    }, []);

    return (
        <>
            {/* Display any error or success messages */}
            {error && <AlertError msg={error} />}
            {success && <AlertSuccess msg={success} />}
            <div className="h-screen bg-background">
                <div>
                    <Navbar />
                </div>
                <div className="bg-background px-24 h-content grid grid-cols-[2fr_1fr]">
                    {/* LIST USERS SECTION */}
                    <div className="m-3 rounded-lg bg-background-light shadow-lg flex flex-col justify-between">
                        <ListUsers
                            getPage={getPage}
                            users={users}
                            setError={setError}
                            setSuccess={setSuccess}
                        />
                    </div>

                    <div className=" flex flex-col">
                        {/* CREATE NEW USER SECTION */}
                        <div className="shadow-lg h-fit overflow-hidden p-5 bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg fixtransition transition-all duration-700 delay-200 hover:translate-x-2">
                            <CreateUser
                                showError={setError}
                                showSuccess={setSuccess}
                            />
                        </div>
                        <div className="shadow-lg h-fit overflow-hidden p-5 bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg fixtransition transition-all duration-700 delay-200 hover:translate-x-2">
                            <h1 className="text-center top-[45%] relative text-text select-none">
                                There's nothing here, yet.
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
