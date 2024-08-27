"use client";

import { useState } from "react";
import locOpns from "@/constants/data/location.json";
import SkillTags from "@/constants/data/tags.json";
import { LuFilter } from "react-icons/lu";
import SearchSelectDropdown from "./Forms/SearchSelectDropdown";
import empOpns from "@/constants/data/emptype.json";
import RangeSliderMinMax from "./Forms/RangeSilderMinMax";
import SignupFormInput from "./Forms/SignupFormInput";

interface SearchFiltersProps {
  searchParams: {
    query: string;
    skillTags: string[];
    location: string;
    jobType: string;
    minSalary: string;
    maxSalary: string;
    currencyType: string;
  };
  handleChange: (name: string, value: string) => void;
  handleSkillChange: (skills: string[]) => void;
}

const SearchFilters = ({
  searchParams,
  handleChange,
  handleSkillChange,
}: SearchFiltersProps) => {
  const LocationTags = locOpns.countries;

  const defaultFieldStylesCls =
    "relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic";

  return (
    <section className="w-full h-fit px-4 py-6 shadow-lg rounded-xl sticky border border-gray-100 max-w-sm">
      <h2 className="text-center text-gray-700 flex justify-center items-center gap-2.5 font-semibold mb-3">
        <span>
          <LuFilter size={18} className="inline-block text-blue-500" />
        </span>
        Search Filters
      </h2>

      <form action="" className="space-y-2 px-2">
        <SignupFormInput
          id="search"
          name="query"
          type="text"
          label="Search"
          placeholder="Search ..."
          labelCls="text-gray-700 text-sm font-semibold relative flex items-center gap-2 mt-2"
          cls={defaultFieldStylesCls}
          handleChange={handleChange}
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
      </form>
    </section>
  );
};

export default SearchFilters;
