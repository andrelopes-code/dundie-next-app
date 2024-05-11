import { MdFeedback } from "react-icons/md";
export function FeedbackForm() {
    return (
        <div>
            <div className="text-text bg-background-100 shadow-[0_-4px_20px_0_rgba(10,0,20,0.13)]  p-5">
                <div className="w-full h-full justify-center gap-10 items-center flex flex-row">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-bold text-2xl mb-2">
                            Contact and Feedback Form
                        </h2>
                        <p className="text-text font-medium text-lg text-center mb-2 w-80 text-pretty">
                            Thank you for using our system! Please, share your
                            feedback with us so that we can improve your
                            experience.
                        </p>
                    </div>

                    <form>
                        <input
                            className="w-full mb-3 bg-background-light resize-none text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                        />

                        <textarea
                            className="w-full mb-3 bg-background-light resize-none text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
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

            <div id="thank-you-message">
                <h3>Obrigado por enviar seu feedback!</h3>
                <p>
                    Agradecemos por compartilhar suas opiniões conosco. Seu
                    feedback é extremamente valioso e nos ajudará a melhorar
                    continuamente nosso sistema para atender melhor às suas
                    necessidades.
                </p>
            </div>
        </div>
    );
}
