"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import  {JobCard}  from "./Job-Card";

interface Job {
  id: number;
  position: string;
  company_name: string;
  location_restriction: string;
  tags: string;
  created_at: string;
  logo: string;
  job_description: string;
  how_to_apply: string;
  annual_salary_min: string;
  annual_salary_max: string;
  primary_tag: string;
}

interface AppliedJob {
  job: number;
  cover_letter: string;
  resume: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  applied_at: string;
  job_details: {
    company_name: string;
    location_restriction: string;
    tags: string;
    annual_salary_max: string;
    position: string;
  };
}

interface JobListProps {
  selectedLocationTags: string[];
  selectedJobTags: string[];
  selectedTagTags: string[];
  minsal:number[];maxsal:number[];
  postedJobs: boolean;
  appliedJobs: boolean;
  view: Function;
}

const JobList: React.FC<JobListProps> = ({
  selectedLocationTags,
  selectedJobTags,
  selectedTagTags,
  minsal,
  maxsal,
  postedJobs,
  appliedJobs,
  view,
}) => {
  const [jobs, setJobs] = useState<(Job | AppliedJob)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [logo, setLogo] = useState<string>("");
  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";
  const fetchCount = 10;

  const bottomBoundaryRef = useRef<HTMLDivElement>(null);

  const clearJobs = () => {
    setJobs([]);
  };

  const fetchLogo = () => {
    const url = `${baseurl}/accounts/profile/`;
    const token = localStorage.getItem("access_token");
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Fetched logo:", response.data.company_photo);
      setLogo(response.data.company_photo);
    })
    .catch((error) => {
      console.error(error.response.data || error.message);
    })
  }

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedJobTags.length > 0) {
        params.append("position", selectedJobTags.join(","));
      }
      if (selectedLocationTags.length > 0) {
        params.append("location", selectedLocationTags.join(","));
      }
      if (selectedTagTags.length > 0) {
        params.append("tags", selectedTagTags.join(","));
      }
     
  
      params.append("limit", fetchCount.toString());
      params.append("offset", ((page - 1) * fetchCount).toString());

      console.log("Params: ", params.toString());
      
  
      let url = `${baseurl}/${postedJobs ? "posted-jobs" : (appliedJobs ? "applied-jobs" : "jobs")}/?${params.toString()}`;
      console.log("URL: ", url);
      

      const token = localStorage.getItem("access_token");
      const config = postedJobs || appliedJobs
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const response = await axios.get(url, config);
      if (postedJobs || appliedJobs) {
        setJobs(response.data.results);
      } else {
        setJobs(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error?.response?.data || error);
    }
    setLoading(false);
  };

  useEffect(() => {
    clearJobs();
    setPage(1);
  }, [selectedLocationTags, selectedJobTags, selectedTagTags,minsal,maxsal]);

  useEffect(() => {
    clearJobs();
    fetchJobs();
  }, [selectedLocationTags, selectedJobTags, selectedTagTags,minsal,maxsal,postedJobs, appliedJobs]);

  useEffect(() => {
    if (page > 1) fetchJobs();
  }, [page]);

  useEffect(() => {
    fetchLogo();
  }, []);

  const handleScroll = () => {
    if (bottomBoundaryRef.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >=
        scrollHeight - bottomBoundaryRef.current.clientHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full mt-[5%] ml-[1%]">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={appliedJobs ? job.job : job.id} className="mb-4"> {/* Add margin here */}
              <JobCard
                key={appliedJobs ? job.job : job.id}
                imgflg
                bdg
                tags={job.tags}
                imgsrc={logo}
                job={{
                  id: job.id,
                  company: job.company_name,
                  position: job.position,
                  emptype: "Full-time",
                  primtg: job.primary_tag,
                  tags: job.tags,
                  locns: job.location_restriction,
                  logo: logo,
                  minsal: job.annual_salary_min,
                  maxsal: job.annual_salary_max,
                  desc: job.job_description,
                  benefits: "",
                  how2apply: job.how_to_apply,
                  applications: job.applications,
                }}
                viewDetails={view}
                postedJobs={postedJobs}
                appliedJobs={appliedJobs}
              />
            </div>
          ))
        ) : (
          <p className="text-white">No jobs available.</p>
        )}
        {loading && <p className="text-white">Loading more jobs...</p>}
        <div ref={bottomBoundaryRef}></div>
      </div>
    </div>
  );
};

export default JobList;
