"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/shop";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Loading from "@/components/Loading";

/**
 * A list of products component that displays all products.
 *
 * @prop {Function} setError - A function to set an error message in the parent component.
 * @prop {Function} setSuccess - A function to set a success message in the parent component.
 *
 * @return {JSX.Element} The ListFeedbacks component.
 */
let isFirstRender = true;

export default function ListProducts({
    products,
    getProducts,
    setError,
    setSuccess,
    setEditProductData,
}: {
    products: Product[] | undefined;
    getProducts: any;
    setError: any;
    setSuccess: any;
    setEditProductData: any;
}) {
    // Fetch products when the component mounts
    useEffect(() => {
        isFirstRender && getProducts();
        isFirstRender = false;
    }, []);

    return (
        <>
            {!products && <Loading />}
            {products?.length === 0 && <p>No orders found</p>}
            {/* LIST OF ALL ORDERS */}
            {products && products.length > 0 && (
                <div className="relative mt-5">
                    <div className="TopGradient"></div>
                    <div className="BottomGradient"></div>
                    <div className="h-[80vh] mx-5 overflow-y-auto noscrollbar">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody>
                                {products.map((product: Product) => (
                                    <ProductItem
                                        key={product.id}
                                        product={product}
                                        setEditProductData={setEditProductData}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

function ProductItem({
    product,
    setEditProductData,
}: {
    product: Product;
    setEditProductData: any;
}) {
    return (
        <tr className=" hover:bg-background transition-colors duration-150">
            <td className="px-3 pt-5 pb-3 border-b">{product.id}</td>

            <th
                scope="row"
                className="px-3 pt-5 pb-3 border-b font-medium whitespace-nowrap"
            >
                <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-full h-10 w-10 aspect-square object-cover"
                />
            </th>
            <td className="px-3 pt-5 pb-3 border-b">{product.name}</td>
            <td className="px-3 pt-5 pb-3 border-b">{product.price}</td>
            <td className="px-3 pt-5 pb-3 border-b">
                {new Date(product.created_at).toDateString()}
            </td>
            <td className="px-3 pt-5 pb-3 border-b">
                <div className="flex flex-row gap-2 items-center">
                    <button
                        onClick={() => setEditProductData(product)}
                        className="hover:bg-background-100 rounded-lg text-primary p-1"
                    >
                        <MdEdit />
                    </button>

                    <button className="hover:bg-background-100 rounded-lg text-primary p-1">
                        <MdDelete />
                    </button>
                </div>
            </td>
        </tr>
    );
}