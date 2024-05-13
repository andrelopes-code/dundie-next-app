"use client";

import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { Product } from "@/types/shop";
import { Feedback, FeedbackPage } from "@/types/feedback";
import { MdChangeCircle } from "react-icons/md";
import Image from "next/image";
import debounce from "@/functions/debounce";

/**
 * A list of products component that displays all products.
 *
 * @prop {FeedbackPage | undefined} feedbacks - The list of feedbacks from the backend.
 * @prop {Function} getPage - A function to get a new page of feedbacks from the backend.
 * @prop {Function} setError - A function to set an error message in the parent component.
 * @prop {Function} setSuccess - A function to set a success message in the parent component.
 *
 * @return {JSX.Element} The ListFeedbacks component.
 */
let isFirstRender = true;

export default function ListProducts({
    feedbacks,
    getPage,
    setError,
    setSuccess,
}: {
    feedbacks: FeedbackPage | undefined;
    getPage: any;
    setError: any;
    setSuccess: any;
}) {
    const debounceGetPage: (page: number) => void = debounce(getPage, 500);
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
        // Fetch the first page of feedbacks on first render
        if (isFirstRender && !feedbacks) {
            isFirstRender = false;
            debounceGetPage(1);
        }
    }, []);

    return (
        <>
            {/* LIST OF ALL FEEDBACKS */}
            <div className="relative mt-5">
                <div className="TopGradient"></div>
                <div className="BottomGradient"></div>
                <ul className="h-[70vh] overflow-y-auto noscrollbar">
                    {feedbacks &&
                        feedbacks.items.map((feedback: Feedback) => (
                            <FeedbackItem
                                key={feedback.id}
                                feedback={feedback}
                            />
                        ))}

                    {feedbacks?.items.length === 0 && (
                        <p className="text-center mt-[35vh]">No feedbacks</p>
                    )}
                </ul>
            </div>

            <Pagination
                count={feedbacks?.pages}
                shape="rounded"
                onChange={handleChangePage}
                className="flex justify-end mr-5 mb-5 opacity-40"
            />
        </>
    );
}

/**
 * A component that displays a single feedback in a table row.
 *
 * @prop {Feedback} feedback - The feedback object.
 *
 * @return {JSX.Element} The FeedbackItem component.
 */
function FeedbackItem({ feedback }: { feedback: Feedback }) {
    return (
        <li className="py-3 border-b text-text mx-5 hover:bg-background transition-colors duration-150">
            <div className="px-3 mb-3 mt-5 text-sm flex flex-row">
                <p className="font-semibold">{feedback.name}</p>
                <p className="text-text-inactive">
                    &nbsp;&nbsp;~&nbsp;&nbsp;{feedback.email}
                </p>
                <p className="text-text-inactive">
                    &nbsp;&nbsp;~&nbsp;&nbsp;
                    {new Date(feedback.created_at).toDateString()}
                </p>
            </div>
            <p className="px-5 text-pretty">{feedback.feedback}</p>
        </li>
    );
}
