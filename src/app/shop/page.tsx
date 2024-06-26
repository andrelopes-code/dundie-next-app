"use client";

import Navbar from "@/components/Navbar";
import Product from "./Product";
import { useState, useEffect } from "react";
import ContactAndFeedback from "./ContactAndFeedback";
import API_URL from "@/constants/apiRoute";
import Loading from "@/components/Loading";
import { AlertError, AlertSuccess } from "@/components/alert";
import { SiDogecoin } from "react-icons/si";
import debounce from "@/functions/debounce";

export default function Shop() {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [products, setProducts] = useState<any>();
    const [user, setUser] = useState<any>();

    let isFirstRender = true;

    // Fetch products when the component mounts
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error while fetching products:", error);
            }
        };
        const getProfile = async () => {
            try {
                const response = await fetch(`${API_URL}/user/profile`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Ocorreu um erro ao buscar o usuário:", error);
            }
        }

        const fetchAll = async () => {
            isFirstRender = false;
            console.log("isFirstRender", isFirstRender);
            await getProducts();
            await getProfile();
        };

        isFirstRender && fetchAll();
    }, []);

    return (
        <div className="flex flex-col">
            <Navbar />

            <div className="bg-background-light shadow-lg rounded-lg mx-24 my-3 mb-24 h-fit overflow-auto sb">
                <div className="bg-gradient-to-r from-background-light flex flex-row justify-between via-indigo-100 to-primary h-[300px]">
                    <div className="text-7xl ml-24 flex select-none flex-col items-start justify-center h-full">
                        <p className="font-bold text-center bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent text-text-invert">
                            DUNDIE
                        </p>
                        <p className="font-bold text-center bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent text-text-invert">
                            SHOP
                        </p>
                    </div>
                </div>
                <div className="flex flex-row justify-end mt-5 mr-5">
                    <div className="flex flex-row items-center justify-center bg-gradient-to-r max-w-32 w-auto from-primary to-violet-400 rounded-lg text-text-invert font-semibold px-3 py-1">
                        <p>{user?.points || 0}</p>
                        <SiDogecoin className="ml-1 mb-[3px]" />
                    </div>
                </div>
                <div className="relative">
                    <div className="shopRightGradient"></div>
                    <div className="shopLeftGradient"></div>
                    <div className="flex flex-row flex-nowrap shopScroll px-10 mb-14 justify-start gap-12 py-5">
                        {/* Loading products */}
                        {!products && (
                            <div className="h-[400px] m-auto">
                                <Loading />
                            </div>
                        )}
                        {/* Products */}
                        {products &&
                            products?.map((product: any) => (
                                <Product
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    setError={setError}
                                />
                            ))}
                    </div>
                </div>
            </div>
            {error && <AlertError msg={error} />}
            {success && <AlertSuccess msg={success} />}

            {/* Contact and Feedback */}
            <ContactAndFeedback setError={setError} setSuccess={setSuccess} />
        </div>
    );
}
