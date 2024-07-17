"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import Navbar from '../Navbar';
import JobList from '../Components/JobList';
import SalaryRangeSlider from '../Components/FilterBox';
import { Tags2 } from '@/stories/Tags2';
import locationOptions from "../post/data/location.json";
import tagOptions from "../post/data/tags.json";
import JobDetailsModal from '../Components/JobModal';

const jobPositionOptions = [
  { label: 'Software Engineer' },
  { label: 'Data Analyst' },
  { label: 'Product Manager' },
  { label: 'UX/UI Designer' },
];

const Dashboard: React.FC = () => {
  const [selectedLocationTags, setSelectedLocationTags] = useState<string[]>([]);
  const [selectedJobTags, setSelectedJobTags] = useState<string[]>([]);
  const [selectedTagTags, setSelectedTagTags] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([0, 100000]);

  const router = useRouter();

  const checkLogIn = () => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      router.push('/login');
    }
  }

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

  const [selectedJob, setSelectedJob] = useState<any>(null);

  const handleCloseModal = () => {
    setSelectedJob(null);
  }

  const handleLogOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/');
  }

  useEffect(() => {
    checkLogIn();
  }, []);

  return (
      <>
        <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">Code Unity</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href='/profile' className="mr-5 hover:text-gray-900">Profile</Link>
          <Link href='/resume' className="mr-5 hover:text-gray-900">Your Resume</Link>
        </nav>
        <button 
        onClick={handleLogOut}
        className="inline-flex items-center bg-red-400 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-black mt-4 md:mt-0">Log Out
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
        <div>
          <div className="flex gap-4 justify-center items-center">
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
          postedJobs={false}
          view={setSelectedJob}
        />
      </div>
    </>
  )
}

export default Dashboard