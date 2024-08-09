import React from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimerOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import axios from "axios";
import { cookies } from "next/headers";

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
  //emptype: string;
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

const JobDetailsPage = async ({ params }: { params: { jobId: number } }) => {
  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";
  const jobId = params.jobId;
  const token = cookies().get("token")?.value;
  console.log("Token: ", token);
  console.log(baseurl);

  let jobDetails: JobDetails = {
    id: -1,
    applications: [],
    company_name: "",
    position: "",
    primary_tag: "",
    tags: "",
    location_restriction: "",
    job_description: "",
    annual_salary_min: "",
    annual_salary_max: "",
    how_to_apply: "",
    benefits: "",
    created_at: "",
    apply_email_address: "",
    apply_url: "",
  };

  try {
    const response = await axios.get(`${baseurl}/jobs/${jobId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    jobDetails = response.data;
    console.log(jobDetails);
  } catch (error: any) {
    console.log(error.code);
  }

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
  return (
    <section className="w-full h-full bg-white py-4 px-6 relative">
      <h1 className="text-center text-4xl font-bold text-gray-800">
        {jobDetails.position || "Job Title"}
      </h1>

      <div className="mx-4 my-6 border border-gray-200 rounded-xl px-10 py-6">
        <h4 className="text-lg font-semibold text-gray-600 mb-1">
          {jobDetails.primary_tag || "Primary Tag"}
        </h4>
        <h5 className="text-sm font-semibold text-gray-400 mb-2">
          {jobDetails.company_name || "Company Name"}
        </h5>

        <div className="my-3 flex items-center gap-10">
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
              <span className="inline-block font-semibold">Stipend -</span> ₹
              {jobDetails.annual_salary_min || "Min"} - ₹
              {jobDetails.annual_salary_max || "Max"}
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

        <div className="flex items-center gap-1.5">
          <FiUsers size={24} className="inline me-1.5" />
          <span className="text-gray-500 text-sm">
            {jobDetails.applications.length} applicants
          </span>
        </div>

        <hr className="border-gray-100 border my-6" />

        <div className="absolute"></div>

        <h2 className="text-base font-semibold text-gray-600">
          About the internship /Job
        </h2>

        <div
          className=" scrollbar-hide"
          style={{
            marginLeft: "2%",
            overflowX: "auto",
            overflowY: "auto",
            width: "80%",
            maxHeight: "400px",
            padding: "2px",
            borderRadius: "4px",
          }}
        >
          <main
            dangerouslySetInnerHTML={{ __html: jobDetails.job_description }}
          ></main>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsPage;
