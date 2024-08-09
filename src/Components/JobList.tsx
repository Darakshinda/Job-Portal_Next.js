"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import ApplyPopup from "./ApplyPopup";
import Skeleton from "@/app/(root)/(recruiter)/postedJobs/skeleton";

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

interface SearchParams {
  // selectedLocationTags: string[];
  // selectedJobTags: string[];
  // selectedTagTags: string[];
  // postedJobs: boolean;
  // view: Function;
  postedJobs: boolean;
  searchParams: {
    skillTags: string[];
    location: string;
    jobType: string;
    minSalary: number;
    maxSalary: number;
  };
}

const JobList = ({
  searchParams,
  // selectedLocationTags,
  // selectedJobTags,
  // selectedTagTags,
  postedJobs,
  // view,
}: SearchParams) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  // const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [logo, setLogo] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { skillTags, location, jobType, minSalary, maxSalary } = searchParams;

  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";

  const fetchCount = 5;

  const bottomBoundaryRef = useRef<HTMLDivElement>(null);

  // const unicodeRemoval = (tag: string) => {
  //   return tag.replace(/[^\p{L}\p{M}\s]/gu, "");
  // };

  // const clearJobs = () => {
  //   setJobs([]);
  // };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      // if (searchParams.skillTags.length > 0) {
      //   const cleanedPosition = (searchParams.skillTags.join(","));
      //   if (cleanedPosition) {
      //     params.append("position", cleanedPosition);
      //   }
      // }
      if (location) {
        // console.log("Location:", location);
        params.append("location", location);
      }
      if (skillTags.length > 0) {
        const skills = skillTags.join(",");
        // console.log("Tags:", skills);
        params.append("tags", skills);
      }

      params.append("limit", fetchCount.toString()); // no.of entries to fetch
      params.append("offset", ((page - 1) * fetchCount).toString()); // no.of entries to skip

      // console.log("Params:", params.toString());

      const url = `${baseurl}/${postedJobs ? "posted-jobs" : "jobs"}/?${params.toString()}`;
      // console.log("URL:", url);

      const token = localStorage.getItem("access_token");
      // console.log("Token: ", token);
      const config = postedJobs
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const response = await axios.get(url, config);

      // console.log("Fetched jobs:", response.data.results);
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
        // console.log("Fetched logo:", response.data.company_photo);
        setLogo(response.data.company_photo);
      })
      .catch((error) => {
        console.error(error.response?.data || error.message);
      });
  };

  useEffect(() => {
    setJobs([]); // Clear previous jobs when tags change
    setPage(1); // Reset page number when tags change to refetch from the beginning
  }, [searchParams]);

  // Refetch jobs when tags, postedJobs, or page change
  useEffect(() => {
    setJobs([]); // Clear previous jobs when tags change
    fetchJobs();
  }, [searchParams, postedJobs]);

  useEffect(() => {
    // console.log(page);
    if (page > 1) fetchJobs();
  }, [page]);

  useEffect(() => {
    fetchLogo();
  }, [searchParams, page, postedJobs]);

  // Function to handle scroll event
  // const handleScroll = () => {
  //   if (scrollref.current) {
  //     const { scrollTop, clientHeight, scrollHeight } = scrollref.current
  //       .parentElement as HTMLDivElement;
  //     if (
  //       scrollTop + clientHeight >=
  //       scrollHeight - scrollref.current.clientHeight
  //     ) {
  //       console.log("Scrolling...");
  //       setPage((prevPage) => prevPage + 1); // Increment page to fetch more jobs
  //     }
  //   }
  // };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        // Do not change the value of 5
        console.log("Scrolling...");
        scrollRef.current.scrollTop = scrollHeight - 500;
        setPage((prevPage) => prevPage + 1); // Increment page to fetch more jobs
      }
    }
  };

  // console.log("Jobs:", jobs);

  // Attach scroll listener on mount
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      console.log("Scroll event attached");
    }
    return () => {
      if (ref) {
        ref.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // const handleApplyClick = (job: Job) => {
  //   setSelectedJob(job);
  //   setShowPopup(true);
  // };

  // const handleClosePopup = () => {
  //   setShowPopup(false);
  //   setSelectedJob(null);
  // };

  return (
    <section
      ref={scrollRef}
      className="overflow-auto scrollbar-hide overscroll-contain"
    >
      <ul className="space-y-4 w-full flex flex-col items-center">
        {jobs.map((job) => (
          <React.Fragment key={job.id}>
            <JobCard
              // key={job.id}
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
            <JobCard
              // key={job.id}
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
          </React.Fragment>
        ))}
        {loading && <Skeleton />}
        <div ref={bottomBoundaryRef}></div>
      </ul>
      {/* {showPopup && <ApplyPopup job={selectedJob} onClose={handleClosePopup} />} */}
    </section>
  );
};

export default JobList;
