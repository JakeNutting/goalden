import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { User, currentUser } from "@clerk/nextjs/server";
import {
  BookOpenText,
  Home,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import Link from "next/link";

export async function Navbar() {
  const currUser = await currentUser();
  return (
    <nav className="dark:bg-gray-900 shadow-sm">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between py-4 px-4 xl:px-0">
        <div className="flex gap-2 items-center">
          <Link
            href="/"
            className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
          >
            Goalden
          </Link>
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex items-center font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <li>
              <Link
                href="/"
                className="block rounded bg-blue-700 px-3 py-2 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
              >
                Home
              </Link>
            </li>
            {/* <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                About
              </a>
            </li> */}
            {/* <li>
              <OrganizationSwitcher />
            </li> */}
            <SignedIn>
              <li>
                <Link
                  href="/dashboard"
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Dashboard
                </Link>
              </li>
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <li className="flex items-center">
              <UserButton></UserButton>
            </li>
          </ul>
        </div>
        <div className="test text-dark md:hidden">
          <MobileNavbar user={currUser}></MobileNavbar>
        </div>
      </div>
    </nav>
  );
}

export function MobileNavbar({ user }: { user: User | null }) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="cursor-pointer hover:text-blue-700">
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
          <div className="flex items-center my-4 mb-3 gap-3">
            <SignedIn>
              <UserButton afterSignOutUrl="/"></UserButton>
              <span className="font-semibold">Hello, {user?.firstName} {user?.lastName}</span>
            </SignedIn>
            <SignedOut>
              <div className="flex flex-col w-full gap-3">
                <h4 className="text-left">Sign in to get started</h4>
                <Button variant={"outline"} size={"sm"}><SignInButton></SignInButton></Button>
              </div>
            </SignedOut>
          </div>
          <Button variant={"outline"} size="sm"><SignOutButton></SignOutButton></Button>
            <hr></hr>
          </SheetHeader>
          <SheetDescription>
            <div className="mt-8">
              <ul className="mt-4 font-medium space-y-5 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
                <li>
                  <a
                    href="/"
                    className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 bg-gray-100 dark:text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    <span className="flex items-center gap-4 font-semibold text-lg">
                      <Home className="text-blue-700"></Home> Home
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  >
                    <span className="flex items-center gap-4 font-semibold text-lg">
                      <BookOpenText></BookOpenText> About
                    </span>
                  </a>
                </li>
                <SignedIn>
                  <li>
                    <Link
                      href="/dashboard"
                      className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                    >
                      <span className="flex items-center gap-4 font-semibold text-lg">
                        {" "}
                        <LayoutDashboard></LayoutDashboard> Dashboard
                      </span>
                    </Link>
                  </li>
                </SignedIn>
              </ul>
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </>
  );
}
