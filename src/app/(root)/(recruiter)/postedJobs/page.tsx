"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/Components/Navbar";
import JobList from "@/Components/JobList";
import { Tags2 } from "@/stories/Tags2";
import SearchFilters from "@/Components/SearchFilters";
import Skeleton from "./skeleton";
import { LuFilter } from "react-icons/lu";
import SignupFormInput from "@/Components/Forms/SignupFormInput";
import SearchSelectDropdown from "@/Components/Forms/SearchSelectDropdown";
import RangeSliderMinMax from "@/Components/Forms/RangeSliderMinMax";
import locOpns from "@/constants/data/location.json";
import SkillTags from "@/constants/data/tags.json";
import empOpns from "@/constants/data/emptype.json";

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
  const LocationTags = locOpns.countries;

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

  const [resetflg, setResetFlg] = useState<boolean>(false);

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
    setResetFlg(true);
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

  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);

  const defaultFieldStylesCls =
    "relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic";

  return (
    <div className="bg-[#FAFAFA] flex-1 px-6 flex flex-col max-h-screen">
      <div className="w-full text-left">
        <h1 className="text-4xl my-4 ms-2 text-blue-500 font-semibold ps-14">
          Posted Jobs
        </h1>
      </div>
      <div className="flex-1 w-full md:grid grid-flow-col grid-cols-[1fr,minmax(0,384px)] pb-6 justify-end scrollbar-hide overflow-y-auto gap-x-6 overscroll-contain">
        <JobList postedJobs={true} searchParams={searchParams} />

        {/* <SearchFilters
          searchParams={tempParams}
          handleChange={handleChange}
          handleSkillChange={handleSkillChange}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
        /> */}
        <section className="w-full h-fit px-4 py-6 shadow-lg rounded-xl sticky border border-gray-100 max-w-sm">
          <h2 className="text-center text-gray-700 flex justify-center items-center gap-2.5 font-semibold mb-3">
            <span>
              <LuFilter size={18} className="inline-block text-blue-500" />
            </span>
            Search Filters
          </h2>

          <form className="space-y-2 px-2">
            <SignupFormInput
              id="search"
              name="query"
              type="text"
              label="Search"
              placeholder="Search ..."
              labelCls="text-gray-700 text-sm font-semibold relative flex items-center gap-2 mt-2"
              cls={defaultFieldStylesCls}
              handleChange={handleChange}
              resetflg={resetflg}
              setResetFlg={setResetFlg}
            />

            <div className="grid grid-rows-[min(fit_content, fit_content)] gap-x-6 items-start">
              <SearchSelectDropdown
                req={false}
                label="Skills"
                labelCls="text-gray-700 text-sm font-semibold relative flex items-center gap-2 mt-2"
                cls={defaultFieldStylesCls}
                tags={SkillTags}
                onChange={handleSkillChange}
                placeholder="Eg: Software Developer"
                description="Short tags like industry and tech stack are preferred. Only the first 3 or 4 tags are displayed on the site, but all tags ensure the job appears on relevant tag-specific pages. Additional tags may be auto-generated after posting/editing to supplement."
                resetflg={resetflg}
                setResetFlg={setResetFlg}
              />
            </div>

            <div className="grid grid-rows-[min(fit_content, fit_content)] gap-x-6 items-start">
              <SearchSelectDropdown
                req={false}
                label="Location"
                name="location"
                labelCls="text-gray-700 text-sm font-semibold relative flex items-center gap-2 mt-2"
                placeholder="Eg: London"
                cls={defaultFieldStylesCls}
                tags={LocationTags}
                onSingleChange={handleChange}
                description="Only fill if you'd only like to hire people from a specific location or timezone this job is restricted to. If not restricted, please leave it as worldwide."
                multiple={false}
                resetflg={resetflg}
                setResetFlg={setResetFlg}
              />
            </div>

            <div className="grid grid-rows-[min(fit_content, fit_content)] gap-x-6 items-start">
              <SearchSelectDropdown
                req={false}
                label="Employment Type"
                name="emptype"
                labelCls="text-gray-700 text-sm font-semibold relative flex items-center gap-2 mt-2"
                placeholder="Eg: Full-Time"
                cls={defaultFieldStylesCls}
                tags={empOpns}
                onSingleChange={handleChange}
                description="Select the type of employment you would like to filter with."
                multiple={false}
                resetflg={resetflg}
                setResetFlg={setResetFlg}
              />
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-2">Desired salary</p>
              <RangeSliderMinMax
                minSalary={searchParams.minSalary}
                maxSalary={searchParams.maxSalary}
                handleChange={handleChange}
                currencyType={searchParams.currencyType}
              />
            </div>

            <div className="flex gap-3 items-center flex-nowrap">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-blue-500 text-white py-1.5 rounded-md transition-colors duration-150 hover:bg-blue-600"
              >
                Search
              </button>

              <button
                type="button"
                className="w-1/4 bg-red-500 text-white py-1.5 rounded-md transition-colors duration-150 hover:bg-red-600"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default PostedJobs;
