"use client";

import { useEffect } from "react";
import { Pagination } from "@mui/material";
import { Feedback, FeedbackPage } from "@/types/feedback";
import Loading from "@/components/Loading";

export default function ListFeedbacks({
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
    let isFirstRender = true;

    function handlePageChange(_: any, value: number) {
        getPage(value);
    }

    useEffect(() => {
        // Fetch the first page of feedbacks on first render
        isFirstRender && !feedbacks && getPage(1);
        isFirstRender = false;
    }, []);

    return (
        <>
            {!feedbacks && <Loading />}
            {feedbacks?.total === 0 && (
                <p className="text-center flex items-center justify-center text-text-inactive h-full">
                    No feedbacks found
                </p>
            )}
            {feedbacks && feedbacks.total > 0 && (
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
                                <p className="text-center mt-[35vh]">
                                    No feedbacks
                                </p>
                            )}
                        </ul>
                    </div>

                    <Pagination
                        count={feedbacks?.pages}
                        shape="rounded"
                        onChange={handlePageChange}
                        className="flex justify-end mr-5 mb-5 opacity-40"
                    />
                </>
            )}
        </>
    );
}

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
