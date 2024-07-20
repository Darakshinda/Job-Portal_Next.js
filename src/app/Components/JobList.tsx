"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import ApplyPopup from "./ApplyPopup";

// Define an interface representing the structure of a job object
interface Job {
  id: number;
  position: string;
  company_name: string;
  location_restriction: string;
  tags: string;
  created_at: string;
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
  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";
  const fetchCount = 10;

  const bottomBoundaryRef = useRef<HTMLLIElement>(null);

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

      const url = `${baseurl}/${postedJobs ? "posted-jobs" : "jobs"}/?${params.toString()}`;
      const token = localStorage.getItem("access_token");
      console.log("Token: ", token);
      const config = postedJobs
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const response = await axios.get(url, config);
      console.log("Fetched jobs:", response.data);
      if (postedJobs) {
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

  // Refetch jobs when tags, postedJobs, or page change
  useEffect(() => {
    clearJobs(); // Clear previous jobs when tags change
    fetchJobs();
  }, [selectedLocationTags, selectedJobTags, selectedTagTags, postedJobs]);

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

  console.log("Jobs:", jobs.length);

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
    <div className="flex justify-center p-4">
      <ul className="space-y-4 w-full flex flex-col items-center">
        <JobCard
          imgflg
          bgcolor="#99ffff"
          imgsrc="https://media-exp1.licdn.com/dms/image/C4D0BAQHNwdJlZmUh8g/company-logo_200_200/0/1593941980738?e=2159024400&v=beta&t=3rDBEuT39uXrBRU7KsCbJipH7WFm7A3hv0KeNDBCGb0"
          bdg
          position={"Manager"}
          company_name={`CodeUnity`}
          location_restriction={`🇮🇳 India ,⛩ Asia ,🕌 Middle East`}
          tags={`🤓 Web Developer , ⚛️ React , ➡️ Next , 🟦 Typescript , 🤠 Django`}
          created_at={`7/8/2024 00:56:23`}
          job={{
            company: `CodeUnity`,
            position: "Manager",
            emptype: "Full-time",
            primtg: "",
            tags: `🤓 Web Developer , ⚛️ React , ➡️ Next , 🟦 Typescript , 🤠 Django`,
            locns: `🇮🇳 India ,⛩ Asia ,🕌 Middle East`,
            logo: "https://media-exp1.licdn.com/dms/image/C4D0BAQHNwdJlZmUh8g/company-logo_200_200/0/1593941980738?e=2159024400&v=beta&t=3rDBEuT39uXrBRU7KsCbJipH7WFm7A3hv0KeNDBCGb0",
            minsal: `USD 20,000 per year`,
            maxsal: `USD 50,000 per year`,
            desc: `job.job_description`,
            benefits: "💰 401(k) , 🌎 Distributed team , 📆 4 day workweek",
            how2apply: ``,
          }}
          viewDetails={view}
          onApply={handleApplyClick}
          postedJobs={postedJobs}
        />

        {jobs.map((job) => (
          <JobCard
            imgflg
            imgsrc=""
            bdg
            position={job.position}
            company_name={job.company_name}
            location_restriction={job.location_restriction}
            tags={job.tags}
            created_at={job.created_at}
            job={{
              id: job.id,
              company: job.company_name,
              position: job.position,
              emptype: "Full-time",
              primtg: job.primary_tag,
              tags: job.tags,
              locns: job.location_restriction,
              logo: "https://tse4.mm.bing.net/th?id=OIP.jsRxsoSHWZurGmwk32OMcQAAAA&pid=Api&P=0&h=220",
              minsal: job.annual_salary_min,
              maxsal: job.annual_salary_max,
              desc: job.job_description,
              benefits: "",
              how2apply: job.how_to_apply,
            }}
            viewDetails={view}
            onApply={handleApplyClick}
            postedJobs={postedJobs}
          />
        ))}
        {loading && <p>Loading...</p>}
        <div ref={bottomBoundaryRef}></div>
      </ul>
      {showPopup && <ApplyPopup job={selectedJob} onClose={handleClosePopup} />}
    </div>
  );
};

export default JobList;
