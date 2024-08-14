"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import ApplyPopup from "./ApplyPopup";
import Skeleton from "@/app/(root)/(recruiter)/postedJobs/skeleton";
import Image from "next/image";
import Link from "next/link";

// Define an interface representing the structure of a job object
interface Job {
  id?: number;
  company_name: string;
  position: string;
  employee_type: string;
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
  postedJobs: boolean;
  searchParams: {
    query: string;
    skillTags: string[];
    location: string;
    jobType: string;
    minSalary: number;
    maxSalary: number;
  };
  appliedJobs?: boolean;
}

const JobList = ({ searchParams, postedJobs, appliedJobs }: SearchParams) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsCopy, setJobsCopy] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [logo, setLogo] = useState<string>("");
  const [fetchCount] = useState(10);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { skillTags, location, jobType, minSalary, maxSalary } = searchParams;

  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";
  const bottomBoundaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filteredJobs = jobsCopy.filter((job) => {
      const position = job.position.toLowerCase(); // Assuming the job object has a title property
      return position.includes(searchParams.query.toLowerCase());
    });
    // console.log("Filtered jobs:", filteredJobs);
    setJobs(filteredJobs);
  }, [searchParams.query, jobsCopy]);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (location) {
        // console.log("Location:", location);
        params.append("location", location);
      }
      if (skillTags.length > 0) {
        const skills = skillTags.join(",");
        // console.log("Tags:", skills);
        params.append("tags", skills);
      }
      // if (minSalary) {
      //   params.append("salary_min", minSalary.toString());
      // }
      // if (maxSalary) {
      //   params.append("salary_max", maxSalary.toString());
      // }

      params.append("limit", fetchCount.toString()); // no.of entries to fetch
      params.append("offset", ((page - 1) * fetchCount).toString()); // no.of entries to skip

      const url = `${baseurl}/${postedJobs ? "posted-jobs" : appliedJobs ? "applied-jobs" : "jobs"}/?${params.toString()}`;
      const token = localStorage.getItem("access_token");
      const config = postedJobs
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const response = await axios.get(url, config);

      // console.log("Params:", params.toString());
      // console.log("URL:", url);
      // console.log("Token: ", token);
      // console.log("Fetched jobs:", response.data.results);
      setJobs(response.data.results); // Replace new jobs to existing jobs
      setJobsCopy(response.data.results);
    } catch (error: any) {
      console.error("Error fetching jobs:", error?.response?.data);
    }
    setLoading(false);
  }, [baseurl, fetchCount, location, page, postedJobs, appliedJobs, skillTags]);

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
  }, [searchParams, appliedJobs, postedJobs]);

  useEffect(() => {
    // console.log(page);
    if (page > 1) fetchJobs();
  }, [page]);

  useEffect(() => {
    fetchLogo();
  }, [searchParams, page, postedJobs, appliedJobs]);

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
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <section
          ref={scrollRef}
          className="overflow-auto scrollbar-hide overscroll-contain w-full justify-self-center"
        >
          {jobs.length > 0 ? (
            <ul className="space-y-4 w-full flex flex-col items-center">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={{
                    id: job.id,
                    logo: logo,
                    company_name: job.company_name,
                    position: job.position,
                    emptype: job.employee_type,
                    primtg: job.primary_tag,
                    tags: job.tags.split(","),
                    locns: job.location_restriction,
                    desc: job.job_description,
                    minsal: job.annual_salary_min,
                    maxsal: job.annual_salary_max,
                    how2apply: job.how_to_apply,
                    benefits: job.benefits.split(","),
                    email4jobappl: job.apply_email_address,
                    apply_url: job.apply_url,
                  }}
                  seekerside={appliedJobs || !postedJobs}
                />
              ))}
              {loading && <Skeleton />}
              <div ref={bottomBoundaryRef}></div>
            </ul>
          ) : appliedJobs ? (
            <>
              <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
                <h1 className="text-2xl text-gray-600 font-semibold my-4">
                  No jobs applied
                </h1>
                <Image
                  src="/assets/icons/no-applications.svg"
                  alt="No applicants found"
                  width={500}
                  height={500}
                  className="sm:w-80 sm:h-80 h-32 w-32"
                />
                <p className="text-gray-500">Try changing the search filters</p>
                <span className="uppercase text-xl font-semibold text-gray-300">
                  or
                </span>
                <Link href="/seeker-dashboard">
                  <p className="text-blue-500 underline hover:underline-offset-2">
                    Go to all jobs posted
                  </p>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
                <h1 className="text-2xl text-gray-600 font-semibold my-4">
                  No jobs found
                </h1>
                <Image
                  src="/assets/icons/no-applications.svg"
                  alt="No applicants found"
                  width={500}
                  height={500}
                  className="sm:w-80 sm:h-80 h-32 w-32"
                />
                <p className="text-gray-500">
                  Try changing the search filters to find more jobs
                </p>
                <span className="uppercase text-xl font-semibold text-gray-300">
                  or
                </span>
                <Link href="/post">
                  <p className="text-blue-500 underline hover:underline-offset-2">
                    Post a job
                  </p>
                </Link>
              </div>
            </>
          )}
          {/* {showPopup && <ApplyPopup job={selectedJob} onClose={handleClosePopup} />} */}
        </section>
      )}
    </>
  );
};

export default JobList;
