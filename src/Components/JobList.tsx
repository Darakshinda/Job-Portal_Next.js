"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import ApplyPopup from "./ApplyPopup";
import Skeleton from "@/app/(root)/(recruiter)/Dashboard/posted-jobs/skeleton";

// Define an interface representing the structure of a job object
interface Job {
  id?: number;
  company_name: string;
  position: string;
  emptype: string;
  primary_tag: string;
  tags: string;
  location_restriction: string;
  job_description: string;
  annual_salary_min: number;
  annual_salary_max: number;
  how_to_apply: string;
  benefits: string;
  apply_email_address: string;
  apply_url: string;
  created_at?: string;
}

interface JobListProps {
  selectedLocationTags: string[];
  selectedJobTags: string[];
  selectedTagTags: string[];
  postedJobs: boolean;
  view: Function;
}

const JobList: React.FC<JobListProps> = ({
  selectedLocationTags,
  selectedJobTags,
  selectedTagTags,
  postedJobs,
  view,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [logo, setLogo] = useState<string>("");

  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";
  const fetchCount = 10;

  const bottomBoundaryRef = useRef<HTMLLIElement>(null);

  const unicodeRemoval = (tag: string) => {
    return tag.replace(/[^\p{L}\p{M}\s]/gu, "");
  };

  const clearJobs = () => {
    setJobs([]);
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedJobTags.length > 0) {
        const cleanedPosition = unicodeRemoval(selectedJobTags.join(","));
        if (cleanedPosition) {
          params.append("position", cleanedPosition);
        }
      }
      if (selectedLocationTags.length > 0) {
        const cleanedLocation = unicodeRemoval(selectedLocationTags.join(","));
        console.log("Cleaned Location:", cleanedLocation);
        if (cleanedLocation) {
          params.append("location", cleanedLocation);
        }
      }
      if (selectedTagTags.length > 0) {
        const cleanedTags = unicodeRemoval(selectedTagTags.join(","));
        console.log("Cleaned Tags:", cleanedTags);
        if (cleanedTags) {
          params.append("tags", cleanedTags);
        }
      }

      params.append("limit", fetchCount.toString());
      params.append("offset", ((page - 1) * fetchCount).toString());

      console.log("Params:", params.toString());

      const url = `${baseurl}/${postedJobs ? "posted-jobs" : "jobs"}/?${params.toString()}`;
      console.log("URL:", url);

      const token = localStorage.getItem("access_token");
      console.log("Token: ", token);
      const config = postedJobs
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const response = await axios.get(url, config);
      console.log("Fetched jobs:", response.data.results);
      setJobs(response.data.results); // Replace new jobs to existing jobs
    } catch (error: any) {
      console.error("Error fetching jobs:", error?.response?.data);
    }
    setLoading(false);
  };

  const fetchLogo = () => {
    const url = `${baseurl}/accounts/profile/`;
    const token = localStorage.getItem("access_token");
    axios
      .get(url, {
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
      });
  };

  useEffect(() => {
    // Clear previous jobs when tags change
    setPage(1); // Reset page number when tags change to refetch from the beginning
  }, [selectedLocationTags, selectedJobTags, selectedTagTags]);

  // Refetch jobs when tags, postedJobs, or page change
  useEffect(() => {
    clearJobs(); // Clear previous jobs when tags change
    fetchJobs();
  }, [selectedLocationTags, selectedJobTags, selectedTagTags, postedJobs]);

  useEffect(() => {
    if (page > 1) fetchJobs();
  }, [page]);

  useEffect(() => {
    fetchLogo();
  }, [postedJobs]);

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

  console.log("Jobs:", jobs);

  // Attach scroll listener on mount
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
    <>
      <ul className="space-y-4 w-full flex flex-col items-center">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={{
              id: job.id,
              company_name: job.company_name,
              position: job.position,
              emptype: job.emptype,
              primtg: job.primary_tag,
              tags: job.tags.split(","),
              locns: job.location_restriction,
              desc: job.job_description,
              minsal: job.annual_salary_min,
              maxsal: job.annual_salary_max,
              how2apply: job.how_to_apply,
              benefits: job.benefits,
              email4jobappl: job.apply_email_address,
              apply_url: job.apply_url,
            }}
          />
        ))}
        {loading && <Skeleton />}
        <div ref={bottomBoundaryRef}></div>
      </ul>
      {showPopup && <ApplyPopup job={selectedJob} onClose={handleClosePopup} />}
    </>
  );
};

export default JobList;
