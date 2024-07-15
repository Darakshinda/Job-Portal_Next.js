import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex bg-white h-20 text-black justify-between fixed top-0 z-10 w-full">
      <div className=" text-black p-6 text-3xl ">Code Unity</div>
      <div className="flex justify-end px-5 text-xl">
        <Link href="/post">
          <button
            className="m-4 p-2 px-4 rounded-xl transition ease-in-out delay-150 text-white
          hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..."
            style={{ backgroundColor: "#3a4b9a" }}
          >
            Post a Job
          </button>
        </Link>
        <Link href="/Login">
          <button className="border-solid border-black border-2 px-4 p-1 m-4 mt-5 rounded-xl hover:bg-transparent">
            Log in
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
