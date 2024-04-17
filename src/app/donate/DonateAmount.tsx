import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { IoMdArrowBack } from "react-icons/io";
import API_URL from "@/constants/apiRoute";

/**
 * Component to handle donation amount input.
 *
 * @param {Object} props - The component props.
 * @param {string} props.target - The target user to which the donation is made.
 * @param {Function} props.setStage - Function to update the stage of the donation process.
 * @param {Function} props.setDetails - Function to set donation details after the donation.
 */
const DonateAmount = ({
    target,
    setStage,
    setDetails,
}: {
    target: string;
    setStage: (stage: 0 | 1 | 2) => void;
    setDetails: (details: any) => void;
}) => {
    // The status of the loading in the 'send' button
    const [loading, setLoading] = useState(false);

    /**
     * Handle the donation submission.
     *
     * @param {Event} e - The form submission event.
     */
    const doTheDonate = (e: any) => {
        e.preventDefault();
        setLoading(true);

        const points = e.target[0].value;
        if (!points) {
            return;
        }

        // The config for the POST request
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

        // Make the donation API call
        fetch(API_URL + "/donate", config).then(async (res) => {
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
                    min={10}
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

export default DonateAmount;
