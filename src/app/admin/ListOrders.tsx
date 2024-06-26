"use client";

import { useEffect } from "react";
import { Pagination } from "@mui/material";
import { Order, OrderPage } from "@/types/shop";
import { MdChangeCircle } from "react-icons/md";
import Loading from "@/components/Loading";
import { debounce } from "underscore";

export default function ListOrders({
    orders,
    getPage,
    setError,
    setSuccess,
}: {
    orders: OrderPage | undefined;
    getPage: any;
    setError: any;
    setSuccess: any;
}) {
    let isFirstRender = true;

    function handleChangePage(_: any, value: number) {
        getPage(value);
    }

    useEffect(() => {
        // Fetch the first page of orders on first render
        isFirstRender && !orders && getPage(1);
        isFirstRender = false;
    }, [isFirstRender]);

    return (
        <>
            {!orders && <Loading />}
            {orders?.total === 0 && (
                <p className="text-center flex items-center justify-center text-text-inactive h-full">
                    No orders found
                </p>
            )}
            {/* LIST OF ALL ORDERS */}
            {orders && orders.total > 0 && (
                <>
                    <div className="relative overflow-hidden rounded-lg my-5 mx-5">
                        <table className="table-auto w-full text-left text-sm">
                            <thead className="uppercase bg-primary text-[#e5e7eb]">
                                <tr>
                                    <td className="py-2 text-center font-bold p-4">
                                        id
                                    </td>
                                    <td className="py-2 text-center font-bold p-4">
                                        name
                                    </td>
                                    <td className="py-2 text-center font-bold p-4">
                                        product
                                    </td>
                                    <td className="py-2 text-center font-bold p-4">
                                        date
                                    </td>
                                    <td className="py-2 text-center font-bold p-4">
                                        status
                                    </td>
                                </tr>
                            </thead>
                            <tbody className="text-gray-500">
                                {orders &&
                                    orders.items.map((order: Order) => (
                                        <OrderItem
                                            key={order.id}
                                            order={order}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        count={orders?.pages}
                        shape="rounded"
                        onChange={handleChangePage}
                        className="flex justify-end mr-5 mb-5 opacity-40"
                    />
                </>
            )}
        </>
    );
}

function OrderItem({ order }: { order: Order }) {
    return (
        <tr className="pt-3 pb-5 border-b hover:bg-background transition-colors duration-300">
            <td className="pt-3 pb-5 text-center px-4">{order.id}</td>
            <td className="pt-3 pb-5 text-center px-4">{order.name}</td>
            <td className="pt-3 pb-5 text-center px-4">
                <div className="flex flex-row gap-4 items-center justify-center">
                    <p>{order.product}</p>
                </div>
            </td>
            <td className="pt-3 pb-5 text-center px-4">
                {new Date(order.created_at).toDateString()}
            </td>
            <td className="pt-3 pb-5 text-center px-4">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p>{order.status}</p>
                    <MdChangeCircle
                        size={25}
                        className="mt-[2px] text-zinc-400 hover:text-primary transition-colors duration-300 cursor-pointer"
                    />
                </div>
            </td>
        </tr>
    );
}
