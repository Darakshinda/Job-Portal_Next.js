"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/Components/Navbar";
import JobList from "@/Components/JobList";
import { Tags2 } from "@/stories/Tags2";
import locationOptions from "@/constants/data/location.json";
import tagOptions from "@/constants/data/tags.json";
// import Sidebar from "@/Components/HireDashSidebar";
import SearchFilters from "@/Components/SearchFilters";
import Skeleton from "@/app/(root)/(recruiter)/postedJobs/skeleton";

// const jobPositionOptions = [
//   { label: "Software Engineer" },
//   { label: "Data Analyst" },
//   { label: "Product Manager" },
//   { label: "UX/UI Designer" },
// ];

interface SearchParams {
  query: string;
  skillTags: string[];
  location: string;
  jobType: string;
  minSalary: number;
  maxSalary: number;
}

const PostedJobs = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    skillTags: [],
    location: "",
    jobType: "",
    minSalary: 0,
    maxSalary: 75,
  });

  const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);

  const handleChange = (name: string, value: string | number) => {
    console.log(name, value);
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSkillChange = (skills: string[]) => {
    setSearchParams((prevState) => ({
      ...prevState,
      skillTags: skills,
    }));
  };

  // console.log(searchParams);

  return (
    <div className="bg-[#FAFAFA] flex-1 px-6 flex flex-col max-h-screen">
      <div className="w-full text-left">
        <h1 className="text-4xl my-4 ms-2 text-blue-500 font-semibold ps-14">
          All Jobs
        </h1>
      </div>
      {/* {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />
      )} */}
      <div className="flex-1 w-full md:grid grid-flow-col grid-cols-[1fr,minmax(0,384px)] pb-6 justify-end scrollbar-hide overflow-y-auto gap-x-6 overscroll-contain">
        <JobList
          postedJobs={false}
          appliedJobs={true}
          searchParams={memoizedSearchParams}
        />

        <SearchFilters
          searchParams={searchParams}
          handleChange={handleChange}
          handleSkillChange={handleSkillChange}
        />
      </div>
    </div>
  );
};

export default PostedJobs;
