"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const [accountType, setAccountType] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAccountType = localStorage.getItem("account_type");
      const accessToken = localStorage.getItem("access_token");

      setAccountType(storedAccountType);
      setIsAuthenticated(!!accessToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("account_type");
    Cookies.remove("token");
    Cookies.remove("account_type");
    setIsAuthenticated(false);
  };

  return (
    <nav className="flex bg-slate-100 sm:h-20 h-16 text-black border-b-2 border-neutral-200 justify-between items-center w-full sm:px-10 px-4 py-2">
      <Link
        href={"/"}
        className="outline-none focus-visible:ring-2 ring-primary-300 rounded-2xl sm:px-4 px-2"
      >
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={600}
          height={90}
          className=" min-w-28 w-28 sm:min-w-40 sm:w-40 sm:h-12 h-8 object-contain"
        />
        <span className="sr-only">Code Unity Logo</span>
      </Link>

      <div className="flex items-center gap-4 sm:px-5 px-2 sm:text-xl">
        {isAuthenticated ? (
          <>
            <Link
              href={`${accountType === "job_seeker" ? "/seeker-dashboard" : "/Dashboard"}`}
              className="py-2 px-4 rounded-xl transform transition-all ease-in-out duration-300 text-white
              hover:-translate-y-1 focus-visible:-translate-y-1 hover:scale-110 focus-visible:scale-110 bg-primary-500/80 hover:bg-primary-500 outline-none focus-visible:ring-2 ring-primary-300 focus-visible:ring-offset-2 whitespace-nowrap"
            >
              Dashboard
              <span className="sr-only">Post a Job</span>
            </Link>

            <button
              onClick={handleLogout}
              className="font-semibold font-Nunito box-content px-4 sm:py-2 py-1 sm:rounded-xl rounded-full outline outline-2 outline-primary-700 focus-visible:ring-2 ring-primary-300 focus-visible:ring-offset-2 whitespace-nowrap"
            >
              Logout
              <span className="sr-only">Login</span>
            </button>
          </>
        ) : (
          <Link
            href={"/login"}
            className="font-semibold font-Nunito box-content px-4 sm:py-2 py-1 sm:rounded-xl rounded-full outline outline-2 outline-primary-700 focus-visible:ring-2 ring-primary-300 focus-visible:ring-offset-2 whitespace-nowrap"
          >
            Login
            <span className="sr-only">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
