"use client";

import { useEffect } from "react";
import { Pagination } from "@mui/material";
import { Order, OrderPage } from "@/types/shop";
import { MdChangeCircle } from "react-icons/md";
import Loading from "@/components/Loading";
import { debounce } from "underscore";

/**
 * A list of orders component that displays all orders in a table format.
 *
 * @prop {OrderPage | undefined} orders - The list of orders from the backend.
 * @prop {Function} getPage - A function to get a new page of orders from the backend.
 * @prop {Function} setError - A function to set an error message in the parent component.
 * @prop {Function} setSuccess - A function to set a success message in the parent component.
 *
 * @return {JSX.Element} The ListOrders component.
 */

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
    const debounceGetPage: (page: number) => void = debounce(getPage, 500);
    let isFirstRender = true;

    /**
     * Function to handle a page change.
     *
     * @param {React.ChangeEvent<unknown>} e - The event object
     * @param {number} value - The new page number
     */
    function handleChangePage(e: any, value: number) {
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
            {orders?.total === 0 && <p>No orders found</p>}
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
                        {orders?.items.length === 0 && (
                            <p className="text-center my-12">No orders</p>
                        )}
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

/**
 * A component that displays a single order in a table row.
 *
 * @prop {Order} order - The order object.
 *
 * @return {JSX.Element} The OrderItem component.
 */
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
