"use client";

import React, { useEffect, useState } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimerOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import axios from "axios";
import SkillTags from "@/constants/data/skillTags.json";
import ApplicantCard from "@/Components/Cards/ApplicantCard";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import DeleteConfirmation from "@/Components/Modals/DeleteConfirmation";
import SearchSelectDropdown from "@/Components/Forms/Custom/SearchSelectDropdown";
import Spinner from "@/Components/Loaders/Spinner";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

interface Application {
  job: number;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  applicant_profile_picture: string | null;
  applicant_cover_letter: string | null;
  applicant_resume: string | null;
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
  const router = useRouter();
  const jobId = params.jobId;
  const [isCoverOpen, setIsCoverOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [searchParams, setSearchParams] = useState<{ skillTags: string[] }>({
    skillTags: [],
  });
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [visibleApplicants, setVisibleApplicants] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const displayApplicantsLength = 4; // with this also change the max-h- in the div below appropriately to show the scrollbar

  const handleSkillChange = (skills: string[]) => {
    setSearchParams((prevState) => ({
      ...prevState,
      skillTags: skills,
    }));
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
          setVisibleApplicants(
            response.data.applications.slice(0, displayApplicantsLength)
          );
        })
        .catch((error) => {
          console.log(error.code);
        });
    }
  }, [jobId, baseurl]);

  const loadMoreApplicants = () => {
    // console.log("Loading more applicants...");
    if (loading || !hasMore) return;

    setLoading(true);

    setTimeout(() => {
      const nextApplicants = applicants.slice(
        visibleApplicants.length,
        visibleApplicants.length + displayApplicantsLength
      );
      setVisibleApplicants((prev) => [...prev, ...nextApplicants]);
      setLoading(false);

      if (nextApplicants.length < displayApplicantsLength) {
        setHasMore(false); // No more applicants to load
      }
    }, 1000); // Simulate loading delay
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadMoreApplicants();
    }
  };

  const deleteJob = (id: any) => {
    const access_token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    axios
      .delete(`${baseurl}/jobs/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        Swal.fire("Deleted Successfully", "", "success");
        router.push("/postedJobs");
      })
      .catch((error) => {
        console.log((error as any)?.response?.data || error);
      });
  };

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

  useEffect(() => {
    if (isModalOpen || isCoverOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen, isCoverOpen]);

  if (!jobDetails)
    return (
      <div className="flex items-center justify-center w-full h-[100dvh]">
        <Spinner />
      </div>
    );

  return (
    <section className="w-full min-h-screen bg-white py-4 sm:px-6 md:px-10">
      {isModalOpen && (
        <>
          <div className="fixed z-[60] w-[100vw] h-[100dvh] inset-0 bg-black opacity-70 backdrop-blur-sm transition-opacity duration-1000"></div>

          <DeleteConfirmation
            deletefn={() => deleteJob(jobId)}
            closemodal={() => setIsModalOpen(false)}
          />
        </>
      )}
      {isCoverOpen && (
        <>
          <div className="fixed z-[60] w-[100vw] h-[100dvh] inset-0 bg-black opacity-70 backdrop-blur-sm transition-opacity duration-1000"></div>

          <div className="overflow-y-auto overflow-x-hidden fixed z-[70] flex justify-center items-center w-full inset-0 h-full select-none">
            <div className="relative p-4 w-full max-w-md h-auto">
              <div className="relative p-4 flex flex-col w-full text-center bg-gray-100 rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <h2 className="text-gray-500 font-semibold w-full mb-4">
                  Cover Letter
                </h2>
                <button className="absolute top-5 right-6">
                  <IoMdClose
                    size={24}
                    className="text-red-500 "
                    onClick={() => setIsCoverOpen(false)}
                  />
                </button>
                <p>
                  {jobDetails.applications[index].applicant_cover_letter ||
                    "I'm interested in this opportunity and I believe I have the right skills for this opportunity."}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
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
              {jobDetails.annual_salary_max || "Max"} LPA
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

        <div className="flex items-center gap-1.5">
          <FiUsers size={24} className="inline me-1.5" />
          <span className="text-gray-500 text-sm">
            {jobDetails.applications.length} applicants
          </span>
        </div>

        <hr className="border-gray-200 border sm:my-6 my-4" />

        <div className="absolute right-2 top-2 p-2 space-y-3">
          <Link
            href={`/postedJobs/${jobId}/edit`}
            title="Edit Job"
            className="p-1 block outline-none border-2 border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            <MdEdit size={20} className="text-blue-500" />
          </Link>
          <button
            title="Delete Job"
            onClick={() => {
              setIsModalOpen((curr) => !curr);
            }}
            className="p-1 block outline-none border-2 border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            <MdDelete size={20} className="text-red-500" />
          </button>
        </div>

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

        <hr className="border-gray-200 border my-6" />

        <h2 className="mb-2 flex flex-wrap justify-between items-start gap-y-2">
          <span className="text-base font-semibold text-blue-600">
            Applicants
          </span>
          <div className="flex items-end max-w-sm gap-3">
            <SearchSelectDropdown
              req={false}
              label="Skills"
              labelCls="text-gray-700 font-semibold relative flex items-center gap-2 mb-5"
              cls="relative w-full p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
              tags={SkillTags}
              onChange={handleSkillChange}
              placeholder="Eg: Software Developer"
              displayTagsLength={4}
            />
          </div>
        </h2>
        {visibleApplicants.length > 0 ? (
          <div
            className="overflow-y-auto max-h-72 scrollbar-hide grid lg:grid-cols-2 grid-cols-1 gap-4 py-6"
            onScroll={handleScroll}
          >
            {visibleApplicants.map((applicant, index) => (
              <ApplicantCard
                key={index}
                val={index}
                applicant={applicant}
                setIndex={setIndex}
                setIsCoverOpen={setIsCoverOpen}
              />
            ))}
            {loading && <Spinner />}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-fit">
            <p className="text-gray-500 font-semibold sm:text-2xl text-xl">
              No applicants found
            </p>
            <Image
              src="/assets/icons/no-applications.svg"
              alt="No applicants found"
              width={500}
              height={500}
              className="sm:w-40 sm:h-40 h-20 w-20"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default JobDetails;
