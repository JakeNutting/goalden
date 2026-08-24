import { RadioTower } from "lucide-react";
import Link from "next/link";

export async function Navbar() {
    return (
        <nav className="dark:bg-gray-900 shadow-sm">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between py-4 px-4 xl:px-0"> 
                <div className="flex gap-2 items-center">
                    <Link
                        href="/"
                        className="self-center flex gap-2 whitespace-nowrap text-xl font-semibold text-gray-600 dark:text-white"
                        >
                        <RadioTower className="text-cyan-500" />
                        PCG Connect
                    </Link>
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="mt-4 flex items-center font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
                        <li>
                        <Link
                            href="/"
                            className="block rounded px-3 py-2 dark:text-white md:bg-transparent md:p-0 text-cyan-500"
                        >
                            Home
                        </Link>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                            >
                                About
                            </a>
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