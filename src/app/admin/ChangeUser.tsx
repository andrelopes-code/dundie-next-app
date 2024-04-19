/**
 * This component is the modal that appears when you click the "change user"
 * button in the admin panel.
 */
import { useEffect } from "react";
import API_URL from "@/constants/apiRoute";
import { AdminUser } from "@/types/user";

export default function DeleteDisableEnableUser({
    setChangeThisUser,
    user,
    setError,
    setSuccess,
}: {
    setChangeThisUser: any;
    user: AdminUser;
    setError: any;
    setSuccess: any;
}) {
    // handle click to close the modal
    /**
     * Add an event listener to close the modal when the user clicks outside
     * of it.
     */
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (event.target.id === "delete_background_div") {
                setChangeThisUser("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const setErrorWithTimeout = (errorMessage: string) => {
        setError(errorMessage);
        setTimeout(() => {
            setError("");
        }, 2000);
    };
    const setSuccessWithTimeout = (successMessage: string) => {
        setSuccess(successMessage);
        setTimeout(() => {
            setSuccess("");
        }, 2000);
    };

    const handleClickDisable = () => {
        /**
         * The user is being disabled so we need to send a PUT request to the
         * server with the user's username and admin password. If the request is
         * successful, we want to update the user's is_active status and close
         * the modal.
         */
        const onlyDisable = (
            document.getElementById("onlyMakePrivate") as HTMLInputElement
        ).checked;

        const password = (
            document.getElementById("password") as HTMLInputElement
        ).value;

        const data = {
            username: user.username,
            password: password,
            disable: onlyDisable,
            enable: false,
        };

        fetch(`${API_URL}/admin/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    setSuccessWithTimeout(data?.detail);
                    user.is_active = false;
                    setChangeThisUser("");
                } else {
                    const data = await res.json();
                    setErrorWithTimeout(data.detail);
                }
            })
            .catch((err) => console.log(err));
    };
    const handleClickEnable = () => {
        /**
         * The user is being enabled so we need to send a PUT request to the
         * server with the user's username and admin password. If the request is
         * successful, we want to update the user's is_active status and close
         * the modal.
         */
        const password = (
            document.getElementById("passwordEnable") as HTMLInputElement
        ).value;

        const data = {
            username: user.username,
            password: password,
            disable: false,
            enable: true,
        };

        fetch(`${API_URL}/admin/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async (res) => {
                if (res.ok) {
                    setSuccessWithTimeout("User enabled successfully");
                    user.is_active = true;
                    setChangeThisUser("");
                } else {
                    const data = await res.json();
                    setErrorWithTimeout(data.detail);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div
            id="delete_background_div"
            className="absolute z-20 w-full flex justify-center items-center h-full top-0 left-0 transition-all duration-200 bg-[rgba(0,0,0,0.1)] animate-fadeIn flex-col backdrop-blur-sm"
        >
            <div className="w-auto p-5 h-auto flex flex-col gap-5 bg-background-light animate-scaleIn rounded-lg shadow-lg">
                {
                    // MODAL IF USER IS ENABLED
                    user.is_active && (
                        <>
                            <p className="font-medium text-xl text-center">
                                Are you sure you want to delete or disable '
                                {user.username}
                                '?
                            </p>
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="your password"
                                required
                            />
                            <div className="items-end flex flex-row justify-between">
                                <div className="flex flex-row gap-3 items-center font-medium text-sm">
                                    <input
                                        className="w-4 h-4"
                                        type="checkbox"
                                        defaultChecked
                                        checked
                                        id="onlyMakePrivate"
                                    />
                                    <label htmlFor="onlyMakePrivate">
                                        Just make the user inactive (delete
                                        isn't working)
                                    </label>
                                </div>

                                <div>
                                    <button
                                        onClick={handleClickDisable}
                                        className="px-4 py-1 rounded-lg font-medium ml-14 bg-red-500 text-text-invert"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => setChangeThisUser("")}
                                        className="px-4 ml-3 py-1 rounded-lg font-medium bg-primary text-text-invert"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    // MODAL IF USER IS DISABLED AND NOT DELETED
                    !user.is_active && (
                        <>
                            <p className="font-medium text-xl text-center">
                                Are you sure you want to activate '
                                {user.username}
                                '?
                            </p>
                            <input
                                className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                                type="password"
                                name="passwordEnable"
                                id="passwordEnable"
                                placeholder="your password"
                                required
                            />
                            <div className="items-end flex flex-row justify-end">
                                <div>
                                    <button
                                        onClick={() => handleClickEnable()}
                                        className="px-4 py-1 rounded-lg font-medium ml-14 bg-green-500 text-text-invert"
                                    >
                                        Enable
                                    </button>
                                    <button
                                        onClick={() => setChangeThisUser("")}
                                        className="px-4 ml-3 py-1 rounded-lg font-medium bg-primary text-text-invert"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}
