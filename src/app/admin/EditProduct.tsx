"use client";

import { useEffect, useRef, useState } from "react";
import API_URL from "@/constants/apiRoute";
import {
    setErrorWithTimeout,
    setSuccessWithTimeout,
} from "@/functions/set-error-and-success";
import ImgFallback from "@/components/ImgFalback";
import { isEqual } from "underscore";
import getById from "@/functions/get-element-by-id";
import { IoMdClose } from "react-icons/io";
import { Product } from "@/types/shop";
import anime from "animejs";
import RequestAdminPassword from "@/components/requestAdminPassword";

const defaultProductImage =
    "https://www.svgrepo.com/show/508699/landscape-placeholder.svg";

/**
 * Edit Product form component.
 */
export function EditProduct({
    product,
    setError,
    setSuccess,
    setEditProductData,
}: {
    /**
     * Product to edit.
     */
    product: Product;
    /**
     * Function to show error message.
     */
    setError: (errorMessage: string) => void;
    /**
     * Function to show success message.
     */
    setSuccess: (successMessage: string) => void;
    /**
     * Function to set edit product data
     */
    setEditProductData: (data: any) => void;
}) {
    const productImage = useRef<HTMLImageElement>(null);
    const [adminPassword, setAdminPassword] = useState("");
    const [passwordModal, setPasswordModal] = useState(false);
    const EditProductForm = useRef<HTMLFormElement>(null);
    /**
     * Handles the form submit event.
     * @param event Form event
     */
    const handleSubmit = async (form: HTMLFormElement) => {
        // Get form data
        const name = form.product_name.value;
        const description = form.product_description.value;
        const price = parseInt(form.product_price.value);
        const image = form.product_image.value;

        const originalData = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
        };

        const editData = {
            id: product.id,
            name: name,
            description: description,
            price: price,
            image: image,
        };

        // Check if there are any changes
        if (isEqual(editData, originalData)) {
            setSuccessWithTimeout("No changes", setSuccess);
            return;
        }

        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-Admin-Password": adminPassword,
            },
            body: JSON.stringify(editData),
        };

        function updateLocalProductFields(data: any) {
            product.name = data.name;
            product.description = data.description;
            product.price = data.price;
            product.image = data.image;
        }

        async function updateProduct() {
            try {
                const response = await fetch(
                    `${API_URL}/admin/products/?product_id=${product.id}`,
                    config
                );

                const data = await response.json();

                if (!response.ok) {
                    throw data;
                }
                setSuccessWithTimeout(
                    data?.detail || "Product updated successfully",
                    setSuccess
                );
                updateLocalProductFields(editData);
                setEditProductData(undefined);
            } catch (error: any) {
                setErrorWithTimeout(
                    error?.detail || "Error while updating product",
                    setError
                );
            }
        }

        updateProduct();
        setAdminPassword("");
    };

    useEffect(() => {
        // Submit the form if the admin password is set
        if (adminPassword && EditProductForm.current) {
            handleSubmit(EditProductForm.current);
        }
    }, [adminPassword]);

    // Set initial form values when product changes
    useEffect(() => {
        const form = EditProductForm.current as HTMLFormElement;

        form.product_name.value = product.name;
        form.product_description.value = product.description;
        form.product_price.value = product.price;
        form.product_image.value = product.image;
        productImage.current?.setAttribute("src", product.image);

        // scroll to form when mounted, focus on first input and animate it
        form.scrollIntoView();
        form.product_name.focus();
        anime({
            targets: form,
            translateX: [5, -3, 2, 0],
            duration: 500,
            easing: "easeOutSine",
        });
    }, [product]);

    return (
        <>
            {/* Request password modal */}
            {passwordModal && (
                <RequestAdminPassword
                    setAdminPassword={setAdminPassword}
                    setPasswordModal={setPasswordModal}
                />
            )}
            {/* Edit Product form */}
            <form
                ref={EditProductForm}
                onSubmit={(e) => {
                    e.preventDefault();
                    setPasswordModal(true);
                }}
            >
                <div className="pb-5 text-text text-lg font-medium flex flex-row items-center justify-between">
                    <h1>Edit Product</h1>
                    <button
                        onClick={() => setEditProductData(undefined)}
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
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="text"
                                name="product_name"
                                spellCheck="false"
                                placeholder="product name"
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
                                placeholder="product price"
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
                            placeholder="product image url"
                            id="product_image"
                            required
                        />
                        <div className=" rounded-full aspect-square overflow-hidden">
                            <ImgFallback
                                elem={productImage}
                                falbackImg={defaultProductImage}
                                src={product.image}
                                className="w-10 h-10 object-cover aspect-square"
                            />
                        </div>
                    </div>
                    <div>
                        <textarea
                            className="w-full resize-none bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                            name="product_description"
                            spellCheck="false"
                            placeholder="product description"
                            id="product_description"
                            maxLength={120}
                            cols={30}
                            rows={3}
                        />
                    </div>
                </section>
                {/* CREATE BUTTON */}
                <div className="flex flex-row justify-end gap-5 mt-10">
                    <button
                        className="w-28 text-text-invert font-medium bg-primary p-1 rounded-lg"
                        type="submit"
                    >
                        Edit
                    </button>
                </div>
            </form>
        </>
    );
}
