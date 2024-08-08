"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { JobCard } from "./Job-Card";

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
  minsal: number[];
  maxsal: number[];
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
  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";
  const fetchCount = 10;

  const bottomBoundaryRef = useRef<HTMLDivElement>(null);

  const clearJobs = () => {
    setJobs([]);
  };

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
      if (minsal.length == 1) {
        params.append("salary_min", minsal[0].toString());
      }
      if (maxsal.length == 1) {
        params.append("salary_max", maxsal[0].toString());
      }

      params.append("limit", fetchCount.toString());
      params.append("offset", ((page - 1) * fetchCount).toString());

      let url = `${baseurl}/${postedJobs ? "posted-jobs" : appliedJobs ? "applied-jobs" : "jobs"}/?${params.toString()}`;
      const token = localStorage.getItem("access_token");
      const config =
        postedJobs || appliedJobs
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};
      const response = await axios.get(url, config);
      if (postedJobs || appliedJobs) {
        setJobs(response.data.results || response.data);
      } else {
        setJobs(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error?.response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    clearJobs();
    setPage(1);
  }, [selectedLocationTags, selectedJobTags, selectedTagTags, minsal, maxsal]);

  useEffect(() => {
    clearJobs();
    fetchJobs();
  }, [
    selectedLocationTags,
    selectedJobTags,
    selectedTagTags,
    ,
    minsal,
    maxsal,
    postedJobs,
    appliedJobs,
  ]);

  useEffect(() => {
    if (page > 1) fetchJobs();
  }, [page]);

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
      <div className="w-full mt-[5%] ml-[1%] space-y-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={appliedJobs ? job.job : job.id}
              job={job}
              viewDetails={view}
              postedJobs={postedJobs}
              appliedJobs={appliedJobs}
            />
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
