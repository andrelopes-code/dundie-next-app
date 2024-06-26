import { useState, useEffect, useRef } from "react";
import Loading from "@/components/Loading";
import getTimeDeltaString from "@/functions/get-time-delta";
import API_URL from "@/constants/apiRoute";

const HeaderItem = () => {
    return (
        <div className="flex flex-row bg-primary items-center justify-between mb-3 py-1 px-4 rounded-lg border-border">
            <div className="flex flex-row gap-4 items-center">
                <div className="flex justify-center w-32 overflow-hidden">
                    <p className="text-text-invert flex font-semibold tracking-wide text-nowrap max-w-32 overflow-hidden">
                        FROM
                    </p>
                </div>
                <div className="flex justify-center w-32 overflow-hidden">
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
    // console.log(typeof from, typeof to, typeof points, typeof date);
    const difference = new Date() - new Date(date);

    const delta = getTimeDeltaString(difference);

    return (
        <div className="flex flex-row bg-background items-center justify-between py-1 transition-colors duration-200 hover:bg-background-100 px-4 rounded-lg border-border">
            <div className="flex flex-row gap-4 items-center">
                <a
                    href={`/user/${from.username}`}
                    className="flex justify-center w-32 overflow-hidden"
                >
                    <p className="text-text font-semibold text-nowrap max-w-32 overflow-hidden">
                        {from.name == "Points Delivery Man"
                            ? "PointDelivery"
                            : from.username}
                    </p>
                </a>
                <a
                    href={`/user/${to.username}`}
                    className="flex justify-center w-32 overflow-hidden"
                >
                    <p className="text-text font-semibold text-nowrap max-w-32 overflow-hidden">
                        {to.username}
                    </p>
                </a>
            </div>
            <p className="text-text font-semibold text-center w-24">{points}</p>
            <p className="text-text font-semibold text-center w-24">{delta}</p>
        </div>
    );
};

const RecentTransactions = () => {
    const isFirstRender = useRef(true);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRecentTransactions = async () => {
            try {
                const res = await fetch(`${API_URL}/transaction/recent`);
                const data = await res.json();
                setTransactions(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        isFirstRender.current && getRecentTransactions();
        isFirstRender.current = false;
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="h-full flex justify-start flex-col">
                    <h2 className="bg-background transition-colors duration-200 hover:bg-background-100 h-[3.5rem] mb-3 text-center w-full py-3 rounded-lg font-semibold text-primary text-2xl">
                        Recent
                    </h2>
                    <HeaderItem />
                    <div className="overflow-auto noscrollbar flex flex-col gap-2">
                        {transactions.map((trans) => (
                            <TransactionItem
                                key={trans.id}
                                from={trans.from_user}
                                points={trans.points}
                                to={trans.to_user}
                                date={trans.date}
                            />
                        ))}
                        {transactions.length == 0 && (
                            <div className="flex items-center justify-center h-24 text-text font-semibold">
                                <p>No recent transactions</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default RecentTransactions;
