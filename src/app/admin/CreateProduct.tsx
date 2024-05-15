"use client";

import { useEffect, useRef, useState } from "react";
import ImgFallback from "@/components/ImgFalback";
import API_URL from "@/constants/apiRoute";
import {
    setErrorWithTimeout,
    setSuccessWithTimeout,
} from "@/functions/set-error-and-success";
import RequestAdminPassword from "@/components/requestAdminPassword";
const defaultProductImage =
    "https://www.svgrepo.com/show/508699/landscape-placeholder.svg";

export function CreateProduct({
    setError,
    setSuccess,
    getProducts,
}: {
    setError: (errorMessage: string) => void;
    setSuccess: (successMessage: string) => void;
    getProducts: () => void;
}) {
    const productImage = useRef<HTMLImageElement>(null);
    const [adminPassword, setAdminPassword] = useState("");
    const [passwordModal, setPasswordModal] = useState(false);
    const CreateProductform = useRef<HTMLFormElement>(null);

    const handleSubmit = async (form: HTMLFormElement) => {
        // Get form data
        const name = form.product_name.value;
        const price = form.product_price.value;
        const description = form.product_description.value;
        const image = form.product_image.value;

        const data = {
            name,
            price,
            description,
            image,
        };

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Admin-Password": adminPassword,
            },
            body: JSON.stringify(data),
        };

        try {
            const res = await fetch(`${API_URL}/admin/products`, config);
            if (res.ok) {
                setSuccessWithTimeout(
                    "Product created successfully",
                    setSuccess
                );
                getProducts();
                form.reset();
            } else {
                throw await res.json();
            }
        } catch (error: any) {
            setErrorWithTimeout(
                error?.detail || "Error while creating product",
                setError
            );
        }

        setAdminPassword("");
        productImage.current!.src = defaultProductImage;
    };

    useEffect(() => {
        // Submit the form if the admin password is set
        const canSubmitForm = adminPassword && CreateProductform.current;
        if (canSubmitForm) {
            handleSubmit(CreateProductform.current);
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
            {/* Create Product form */}
            <form
                ref={CreateProductform}
                onSubmit={(e) => {
                    e.preventDefault();
                    setPasswordModal(true);
                }}
            >
                <h1 className="text-text font-medium text-lg pb-2">
                    Create Product
                </h1>
                <section className="flex flex-col text-sm gap-2">
                    <div className="flex w-full flex-row justify-between">
                        <div className="w-[49%]">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="text"
                                name="product_name"
                                spellCheck="false"
                                placeholder="name"
                                id="product_name"
                                maxLength={30}
                                required
                            />
                        </div>
                        <div className="w-[49%]">
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="number"
                                name="product_price"
                                placeholder="price"
                                id="product_price"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex w-full items-center flex-row gap-2">
                        <input
                            onChange={(e) => {
                                productImage.current!.src = e.target.value;
                            }}
                            className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                            type="url"
                            name="product_image"
                            spellCheck="false"
                            placeholder="image url"
                            id="product_image"
                            required
                        />
                        <div className=" rounded-full aspect-square overflow-hidden">
                            <ImgFallback
                                elem={productImage}
                                falbackImg={defaultProductImage}
                                src={defaultProductImage}
                                className="w-10 h-10 object-cover aspect-square"
                            />
                        </div>
                    </div>

                    <textarea
                        className="w-full resize-none bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                        name="product_description"
                        spellCheck="false"
                        placeholder="description"
                        id="product_description"
                        maxLength={120}
                        cols={30}
                        rows={3}
                    ></textarea>
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
