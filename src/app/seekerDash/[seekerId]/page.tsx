"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "../../Components/SeekerDashSide";
import JobList from "../../Components/JobList";
import SalaryRangeSlider from "../../Components/FilterBox";
import { Tags2 } from "@/stories/Tags2";
import locationOptions from "../../post/data/location.json";
import tagOptions from "../../post/data/tags.json";
import JobDetailsModal from "@/app/Components/JobModal";

const jobPositionOptions = [
  { label: "Software Engineer" },
  { label: "Data Analyst" },
  { label: "Product Manager" },
  { label: "UX/UI Designer" },
];

export default function Page({ params }: { params: { hireId: string } }) {
  const username = params.hireId;
  const [selectedLocationTags, setSelectedLocationTags] = useState<string[]>([]);
  const [selectedJobTags, setSelectedJobTags] = useState<string[]>([]);
  const [selectedTagTags, setSelectedTagTags] = useState<string[]>([]);
  const [minsal, setminsal] = useState([0]);const [maxsal, setmaxsal] = useState([200000]);
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

  const handleSalaryRangeChange = (range: number[],setSalaryRange:Function) => {
    setSalaryRange(range);
    console.log('Selected Salary Range:', range);
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
    if(access_token){
      const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      axiosInstance.get('/accounts/profile')
        .then((response) => {
          setUserName(response.data.first_name);
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
    <div>
      <Sidebar userName={userName} />
      <div className="bg-gray-900 flex flex-col gap-4 justify-center items-center pl-[200px]">
        <div>
          <h1 className="text-4xl mt-3 text-white font-semibold">Find your Dream Job</h1>
        </div>
        <div className="flex justify-around gap-4">
          <div>
            <h3 className=" text-white text-lg font-semibold mb-2"></h3>
            <Tags2
              options={locationOptions}
              cls="input_company{background-color: #f2f1ed;width: 95%;margin-top:10px;margin-left: 14px;border-radius: 7px;border-width: 1px;border-color: #b1b3b6;padding: 3px 10px;}"
              phdr="Search by Location"
              dynamic={true}
              onSelect={handleLocationTagSelection}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2"></h3>
            <Tags2
              options={jobPositionOptions}
              cls="input_company{background-color: #f2f1ed;width: 95%;margin-top:10px;margin-left: 14px;border-radius: 7px;border-width: 1px;border-color: #b1b3b6;padding: 3px 10px;}"
              phdr="Search by Job Position"
              dynamic={true}
              onSelect={handleJobTagSelection}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2"></h3>
            <Tags2
              options={tagOptions}
              cls="input_company{background-color: #f2f1ed;width: 95%;margin-top:10px;margin-left: 14px;border-radius: 7px;border-width: 1px;border-color: #b1b3b6;padding: 3px 10px;}"
              phdr="Search by Tags"
              dynamic={true}
              onSelect={handleTagTagSelection}
            />
          </div>
          <div className="">
            <SalaryRangeSlider
              onRangeChange={setminsal}
              salaryRange={minsal} label='Min Salary'
            />
          </div>

          <div className="">
            <SalaryRangeSlider
              onRangeChange={setmaxsal}
              salaryRange={maxsal} label='Max Salary'
            />
          </div>
        </div>

        {selectedJob && (
          <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />
        )}
        <div className="w-[60%]">
          <JobList
            selectedLocationTags={selectedLocationTags}
            selectedJobTags={selectedJobTags}
            selectedTagTags={selectedTagTags}
            postedJobs={false}
            appliedJobs={false}
            minsal={minsal} maxsal={maxsal}
            view={setSelectedJob}
          />
        </div>
      </div>
    </div>
  );
}
