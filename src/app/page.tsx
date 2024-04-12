"use client";

import Navbar from "@/components/Navbar";
import Ranking from "@/components/Ranking";


export default function Home() {
    return (
        <div className="h-screen">
            <div>
                <Navbar />
            </div>
            <div className="bg-background px-24 h-content grid grid-cols-[2fr_1fr]">
                {/* MAIN DIV */}
                <div className="bg-background-light m-3 rounded-lg">

                </div>

                <div className="grid grid-rows-[50%_50%] h-content"> {/* h-content */}
                    {/* RANKING DIV */}
                    <div className="bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg">
                        <Ranking />
                    </div>
                    {/* RECENT TRANSACTIONS DIV */}
                    <div className="bg-background-light m-[0.75rem_0.75rem_0.75rem_0] rounded-lg">
                    <Ranking />
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
