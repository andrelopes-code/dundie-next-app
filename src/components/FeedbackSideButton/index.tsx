"use client";

import React, { useEffect, useState, useRef } from "react";
import { MdFeedback } from "react-icons/md";
import ContactAndFeedbackSide from "../ContactAndFeedbackSide";
import { AlertError, AlertSuccess } from "@/components/alert";
import anime from "animejs";

export default function FeedbackSideButton() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const sideFeedback = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const showSideFeedback = () => {
        const element = sideFeedback.current as HTMLDivElement;

        anime({
            targets: element,
            left: 0,
            easing: "easeOutExpo",
            duration: 2000,
        });
    };

    const toggleSideFeedback = () => {
        if (!isOpen) {
            showSideFeedback();
            setIsOpen(true);
        } else {
            closeSideFeedback();
            setIsOpen(false);
        }
    };

    const closeSideFeedback = () => {
        const element = sideFeedback.current as HTMLDivElement;
        setIsOpen(false);
        anime({
            targets: element,
            left: -710,
            easing: "easeOutExpo",
            duration: 2000,
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                sideFeedback.current &&
                !sideFeedback.current.contains(event.target)
            ) {
                closeSideFeedback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sideFeedback]);

    return (
        <>
            {error && <AlertError msg={error} />}
            {success && <AlertSuccess msg={success} />}
            <div
                ref={sideFeedback}
                tabIndex={0}
                className="text-xs outline-none fixed z-50 group -left-[710px] top-20 flex flex-row drop-shadow-lg"
            >
                <div className="text-text z-50 w-[700px] bg-background-light rounded-br-lg p-5">
                    <ContactAndFeedbackSide
                        setError={setError}
                        setSuccess={setSuccess}
                    />
                </div>
                <div>
                    <div
                        onClick={() => toggleSideFeedback()}
                        className="h-8 w-10 z-50 p-2 cursor-pointer group bg-background-light flex justify-end items-center rounded-r-lg"
                    >
                        <MdFeedback className="text-lg text-primary group-hover:text-text-inactive transition-all duration-300" />
                    </div>
                    <div className="h-8 z-40 w-8 bg-clip-border rounded-tl-xl bg-transparent shadow-[-20px_0_0_#f1f1f1]"></div>
                </div>
            </div>
        </>
    );
}
