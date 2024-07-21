"use client";
import React, { useState } from 'react';
import { getTimeDifference } from "../utils/timeutils";
import JobDetailsModal from './JobModal';
import ApplyPopup from './ApplyPopup';

interface Props {
  job: Job;
  cls?: string;
  bdg?: boolean;
  top?: boolean;
  imgflg?: boolean;
  divcls?: string;
  fgcls?: string;
  bgcolor?: string;
}

interface Job {
  id: number;
  position: string;
  company_name: string;
  location_restriction: string;
  tags: string;
  created_at: string;
  primary_tag: string;
  annual_salary_max: string;
  annual_salary_min: string;
  job_description: string;
  how_to_apply: string;
}

interface TagProps {
  tag: string;
  index: number;
}

const TagDisplay = ({ tag, index }: TagProps) => {
  if (index < 4)
    return (
      <div
        key={index}
        className="bg-[#333333] px-2 py-1 rounded ml-2"
        style={{ borderColor: "black" }}
      >
        <p className="text-white">{tag.trim()}</p>
      </div>
    );
  if (index === 4)
    return (
      <div key={-1} className="p-1 ml-2">
        <p>...</p>
      </div>
    );
};

const PrimaryTagDisplay = ({ tag, index }: TagProps) => {
  if (index < 4)
    return (
      <div
        className="bg-[#1A73E8] rounded-md px-2 py-2 text-center ml-[1%] text-white"
        style={{ display: "inline" }}
      >
        {tag.trim()}
      </div>
    );
  if (index === 4)
    return (
      <div key={-1} style={{ display: "inline" }} className="p-1 ml-2">
        ...
      </div>
    );
};

export const JobCard = ({ job, cls = "", bdg = false, imgflg = false, divcls = "flex justify-between w-full mb-2", top = true, fgcls = "", bgcolor = "#111111" }: Props) => {
  let l = parseInt(job.annual_salary_min) / 1000;
  let u = parseInt(job.annual_salary_max) / 1000;

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState<Job | null>(null);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedJob(null);
  };

  return (
    <div className={`border text-white border-[#333333] p-5 rounded-lg transition duration-300 hover:border-[5px] hover:border-purple-500 w-[90%] mx-auto ${cls}`} style={{ backgroundColor: `${bgcolor}`, width: "97%" }}>
      {selectedJobDetails && <JobDetailsModal job={selectedJobDetails} onClose={() => setSelectedJobDetails(null)} />}
      {showPopup && <ApplyPopup job={selectedJob} onClose={handleClosePopup} />}
      
      <div className={`flex items-center w-full mb-2`} style={{ marginLeft: "0px" }}>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full border border-black">
            <img alt="Tailwind CSS Navbar component" src={job.logo || "https://tse4.mm.bing.net/th?id=OIP.jsRxsoSHWZurGmwk32OMcQAAAA&pid=Api&P=0&h=220"} />
          </div>
        </div>
        <div className={`flex items-center w-full mb-2`}>
          <h2 className="text-xl font-semibold text-white ml-[7px]">{job.position}</h2>
          <div className="flex gap-4 mt-2 ml-[12px]">
            <span className="bg-[#E01E5A] text-white px-2 py-1 rounded">{`$${l}-${u}K PA`}</span>
            <span className="bg-[#7B3B00] text-white px-2 py-1 rounded">{job.primary_tag}</span>
          </div>
        </div>
      </div>
      <div className='ml-[35px]' style={{ width: "800px" }}>
        {job.location_restriction && job.location_restriction.split(",").map((tag, index) => (<PrimaryTagDisplay key={index} tag={tag} index={index} />))}
      </div>
      <div className="flex items-center w-full mb-2 mt-[5%]">
        {job.tags && job.tags.split(",").map((tag, index) => (<TagDisplay key={index} tag={tag} index={index} />))}
      </div>
      <div className="ml-[1%] flex items-center mt-[19px]">
        <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300" onClick={() => handleApplyClick(job)}>
          Apply
        </button>
        <div className='ml-[75%]'>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300" onClick={() => setSelectedJobDetails(job)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
