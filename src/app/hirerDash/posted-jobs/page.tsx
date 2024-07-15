"use client"

import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import Navbar from '../../Navbar';
import JobList from '../../Components/JobList';
import SalaryRangeSlider from '../../Components/FilterBox';
import { Tags2 } from '@/stories/Tags2';
import locationOptions from "../../post/data/location.json";
import tagOptions from "../../post/data/tags.json";
import Sidebar from '@/app/Components/HireDashSidebar';
import JobDetailsModal from '@/app/Components/JobModal';

const jobPositionOptions = [
    { label: 'Software Engineer' },
    { label: 'Data Analyst' },
    { label: 'Product Manager' },
    { label: 'UX/UI Designer' },
];

const postedJobs = () => {
  const [selectedLocationTags, setSelectedLocationTags] = useState<string[]>([]);
  const [selectedJobTags, setSelectedJobTags] = useState<string[]>([]);
  const [selectedTagTags, setSelectedTagTags] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([0, 100000]);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const router = useRouter();

  const handleLocationTagSelection = (tags: string[]) => {
    setSelectedLocationTags(tags);
  };

  const handleJobTagSelection = (tags: string[]) => {
    setSelectedJobTags(tags);
  };

  const handleTagTagSelection = (tags: string[]) => {
    setSelectedTagTags(tags);
    console.log('Selected Tags:', tags);
  };

  const handleSalaryRangeChange = (range: number[]) => {
    setSalaryRange(range);
    console.log('Selected Salary Range:', range);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  }

  return (
    <div>
        <Sidebar userName="Praneeth"/>
          <div className="flex gap-4 justify-center items-center pl-[200px]">
            <div>
            <h1 className="text-2xl text-black font-semibold">Posted Jobs</h1>
            </div>
          <div>
            <h3 className="text-lg font-semibold mb-2"></h3>
            
            <Tags2
              options={locationOptions}
              cls="input_company{background-color: #f2f1ed;width: 95%;margin-top:10px;margin-left: 14px;border-radius: 7px;border-width: 1px;border-color: #b1b3b6;padding: 3px 10px;}"
              placeholder="Search by Location"
              dynamic={true}
              onSelect={handleLocationTagSelection}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2"></h3>
            <Tags2
              options={jobPositionOptions}
              cls="input_company{background-color: #f2f1ed;width: 95%;margin-top:10px;margin-left: 14px;border-radius: 7px;border-width: 1px;border-color: #b1b3b6;padding: 3px 10px;}"
              placeholder="Search by Job Position"
              dynamic={true}
              onSelect={handleJobTagSelection}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2"></h3>
            <Tags2
              options={tagOptions}
              cls="input_company{background-color: #f2f1ed;width: 95%;margin-top:10px;margin-left: 14px;border-radius: 7px;border-width: 1px;border-color: #b1b3b6;padding: 3px 10px;}"
              placeholder="Search by Tags"
              dynamic={true}
              onSelect={handleTagTagSelection}
            />
          </div>
          <div className="">
            <SalaryRangeSlider
              onRangeChange={handleSalaryRangeChange}
              salaryRange={salaryRange}
            />
          </div>
        </div>
        {selectedJob && 
          <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />
          }
        <JobList
          selectedLocationTags={selectedLocationTags}
          selectedJobTags={selectedJobTags}
          selectedTagTags={selectedTagTags}
          postedJobs={true}
          view={setSelectedJob}
        />
      </div>
  )
}

export default postedJobs