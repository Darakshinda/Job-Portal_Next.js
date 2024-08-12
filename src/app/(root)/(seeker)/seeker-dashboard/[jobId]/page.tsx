"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimerOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import axios from "axios";
import SkillTags from "@/constants/data/tags.json";
import ApplicantCard from "@/Components/Forms/ApplicantCard";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import Swal from "sweetalert2";
import DeleteConfirmation from "@/Components/DeleteConfirmation";
import SearchSelectDropdown from "@/Components/Forms/SearchSelectDropdown";
import Spinner from "@/Components/Spinner";
import Link from "next/link";

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
}

const JobDetails = ({ params }: { params: { jobId: number } }) => {
  const jobId = params.jobId;
  //   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [searchParams, setSearchParams] = useState<{ skillTags: string[] }>({
    skillTags: [],
  });
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [visibleApplicants, setVisibleApplicants] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const handleSkillChange = (skills: string[]) => {
    setSearchParams((prevState) => ({
      ...prevState,
      skillTags: skills,
    }));
  };

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
        `${baseurl}/jobs/apply`,
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
      Swal.fire({
        title: "Success",
        text: "Application submitted successfully. Please wait for the recruiter to contact you.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error: any) {
      console.log("Error applying for job", error.response.data || error);
      Swal.fire({
        title: "Error!",
        text: "Failed to submit the application. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";

  useEffect(() => {
    // Ensure this runs only in the browser
    const access_token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (access_token) {
      axios
        .get(`${baseurl}/jobs/${jobId}/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          setJobDetails(response.data); // fetchApplicants();
          // console.log(response.data);
          setApplicants(response.data.applications); // Assuming applications are part of the job details response
          //   setVisibleApplicants(
          //     response.data.applications.slice(0, displayApplicantsLength)
          //   );
        })
        .catch((error) => {
          console.log(error.code);
        });
    }
  }, [jobId, baseurl]);

  //   const loadMoreApplicants = () => {
  //     // console.log("Loading more applicants...");
  //     if (loading || !hasMore) return;

  //     setLoading(true);

  //     setTimeout(() => {
  //       const nextApplicants = applicants.slice(
  //         visibleApplicants.length,
  //         visibleApplicants.length + displayApplicantsLength
  //       );
  //       setVisibleApplicants((prev) => [...prev, ...nextApplicants]);
  //       setLoading(false);

  //       if (nextApplicants.length < displayApplicantsLength) {
  //         setHasMore(false); // No more applicants to load
  //       }
  //     }, 1000); // Simulate loading delay
  //   };

  //   const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  //     const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

  //     if (scrollTop + clientHeight >= scrollHeight - 5) {
  //       loadMoreApplicants();
  //     }
  //   };

  //   const deleteJob = (id: any) => {
  //     const access_token =
  //       typeof window !== "undefined"
  //         ? localStorage.getItem("access_token")
  //         : null;
  //     axios
  //       .delete(`${baseurl}/jobs/${id}/delete/`, {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //         Swal.fire("Deleted Successfully", "", "success");
  //       })
  //       .catch((error) => {
  //         console.log((error as any)?.response?.data || error);
  //       });
  //   };

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
    <section className="w-full min-h-screen bg-white py-4 px-6 ps-24">
      {/* {isModalOpen && (
        <>
          <div className="fixed z-[60] w-[100vw] h-[100dvh] inset-0 bg-black opacity-70 backdrop-blur-lg transition-opacity duration-1000"></div>

          <DeleteConfirmation
            deletefn={() => deleteJob(jobId)}
            closemodal={() => setIsModalOpen(false)}
          />
        </>
      )} */}
      <h1 className="text-center text-4xl font-bold text-gray-800">
        {jobDetails.position || "Job Title"}
      </h1>

      <div className="mx-4 my-6 border-2 border-gray-300 rounded-xl px-10 py-6 relative">
        <h4 className="text-lg font-semibold text-gray-600 mb-1">
          {jobDetails.primary_tag || "Primary Tag"}
        </h4>
        <h5 className="text-sm font-semibold text-gray-400 mb-2">
          {jobDetails.company_name || "Company Name"}
        </h5>

        <div className="my-3 flex flex-wrap items-center gap-x-10 gap-y-4">
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

        <div className="flex items-center gap-2 my-7">
          <span className="bg-gray-200 text-xs text-gray-600 px-1.5 py-1 rounded-lg">
            <IoTimerOutline size={14} className="inline me-1.5" />
            Posted {getTimePast(jobDetails.created_at)}
          </span>
          <span className="bg-gray-200 text-xs text-gray-600 px-1.5 py-1 rounded-lg">
            Full Time {/*Need to add jobDetails.emptype*/}
          </span>
        </div>

        {/* <div className="flex items-center gap-1.5">
          <FiUsers size={24} className="inline me-1.5" />
          <span className="text-gray-500 text-sm">
            {jobDetails.applications.length} applicants
          </span>
        </div> */}

        <hr className="border-gray-200 border my-6" />

        {/* <div className="absolute right-2 top-2 p-2 space-y-3">
          <Link
            href={`/postedJobs/${jobId}/edit`}
            title="Edit Job"
            className="p-1 block outline-none border-2 border-gray-300 bg-gray-200/70 hover:bg-gray-300/60 rounded-lg"
          >
            <MdOutlineEdit size={20} className="text-blue-500" />
          </Link>
          <button
            title="Delete Job"
            onClick={() => {
              setIsModalOpen((curr) => !curr);
              document.body.style.overflow = isModalOpen ? "hidden" : "auto";
            }}
            className="p-1 block outline-none border-2 border-gray-300 bg-gray-200/70 hover:bg-gray-300/60 rounded-lg"
          >
            <MdOutlineDeleteForever size={20} className="text-red-500" />
          </button>
        </div> */}

        <h2 className="text-base font-semibold text-blue-600 mb-4">
          About the internship /Job
        </h2>

        <article
          dangerouslySetInnerHTML={{ __html: jobDetails.job_description }}
        ></article>

        <h2 className="text-base font-semibold text-blue-600 mb-4">
          How to Apply
        </h2>

        <article
          dangerouslySetInnerHTML={{ __html: jobDetails.how_to_apply }}
        ></article>

        <hr className="border-gray-200 border my-6" />

        {/* <h2 className="mb-2 flex justify-between items-start">
          <span className="text-base font-semibold text-blue-600">
            Applicants
          </span>
          <div className="flex items-end max-w-sm gap-3">
            <SearchSelectDropdown
              req={false}
              label="Skills"
              labelcls="text-gray-700 font-semibold relative flex items-center gap-2 mb-2"
              cls="relative w-full -mt-2 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
              tags={SkillTags}
              onChange={handleSkillChange}
              placeholder="Eg: Software Developer"
              displayTagsLength={4}
            />
          </div>
        </h2> */}

        {/* <div
          className="overflow-y-auto max-h-72 scrollbar-hide grid lg:grid-cols-2 grid-cols-1 gap-4 py-6"
          onScroll={handleScroll}
        >
          {visibleApplicants.map((applicant, index) => (
            <ApplicantCard key={index} applicant={applicant} />
          ))}
          {loading && <Spinner />}
        </div> */}
      </div>
      <button
        onClick={handleApplyJob}
        disabled={isApplied}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Apply
      </button>
    </section>
  );
};

export default JobDetails;
