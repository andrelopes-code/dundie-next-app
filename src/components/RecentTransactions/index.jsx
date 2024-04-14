import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import { CgArrowLongRight } from "react-icons/cg";
import getTimeDeltaString from "@/functions/get-time-delta";

const HeaderItem = () => {
    return (
        <div className="flex flex-row bg-primary items-center justify-between mb-3 py-1 px-4 rounded-lg border-border">
            <div className="flex flex-row gap-4 items-center">
                <div className="flex justify-center w-16 overflow-hidden">
                    <p className="text-text-invert flex font-semibold tracking-wide text-nowrap max-w-32 overflow-hidden">
                        FROM
                    </p>
                </div>
                <p>
                    <CgArrowLongRight size={22} color="#00000000" />
                </p>
                <div className="flex justify-center w-16 overflow-hidden">
                    <p className="text-text-invert tracking-wide font-semibold text-nowrap max-w-32 overflow-hidden">
                        TO
                    </p>
                </div>
            </div>
            <p className="text-text-invert font-semibold tracking-wide text-center w-24">
                POINTS
            </p>
            <p className="text-text-invert font-semibold tracking-wide text-center w-24">
                DATE
            </p>
        </div>
    );
};

const TransactionItem = ({ from, to, points, date }) => {
    const difference = new Date() - new Date(date);

    const delta = getTimeDeltaString(difference);

    const PDM = ["💸","📦","🌟","⭐","💜","💫","💌","✨",]

    return (
        <div className="flex flex-row bg-background items-center justify-between py-1 px-4 rounded-lg border-border">
            <div className="flex flex-row gap-4 items-center">
                <a
                    href={`/user/${from.username}`}
                    className="flex justify-center w-16 overflow-hidden"
                >
                    <p className="text-text font-semibold text-nowrap max-w-32 overflow-hidden">
                        {from.name == "Points Delivery Man" ? "PDM" + PDM[Math.floor(Math.random() * PDM.length)] : from.name}
                    </p>
                </a>
                <p>
                    <CgArrowLongRight size={22} color="#4344bc" />
                </p>
                <a
                    href={`/user/${to.username}`}
                    className="flex justify-center w-16 overflow-hidden"
                >
                    <p className="text-text font-semibold text-nowrap max-w-32 overflow-hidden">
                        {to.name}
                    </p>
                </a>
            </div>
            <p className="text-text font-bold text-center w-24">{points}</p>
            <p className="text-text font-semibold text-center w-24">{delta}</p>
        </div>
    );
};

const RecentTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/transaction/recent")
            .then(async (res) => await res.json())
            .then((data) => setTransactions(data));
    }, []);

    return (
        <>
            {!transactions.length ? (
                <Loading />
            ) : (
                <div className="h-full m-4 flex justify-start flex-col">
                    <h2 className="bg-background h-[3.5rem] mb-3 text-center w-full py-3 rounded-lg font-semibold text-primary text-2xl">
                        Recent
                    </h2>
                    <HeaderItem />
                    <div className="overflow-auto noscrollbar flex flex-col gap-2">
                        {transactions.map((trans, idx) => (
                            <TransactionItem
                                key={trans.from_id * idx}
                                from={trans.from_user}
                                points={trans.points}
                                to={trans.to_user}
                                date={trans.date}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default RecentTransactions;
