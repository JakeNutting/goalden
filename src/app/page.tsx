import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-r from-green-500/20 to-blue-700/20 py-20">
        <div className="mx-auto max-w-screen-xl px-2 xl:px-0">
          <h1 className="text-dark text-3xl font-semibold md:text-center">
            A goal management and life tracking application
          </h1>
          <p className="mt-1 flex text-lg font-normal md:justify-center">
            <SignedOut>
            <span>Click below to begin your journey to bettering your <span className="text-blue-700 font-semibold inline">lifestyle</span> !</span>
            </SignedOut>
            <SignedIn>
              <span>Click below to begin your journey to bettering your <span className="text-blue-700 font-semibold inline">lifestyle</span> !</span>
            </SignedIn>
          </p>
          <div className="flex md:justify-center">
            <Button variant={"default"} className="mt-3 flex justify-center">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">Get Started</Link>
              </SignedIn>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
