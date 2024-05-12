import { MdFeedback } from "react-icons/md";
import API_URL from "@/constants/apiRoute";
import {
    setErrorWithTimeout,
    setSuccessWithTimeout,
} from "@/functions/set-error-and-success";

export default function ContactAndFeedback({
    setError,
    setSuccess,
}: {
    setError: any;
    setSuccess: any;
}) {
    // Handles the form submit event
    async function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const feedback = form.feedback.value;

        const data = {
            email: email,
            feedback: feedback,
        };

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        try {
            const res = await fetch(`${API_URL}/feedbacks`, config);
            if (res.ok) {
                setSuccessWithTimeout(
                    "Thank you for your feedback!",
                    setSuccess
                );
                form.reset();
            } else {
                throw res;
            }
        } catch (error) {
            console.log(error);
            setErrorWithTimeout("Something went wrong", setError);
        }
    }

    return (
        <div className="text-text bg-background-light shadow-[0_-4px_20px_0_rgba(10,0,20,0.1)]  p-5">
            <div className="w-full h-full justify-center gap-10 items-center flex flex-row">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-bold text-2xl mb-2">
                        Contact and Feedback Form
                    </h2>
                    <p className="text-text font-medium text-lg text-center mb-2 w-80 text-pretty">
                        Thank you for using our system! Please, share your
                        feedback with us so that we can improve your experience.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="w-full flex flex-row gap-3">
                        <input
                            className="w-full mb-3 bg-background resize-none text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            spellCheck={false}
                            required
                        />
                    </div>

                    <textarea
                        className="w-full mb-3 bg-background resize-none text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                        id="feedback"
                        name="feedback"
                        placeholder="Detail your feedback here..."
                        rows={4}
                        cols={50}
                        required
                    />

                    <button
                        type="submit"
                        className="text-text-invert transition-all duration-500 ease font-medium px-3 py-1 w-full h-8 flex justify-center items-center rounded-lg hover:shadow-[#9495ee99] hover:shadow-[0_0_22px_-1px] bg-primary"
                    >
                        <MdFeedback className="mr-1" /> Send feedback
                    </button>
                </form>
            </div>
        </div>
    );
}
