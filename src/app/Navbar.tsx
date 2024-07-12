import Link from "next/link";
import React, { useEffect, useState } from "react";

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

  return (
    <nav className="flex bg-white h-20 text-black justify-between fixed top-0 z-10 w-full">
      <div className="text-black p-6 text-3xl">Code Unity</div>
      <div className="flex justify-end px-5 text-xl">
        {isAuthenticated && accountType === "job_hirer" && (
          <Link href="/post">
            <button
              className="m-4 p-2 px-4 rounded-xl transition ease-in-out delay-150 text-white
              hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
              style={{ backgroundColor: "#3a4b9a" }}
            >
              Post a Job
            </button>
          </Link>
        )}
        <Link href="/login">
          <button className="border-solid border-black border-2 px-4 p-1 m-4 mt-5 rounded-xl hover:bg-transparent">
            Log in
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
