"use client";

import Navbar from "@/components/Navbar";
import Ranking from "@/components/Ranking";
import RecentTransactions from "@/components/RecentTransactions";
import MainSection from "@/components/MainSection";

export default function Home() {
    return (
        <div className="h-screen bg-background">
            <div className="drop-shadow-[0_0_10px_rgba(0,0,22,0.1)]">
                <Navbar />
            </div>
            <div className="bg-background px-24 h-content grid grid-cols-[2fr_1fr]">
                {/* MAIN DIV */}

                <div className="m-[0.75rem_0.75rem_0.75rem_0] overflow-auto overflow-x-hidden sb rounded-lg shadow-lg bg-background-light">
                    <MainSection />
                </div>

                <div className="h-content">
                    {/* RANKING DIV */}
                    <div className="shadow-lg p-4 text-sm overflow-hidden h-1/2 bg-background-light m-[0.75rem_0.75rem_0_0] rounded-lg fixtransition transition-all duration-700 delay-200 hover:translate-x-2">
                        <Ranking />
                    </div>
                    {/* RECENT TRANSACTIONS DIV */}
                    <div className="shadow-lg overflow-hidden text-sm bg-background-light m-[0.75rem_0.75rem_0.75rem_0] z-10 rounded-lg fixtransition transition-all duration-700 delay-200 hover:translate-x-2">
                        <RecentTransactions />
                    </div>
                </div>
            </div>
        </div>
    );
}
