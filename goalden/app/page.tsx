import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="bg-gray-100 flex justify-between items-center px-24 py-8 gap-2 ">
        <div>
          <h3 className="text-3xl font-extrabold mt-6">Goal <span className="text-cyan-500">Den</span></h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Welcome to GoalDen, a platform to transform your daily lives
          </p>
          <div className="mt-6">
            <Link
              href={"/dashboard"}
              className="bg-cyan-500 hover:bg-cyan-600 transition-colors text-white font-bold py-2 px-4 rounded-lg">
              Get Started
            </Link>
          </div>
        </div>

        <Image src="/collaboration.svg" alt="GoalDen collaboration" width={256} height={256} className="size-64" />
      </div>

      <div className="grid grid-cols-3 px-24 mt-24 gap-12">
        <div className="bg-white rounded-lg shadow-lg p-5">
          <h3 className="text-lg font-bold mb-2">Plan</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Plan your events and activities with ease using our intuitive planning tools.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-5">
          <h3 className="text-lg font-bold mb-2">Connect</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Connect and integrate your daily life with the entire family
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-5">
          <h3 className="text-lg font-bold mb-2">Collaborate</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Work together on projects and initiatives that make a difference in our community.
          </p>
        </div>
      </div>
    </main>
  );
}
