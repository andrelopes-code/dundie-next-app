import Navbar from "@/components/Navbar";
export default function About() {
    return (
        <div className="bg-background-light text-lg">
            <div className="sticky top-0">
                <Navbar />
            </div>
            <div className="flex flex-col items-center py-24 mx-44 text-text">
                <div className="flex flex-col gap-4 mb-24">
                    <h1 className="font-bold text-3xl text-primary">
                        Welcome to the Dunder Mifflin Points System!
                    </h1>
                    <p className="text-justify mb-6">
                        At Dunder Mifflin, we believe in recognizing and reward
                        the commitment and talent of our employees. Our Scoring
                        System is a way fun and motivating way to recognize your
                        contributions for the company's success.
                    </p>
                    <h2 className="font-bold text-2xl text-primary">
                        How it works?
                    </h2>
                    <p className="text-justify mb-6">
                        Our points distribution table offers several ways you
                        can earn points. Since product sales to participation in
                        company events company and positive feedbacks from
                        customers, there are many opportunities to accumulate
                        points and be recognized for your hard work and
                        creativity.
                    </p>
                    <h2 className="font-bold text-2xl text-primary">
                        What Can You Earn?
                    </h2>
                    <p className="text-justify mb-6">
                        The points you earn can be exchanged for a variety of
                        prizes and incentives. From financial bonuses to special
                        recognitions and even gifts Exclusive to Dunder Mifflin,
                        there's something for everyone!
                    </p>
                    <h2 className="font-bold text-2xl text-primary">
                        Be Part of Our Community!
                    </h2>
                    <p className="text-justify mb-6">
                        In addition to being a way to recognize your work, Our
                        points system also makes the more fun and engaging work.
                        Participate in internal competitions, thematic events
                        and sustainability to earn extra points and stand out in
                        the company.
                    </p>
                    <h2 className="font-bold text-2xl text-primary">
                        Start Earning Points Now!
                    </h2>
                    <p className="text-justify mb-6">
                        Explore our points distribution table below to learn how
                        you can start earning points today same. And remember,
                        at Dunder Mifflin, your job hard work never goes
                        unnoticed!
                    </p>
                </div>
                <div className="overflow-hidden rounded-lg w-full shadow-lg">
                    <table className="rounded-lg w-full">
                        <thead className="bg-primary text-text-invert">
                            <tr>
                                <th className="p-2 font-semibold">Category</th>
                                <th className="p-2 font-semibold">
                                    Description
                                </th>
                                <th className="p-2 font-semibold">Points</th>
                            </tr>
                        </thead>
                        <tbody className="bg-background text-sm">
                            <tr>
                                <td className="p-3">Product Sales</td>
                                <td className="p-3">For each sale made</td>
                                <td className="p-3">20 points per sale</td>
                            </tr>
                            <tr className="bg-zinc-300">
                                <td className="p-3">
                                    Participation in Company Events
                                </td>
                                <td className="p-3">
                                    Attendance at company events
                                </td>
                                <td className="p-3">30 points per event</td>
                            </tr>
                            <tr>
                                <td className="p-3">
                                    Positive Feedback from Customers
                                </td>
                                <td className="p-3">
                                    Positive feedback from customers
                                </td>
                                <td className="p-3">
                                    70 points for positive feedback
                                </td>
                            </tr>
                            <tr className="bg-zinc-300">
                                <td className="p-3">
                                    Innovation and Creativity
                                </td>
                                <td className="p-3">
                                    Suggestions for improvement or innovative
                                    ideas
                                </td>
                                <td className="p-3">
                                    50 points for improvement suggestion or idea
                                    innovative
                                </td>
                            </tr>
                            <tr>
                                <td className="p-3">Professional Trainings</td>
                                <td className="p-3">
                                    Participation in courses or training
                                </td>
                                <td className="p-3">
                                    60 points per course or training
                                </td>
                            </tr>
                            <tr className="bg-zinc-300">
                                <td className="p-3">Service time</td>
                                <td className="p-3">
                                    For each year of service in the company
                                </td>
                                <td className="p-3">
                                    150 points per year of service
                                </td>
                            </tr>
                            <tr>
                                <td className="p-3">
                                    Sustainability Initiatives
                                </td>
                                <td className="p-3">
                                    Participation in initiatives sustainability
                                </td>
                                <td className="p-3">
                                    80 points for sustainability initiative
                                </td>
                            </tr>
                            <tr className="bg-zinc-300">
                                <td className="p-3">
                                    Participation in Internal Competitions
                                </td>
                                <td className="p-3">
                                    Participation and victory in internal
                                    competitions
                                </td>
                                <td className="p-3">
                                    50 points for participation, 150 points for
                                    the winner
                                </td>
                            </tr>
                            <tr>
                                <td className="p-3">working Environment</td>
                                <td className="p-3">
                                    Acts that promote a working environment
                                    positive
                                </td>
                                <td className="p-3">
                                    60 points for each act of promoting the work
                                    environment work
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
