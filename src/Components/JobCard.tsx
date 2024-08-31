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
    <section className="w-full max-w-4xl space-y-4 bg-white rounded-3xl">
      <article className="rounded-3xl border border-gray-100 shadow-md transition-all duration-300 hover:shadow-lg py-4 px-6 relative">
        <div className="flex items-center gap-4 w-full">
          <Image
            src={job.logo || "/assets/images/default-profile.webp"}
            alt="profile"
            width={400}
            height={200}
            className="w-16 h-16 object-contain rounded-full"
          />
          <div className="flex flex-col items-start gap-2 w-full">
            <p className="text-gray-600 text-xl font-bold line-clamp-1">
              {job.position} at {job.company_name}, {job.emptype} Opportunity
            </p>
            <span className="flex gap-2 items-center flex-wrap">
              <span className="text-base text-gray-400 whitespace-nowrap">
                {job.company_name} •
              </span>
              <span className="rounded-lg text-xs bg-blue-300 font-semibold px-2 py-1 whitespace-nowrap">
                {job.emptype}
              </span>
              <span className="rounded-lg text-xs bg-green-300 font-semibold px-2 py-1 whitespace-nowrap">
                {job.primtg}
              </span>
            </span>
          </div>
        </div>

        <div className="w-full line-clamp-3 my-3">{stripHTML(job.desc)}</div>

        <div className="flex justify-start items-center gap-2 text-xs my-1">
          <span className="text-gray-400/80">Technical Skills</span>
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-300 text-gray-600 rounded-full font-semibold whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center ml-1">
          <div className="flex flex-nowrap gap-8 items-center">
            <p className="inline-block space-x-3">
              <SlLocationPin size={18} className="inline" />
              <span className="text-gray-500 text-sm">{job.locns}</span>
            </p>

            <p className="inline-block space-x-3">
              <IoCashOutline size={18} className="inline" />
              <span className="text-gray-500 text-sm">
                ₹ {job.minsal}-{job.maxsal} LPA
              </span>
            </p>
          </div>

          {type !== "preview" && (
            <Link
              href={`/${seekerside ? "seeker-dashboard" : "postedJobs"}/${job.id}`}
            >
              <button className="rounded-full hover:bg-blue-100 flex items-center gap-2 text-sm px-2.5 py-1 transition-colors duration-300 group">
                <span className="text-blue-400 group-hover:text-blue-500">
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
      </article>
    </section>
  );
};

export default JobCard;
