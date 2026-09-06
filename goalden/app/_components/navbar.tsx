"use client";

import { cn } from "@/lib/utils";
import { Home, ListCheck, ListChecks, ShelvingUnit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function Navbar() {
    const currentRoute = usePathname();
    return (
        <nav className="dark:bg-gray-900 shadow-sm">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between py-4 px-4 xl:px-0"> 
                <div className="flex gap-2 items-center">
                    <Link
                        href="/"
                        className="self-center flex gap-2 whitespace-nowrap text-xl font-semibold text-gray-600 dark:text-white"
                        >
                        <ListCheck className="text-cyan-500" />
                        GoalDen
                    </Link>
                </div>
                {/* Mobile UI */}
                <nav className="fixed inset-x-0 bottom-0 z-9999 w-full border-t-2 border-gray-100 bg-white md:hidden dark:bg-gray-900">
                    <div className="flex items-center divide-x-2 text-xs">
                        <Link
                            className={cn(
                                "flex-1 dark:text-white text-gray-700 hover:bg-cyan-50 p-2 flex flex-col items-center gap-1.5",
                                currentRoute === "/" && "bg-cyan-50"
                            )}
                            href="/"
                            >
                            <Home></Home>
                            Home
                        </Link>
                        <Link
                            className={cn(
                                "flex-1 dark:text-white text-gray-700 hover:bg-cyan-50 p-2 flex flex-col items-center gap-1.5",
                                currentRoute === "/inventory" && "bg-cyan-50 text-cyan-600 font-semibold"
                            )}
                            href="/inventory"
                            >
                            <ShelvingUnit></ShelvingUnit>
                            Inventory
                        </Link>
                        <Link
                            className={cn(
                                "flex-1 dark:text-white text-gray-700 hover:bg-cyan-50 p-2 flex flex-col items-center gap-1.5",
                                currentRoute === "/grocery-list" && "bg-cyan-50"
                            )}
                            href="/grocery-list"
                            >
                            <ListChecks></ListChecks>
                            Grocery List
                        </Link>

                    </div>
                </nav>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="mt-4 flex items-center font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
                        <li>
                            <Link
                                className={cn(
                                    "block rounded-lg dark:text-white px-3 py-2 text-gray-700 hover:bg-cyan-50",
                                    currentRoute === "/" && "bg-cyan-50"
                                )}
                                href="/"
                                >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard"
                                 className={cn(
                                    "block rounded-lg dark:text-white px-3 py-2 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600",
                                    currentRoute.includes("/dashboard") && "bg-cyan-50 text-cyan-600"
                                )}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/inventory"
                                 className={cn(
                                    "block rounded-lg dark:text-white px-3 py-2 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600",
                                    currentRoute.includes("/inventory") && "bg-cyan-50 text-cyan-600"
                                )}>
                                Inventory
                            </Link>
                        </li>
                         <li>
                            <Link
                                href="/about"
                                 className={cn(
                                    "block rounded-lg dark:text-white px-3 py-2 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600",
                                    currentRoute.includes("/about") && "bg-cyan-50 text-cyan-600"
                                )}
                            >
                                About
                            </Link>
                        </li>
                        {/* <li>
                        <OrganizationSwitcher />
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}