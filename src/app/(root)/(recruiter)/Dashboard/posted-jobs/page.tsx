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

const jobPositionOptions = [
  { label: "Software Engineer" },
  { label: "Data Analyst" },
  { label: "Product Manager" },
  { label: "UX/UI Designer" },
];

const PostedJobs = () => {
  const [selectedLocationTags, setSelectedLocationTags] = useState<string[]>(
    []
  );
  const [selectedJobTags, setSelectedJobTags] = useState<string[]>([]);
  const [selectedTagTags, setSelectedTagTags] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([0, 100000]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const handleLocationTagSelection = (tags: string[]) => {
    setSelectedLocationTags(tags);
  };

  const handleJobTagSelection = (tags: string[]) => {
    setSelectedJobTags(tags);
  };

  const handleTagTagSelection = (tags: string[]) => {
    setSelectedTagTags(tags);
    console.log("Selected Tags:", tags);
  };

  const handleSalaryRangeChange = (range: number[]) => {
    setSalaryRange(range);
    console.log("Selected Salary Range:", range);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const checkLogIn = () => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      router.push("/login");
    }
  };

  const getUserName = useCallback(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      axiosInstance
        .get("/accounts/profile")
        .then((response) => {
          setUserName(response.data.first_name.split(" ")[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [baseUrl]);

  useEffect(() => {
    checkLogIn();
    getUserName();
  }, []);

  return (
    <div className="bg-[#FAFAFA] flex-1 px-6">
      {/* <div className="flex flex-col gap-4 justify-center"> */}
      <div className="w-full text-left">
        <h1 className="text-4xl my-4 ms-2 text-blue-500 font-semibold">
          Posted Jobs
        </h1>
      </div>
      {/* <div className="flex justify-around gap-4">
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
        </div> */}

      {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />
      )}
      <div className="w-full md:grid grid-flow-col grid-cols-[1fr,minmax(0,384px)] gap-x-6">
        <JobList
          selectedLocationTags={selectedLocationTags}
          selectedJobTags={selectedJobTags}
          selectedTagTags={selectedTagTags}
          postedJobs={true}
          view={setSelectedJob}
        />

        <SearchFilters />
      </div>
    </div>
    // </div>
  );
};

export default PostedJobs;
