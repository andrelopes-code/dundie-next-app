import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";

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
 * The `ChooseUser` component is the first stage of the Donate process.
 * It allows the user to choose which user to donate to.
 * The component fetches a list of usernames based on the input
 * from the user and displays them as search results.
 * When the user clicks a search result, it updates the target and
 * the search input field. The 'next' button then changes the stage
 * to the `DonateAmount` component.
 */
const ChooseUser = ({
    setStage,
    setTarget,
    urlTarget,
}: {
    setStage: (stage: 0 | 1 | 2) => void;
    setTarget: (target: string) => void;
    urlTarget?: string;
}) => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fills the input with the urlTarget username if it exists
    useEffect(() => {
        if (urlTarget != "undefined") {
            setTarget(urlTarget as string);
            const input: any = document?.getElementById("targetUsername");
            input.value = urlTarget;
            input.focus();
        }
    }, [urlTarget, setTarget]);

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

    const handleSearchItemClick = (clickedUsername: string) => {
        const input: any = document?.getElementById("targetUsername");
        input.value = clickedUsername;
        input.focus();
    };

    // TODO: Add a timeout to the search to avoid too many requests
    // ! REMOVE THE API CALL TO THE BACKEND SERVER localhost:8000
    const getUsernameList = async (e: any) => {
        fetch("http://localhost:8000/user/names?query=" + e.target.value)
            .then(async (res) => await res.json())
            .then((data) => setSearchResults(data));
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
                    required
                    autoFocus
                    pattern="[a-z]+"
                    title="Only lowercase letters allowed"
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
                {searchResults.map((user: any) => {
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


export default ChooseUser;
