"use client";

import { useEffect, useState, useRef } from "react";
import DeleteDisableEnableUser from "./ChangeUser";
import { NoAvatar } from "@/components/NoAvatar";
import { AdminUser, UserPage } from "@/types/user";
import { MdEdit, MdDelete } from "react-icons/md";
import { Pagination } from "@mui/material";
import { FaRegEyeSlash } from "react-icons/fa";
import Loading from "@/components/Loading";

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
            const alignBottom = e.clientY - menu.offsetHeight + "px";
            const alignLeft = e.clientX + "px";
            menu.style.top = alignBottom;
            menu.style.left = alignLeft;
        } else {
            const alignTop = e.clientY + "px";
            const alignLeft = e.clientX + "px";
            menu.style.top = alignTop;
            menu.style.left = alignLeft;
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
                className="rounded-lg z-50 p-1 py-3 text-xs border appearance-none text-text bg-background shadow-md outline-none fixed bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border-gray-100"
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

    function handleChangePage(_: any, value: number) {
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