"use client";

import { useEffect, useState, useRef } from "react";
import DeleteDisableEnableUser from "./ChangeUser";
import { NoAvatar } from "@/components/NoAvatar";
import { AdminUser, UserPage } from "@/types/user";
import { MdEdit, MdDelete } from "react-icons/md";
import { Pagination } from "@mui/material";
import { FaRegEyeSlash } from "react-icons/fa";
import Loading from "@/components/Loading";

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
    setEditUserData,
}: {
    user: AdminUser;
    setChangeThisUser: any;
    setEditUserData: any;
}) {
    const floatingMenu = useRef<HTMLDivElement>(null);

    async function showFloatingMenu(e: any) {
        e.preventDefault();

        const menu = floatingMenu.current as HTMLDivElement;
        menu.hidden = false;

        if (e.clientY > 650) {
            menu.style.top = e.clientY - menu.offsetHeight + "px";
            menu.style.left = e.clientX + "px";
        } else {
            menu.style.top = e.clientY + "px";
            menu.style.left = e.clientX + "px";
        }
        menu.focus();
    }

    function closeFloatingMenu() {
        const menu = floatingMenu.current as HTMLDivElement;
        menu.hidden = true;
    }

    return (
        <li
            onContextMenu={showFloatingMenu}
            className={`border-b-[1px] first:pt-2 pt-4 pb-2 transition-colors duration-300 border-background px-3 flex flex-row text-text justify-between items-center last:border-none ${
                user.is_active ? "" : "opacity-50"
            }`}
        >
            {/* FLOATING MENU */}
            <div
                tabIndex={0}
                ref={floatingMenu}
                hidden
                onBlur={() => closeFloatingMenu()}
                className="rounded-lg z-50 p-1 py-3 text-xs border appearance-none text-text bg-background shadow-md outline-none absolute bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border-gray-100"
            >
                <ContextMenuList user={user} />
            </div>

            <div className="flex flex-row gap-3">
                {/* AVATAR */}
                <div className="rounded-full h-10 w-10 flex overflow-hidden">
                    <NoAvatar className="h-10 w-10" src={user.avatar} />
                </div>
                {/* NAME AND USERNAME */}
                <div className="flex flex-col justify-center">
                    <p className="text-text font-semibold text-sm">
                        {user.name}
                    </p>
                    <p className="text-text-inactive text-xs">
                        @{user.username}
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
                {user.is_active ? (
                    <p className="text-primary mr-2 font-bold text-[10px]">
                        enabled
                    </p>
                ) : (
                    <p className="text-red-500 mr-2 font-bold text-[10px]">
                        disabled
                    </p>
                )}
                {/* EDIT AND DELETE BUTTONS */}
                <button
                    className="hover:bg-background rounded-lg text-primary p-1"
                    onClick={() => setEditUserData(user)}
                >
                    <MdEdit />
                </button>
                {user.is_active ? (
                    <button
                        className="hover:bg-background rounded-lg text-primary p-1"
                        onClick={() => setChangeThisUser(user)}
                    >
                        <MdDelete />
                    </button>
                ) : (
                    <button
                        className="hover:bg-background rounded-lg text-primary p-1"
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
    setEditUserData,
}: {
    users: UserPage | undefined;
    getPage: any;
    setError: any;
    setSuccess: any;
    setEditUserData: any;
}) {
    const [changeThisUser, setChangeThisUser] = useState();
    let isFirstRender = true;

    /**
     * Function to handle a page change.
     *
     * @param {React.ChangeEvent<unknown>} e - The event object
     * @param {number} value - The new page number
     */
    function handleChangePage(e: any, value: number) {
        getPage(value);
    }

    // Fetch users when the component mount
    useEffect(() => {
        isFirstRender && getPage(1);
        isFirstRender = false;
    }, [isFirstRender]);

    return (
        <>
            {!users && <Loading />}
            {users?.total === 0 && <p>No users found</p>}
            {/* LIST OF ALL ORDERS */}
            {users && users.total > 0 && (
                <>
                    {/* DELETE DISABLE AND ENABLE USER MODAL */}

                    {/* LIST OF ALL USERS */}
                    <div className="relative">
                        <div className="TopGradient"></div>
                        <div className="BottomGradient"></div>
                        <div className="h-[78vh] mx-5 overflow-y-auto noscrollbar">
                            {changeThisUser && (
                                <DeleteDisableEnableUser
                                    user={changeThisUser}
                                    setChangeThisUser={setChangeThisUser}
                                    setError={setError}
                                    setSuccess={setSuccess}
                                />
                            )}
                            <ul className="m-5">
                                {users.items.map((user) => (
                                    <ListUsersItem
                                        key={user.id}
                                        user={user}
                                        setChangeThisUser={setChangeThisUser}
                                        setEditUserData={setEditUserData}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Pagination
                        count={users?.pages}
                        shape="rounded"
                        onChange={handleChangePage}
                        className="flex justify-end mr-5 mb-5 opacity-40"
                    />
                </>
            )}
        </>
    );
}

function ContextMenuList({ user }: { user: AdminUser }) {
    return (
        <ul className="flex flex-col gap-1">
            <li className="hover:bg-[#00000008] p-1 rounded-[4px] flex gap-5 flex-row justify-between">
                <p className="font-semibold">name: </p>
                <p className="">{user.name}</p>
            </li>
            <li className="hover:bg-[#00000008] p-1 rounded-[4px] flex gap-5 flex-row justify-between">
                <p className="font-semibold">username: </p>
                <p className="">{user.username}</p>
            </li>
            <li className="hover:bg-[#00000008] p-1 rounded-[4px] flex gap-5 flex-row justify-between">
                <p className="font-semibold">email: </p>
                <p className="">{user.email}</p>
            </li>
            <li className="hover:bg-[#00000008] p-1 rounded-[4px] flex gap-5 flex-row justify-between">
                <p className="font-semibold">departament: </p>
                <p className="">{user.dept}</p>
            </li>
            <li className="hover:bg-[#00000008] p-1 rounded-[4px] flex gap-5 flex-row justify-between">
                <p className="font-semibold">created at: </p>
                <p className="">
                    {new Date(user.created_at).toLocaleDateString()}
                </p>
            </li>
            <li className="hover:bg-[#00000008] p-1 rounded-[4px] flex gap-5 flex-row justify-between">
                <p className="font-semibold">active: </p>
                <p className="">{user.is_active.toString()}</p>
            </li>
            <li className="hover:bg-[#00000008] p-1 rounded-[4px] flex gap-5 flex-row justify-between">
                <p className="font-semibold">private: </p>
                <p className="">{user.private.toString()}</p>
            </li>
        </ul>
    );
}