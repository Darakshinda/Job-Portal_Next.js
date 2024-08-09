"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/Components/Navbar";
import JobList from "@/Components/JobList";
import { Tags2 } from "@/stories/Tags2";
import locationOptions from "@/constants/data/location.json";
import tagOptions from "@/constants/data/tags.json";
import Sidebar from "@/Components/HireDashSidebar";
import JobDetailsModal from "@/Components/JobModal";
import axios from "axios";
import SalaryRangeSlider from "@/Components/FilterBox";
import SearchFilters from "@/Components/SearchFilters";
import Skeleton from "./skeleton";

// const jobPositionOptions = [
//   { label: "Software Engineer" },
//   { label: "Data Analyst" },
//   { label: "Product Manager" },
//   { label: "UX/UI Designer" },
// ];

interface SearchParams {
  skillTags: string[];
  location: string;
  jobType: string;
  minSalary: number;
  maxSalary: number;
}

const PostedJobs = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    skillTags: [],
    location: "",
    jobType: "",
    minSalary: 0,
    maxSalary: 75,
  });

  const handleChange = (name: string, value: string | number) => {
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

  console.log(searchParams);

  return (
    <div className="bg-[#FAFAFA] flex-1 px-6 flex flex-col max-h-screen">
      {/* <div className="flex flex-col gap-4 justify-center"> */}
      <div className="w-full text-left">
        <h1 className="text-4xl my-4 ms-2 text-blue-500 font-semibold">
          Posted Jobs
        </h1>
      </div>
      {/* {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />
      )} */}
      <div className="flex-1 w-full md:grid grid-flow-col grid-cols-[1fr,minmax(0,384px)] scrollbar-hide overflow-y-auto gap-x-6 overscroll-contain">
        <JobList
          // selectedLocationTags={selectedLocationTags}
          // selectedJobTags={selectedJobTags}
          // selectedTagTags={selectedTagTags}
          postedJobs={true}
          // view={setSelectedJob}
          searchParams={searchParams}
        />
        {/* <Skeleton /> */}

        <SearchFilters
          searchParams={searchParams}
          handleChange={handleChange}
          handleSkillChange={handleSkillChange}
        />
      </div>
    </div>
    // </div>
  );
};

export default PostedJobs;
