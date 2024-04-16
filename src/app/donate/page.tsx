"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { IoMdArrowBack } from "react-icons/io";

const SearchItems = ({
    name,
    username,
    onClick,
}: {
    name: string;
    username: string;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className="w-full mt-2 cursor-pointer bg-background transition-all py-1 px-4 rounded-lg ease duration-300 border text-text "
        >
            <p className="text-text">{name}</p>
            <p className="text-text-inactive text-xs">@{username}</p>
        </div>
    );
};

/**
 * The `ChooseUser` component is the first step in the donation process.
 * It allows the user to search for a target user and select one from the search results.
 * Once the user has selected a target, the component redirects them to the `DonateAmount` component.
 */
const ChooseUser = ({
    setStage,
    setTarget,
}: {
    setStage: (stage: 0 | 1 | 2) => void;
    setTarget: (target: string) => void;
}) => {
    // The results of the search
    const [results, setResults] = useState([]);
    // The status of the loading in the 'next' button
    const [loading, setLoading] = useState(false);

    /**
     * Redirects the user to the `DonateAmount` component with the selected target.
     */
    const changeToNextStage = () => {
        const input: any = document?.getElementById("targetUsername");
        const target = input?.value;
        if (!target) {
            return;
        }
        setTarget(target);
        setLoading(true);
        setStage(1);
    };

    /**
     * Handles a click on a search result item.
     * Updates the target and search input field.
     * @param {string} clickedUsername - The username of the user that was clicked.
     */
    const handleSearchItemClick = (clickedUsername: string) => {
        const input: any = document?.getElementById("targetUsername");
        input.value = clickedUsername;
        input.focus();
    };

    /**
     * Searches for users based on the search query in the input field.
     * @param {Object} e - The event object of the input change event.
     * TODO: Add a timeout to the search to avoid too many requests
     */
    const getUsernameList = async (e: any) => {
        fetch("http://localhost:8000/user/names?query=" + e.target.value)
            .then(async (res) => await res.json())
            .then((data) => setResults(data));
    };

    return (
        <>
            <h2 className="text-2xl text-center">
                Who do you want to donate to?
            </h2>
            <div className="w-1/4 flex flex-row flex-nowrap justify-between">
                <input
                    className="w-[75%] bg-background transition-all h-10 ease duration-300 border text-text-inactive focus:text-text outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                    type="text"
                    id="targetUsername"
                    placeholder="username"
                    onChange={(e) => getUsernameList(e)}
                    spellCheck={false}
                    autoComplete="off"
                />
                <div
                    onClick={changeToNextStage}
                    className="w-[22%] text-white font-medium flex items-center justify-center rounded-lg cursor-pointer bg-primary"
                >
                    {loading ? (
                        <VscLoading
                            size={20}
                            color="white"
                            className="animate-spin"
                        />
                    ) : (
                        "next"
                    )}
                </div>
            </div>

            <div className="overflow-auto w-1/4 max-h-60 noscrollbar">
                {results.map((user: any) => {
                    return (
                        <SearchItems
                            key={user.username}
                            name={user.name}
                            username={user.username}
                            onClick={() => handleSearchItemClick(user.username)}
                        />
                    );
                })}
            </div>
        </>
    );
};

const DonateAmount = ({
    target,
    setStage,
    setDetails,
}: {
    target: string;
    setStage: (stage: 0 | 1 | 2) => void;
    setDetails: (details: any) => void;
}) => {
    // The status of the loading in the 'next' button
    const [loading, setLoading] = useState(false);

    const doTheDonate = (e: any) => {
        e.preventDefault();
        setLoading(true);

        const points = e.target[0].value;
        if (!points) {
            return;
        }

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: points,
                target: target,
            }),
        };

        fetch("http://localhost:3000/api/donate", config).then(async (res) => {
            await res.json().then((data) => {
                console.log("data: ", data);
                setDetails(data);
                setStage(2);
            });
        });
    };

    return (
        <>
            <h2 className="text-2xl text-center">
                How many points do you want to donate to &apos;{target}
                &apos; ?
            </h2>
            <form
                id="donateForm"
                onSubmit={(e) => doTheDonate(e)}
                className="w-1/3 flex flex-row flex-nowrap justify-between"
            >
                <input
                    className="w-[75%] bg-background transition-all h-10 ease duration-300 border text-text-inactive focus:text-text outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                    type="number"
                    id="sentAmount"
                    placeholder="points"
                    spellCheck={false}
                    autoComplete="off"
                    required
                />
                <button
                    type="submit"
                    form="donateForm"
                    className="w-[22%] text-white font-medium flex items-center justify-center rounded-lg cursor-pointer bg-primary"
                >
                    {loading ? (
                        <VscLoading
                            size={20}
                            color="white"
                            className="animate-spin"
                        />
                    ) : (
                        "send"
                    )}
                </button>
            </form>

            <small
                onClick={() => setStage(0)}
                className="text-text-inactive mt-8 flex flex-row items-center gap-1 cursor-pointer transition-all ease duration-300 opacity-60 hover:text-primary"
            >
                <IoMdArrowBack /> click here to go back
            </small>
        </>
    );
};

const DonateDetails = ({ details }: { details: any }) => {
    console.log(details);
    return (
        <>
            {details?.detail ? (
                <>
                    <h2 className="text-2xl text-center">
                        An error occurred while sending points!
                    </h2>
                    <p className="text-red-400 font-bold text-xl">
                        {details?.detail}
                    </p>
                    <small
                        onClick={() => window.location.reload()}
                        className="text-text-inactive mt-8 flex flex-row items-center gap-1 cursor-pointer transition-all ease duration-300 opacity-60 hover:text-primary"
                    >
                        <IoMdArrowBack /> click here to try again
                    </small>
                </>
            ) : (
                <>
                    <h2 className="text-2xl text-center">
                        You have sent{" "}
                        <strong className="">{details?.value}</strong> points to{" "}
                        <strong>{details?.to}</strong>!
                    </h2>
                    <small
                        onClick={() => window.location.assign("/")}
                        className="text-text-inactive mt-8 flex flex-row items-center gap-1 cursor-pointer transition-all ease duration-300 opacity-60 hover:text-primary"
                    >
                        <IoMdArrowBack /> click here to go back
                    </small>
                </>
            )}
        </>
    );
};

export default function Donate() {
    const [stage, setStage] = useState(0);
    const [target, setTarget] = useState("");
    const [details, setDetails] = useState();

    return (
        <section className="bg-background">
            <Navbar />
            <div className="h-content py-8 px-[6.75rem]">
                <div className="bg-background-light w-full h-full justify-center shadow-lg flex flex-col text-text items-center gap-5 rounded-lg">
                    {stage === 0 && (
                        <ChooseUser setStage={setStage} setTarget={setTarget} />
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
