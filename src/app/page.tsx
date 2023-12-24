import { Button } from "@/components/ui/button";
import { Navbar } from "./_components/navbar";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className="bg-gradient-to-r from-green-500/20 to-blue-700/20 py-20">
        <div className="mx-auto max-w-screen-xl px-2 xl:px-0">
          <h1 className="text-dark text-3xl font-semibold md:text-center">
            A goal management and life tracking application
          </h1>
          <p className="mt-1 flex text-lg font-normal md:justify-center">
            Click below to begin creating goals
          </p>
          <div className="flex md:justify-center">
            <Button variant={"default"} className="mt-3 flex justify-center">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
