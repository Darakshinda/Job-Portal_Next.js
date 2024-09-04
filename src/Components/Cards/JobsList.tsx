"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import Skeleton from "@/Components/Loaders/Skeleton";
import Image from "next/image";
import Link from "next/link";
import { BiSolidArrowToTop } from "react-icons/bi";

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
  type: string;
  searchParams: {
    query: string;
    skillTags: string[];
    location: string;
    jobType: string;
    minSalary: string;
    maxSalary: string;
    currencyType: string;
  };
}

const JobsList: React.FC<SearchParams> = React.memo(
  ({ searchParams, type = "jobs" }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [jobsCopy, setJobsCopy] = useState<Job[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [logo, setLogo] = useState<string>("");
    const [fetchCount] = useState(3);
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollToTopRef = useRef<HTMLAnchorElement>(null);
    const fetchingMore = useRef<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false); // State for the loading message

    const { skillTags, location, jobType, minSalary, maxSalary } = searchParams;

    const baseurl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";

    useEffect(() => {
      const filteredJobs = jobsCopy.filter((job) => {
        const position = job.position.toLowerCase();
        return position.includes(searchParams.query.toLowerCase());
      });
      setJobs(filteredJobs);
    }, [searchParams.query, jobsCopy]);

    const fetchJobs = useCallback(async () => {
      if (fetchingMore.current) return;

      fetchingMore.current = true;
      setLoadingMore(true); // Set loadingMore to true before fetching

      try {
        const params = new URLSearchParams();
        if (location) params.append("location", location);
        if (skillTags.length > 0) params.append("tags", skillTags.join(","));
        if (jobType) params.append("emptype", jobType);

        params.append("limit", fetchCount.toString());
        params.append("offset", ((page - 1) * fetchCount).toString());
        // console.log(params);

        const url = `${baseurl}/${type === "posted" ? "posted-jobs" : type === "applied" ? "applied-jobs" : "jobs"}/?${params.toString()}`;
        const token = localStorage.getItem("access_token");
        const config =
          type === "posted" || type === "applied"
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {};

        // console.log("Fetching jobs from:", url);
        const response = await axios.get(url, config);

        // Preserve the current scroll position
        const scrollTop = scrollRef.current?.scrollTop || 0;
        const scrollHeight = scrollRef.current?.scrollHeight || 0;

        setJobs((prevJobs) => [...prevJobs, ...response.data.results]);
        setJobsCopy((prevJobs) => [...prevJobs, ...response.data.results]);

        // Restore the scroll position after updating jobs
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop =
              scrollRef.current.scrollHeight - scrollHeight + scrollTop;
          }
        }, 0);
      } catch (error: any) {
        console.error("Error fetching jobs:", error?.response?.data);
      }

      setLoaded(true);
      setLoadingMore(false);
      fetchingMore.current = false;
    }, [page, fetchCount, location, jobType, skillTags, baseurl, type]);

    useEffect(() => {
      setJobs([]); // Clear previous jobs when tags change
      setPage(1); // Reset page number when tags change to refetch from the beginning
    }, [searchParams]);

    useEffect(() => {
      setJobs([]); // Clear previous jobs when tags change
      setLoaded(false);
      fetchJobs();
    }, [searchParams, type]);

    useEffect(() => {
      if (page > 1) {
        setLoaded(false);
        fetchJobs();
      }
    }, [page]);

    useEffect(() => {
      const fetchLogo = () => {
        const url = `${baseurl}/accounts/profile/`;
        const token = localStorage.getItem("access_token");
        axios
          .get(url, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => setLogo(response.data.company_photo))
          .catch((error) =>
            console.error(error.response?.data || error.message)
          );
      };

      fetchLogo();
    }, [baseurl, searchParams, page, type]);

    useEffect(() => {
      const handleScroll = () => {
        if (scrollRef.current && scrollToTopRef.current) {
          const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
          if (scrollTop + clientHeight >= scrollHeight - 5 && loaded) {
            // setPage((prevPage) => prevPage + 1); // Infinite scroll
            console.log("Fetching more jobs...");
          }

          if (scrollRef.current.scrollTop > 10) {
            scrollToTopRef.current.style.display = "block";
          } else {
            scrollToTopRef.current.style.display = "none";
          }
        }
      };

      const ref = scrollRef.current;
      if (ref) {
        ref.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (ref) {
          ref.removeEventListener("scroll", handleScroll);
        }
      };
    }, [loaded]);

    useEffect(() => {
      console.log(jobs.length);
    }, [jobs]);

    return (
      <section
        ref={scrollRef}
        className="max-h-full overflow-y-auto scrollbar-hide overscroll-contain w-full justify-self-center scroll-smooth"
      >
        {!loaded && jobs.length === 0 ? (
          <Skeleton />
        ) : (
          <>
            {/* <div id="start" className="absolute top-0" /> */}
            {jobs.length > 0 ? (
              <>
                <ul className="sm:space-y-4 space-y-3 w-full flex flex-col items-center">
                  {jobs.map((job, index) => (
                    <JobCard
                      key={index}
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
                      // seekerside={appliedJobs || !postedJobs}
                      seekerside={type === "applied" || type === "jobs"}
                    />
                  ))}
                </ul>
                {loadingMore && (
                  <div style={{ textAlign: "center", padding: "1rem" }}>
                    Fetching more jobs...
                  </div>
                )}
              </>
            ) : type === "applied" ? (
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
            ) : (
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
            )}
          </>
        )}

        <Link
          href="#start"
          title="Scroll to top"
          onClick={() => scrollRef.current?.scrollTo(0, 0)}
          ref={scrollToTopRef}
          className="bg-blue-100 text-blue-500 absolute sm:right-6 right-2 lg:bottom-4 bottom-2 px-2 pt-2 pb-1 rounded"
          style={{ display: "none" }} // Initially hide the link
        >
          <BiSolidArrowToTop className="w-6 h-6 animate-bounce" />
        </Link>
      </section>
    );
  }
);

// Add a displayName for better debugging
JobsList.displayName = "JobsList";

export default JobsList;
