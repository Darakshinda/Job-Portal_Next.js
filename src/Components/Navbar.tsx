import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

interface NavbarProps {
  isAuthenticated: boolean;
  accountType: string;
  handleLogout: () => void;
}

const Navbar = ({
  isAuthenticated,
  accountType,
  handleLogout,
}: NavbarProps) => {
  return (
    <nav className="w-full bg-white sm:h-16 h-14 flex justify-between items-center sm:px-10 px-4 mt-1">
      <Link
        href={"/"}
        className="outline-none rounded-full sm:px-4 px-2"
        tabIndex={-1}
      >
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={415}
          height={60}
          className=" min-w-32 w-32 max-[400px]:min-w-36 sm:min-w-48 sm:w-48 sm:h-12 object-contain"
        />
        <span className="sr-only">Code Unity Logo</span>
      </Link>

      <div className="flex items-center sm:gap-4 gap-2 sm:px-5 px-2 sm:text-xl">
        {isAuthenticated ? (
          <>
            <Link
              href={`${accountType === "job_seeker" ? "/seeker-dashboard" : "/dashboard"}`}
              className="sm:py-2 py-1 px-4 max-[400px]:hidden rounded-full transform transition-all ease-in-out duration-300 text-white
              hover:-translate-y-1 focus-visible:-translate-y-1 hover:scale-110 focus-visible:scale-110 bg-blue-500/90 border-2 border-blue-500/90 hover:bg-blue-500 hover:border-blue-500 outline-none focus-visible:ring-2 ring-blue-300 focus-visible:ring-offset-2"
            >
              Dashboard
              <span className="sr-only">Dashboard</span>
            </Link>

            <button
              onClick={handleLogout}
              className="font-medium px-4 sm:py-2 py-1 rounded-full border-2 border-gray-400 text-gray-600 outline-none focus-visible:ring-2 ring-blue-300 focus-visible:ring-offset-2"
            >
              Logout
              <span className="sr-only">Login</span>
            </button>
          </>
        ) : (
          <>
            <Link
              href={"/seeker-dashboard"}
              className="sm:py-2 py-1 px-4 max-[400px]:hidden rounded-full transform transition-all ease-in-out duration-300 text-white
              hover:-translate-y-1 focus-visible:-translate-y-1 hover:scale-110 focus-visible:scale-110 bg-blue-500/90 border-2 border-blue-500/5 hover:bg-blue-500 hover:border-blue-500  outline-none focus-visible:ring-2 ring-blue-300 focus-visible:ring-offset-2 whitespace-nowrap"
            >
              Find Jobs <FaArrowRightLong className="inline-block" />
              <span className="sr-only">Find Jobs</span>
            </Link>

            <Link
              href={"/login"}
              className="font-medium px-4 sm:py-2 py-1 rounded-full border-2 border-gray-400 text-gray-600 outline-none focus-visible:ring-2 ring-blue-300 focus-visible:ring-offset-2"
            >
              Login
              <span className="sr-only">Login</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
