import { SlLocationPin } from "react-icons/sl";
import { IoCashOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

interface Job {
  id?: number;
  logo?: string;
  company_name: string;
  position: string;
  emptype: string;
  primtg: string;
  tags: string[];
  locns: string;
  desc: string;
  minsal: number;
  maxsal: number;
  how2apply: string;
  benefits: string[];
  email4jobappl: string;
  apply_url: string;
  created_at?: string;
}

const JobCard = ({
  type,
  job,
  seekerside = false,
}: {
  type?: string;
  job: Job;
  seekerside: boolean;
}) => {
  const stripHTML = (html: string) => {
    const cleaned = new DOMParser().parseFromString(html, "text/html");
    return cleaned.body.textContent || "";
  };

  return (
    <article className="w-full max-w-4xl bg-white rounded-md max-sm:border">
      <div className="rounded-md border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md sm:p-5 p-3 relative">
        <div className="flex items-center sm:gap-4 gap-1.5 w-full">
          <Image
            src={job.logo || "/assets/images/default-profile.webp"}
            alt="profile"
            width={400}
            height={200}
            className="sm:w-16 sm:h-16 w-14 h-14 object-contain rounded-md border p-1.5"
          />
          <div className="flex flex-col items-start sm:gap-1.5 gap-2 w-full">
            <p className="text-gray-700 md:text-lg sm:text-base text-sm font-bold line-clamp-1">
              {job.position} at {job.company_name}, {job.emptype} Opportunity
            </p>
            <span className="flex gap-x-2 gap-y-1 items-center flex-wrap">
              <span className="sm:text-sm text-xs text-gray-400 whitespace-nowrap">
                {job.company_name} •
              </span>
              <div className="flex flex-wrap gap-x-1 gap-y-0.5">
                <span className="rounded-md text-xs bg-blue-100 text-blue-500 font-semibold px-2.5 py-1 whitespace-nowrap">
                  {job.emptype}
                </span>
                <span className="rounded-md text-xs bg-green-100 text-green-500 font-semibold px-2.5 py-1 whitespace-nowrap">
                  {job.primtg}
                </span>
              </div>
            </span>
          </div>
        </div>

        <div className="w-full line-clamp-2 sm:my-3 my-4 sm:text-sm text-xs text-gray-800">
          {stripHTML(job.desc)}
        </div>

        <div className="flex flex-wrap justify-start items-center gap-1.5 text-xs mb-3">
          <span className="text-gray-500 mr-1 whitespace-nowrap">
            Technical Skills
          </span>
          <div className="flex flex-wrap gap-x-1 gap-y-1">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full font-semibold whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between sm:items-center items-end ml-1">
          <div className="flex flex-wrap sm:gap-x-7 gap-x-3 items-center">
            <p className="inline-block sm:space-x-2.5 space-x-1 whitespace-nowrap">
              <SlLocationPin className="inline sm:w-6 w-4 aspect-square" />
              <span className="text-gray-500 sm:text-sm text-xs">
                {job.locns}
              </span>
            </p>

            <p className="inline-block sm:space-x-2.5 space-x-1 whitespace-nowrap">
              <IoCashOutline className="inline sm:w-6 w-4 aspect-square" />
              <span className="text-gray-500 sm:text-sm text-xs">
                ₹ {job.minsal}-{job.maxsal} LPA
              </span>
            </p>
          </div>

          {type !== "preview" && (
            <Link
              href={`/${seekerside ? "seeker-dashboard" : "postedJobs"}/${job.id}`}
            >
              <button className="rounded-full hover:bg-blue-50 flex items-center gap-2 text-sm px-2.5 py-1 transition-colors duration-300 whitespace-nowrap group">
                <span className="text-blue-400 group-hover:text-blue-500 sm:text-sm text-xs">
                  View Details
                </span>
                <FaArrowRightLong
                  size={14}
                  className="inline text-blue-400 group-hover:text-blue-500"
                />
              </button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default JobCard;
