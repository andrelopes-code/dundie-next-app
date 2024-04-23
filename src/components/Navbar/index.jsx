"use client";

import useLogout from "@/hooks/useLogout";
import { SiDogecoin } from "react-icons/si";
import Link from "next/link";

export default function Navbar() {
    return (
        <div>
            <header className="bg-background-light">
                <nav
                    className="mx-20 flex items-center justify-between p-4 lg:px-16 "
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="flex flex-row items-center gap-[1px] hover:animate-logoShake font-bold text-2xl text-primary">
                                <span className="mt-[3px]">Dundie</span>
                            </span>
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text-light"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <div className="flex flex-row items-center gap-11">
                            <div className="hidden lg:flex lg:gap-x-11">
                                <Link
                                    href="/"
                                    className="text-sm font-semibold transition-colors duration-300 leading-6 text-text hover:bg-background rounded-lg py-1 px-3"
                                >
                                    HOME
                                </Link>
                                <Link
                                    href="/user/profile"
                                    className="text-sm font-semibold transition-colors duration-300 leading-6 text-text hover:bg-background rounded-lg py-1 px-3"
                                >
                                    PROFILE
                                </Link>
                                <Link
                                    href="/donate"
                                    className="text-sm font-semibold transition-colors duration-300 leading-6 text-text hover:bg-background rounded-lg py-1 px-3"
                                >
                                    DONATE
                                </Link>
                                <Link
                                    href="/admin"
                                    className="text-sm font-semibold transition-colors duration-300 leading-6 text-text hover:bg-background rounded-lg py-1 px-3"
                                >
                                    ADMIN
                                </Link>
                            </div>
                            <button
                                onClick={useLogout}
                                className="bg-primary py-1 px-2 rounded-lg text-sm font-medium leading-6 text-text-invert"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </nav>
                <div className="lg:hidden">
                    <div className="fixed inset-0 z-10"></div>
                    <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/dashboard" className="-m-1.5 p-1.5">
                                <span className="font-bold text-2xl text-primary">
                                    DUNDIE
                                </span>
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-text-light"
                            >
                                <span className="sr-only">Close menu</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <Link
                                        href="/user/profile"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text hover:bg-gray-50"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/donate"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text hover:bg-gray-50"
                                    >
                                        Donate
                                    </Link>
                                    <Link
                                        href="/admin"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text hover:bg-gray-50"
                                    >
                                        Administrative
                                    </Link>
                                </div>
                                <div className="py-6">
                                    <button
                                        onClick={useLogout}
                                        href="/logout"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-text hover:bg-gray-50"
                                    >
                                        Log out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
