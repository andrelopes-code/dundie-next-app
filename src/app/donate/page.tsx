"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import ChooseUser from "./ChooseUser";
import DonateAmount from "./DonateAmount";
import DonateDetails from "./DonateDetails";

export default function Donate(req: any) {
    const [stage, setStage] = useState(0);
    const [target, setTarget] = useState("");
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

