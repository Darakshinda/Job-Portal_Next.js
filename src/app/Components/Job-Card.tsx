"use client"
import React from 'react';
import { getTimeDifference } from "../utils/timeutils";
import { useState} from "react";
import JobDetailsModal from './JobModal';
import ApplyPopup from './ApplyPopup';


interface Props {
 
  cls?: string;bdg?:boolean;top?:boolean;imgflg?:boolean;divcls?:string;fgcls?:string;imgsrc?:string;bgcolor?:string;
  position?: string;
  company_name?: string;
  location_restriction?: string;
  tags?: string;
  created_at?: string;
  job?: object;
 
  
}
interface tprop
{tag?: string;
  index?: number;}

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


/**
 * Primary UI component for user interaction
 */
const tdisp = ({tag="",index=0}:tprop)=>
{
  if(index<4)
  return(<div
  key={index}
  className="bg-[#333333] px-2 py-1 rounded ml-2" style={{borderColor:"black"}}
>
  <p className=" text-white">{tag.trim()}</p>
</div>);
if(index==4) return(<div
  key={-1}
  className="p-1 ml-2"
>
  <p>...</p>
</div>);
}
const tdisp1 = ({tag="",index=0}:tprop)=>
  {
    if(index<4)
    return(<div className="bg-[#1A73E8]  rounded-md px-2 py-2 text-center ml-[1%] text-white" style={{ display:"inline"}}>
      {tag.trim()}
    </div>);
  if(index==4) return(<div  style={{ display:"inline"}}
    key={-1}
    className="p-1 ml-2"
  >
  ...
  </div>);
  }


export const JobCard = ({cls="",bdg = false,imgflg=false,divcls="flex justify-between w-full mb-2",top=true,fgcls="",bgcolor="#111111",
  imgsrc="https://media.dev.to/cdn-cgi/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fwhh1lpihw7h587pb2iuc.png",position,
  company_name="Sample Company",
  location_restriction="Faridabad",
  tags="HTML,Css,JS",
  created_at="6/18/2024 1:00:21",job,
}: Props) => {let l=parseInt(job.minsal)/1000,u=parseInt(job.maxsal)/1000;
  console.log(job.emptype);

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedjob, setSelectedjob] = useState(null);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedJob(null);
  };


if(company_name=="") company_name="Company";if(position=="") position="Position";if(imgsrc=="") imgsrc="https://tse4.mm.bing.net/th?id=OIP.jsRxsoSHWZurGmwk32OMcQAAAA&pid=Api&P=0&h=220";
 return (
    
    <div className={`border text-white border-[#333333] p-5 rounded-lg transition duration-300 hover:border-[5px] hover:border-purple-500 w-[90%] mx-auto ${cls}`} style={{backgroundColor:`${bgcolor}`,width:"97%",}}>
     {selectedjob && 
        <JobDetailsModal job={selectedjob} onClose={setSelectedjob} />
      }
      {showPopup && (
        <ApplyPopup job={selectedJob} onClose={handleClosePopup} />
      )}
  
    <div className={`flex items-center w-full mb-2`}  style={{marginLeft:"0px"}}>
   <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border border-black">
                <img alt="Tailwind CSS Navbar component" src={imgsrc} /> </div> </div>
        <div className={`flex items-center w-full mb-2`}><h2 className="text-xl font-semibold text-white ml-[7px]">{position}</h2>
              <div className="flex gap-4 mt-2 ml-[12px]">
                <span className="bg-[#E01E5A] text-white px-2 py-1 rounded">{`$${l}-${u}K PA`}</span>

                <span className="bg-[#7B3B00] text-white px-2 py-1 rounded">{job.emptype}</span>
              </div></div>
      </div>
      <div className=' ml-[35px]'  style={{ width:"800px"}}>
      {location_restriction &&
          location_restriction.split(",").map((tag, index) => (tdisp1({tag,index})
          ))}</div>
      <div className="flex items-center w-full mb-2 mt-[5%]">
     
        {tags &&
          tags.split(",").map((tag, index) => (tdisp({tag,index})
          ))}
       
      </div>
      
      <div className="ml-[1%] flex items-center mt-[19px]">
          
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300" onClick={() => handleApplyClick(job)}>
            Apply
          </button>
          <div className='ml-[75%]'>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300" onClick={() => setSelectedjob(job)}>
            View Details
          </button></div>
        </div> 
   
  </div>
  );

};

