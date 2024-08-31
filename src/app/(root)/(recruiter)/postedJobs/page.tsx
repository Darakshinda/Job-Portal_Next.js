"use client";

import React, { useEffect, useState } from "react";
import JobList from "@/Components/JobList";
import SearchFilters from "@/Components/SearchFilters";
import locOpns from "@/constants/data/location.json";

interface SearchParams {
  query: string;
  skillTags: string[];
  location: string;
  jobType: string;
  minSalary: string;
  maxSalary: string;
  currencyType: string;
}

const PostedJobs: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    skillTags: [],
    location: "",
    jobType: "",
    minSalary: "1000",
    maxSalary: "50000",
    currencyType: "USD",
  });

  const [tempParams, setTempParams] = useState<SearchParams>({
    query: "",
    skillTags: [],
    location: "",
    jobType: "",
    minSalary: "1000",
    maxSalary: "50000",
    currencyType: "USD",
  });

  const [resetFlag, setResetFlag] = useState<boolean>(false);

  const handleChange = (name: string, value: string) => {
    setTempParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSkillChange = (skills: string[]) => {
    setTempParams((prevState) => ({
      ...prevState,
      skillTags: skills,
    }));
  };

  const handleSubmit = () => {
    setSearchParams(tempParams);
  };

  const handleReset = () => {
    setResetFlag(true);
    setTempParams({
      query: "",
      skillTags: [],
      location: "",
      jobType: "",
      minSalary: "1000",
      maxSalary: "50000",
      currencyType: "USD",
    });
    setSearchParams({
      query: "",
      skillTags: [],
      location: "",
      jobType: "",
      minSalary: "1000",
      maxSalary: "50000",
      currencyType: "USD",
    });
  };

  // useEffect(() => {
  //   console.log(searchParams);
  // }, [searchParams]);

  return (
    <div className="bg-[#FAFAFA] flex-1 px-6 flex flex-col max-h-screen">
      <div className="w-full text-left">
        <h1 className="text-4xl my-4 ms-2 text-blue-500 font-semibold">
          Posted Jobs
        </h1>
      </div>
      <div className="flex-1 w-full md:grid grid-flow-col grid-cols-[1fr,minmax(0,384px)] pb-6 justify-end scrollbar-hide overflow-y-auto gap-x-6 overscroll-contain">
        <JobList postedJobs={true} searchParams={searchParams} />

        <SearchFilters
          searchParams={tempParams}
          handleChange={handleChange}
          handleSkillChange={handleSkillChange}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          resetFlag={resetFlag}
          setResetFlag={setResetFlag}
        />
      </div>
    </div>
  );
};

export default PostedJobs;
