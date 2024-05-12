"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import API_URL from "@/constants/apiRoute";
import { UserPage } from "@/types/user";
import { CreateUser } from "./CreateUser";
import { EditUser } from "./EditUser";
import { AlertError, AlertSuccess } from "@/components/alert";
import ListUsers from "./ListUser";
import { AdminDonate } from "./Donate";
import ListHeader from "./ListHeader";
import ListOrders from "./ListOrders";
import { OrderPage } from "@/types/shop";
import Loading from "@/components/Loading";
import { setErrorWithTimeout } from "@/functions/set-error-and-success";
import { FeedbackPage, Feedback } from "@/types/feedback";
import ListFeedbacks from "./ListFeedbacks";

/**
 * The admin panel page displays two main components:
 * A list of all users in the system, and a form to create a new user.
 * The admin panel is only accessible to users with admin rights.
 */
export default function AdminPanel() {
    // The error and success messages to display on the page
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    // The loading state of the page
    const [loading, setLoading] = useState(true);
    // The current page of users to display in the list
    const [users, setUsers] = useState<UserPage>();
    // The current page of feedbacks to display in the list
    const [orders, setOrders] = useState<OrderPage>();
    // The current page of feedbacks to display in the list
    const [feedbacks, setFeedbacks] = useState<FeedbackPage>();
    const [editUserData, setEditUserData] = useState();
    const [activeSection, setActiveSection] = useState("users");

    /**
     * Get the next page of users from the backend.
     * @param page The page number to get
     */
    function getuserPage(page: number) {
        fetch(`${API_URL}/admin/user?page=${page}`)
            .then(async (res) => await res.json())
            .then((data) => {
                if (data?.detail) {
                    setErrorWithTimeout(data?.detail, setError, 5000);
                }
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }
    /**
     * Get the next page of feedbacks from the backend.
     * @param page The page number to get
     */
    function getFeedbackPage(page: number) {
        setLoading(true);
        fetch(`${API_URL}/feedbacks?page=${page}`)
            .then(async (res) => await res.json())
            .then((data) => {
                if (data?.detail) {
                    setErrorWithTimeout(data?.detail, setError, 5000);
                }
                setFeedbacks(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }
    /**
     * Get the next page of orders from the backend.
     * @param page The page number to get
     */
    function getOrdersPage(page: number) {
        setLoading(true);
        fetch(`${API_URL}/admin/orders?page=${page}`)
            .then(async (res) => await res.json())
            .then((data) => {
                if (data?.detail) {
                    setErrorWithTimeout(data?.detail, setError, 5000);
                }
                setOrders(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }

    /**
     * When the component mounts, get the first page of users
     */
    useEffect(() => {
        getuserPage(1);
    }, []);

    return (
        <>
            {/* Display any error or success messages */}
            {error && <AlertError msg={error} />}
            {success && <AlertSuccess msg={success} />}
            <div className="h-screen">
                <div>
                    <Navbar />
                </div>
                <div className="px-24 h-content grid grid-cols-[2fr_1fr]">
                    {/* LIST SECTION */}
                    <div className="m-3 rounded-lg bg-background-light shadow-lg">
                        <ListHeader
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                        />
                        <div className="flex flex-col h-[90%] justify-between">
                            {loading && <Loading />}

                            {users?.items && activeSection === "users" && (
                                <ListUsers
                                    getPage={getuserPage}
                                    users={users}
                                    setError={setError}
                                    setSuccess={setSuccess}
                                    setEditUserData={setEditUserData}
                                />
                            )}
                            {!loading && activeSection === "orders" && (
                                <ListOrders
                                    getPage={getOrdersPage}
                                    orders={orders}
                                    setError={setError}
                                    setSuccess={setSuccess}
                                />
                            )}
                            {!loading && activeSection === "feedbacks" && (
                                <ListFeedbacks
                                    feedbacks={feedbacks}
                                    getPage={getFeedbackPage}
                                    setError={setError}
                                    setSuccess={setSuccess}
                                />
                            )}
                        </div>
                    </div>

                    <div className=" flex flex-col">
                        {/* CREATE NEW USER SECTION */}
                        <div className="shadow-lg h-fit overflow-hidden p-5 bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg fixtransition transition-all duration-700 delay-200 hover:translate-x-2">
                            {editUserData ? (
                                <EditUser
                                    user={editUserData}
                                    setError={setError}
                                    setSuccess={setSuccess}
                                    setEditUserData={setEditUserData}
                                />
                            ) : (
                                <CreateUser
                                    showError={setError}
                                    showSuccess={setSuccess}
                                />
                            )}
                        </div>
                        <div className="shadow-lg h-fit overflow-hidden p-5 bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg fixtransition transition-all duration-700 delay-200 hover:translate-x-2">
                            <AdminDonate
                                setError={setError}
                                setSuccess={setSuccess}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
