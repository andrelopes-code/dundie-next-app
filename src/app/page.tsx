"use client";

import Navbar from "@/components/Navbar";
import Ranking from "@/components/Ranking";
import RecentTransactions from "@/components/RecentTransactions";
import MainSection from "@/components/MainSection";

export default function Home() {
    return (
        <div className="h-screen flex flex-col justify-start">
            <Navbar />
            <div className="px-24 max-h-full h-full overflow-hidden flex flex-row">
                <div
                    id="mainSectionWrapper"
                    className="w-2/3 m-3 overflow-y-auto overflow-x-hidden sb rounded-lg shadow-lg bg-background-light"
                >
                    <MainSection />
                </div>

                <div className="w-1/3 max-h-full pr-3 my-3 overflow-auto overflow-x-visible noscrollbar drop-shadow-lg">
                    {/* Ranking DIV */}
                    <div className="p-4 text-xs h-1/2 overflow-hidden bg-background-light rounded-lg fixtransition transition-all duration-700 delay-200 hover:translate-x-2">
                        <Ranking />
                    </div>
                    {/* RecentTransactions DIV */}
                    <div className="p-4 text-xs mt-3 h-fit overflow-hidden bg-background-light rounded-lg fixtransition transition-all duration-700 delay-200 hover:translate-x-2">
                        <RecentTransactions />
                    </div>
                </div>
            </div>
        </div>
    );
}

