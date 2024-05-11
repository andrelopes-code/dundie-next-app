import { SiDogecoin } from "react-icons/si";
import API_URL from "@/constants/apiRoute";
import { setErrorWithTimeout } from "@/functions/set-error-and-success";
import Image from "next/image";
import { useState } from "react";
import Loading from "@/components/Loading";

/**
 * Changes the button's appearance and disables it for 2 seconds after a successful or failed purchase.
 *
 * @param {HTMLButtonElement} btn The button to be changed
 * @param {string} type "s" for success or "e" for error
 */
function buttonChange(btn: HTMLButtonElement, type: string) {
    if (type === "s") {
        btn.disabled = true;
        btn.classList.remove("bg-text");
        btn.classList.add("bg-green-500");
        btn.innerText = "Success";
        setTimeout(() => {
            btn.classList.add("bg-text");
            btn.classList.remove("bg-green-500");
            btn.innerText = "Order";
            btn.disabled = false;
        }, 2000);
    } else {
        btn.disabled = true;
        btn.classList.remove("bg-text");
        btn.classList.add("bg-red-500");
        btn.innerText = "Error";
        setTimeout(() => {
            btn.classList.add("bg-text");
            btn.classList.remove("bg-red-500");
            btn.innerText = "Order";
            btn.disabled = false;
        }, 2000);
    }
}

/**
 * Product component.
 *
 * This component displays a single product with its name, price, image, and a button to order it.
 * When the button is clicked, it sends a POST request to the API_URL/products?id=id endpoint
 * and changes the button's appearance and disables it for 2 seconds.
 * If the response is successful, it displays a success message.
 * Otherwise, it displays an error message.
 *
 * @param {object} props The props for the component
 * @param {number} props.id The id of the product
 * @param {string} props.name The name of the product
 * @param {string} props.price The price of the product
 * @param {string} props.image The image of the product
 * @param {Function} props.setError The function to set the error message
 *
 * @returns {JSX.Element} The product component
 */

export default function Product({ id, name, price, image, setError }: any) {
    const [loading, setLoading] = useState(false);
    /**
     * Handles the order button click event.
     *
     * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e The click event
     */
    async function orderProduct(e: any) {
        const elem: HTMLButtonElement = e.target;

        /**
         * Orders the product.
         */
        async function orderTheProduct() {
            try {
                const response = await fetch(`${API_URL}/products?id=${id}`, {
                    method: "POST",
                });

                if (response.ok) {
                    buttonChange(elem, "s");
                } else {
                    const data = await response.json();
                    setErrorWithTimeout(data.detail, setError, 3000);
                    buttonChange(elem, "e");
                }
            } catch (error) {
                console.error("Error while buying:", error);
            }
        }
        setLoading(true);
        await orderTheProduct();
        setLoading(false);
    }

    return (
        <div
            className={
                "hover:scale-[1.02] transition-all fixtransition duration-[800ms] delay-75 flex w-[210px] min-w-[210px] h-[350px] max-h-[350px] max-w-xs flex-col overflow-hidden rounded-lg border-l-2 border-t-2 border-zinc-100 bg-background-light shadow-lg" +
                (loading
                    ? " animate-[pulse_1s_cubic-bezier(0.4,_0,_0.6,_1)_infinite;]"
                    : "")
            }
        >
            <div className="flex flex-col justify-between h-full">
                {/* PRODUCT IMAGE AND NAME */}
                <div>
                    <div className="mx-3 mt-3 flex aspect-square overflow-hidden rounded-xl">
                        <Image
                            className="object-cover w-full transition-all fixtransition duration-500"
                            src={image}
                            alt="product image"
                            width={200}
                            height={200}
                        />
                        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white"></span>
                    </div>

                    <div className="mt-4 px-5">
                        <p className="text-sm tracking-tight mb-4 text-text">
                            {name}
                        </p>
                    </div>
                </div>
                {/* PRODUCT PRICE */}
                <div className="mt-2 mb-5 mx-3 flex items-center justify-between">
                    <p>
                        <span className="text-xl pt-[2px] font-bold flex items-center flex-row text-text">
                            <SiDogecoin size={24} className="mr-1 mb-[2px]" />
                            {price}
                        </span>
                    </p>
                    <button
                        onClick={orderProduct}
                        className="flex items-center transition-all duration-500 w-[40%] max-h-8 justify-center rounded-md bg-text px-5 py-2.5 text-center text-sm font-medium text-white"
                    >
                        Order
                    </button>
                </div>
            </div>
        </div>
    );
}
