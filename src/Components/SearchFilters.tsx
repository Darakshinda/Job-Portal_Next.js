"use client";

import { useState } from "react";
import locOpns from "@/constants/data/location.json";
import SkillTags from "@/constants/data/tags.json";
import { LuFilter } from "react-icons/lu";
import SearchSelectDropdown from "./Forms/SearchSelectDropdown";

const SearchFilters = () => {
  const LocationTags = locOpns.countries;
  const [formData, setFormData] = useState<{
    tags: string[];
    locns: string;
  }>({
    tags: [],
    locns: "",
  });

  const handleChange = (name: string, value: string) => {
    if (name === "minSal" || name === "maxSal") {
      const val = parseInt(value.split(" ")[0]);
      console.log(val);
      setFormData((prevState) => ({
        ...prevState,
        [name]: val,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    // validateUseStateInputs();
  };

  console.log(formData);

  const handleSkillChange = (skills: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      tags: skills,
    }));
  };
  return (
    <section className="w-full h-fit px-4 py-6 shadow-lg rounded-xl border border-gray-100 max-w-sm">
      <h2 className="text-center text-gray-700 flex justify-center items-center gap-2.5 font-semibold mb-6">
        <span>
          <LuFilter size={18} className="inline-block text-blue-500" />
        </span>
        Search Filters
      </h2>

      <form action="" className="space-y-2 px-2">
        {/* <div className="flex flex-col gap-1.5">
          <label htmlFor="looking_for" className="text-sm ms-1">
            Looking for
          </label>
          <input
            type="text"
            id="looking_for"
            className="border bg-white rounded-lg py-2 px-2 border-gray-200 placeholder:text-sm placeholder:italic outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            placeholder="Eg: Software Developer"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="text-sm ms-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="border bg-white rounded-lg py-2 px-2 border-gray-200 placeholder:text-sm placeholder:italic outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            placeholder="Eg: London"
          />
        </div> */}
        <div className="grid grid-rows-[min(fit_content, fit_content)] gap-x-6 items-start">
          <SearchSelectDropdown
            req={false}
            label="Skills"
            labelcls="text-gray-700 text-sm font-semibold relative flex items-center gap-2 mt-2"
            cls="relative w-full -mt-2 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
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
            name="locns"
            labelcls="text-gray-700 text-sm font-semibold relative flex items-center gap-2 mt-2"
            placeholder="Eg: London"
            cls="relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
            tags={LocationTags}
            onSingleChange={handleChange}
            description="Only fill if you'd only like to hire people from a specific location or timezone this job is restricted to. If not restricted, please leave it as worldwide."
            multiple={false}
          />
        </div>

        <div className="flex items-start ml-2">
          <div className="flex items-center h-5">
            <input
              id="full_time"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-1 focus-visible:ring-blue-300"
              required
            />
          </div>
          <label
            htmlFor="full_time"
            className="ms-2 text-sm font-medium text-gray-500 rounded-xl"
          >
            Full Time
          </label>
        </div>

        <div className="flex items-start ml-2">
          <div className="flex items-center h-5">
            <input
              id="part_time"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-1 focus-visible:ring-blue-300"
              required
            />
          </div>
          <label
            htmlFor="part_time"
            className="ms-2 text-sm font-medium text-gray-500 rounded-xl"
          >
            Part Time
          </label>
        </div>

        <div>
          <p className="text-gray-500 text-sm mb-2">Desired salary (₹ LPA)</p>

          {/* <label
            htmlFor="steps-range"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Range steps
          </label> */}
          <input
            id="steps-range"
            type="range"
            min="0"
            max="5"
            value="2.5"
            step="0.5"
            onChange={(e) => console.log(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </form>
    </section>
  );
};

export default SearchFilters;
