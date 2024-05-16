"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import API_URL from "@/constants/apiRoute";
import { AdminUser, UserPage } from "@/types/user";
import { CreateUser } from "./CreateUser";
import { EditUser } from "./EditUser";
import { AlertError, AlertSuccess } from "@/components/alert";
import ListUsers from "./ListUser";
import { AdminDonate } from "./Donate";
import ListHeader from "./ListHeader";
import ListOrders from "./ListOrders";
import { OrderPage, Product } from "@/types/shop";
import { CreateProduct } from "./CreateProduct";
import { setErrorWithTimeout } from "@/functions/set-error-and-success";
import { FeedbackPage } from "@/types/feedback";
import ListFeedbacks from "./ListFeedbacks";
import ListProducts from "./ListProducts";
import { EditProduct } from "./EditProduct";

/**
 * The admin panel page displays two main components:
 * A list of all users in the system, and a form to create a new user.
 * The admin panel is only accessible to users with admin rights.
 */
export default function AdminPanel() {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [users, setUsers] = useState<UserPage>();
    const [orders, setOrders] = useState<OrderPage>();
    const [feedbacks, setFeedbacks] = useState<FeedbackPage>();
    const [products, setProducts] = useState<Product[]>();
    const [editUserData, setEditUserData] = useState<AdminUser>();
    const [editProductData, setEditProductData] = useState<Product>();
    const [activeSection, setActiveSection] = useState("users");

    function getuserPage(page: number) {
        fetch(`${API_URL}/admin/user?page=${page}`)
            .then(async (res) => await res.json())
            .then((data) => {
                if (data?.detail) {
                    setErrorWithTimeout(data?.detail, setError, 5000);
                }
                setUsers(data);
            })
            .catch((err) => console.log(err));
    }
    function getFeedbackPage(page: number) {
        fetch(`${API_URL}/feedbacks?page=${page}`)
            .then(async (res) => await res.json())
            .then((data) => {
                if (data?.detail) {
                    setErrorWithTimeout(data?.detail, setError, 5000);
                }
                setFeedbacks(data);
            })
            .catch((err) => console.log(err));
    }
    function getOrdersPage(page: number) {
        fetch(`${API_URL}/admin/orders?page=${page}`)
            .then(async (res) => await res.json())
            .then((data) => {
                if (data?.detail) {
                    setErrorWithTimeout(data?.detail, setError, 5000);
                }
                setOrders(data);
            })
            .catch((err) => console.log(err));
    }
    async function getProducts() {
        try {
            // Make the API call
            const response = await fetch(`${API_URL}/products`);
            const data = await response.json();
            if (response.ok) {
                // If the response is successful, return the data
                setProducts(data);
            } else {
                // If the response is not successful, throw the data
                throw data;
            }
        } catch (error) {
            setErrorWithTimeout("Error while fetching products", setError);
        }
    }

    return (
        <>
            {/* Display any error or success messages */}
            {error && <AlertError msg={error} />}
            {success && <AlertSuccess msg={success} />}
            <div className="h-screen flex flex-col">
                <Navbar />
                <div className="px-24 max-h-full h-full overflow-hidden flex flex-row">
                    {/* LIST SECTION */}
                    <div className="w-2/3 rounded-lg m-3 overflow-y-hidden sb bg-background-light shadow-lg">
                        <ListHeader
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                        />
                        <div className="flex flex-col h-[90%] justify-between">
                            {/* LIST OF USERS */}
                            {activeSection === "users" && (
                                <ListUsers
                                    getPage={getuserPage}
                                    users={users}
                                    setError={setError}
                                    setSuccess={setSuccess}
                                    setEditUserData={setEditUserData}
                                />
                            )}
                            {/* LIST OF ORDERS */}
                            {activeSection === "orders" && (
                                <ListOrders
                                    getPage={getOrdersPage}
                                    orders={orders}
                                    setError={setError}
                                    setSuccess={setSuccess}
                                />
                            )}
                            {/* LIST OF FEEDBACKS */}
                            {activeSection === "feedbacks" && (
                                <ListFeedbacks
                                    feedbacks={feedbacks}
                                    getPage={getFeedbackPage}
                                    setError={setError}
                                    setSuccess={setSuccess}
                                />
                            )}
                            {/* LIST OF PRODUCTS */}
                            {activeSection === "products" && (
                                <ListProducts
                                    products={products}
                                    getProducts={getProducts}
                                    setError={setError}
                                    setSuccess={setSuccess}
                                    setEditProductData={setEditProductData}
                                />
                            )}
                        </div>
                    </div>
                    {/* SIDE SECTION */}
                    <div className="w-1/3 max-h-full pr-3 my-3 overflow-auto overflow-x-visible noscrollbar drop-shadow-lg">
                        {/* CREATE AND EDIT USER SECTION */}
                        <div className="h-fit overflow-hidden p-5 bg-background-light rounded-lg fixtransition transition-all duration-700 delay-200 hover:translate-x-2">
                            {editUserData ? (
                                <EditUser
                                    user={editUserData}
                                    setError={setError}
                                    setSuccess={setSuccess}
                                    setEditUserData={setEditUserData}
                                />
                            ) : (
                                <CreateUser
                                    setError={setError}
                                    setSuccess={setSuccess}
                                />
                            )}
                        </div>
                        {/* DONATE SECTION */}
                        <div className="h-fit overflow-hidden mt-3 p-5 bg-background-light rounded-lg fixtransition transition-all duration-700 delay-200 hover:translate-x-2">
                            <AdminDonate
                                setError={setError}
                                setSuccess={setSuccess}
                            />
                        </div>
                        {/* CREATE AND EDIT PRODUCT SECTION */}
                        <div className="h-fit overflow-hidden mt-3 p-5 bg-background-light rounded-lg fixtransition transition-all duration-700 delay-200 hover:translate-x-2">
                            {editProductData ? (
                                <EditProduct
                                    product={editProductData}
                                    setError={setError}
                                    setSuccess={setSuccess}
                                    setEditProductData={setEditProductData}
                                />
                            ) : (
                                <CreateProduct
                                    setError={setError}
                                    setSuccess={setSuccess}
                                    getProducts={getProducts}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

