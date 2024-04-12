"use client";

import Navbar from "@/components/Navbar";
import Ranking from "@/components/Ranking";
import RecentTransactions from "@/components/RecentTransactions";

export default function Home() {
    return (
        <div className="h-screen bg-background">
            <div>
                <Navbar />
            </div>
            <div className="bg-background px-24 h-content grid grid-cols-[2fr_1fr]">
                {/* MAIN DIV */}
                <div className="bg-background-light m-3 rounded-lg shadow-lg"></div>

                <div className="grid grid-rows-[auto_auto] h-content">
                    {/* RANKING DIV */}
                    <div className="shadow-lg overflow-hidden bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg">
                        <Ranking />
                    </div>
                    {/* RECENT TRANSACTIONS DIV */}
                    <div className="shadow-lg overflow-hidden bg-background-light m-[0.75rem_0.75rem_0.75rem_0] rounded-lg">
                        <RecentTransactions />
                    </div>
                </div>
            </div>
        </div>
    );
}
