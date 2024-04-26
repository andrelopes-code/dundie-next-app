"use client";

import { useEffect, useRef, useState } from "react";
import DeleteDisableEnableUser from "./ChangeUser";
import { NoAvatar } from "@/components/NoAvatar";
import { AdminUser, UserPage } from "@/types/user";
import { MdEdit, MdDelete } from "react-icons/md";
import { Pagination } from "@mui/material";
import { FaRegEyeSlash } from "react-icons/fa";

/**
 * Component to display a single item in the list of users.
 *
 * @prop {AdminUser} user - The user to display
 * @prop {Function} setChangeThisUser - Function to call when the delete or
 *     disable/enable button is clicked
 *
 * @returns {JSX.Element}
 */
function ListUsersItem({
    user,
    setChangeThisUser,
}: {
    user: AdminUser;
    setChangeThisUser: any;
}) {
    return (
        <li
            className={`border-b-[2px] border-gray-200 pb-5 mb-2 py-1 px-3 flex flex-row text-text justify-between items-center h-14 last:border-none ${
                user.is_active ? "" : "opacity-50"
            }`}
        >
            <div className="flex flex-row gap-3">
                {/* AVATAR */}
                <div className="rounded-full h-10 w-10 flex overflow-hidden">
                    <NoAvatar className="h-10 w-10" src={user.avatar} />
                </div>
                {/* NAME AND USERNAME */}
                <div className="flex flex-col w">
                    <p className="text-text font-semibold">{user.name}</p>
                    <p className="text-text-inactive text-xs">
                        @{user.username}
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
                {user.is_active ? (
                    <p className="text-primary mr-2 font-bold text-xs">
                        enabled
                    </p>
                ) : (
                    <p className="text-red-500 mr-2 font-bold text-xs">
                        disabled
                    </p>
                )}
                {/* EDIT AND DELETE BUTTONS */}
                <button
                    className="bg-primary rounded-lg text-text-invert p-1"
                    onClick={() => setChangeThisUser(user)}
                >
                    <MdEdit />
                </button>
                {user.is_active ? (
                    <button
                        className="bg-red-500 rounded-lg text-text-invert p-1"
                        onClick={() => setChangeThisUser(user)}
                    >
                        <MdDelete />
                    </button>
                ) : (
                    <button
                        className="bg-red-500 rounded-lg text-text-invert p-1"
                        onClick={() => setChangeThisUser(user)}
                    >
                        <FaRegEyeSlash />
                    </button>
                )}
            </div>
        </li>
    );
}

/**
 * Component to display a list of users.
 *
 * @prop {UserPage | undefined} users - The list of users to display
 * @prop {Function} getPage - Function to call to get a new page of users
 * @prop {Function} setError - Function to call to set the error state
 * @prop {Function} setSuccess - Function to call to set the success state
 *
 * @returns {JSX.Element}
 */
export default function ListUsers({
    users,
    getPage,
    setError,
    setSuccess,
}: {
    users: UserPage | undefined;
    getPage: any;
    setError: any;
    setSuccess: any;
}) {
    const isFirstRender = useRef(true);
    const [changeThisUser, setChangeThisUser] = useState();

    /**
     * Function to handle a page change.
     *
     * @param {React.ChangeEvent<unknown>} e - The event object
     * @param {number} value - The new page number
     */
    function handleChangePage(e: any, value: number) {
        getPage(value);
    }

    useEffect(() => {
        isFirstRender.current && getPage(1);
        isFirstRender.current = false;
    }, [getPage]);

    return (
        <>
            {/* DELETE DISABLE AND ENABLE USER MODAL */}
            {changeThisUser && (
                <DeleteDisableEnableUser
                    user={changeThisUser}
                    setChangeThisUser={setChangeThisUser}
                    setError={setError}
                    setSuccess={setSuccess}
                />
            )}
            {/* LIST OF ALL USERS */}
            <div>
                <h2 className="select-none bg-background-light mt-5 text-text font-medium text-xl rounded-lg mx-5">
                    Users
                </h2>
                <ul className="m-5">
                    {users &&
                        users.items.map((user) => (
                            <ListUsersItem
                                key={user.id}
                                user={user}
                                setChangeThisUser={setChangeThisUser}
                            />
                        ))}
                </ul>
            </div>
            <Pagination
                count={users?.pages}
                shape="rounded"
                onChange={handleChangePage}
                className="flex justify-end mr-5 mb-5 opacity-40"
            />
        </>
    );
}
