import React from "react";
import Navbar from "../Components/Navbar";
import JobList from "../Components/JobList";

export default function Home() {
  return (
    <main className="w-full h-[100dvh] flex flex-col items-center">
      <Navbar />

      <div className="flex-1 flex flex-col gap-20 items-center justify-start bg-primary-50 w-full h-full">
        <p className="max-w-6xl xl:text-5xl md:text-3xl text-2xl font-Nunito leading-relaxed font-semibold tracking-tighter text-neutral-800 text-center mt-32">
          &quot;Where Employers and Job Seekers Meet&quot; <br />
          Explore Opportunities Now
        </p>

        <form className="mt-8 w-full max-sm:px-4">
          <label
            className="max-w-[600px] bg-white mx-auto flex flex-col sm:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-primary-300 outline-none focus-within:ring-1 focus-within:ring-primary-500 focus-within:ring-offset-0"
            htmlFor="search-bar"
          >
            <input
              id="search-bar"
              placeholder="Enter your Dream Job"
              name="search"
              className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
              required={true}
            />
            <button
              type="submit"
              className="w-full text-sm sm:w-auto px-6 py-3 bg-primary-700 active:bg-primary-700/80 border-black text-white active:scale-95  outline-none rounded-xl transition-all duration-100 focus-visible:outline-primary-300"
            >
              Search
            </button>
          </label>
        </form>

        {/* <div className="flex gap-4 justify-center items-center">
          <div>
            <h3 className="text-lg font-semibold mb-2"></h3>
            
            <Tags2
              options={locationOptions}
              cls="input_company{background-color: #f2f1ed;width: 95%;margin-top:10px;margin-left: 14px;border-radius: 7px;border-width: 1px;border-color: #b1b3b6;padding: 3px 10px;}"
              placeholder="Search by Location"
              dynamic={true}
              onSelect={handleLocationTagSelection}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2"></h3>
            <Tags2
              options={jobPositionOptions}
              cls="input_company{background-color: #f2f1ed;width: 95%;margin-top:10px;margin-left: 14px;border-radius: 7px;border-width: 1px;border-color: #b1b3b6;padding: 3px 10px;}"
              placeholder="Search by Job Position"
              dynamic={true}
              onSelect={handleJobTagSelection}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2"></h3>
            <Tags2
              options={tagOptions}
              cls="input_company{background-color: #f2f1ed;width: 95%;margin-top:10px;margin-left: 14px;border-radius: 7px;border-width: 1px;border-color: #b1b3b6;padding: 3px 10px;}"
              placeholder="Search by Tags"
              dynamic={true}
              onSelect={handleTagTagSelection}
            />
          </div>
          <div className="">
            <SalaryRangeSlider
              onRangeChange={handleSalaryRangeChange}
              salaryRange={salaryRange}
            />
          </div>
        </div>
        <JobList
          selectedLocationTags={selectedLocationTags}
          selectedJobTags={selectedJobTags}
          selectedTagTags={selectedTagTags}
        /> */}
      </div>
    </main>
  );
}
