"use client";

export default function ListHeader({
    activeSection,
    setActiveSection,
}: {
    activeSection: string;
    setActiveSection: Function;
}) {
    return (
        <div className="select-none flex gap-5 bg-background-light mt-5 text-text font-medium text-lg rounded-lg mx-5">
            <button
                className={
                    "hover:bg-background px-3 py-1 transition-all duration-300 rounded-lg" +
                    (activeSection === "users" ? " bg-background" : "")
                }
                onClick={() => setActiveSection("users")}
            >
                Users
            </button>
            <button
                className={
                    "hover:bg-background px-3 py-1 transition-all duration-300 rounded-lg" +
                    (activeSection === "orders" ? " bg-background" : "")
                }
                onClick={() => setActiveSection("orders")}
            >
                Orders
            </button>
            <button
                className={
                    "hover:bg-background px-3 py-1 transition-all duration-300 rounded-lg" +
                    (activeSection === "feedbacks" ? " bg-background" : "")
                }
                onClick={() => setActiveSection("feedbacks")}
            >
                Feedbacks
            </button>
            <button
                className={
                    "hover:bg-background px-3 py-1 transition-all duration-300 rounded-lg" +
                    (activeSection === "products" ? " bg-background" : "")
                }
                onClick={() => setActiveSection("products")}
            >
                Products
            </button>
        </div>
    );
}
