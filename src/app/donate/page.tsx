"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import ChooseUser from "./ChooseUser";
import DonateAmount from "./DonateAmount";
import DonateDetails from "./DonateDetails";

/**
 * The donate page.
 *
 * This page allows the user to select the target user of the donation,
 * input the amount of points to donate, and show some details about the
 * donation, if it was successful or not.
 *
 * @param {Object} req - The request object.
 * @param {string} req.searchParams.target - The username of the target user.
 */
export default function Donate(req: any) {
    // The stage of the donation process, 0 = ChooseUser, 1 = DonateAmount, 2 = DonateDetails
    const [stage, setStage] = useState(0);
    // The target user of the donation
    const [target, setTarget] = useState("");
    // The details about the donation
    const [details, setDetails] = useState();

    // Decode the target user from the URL
    const urlTarget = decodeURI(req.searchParams.target);

    return (
        <section>
            <Navbar />
            <div className="h-content py-8 px-[6.75rem]">
                <div className="bg-background-light w-full h-full justify-center shadow-lg flex flex-col text-text items-center gap-5 rounded-lg">
                    {/* Render the stage of the donation process */}
                    {stage === 0 && (
                        <ChooseUser
                            setStage={setStage}
                            setTarget={setTarget}
                            urlTarget={urlTarget}
                        />
                    )}
                    {stage === 1 && (
                        <DonateAmount
                            target={target}
                            setStage={setStage}
                            setDetails={setDetails}
                        />
                    )}
                    {stage === 2 && <DonateDetails details={details} />}
                </div>
            </div>
        </section>
    );
}

