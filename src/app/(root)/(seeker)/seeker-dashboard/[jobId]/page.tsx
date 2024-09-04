"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimerOutline } from "react-icons/io5";
import Spinner from "@/Components/Loaders/Spinner";
import { swalFailed, swalSuccess } from "@/lib/helpers/swal";

interface Application {
  job: number;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  applicant_profile_picture: string | null;
  applied_at: string;
}

interface JobDetails {
  id: number;
  applications: Application[];
  company_name: string;
  position: string;
  primary_tag: string;
  tags: string;
  location_restriction: string;
  job_description: string;
  annual_salary_min: string;
  annual_salary_max: string;
  how_to_apply: string;
  benefits: string;
  created_at: string;
  apply_email_address: string | null;
  apply_url: string | null;
  employee_type: string;
}

const JobDetails = ({ params }: { params: { jobId: number } }) => {
  const jobId = params.jobId;
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [searchParams, setSearchParams] = useState<{ skillTags: string[] }>({
    skillTags: [],
  });
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const handleApplyJob = async () => {
    const baseurl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      console.log("Not logged in");
      return;
    }

    try {
      const response = await axios.post(
        `${baseurl}/jobs/apply/`,
        {
          job: jobId,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log("Applied for job", response.data);
      setIsApplied(true);
      swalSuccess({
        title: "Job Applied",
        message:
          "Application submitted successfully. Please wait for the recruiter to contact you.",
      });
    } catch (error: any) {
      console.log("Error applying for job", error.response.data || error);
      swalFailed({
        title: "Error!",
        error: "Failed to submit the application. Please try again.",
      });
    }
  };

  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";

  useEffect(() => {
    const access_token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (access_token) {
      const fetchJobDetailsAndCheckApplicationStatus = async () => {
        try {
          // Fetch job details
          const jobResponse = await axios.get(`${baseurl}/jobs/${jobId}/`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
          setJobDetails(jobResponse.data);

          // Check application status
          const applicationResponse = await axios.get(
            `${baseurl}/applied-jobs/`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );

          const appliedJobs = applicationResponse.data;
          const hasApplied = appliedJobs.some(
            (application: Application) => application.job === jobId
          );

          setIsApplied(hasApplied);
        } catch (error) {
          console.log("Error fetching data", error);
        }
      };

      fetchJobDetailsAndCheckApplicationStatus();
    }
  }, [jobId, baseurl]);

  const getTimePast = (date: string) => {
    const currentDate = new Date();
    const pastDate = new Date(date);
    const timeDiff = currentDate.getTime() - pastDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (daysDiff === 0) {
      return "today";
    } else if (daysDiff === 1) {
      return "yesterday";
    } else if (daysDiff < 7) {
      return `${daysDiff} days ago`;
    } else if (daysDiff < 30) {
      const weeksDiff = Math.floor(daysDiff / 7);
      return `${weeksDiff} week${weeksDiff > 1 ? "s" : ""} ago`;
    } else if (daysDiff < 365) {
      const monthsDiff = Math.floor(daysDiff / 30);
      return `${monthsDiff} month${monthsDiff > 1 ? "s" : ""} ago`;
    } else {
      const yearsDiff = Math.floor(daysDiff / 365);
      return `${yearsDiff} year${yearsDiff > 1 ? "s" : ""} ago`;
    }
  };

  if (!jobDetails)
    return (
      <div className="flex items-center justify-center w-full h-[100dvh]">
        <Spinner />
      </div>
    );

  return (
    <section className="w-full min-h-screen bg-white py-4 sm:px-6 md:px-10">
      <h1 className="text-center lg:text-4xl md:text-3xl text-2xl font-bold text-gray-800 font-RadioGrotesk tracking-wide">
        {jobDetails.position || "Job Title"}
      </h1>

      <div className="sm:mx-4 sm:my-6 my-2 sm:px-10 px-4 sm:py-6 py-2 sm:border-2 border-t-2 sm:border-gray-300 sm:rounded-xl relative">
        <h4 className="sm:text-lg text-base font-semibold text-gray-600 mb-1">
          {jobDetails.primary_tag || "Primary Tag"} -{" "}
          <span className="hover:text-blue-500 transition-colors duration-300">
            {jobDetails.employee_type} Oppurtunity
          </span>
        </h4>
        <h5 className="text-sm font-semibold text-gray-400 sm:mb-2 mb-1">
          {jobDetails.company_name || "Company Name"}
        </h5>

        <div className="sm:my-3 my-1.5 flex flex-wrap items-center gap-x-10 gap-y-1">
          <h2 className="block">
            <FaLocationDot size={18} className="inline me-1.5 text-gray-700" />
            <p className="text-gray-500 text-sm inline-block">
              <span className="inline-block font-semibold">Location -</span>{" "}
              {jobDetails.location_restriction || "Location"}
            </p>
          </h2>

          <h2 className="block">
            <FaMoneyBillAlt size={18} className="inline me-1.5 text-gray-700" />
            <p className="text-gray-500 text-sm inline-block">
              <span className="inline-block font-semibold">Salary -</span> ₹
              {jobDetails.annual_salary_min || "Min"} -
              {jobDetails.annual_salary_max || "Max"} per year
            </p>
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:my-7 my-3">
          <span className="bg-gray-200 text-xs text-gray-600 px-1.5 py-1 rounded-lg">
            <IoTimerOutline size={14} className="inline me-1.5" />
            Posted {getTimePast(jobDetails.created_at)}
          </span>
          <span className="bg-gray-200 text-xs text-gray-600 px-1.5 py-1 rounded-lg">
            {jobDetails.employee_type} {/*Need to add jobDetails.emptype*/}
          </span>
        </div>

        <hr className="border-gray-200 border sm:my-6 my-4" />

        <h2 className="text-base font-semibold text-blue-600 mb-4">
          About the internship /Job
        </h2>

        <div className="sm:text-base text-sm">
          <article
            dangerouslySetInnerHTML={{ __html: jobDetails.job_description }}
          ></article>
        </div>

        <h2 className="text-base font-semibold text-blue-600 mt-6 mb-4">
          How to Apply
        </h2>

        <div className="sm:text-base text-sm">
          <article
            dangerouslySetInnerHTML={{ __html: jobDetails.how_to_apply }}
          ></article>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleApplyJob}
          disabled={isApplied}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isApplied ? "Already Applied" : "Apply"}
        </button>
      </div>
    </section>
  );
};

export default JobDetails;
