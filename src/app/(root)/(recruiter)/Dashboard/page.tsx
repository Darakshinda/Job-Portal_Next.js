"use client";

import ProfileCard from "@/Components/ProfileCard";
import Sidebar from "@/Components/HireDashSidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { CgScrollH } from "react-icons/cg";

export default function Page() {
  // const [username, setUserName] = useState("");
  // const router = useRouter();

  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // const getUserName = () => {
  //   const access_token = localStorage.getItem("access_token");
  //   if (access_token) {
  //     const axiosInstance = axios.create({
  //       baseURL: baseUrl,
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     });
  //     axiosInstance
  //       .get("/accounts/profile")
  //       .then((response) => {
  //         setUserName(response.data.first_name.split(" ")[0]);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  // const checkLogIn = () => {
  //   const access_token = localStorage.getItem("access_token");
  //   if (!access_token) {
  //     router.push("/login");
  //   }
  // };

  // useEffect(() => {
  //   checkLogIn();
  //   getUserName();
  // }, []);

  return (
    <main className="h-screen w-full overflow-x-auto bg-[#FAFAFA] flex-1">
      <div className="max-w-[85rem] px-4 py-4 sm:px-8 lg:px-14 lg:pt-10 lg:pb-2 mx-auto">
        <div className="grid items-center lg:grid-cols-12 gap-6 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:pe-6 xl:pe-12">
              <p className="text-6xl font-bold leading-10 text-blue-600">
                70%
                <span className="ms-1 inline-flex items-center gap-x-1 bg-gray-200 font-medium text-gray-800 text-xs leading-4 rounded-full py-0.5 px-2 dark:bg-neutral-800 dark:text-neutral-300">
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                  </svg>
                  +7% this month
                </span>
              </p>
              <p className="mt-2 sm:mt-3 text-gray-500 dark:text-neutral-500">
                of Recruiters hire top talent from the software industry
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 relative lg:before:absolute lg:before:top-0 lg:before:-start-12 lg:before:w-px lg:before:h-full lg:before:bg-gray-200 lg:before:dark:bg-neutral-700">
            <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-3 sm:gap-8">
              <div>
                <p className="text-3xl font-semibold text-blue-600">52</p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  Jobs Posted
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold text-blue-600">500+</p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  Applications recieved
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold text-blue-600">287</p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  Applications shortlisted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="px-8 w-full">
        <h2 className="text-4xl font-bold text-blue-500 md:my-8 md:mx-9 mx-2 my-4">
          Top Profiles
        </h2>
        <div className="grid gap-4 w-[95%] mx-auto grid-flow-col grid-cols-[repeat(auto,minmax(0,1fr))] overflow-hidden overflow-x-scroll overscroll-contain scrollbar-hide snap-x snap-mandatory">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>

        <div className="text-blue-500 me-16 mt-2">
          <span className="italic text-sm font-semibold flex items-center justify-end gap-2">
            Scroll
            <CgScrollH size={24} className="inline-block" />
          </span>
        </div>
      </section>
    </main>
  );
}
