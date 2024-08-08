// "use client";
// import React from "react";
// import { getTimeDifference } from "../utils/timeutils";
// import { useState } from "react";
// import JobDetailsModal from "./JobModal";
// import ApplyPopup from "./ApplyPopup";
// import Link from "next/link";
// import axios from "axios";
// import ApplicantCard from "./ApplicantCard";

// interface Props {
//   cls?: string;
//   bdg?: boolean;
//   top?: boolean;
//   imgflg?: boolean;
//   divcls?: string;
//   fgcls?: string;
//   imgsrc?: string;
//   bgcolor?: string;
//   position?: string;
//   company_name?: string;
//   location_restriction?: string;
//   tags?: string;
//   created_at?: string;
//   job?: object;
//   postedJobs?: boolean;
//   viewDetails?: Function;
// }
// interface tprop {
//   tag?: string;
//   index?: number;
// }

// interface Job {
//   id: number;
//   position: string;
//   company_name: string;
//   location_restriction: string;
//   tags: string;
//   created_at: string;
//   primary_tag: string;
//   annual_salary_max: string;
//   annual_salary_min: string;
//   job_description: string;
//   how_to_apply: string;
//   applications: Array<any>;
// }

// /**
//  * Primary UI component for user interaction
//  */
// const tdisp = ({ tag = "", index = 0 }: tprop) => {
//   if (index < 4)
//     return (
//       <div
//         key={index}
//         className="bg-[#333333] px-2 py-1 rounded ml-2"
//         style={{ borderColor: "black" }}
//       >
//         <p className=" text-white">{tag.trim()}</p>
//       </div>
//     );
//   if (index == 4)
//     return (
//       <div key={-1} className="p-1 ml-2">
//         <p>...</p>
//       </div>
//     );
// };
// const tdisp1 = ({ tag = "", index = 0 }: tprop) => {
//   if (index < 4)
//     return (
//       <div
//         className="bg-[#1A73E8]  rounded-md px-2 py-2 text-center ml-[1%] text-white"
//         style={{ display: "inline" }}
//       >
//         {tag.trim()}
//       </div>
//     );
//   if (index == 4)
//     return (
//       <div style={{ display: "inline" }} key={-1} className="p-1 ml-2">
//         ...
//       </div>
//     );
// };

// export const JobCard = ({
//   cls = "",
//   bdg = false,
//   imgflg = false,
//   divcls = "flex justify-between w-full mb-2",
//   top = true,
//   fgcls = "",
//   bgcolor = "#111111",
//   imgsrc = "https://media.dev.to/cdn-cgi/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fwhh1lpihw7h587pb2iuc.png",
//   position,
//   company_name = "Sample Company",
//   location_restriction = "Faridabad",
//   tags = "HTML,Css,JS",
//   created_at = "6/18/2024 1:00:21",
//   job,
//   postedJobs,
//   viewDetails,
// }: Props) => {
//   let l = parseInt(job.minsal) / 1000,
//     u = parseInt(job.maxsal) / 1000;
//   console.log(job.emptype);

//   const [showPopup, setShowPopup] = useState<boolean>(false);
//   const [showApplicants, setShowApplicants] = useState<boolean>(false);
//   const [selectedjob, setSelectedjob] = useState(null);
//   const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

//   const handleShowApplicants = () => {
//     setShowApplicants((prev) => !prev);
//   };

//   const handleApplyClick = (job: Job) => {
//     setSelectedJob(job);
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//     setSelectedJob(null);
//   };

//   const handleDelete = (id: number) => {
//     const result = confirm("Are you sure you want to delete this job?");
//     if (result) {
//       axios
//         .delete(`${baseurl}/jobs/${id}/delete/`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         })
//         .then(() => {
//           alert("Job Deleted Successfully");
//           window.location.reload();
//         })
//         .catch((error) => {
//           console.log(error.response.data || error.message);
//         });
//     } else {
//       return;
//     }
//   };

//   if (company_name == "") company_name = "Company";
//   if (position == "") position = "Position";
//   if (imgsrc == "")
//     imgsrc =
//       "https://tse4.mm.bing.net/th?id=OIP.jsRxsoSHWZurGmwk32OMcQAAAA&pid=Api&P=0&h=220";

//   return (
//     <div
//       className={`border-[5px] text-white border-[#333333] p-5 rounded-lg transition duration-300 hover:border-[5px] hover:border-purple-500 w-[90%] mx-auto ${cls}`}
//       style={{ backgroundColor: `${bgcolor}`, width: "97%" }}
//     >
//       {selectedjob && (
//         <JobDetailsModal job={selectedjob} onClose={setSelectedjob} />
//       )}
//       {showPopup && <ApplyPopup job={selectedjob} onClose={handleClosePopup} />}

//       <div
//         className={`flex items-center w-full mb-2`}
//         style={{ marginLeft: "0px" }}
//       >
//         {imgflg && (
//           <div
//             tabIndex={0}
//             role="button"
//             className="btn btn-ghost btn-circle avatar"
//           >
//             <div className="w-10 rounded-full border border-black bg-white">
//               <img alt="Profile Picture" src={imgsrc} />
//             </div>
//           </div>
//         )}
//         <div className={`flex items-center w-full mb-2`}>
//           <h2 className="text-xl font-semibold text-white ml-[7px]">
//             {position}
//           </h2>
//           <div className="flex gap-4 mt-2 ml-[12px]">
//             <span className="bg-[#E01E5A] text-white px-2 py-1 rounded">{`$${l}-${u}K PA`}</span>

//             <span className="bg-[rgb(123,59,0)] text-white px-2 py-1 rounded">
//               {job.emptype}
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className=" ml-[35px]" style={{ width: "800px" }}>
//         {location_restriction &&
//           location_restriction
//             .split(",")
//             .map((tag, index) => tdisp1({ tag, index }))}
//       </div>
//       <div className="flex items-center w-full mb-2 mt-[5%]">
//         {tags && tags.split(",").map((tag, index) => tdisp({ tag, index }))}
//       </div>

//       <div className="ml-[1%] flex justify-between mt-[19px]">
//         <div className="">
//           {!postedJobs && (
//             <button
//               onClick={() => handleApplyClick(job)}
//               className="bg-purple-500 text-white px-4 py-4 rounded hover:bg-purple-700 transition duration-300 whitespace-nowrap"
//             >
//               Apply
//             </button>
//           )}
//           {postedJobs && (
//             <button
//               onClick={handleShowApplicants}
//               className="bg-purple-500 text-white px-4 py-4 rounded hover:bg-purple-700 transition duration-300 whitespace-nowrap"
//             >
//               {showApplicants ? "Hide Applicants" : "Show Applicants"}
//             </button>
//           )}
//         </div>
//         <div className="flex justify-center">
//           {postedJobs && (
//             <div className="ml-3">
//               <button
//                 className="bg-red-500 mr-1 text-white px-4 py-4 rounded hover:bg-red-700 transition duration-300 whitespace-nowrap"
//                 onClick={() => handleDelete(job.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           )}
//           {postedJobs && (
//             <div className="ml-3">
//               <button className="bg-purple-500 mr-1 text-white px-4 py-4 rounded hover:bg-purple-700 transition duration-300 whitespace-nowrap">
//                 <Link
//                   href={{
//                     pathname: "/post",
//                     query: { jobID: job.id },
//                   }}
//                 >
//                   Edit Details
//                 </Link>
//               </button>
//             </div>
//           )}
//           {postedJobs && (
//             <div className="ml-3">
//               <button
//                 className="bg-purple-500 mr-1 text-white px-4 py-4 rounded hover:bg-purple-700 transition duration-300 whitespace-nowrap"
//                 onClick={() => viewDetails(job)}
//               >
//                 View Details
//               </button>
//             </div>
//           )}
//           {!postedJobs && (
//             <div>
//               <button
//                 className="bg-purple-500 mr-1 text-white px-4 py-4 rounded hover:bg-purple-700 transition duration-300 whitespace-nowrap"
//                 onClick={() => viewDetails(job)}
//               >
//                 View Details
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       {showApplicants && (
//         <div className="mt-4 border-t pt-4">
//           {job.applications &&
//             job.applications.map((application) => (
//               <ApplicantCard applicant={application} />
//             ))}
//           {job.applications.length === 0 && (
//             <p className="text-white">No applicants yet</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
// export default JobCard;

"use client";

import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { IoCashOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import { headers } from "next/headers";
import axios from "axios";
import Swal from "sweetalert2";

interface Job {
  id?: number;
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
  benefits: string;
  email4jobappl: string;
  apply_url: string;
  created_at?: string;
}

const JobCard = ({ type, job }: { type?: string; job: Job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const access_token = localStorage.getItem("access_token");

  const stripHTML = (html: string) => {
    const cleaned = new DOMParser().parseFromString(html, "text/html");
    return cleaned.body.textContent || "";
  };

  const deleteJob = async (id: any) => {
    try {
      const response = await axios.delete(`${baseUrl}/jobs/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response.data);
      Swal.fire("Deleted Successfully", "", "success");
    } catch (error) {
      console.log((error as any)?.response?.data || error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const id = job.id;

  return (
    <section className="w-full max-w-4xl space-y-4">
      {isModalOpen && (
        <>
          <div className="fixed z-40 w-[100vw] h-[100dvh] inset-0 bg-black opacity-70 backdrop-blur-lg transition-opacity duration-1000"></div>

          <DeleteConfirmation
            deletefn={() => deleteJob(id)}
            closemodal={() => setIsModalOpen(false)}
          />
        </>
      )}

      <article className="bg-white rounded-3xl border border-gray-100 shadow-md hover:scale-[1.015] transition-all duration-300 hover:shadow-lg py-4 px-6 relative">
        <div className="flex items-center gap-2 w-full">
          <Image
            src="/assets/images/default-profile.webp"
            alt="profile"
            width={400}
            height={200}
            className="w-20 h-20 object-contain rounded-full"
          />
          <div className="flex-1 flex-col items-start w-full">
            <p className="text-gray-600 text-xl font-bold mb-2 w-[94%] truncate">
              {job.position} at {job.company_name}, {job.emptype} Opportunity
            </p>
            <span className="flex gap-2 items-center">
              <span className="text-base text-gray-400">
                {job.company_name} •
              </span>
              <span className="rounded-lg text-xs bg-blue-300 font-semibold px-2 py-1">
                {job.emptype}
              </span>
              <span className="rounded-lg text-xs bg-green-300 font-semibold px-2 py-1">
                {job.primtg}
              </span>
            </span>
          </div>
        </div>

        {type !== "preview" && (
          <div className="absolute right-2 top-2 p-2 space-y-1">
            <button className="p-1 block outline-none border-2 border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg">
              <MdOutlineEdit size={20} className="text-blue-500" />
            </button>
            <button
              onClick={() => setIsModalOpen((curr) => !curr)}
              className="p-1 block outline-none border-2 border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              <MdOutlineDeleteForever size={20} className="text-red-500" />
            </button>
          </div>
        )}

        <div className="w-full line-clamp-3 my-3">{stripHTML(job.desc)}</div>

        <div className="flex justify-start items-center gap-2 text-xs my-1">
          <span className="text-gray-400/80">Technical Skills</span>
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-300 text-gray-600 rounded-full font-semibold"
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
            <Link href={`/Dashboard/posted-jobs/${job.id}`}>
              <button className="rounded-full hover:bg-blue-200 flex items-center gap-2 text-sm px-2 py-1 transition-colors duration-300">
                <span className="text-blue-400 hover:text-blue-500">
                  View Details
                </span>
                <FaArrowRightLong
                  size={14}
                  className="inline text-blue-400 hover:text-blue-500"
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
