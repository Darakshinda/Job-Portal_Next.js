"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { JobCard } from "./Job-Card";
import ApplyPopup from "./ApplyPopup";

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

interface JobListProps {
  selectedLocationTags: string[];
  selectedJobTags: string[];
  selectedTagTags: string[];
  postedJobs: boolean;
  appliedJobs: boolean; // Added prop for applied jobs
  view: Function;
}

const JobList: React.FC<JobListProps> = ({
  selectedLocationTags,
  selectedJobTags,
  selectedTagTags,
  postedJobs,
  appliedJobs, // Added prop for applied jobs
  view,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
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

      params.append("limit", fetchCount.toString());
      params.append("offset", ((page - 1) * fetchCount).toString());

      let url = `${baseurl}/${postedJobs ? "posted-jobs" : (appliedJobs ? "applied-jobs" : "jobs")}/?${params.toString()}`;
      const token = localStorage.getItem("access_token");
      const config = postedJobs || appliedJobs
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const response = await axios.get(url, config);
      if (postedJobs || appliedJobs) {
        setJobs(response.data); // Append new jobs to existing jobs
      } else {
        setJobs(response.data.results); // Append new jobs to existing jobs
      }
    } catch (error) {
      console.error("Error fetching jobs:", error?.response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    clearJobs(); // Clear previous jobs when tags change
    setPage(1); // Reset page number when tags change to refetch from the beginning
  }, [selectedLocationTags, selectedJobTags, selectedTagTags]);

  // Refetch jobs when tags, postedJobs, appliedJobs, or page change
  useEffect(() => {
    clearJobs(); // Clear previous jobs when tags change
    fetchJobs();
  }, [selectedLocationTags, selectedJobTags, selectedTagTags, postedJobs, appliedJobs]);

  useEffect(() => {
    if (page > 1) fetchJobs();
  }, [page]);

  // Function to handle scroll event
  const handleScroll = () => {
    if (bottomBoundaryRef.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >=
        scrollHeight - bottomBoundaryRef.current.clientHeight
      ) {
        setPage((prevPage) => prevPage + 1); // Increment page to fetch more jobs
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedJob(null);
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full mt-[5%] ml-[1%]">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              viewDetails={view}
              onApply={handleApplyClick}
              postedJobs={postedJobs}
              appliedJobs={appliedJobs} // Add this prop if necessary
            />
          ))
        ) : (
          <p className="text-white">No jobs available.</p>
        )}
        {loading && <p className="text-white">Loading more jobs...</p>}
        <div ref={bottomBoundaryRef}></div>
      </div>
      {showPopup && <ApplyPopup job={selectedJob} onClose={handleClosePopup} />}
    </div>
  );
};

export default JobList;
