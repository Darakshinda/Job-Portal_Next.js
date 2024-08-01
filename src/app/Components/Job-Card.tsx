// JobCard.tsx
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import JobDetailsModal from './JobModal';

interface Props {
  job: Job | AppliedJob;
  cls?: string;
  bdg?: boolean;
  top?: boolean;
  imgflg?: boolean;
  divcls?: string;
  fgcls?: string;
  bgcolor?: string;
  appliedJobs?: boolean; // Add prop to indicate if it's applied jobs
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

interface AppliedJob {
  job: number;
  cover_letter: string;
  resume: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  applied_at: string;
  job_details: {
    company_name: string;
    location_restriction: string;
    tags: string;
    annual_salary_max: string;
    position: string;
  };
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

export const JobCard = ({ job, cls = "", bdg = false, imgflg = false, divcls = "flex justify-between w-full mb-2", top = true, fgcls = "", bgcolor = "#111111", appliedJobs = false }: Props) => {
  const isAppliedJob = (job as AppliedJob).job_details !== undefined;
  const jobDetails = isAppliedJob ? (job as AppliedJob).job_details : (job as Job);
  const l = parseInt(jobDetails.annual_salary_min || "0") / 1000;
  const u = parseInt(jobDetails.annual_salary_max) / 1000;

  const [selectedJobDetails, setSelectedJobDetails] = useState<Job | null>(null);

  const handleApplyClick = async (job: Job) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000/api';
    const token = localStorage.getItem('access_token');

    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/jobs/apply/`, 
        { job: job.id }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Application submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting application:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    }
  };

  return (
    <div className={`border text-white border-[#333333] p-5 rounded-lg transition duration-300 hover:border-[5px] hover:border-purple-500 w-[90%] mx-auto ${cls}`} style={{ backgroundColor: `${bgcolor}`, width: "97%" }}>
      {selectedJobDetails && <JobDetailsModal job={selectedJobDetails} onClose={() => setSelectedJobDetails(null)} />}
      
      <div className={`flex items-center w-full mb-2`} style={{ marginLeft: "0px" }}>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full border border-black">
            <img alt="Tailwind CSS Navbar component" src={jobDetails.logo || "https://tse4.mm.bing.net/th?id=OIP.jsRxsoSHWZurGmwk32OMcQAAAA&pid=Api&P=0&h=220"} />
          </div>
        </div>
        <div className={`flex items-center w-full mb-2`}>
          <h2 className="text-xl font-semibold text-white ml-[7px]">{jobDetails.position}</h2>
          <div className="flex gap-4 mt-2 ml-[12px]">
            <span className="bg-[#E01E5A] text-white px-2 py-1 rounded">{`$${l}-${u}K PA`}</span>
            <span className="bg-[#7B3B00] text-white px-2 py-1 rounded">{jobDetails.primary_tag}</span>
          </div>
        </div>
      </div>
      <div className='ml-[35px]' style={{ width: "800px" }}>
        {jobDetails.location_restriction && jobDetails.location_restriction.split(",").map((tag, index) => (<PrimaryTagDisplay key={index} tag={tag} index={index} />))}
      </div>
      <div className="flex items-center w-full mb-2 mt-[5%]">
        {jobDetails.tags && jobDetails.tags.split(",").map((tag, index) => (<TagDisplay key={index} tag={tag} index={index} />))}
      </div>
      <div className="ml-[1%] flex items-center mt-[19px]">
        {!appliedJobs && (
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300" onClick={() => handleApplyClick(job as Job)}>
            Apply
          </button>
        )}
        <div className='ml-[75%]'>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300" onClick={() => setSelectedJobDetails(job as Job)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
