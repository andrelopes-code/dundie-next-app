import { IoMdArrowBack } from "react-icons/io";

/**
 * Component to display the result of the donation.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.details - The details of the donation.
 */
const DonateDetails = ({ details }: { details: any }) => {
    return (
        <>
            {/* If there was an error */}
            {details?.detail ? (
                <>
                    <h2 className="text-2xl text-center">
                        An error occurred while sending points!
                    </h2>
                    <p className="text-red-400 font-bold text-xl">
                        {/* The error message */}
                        {details?.detail}
                    </p>
                    <small
                        // When clicked, reload the page to try again
                        onClick={() => window.location.reload()}
                        className="text-text-inactive mt-8 flex flex-row items-center gap-1 cursor-pointer transition-all ease duration-300 opacity-60 hover:text-primary"
                    >
                        <IoMdArrowBack /> click here to try again
                    </small>
                </>
            ) : (
                <>
                    <h2 className="text-2xl text-center">
                        You have sent {/* The amount of points sent */}
                        <strong className="">{details?.value}</strong> points to{" "}
                        {/* The target username */}
                        <strong>{details?.to}</strong>!
                    </h2>
                    <small
                        // When clicked, go back to the home page
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

export default DonateDetails;
