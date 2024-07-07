import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import JobCard from "./JobCard";

interface Job {
  id: number;
  position: string;
  company_name: string;
  location_restriction: string;
  tags: string;
  created_at: string;
}

interface JobListProps {
  selectedLocationTags: string[];
  selectedJobTags: string[];
  selectedTagTags: string[];

}

const JobList: React.FC<JobListProps> = ({ selectedLocationTags, selectedJobTags,selectedTagTags}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const fetchCount = 10;
  const bottomBoundaryRef = useRef<HTMLDivElement>(null);
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedJobTags.length > 0) {
        params.append('position', selectedJobTags.join(','));
      }
      if (selectedLocationTags.length > 0) {
        params.append('location', selectedLocationTags.join(','));
      }
      if (selectedTagTags.length > 0) {
        params.append('tags', selectedTagTags.join(','));
      }
      
      params.append('limit', fetchCount.toString());
      params.append('offset', ((page - 1) * fetchCount).toString());

      const url = `${baseurl}/jobs/?${params.toString()}`;
      const response = await axios.get(url);
      console.log('Fetched jobs:', response.data.results);

      setJobs(prevJobs => [...prevJobs, ...response.data.results]); // Append new jobs to existing jobs
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs(); // Fetch jobs when component mounts and when page changes
  }, [page]);

  useEffect(() => {
    setJobs([]); // Clear previous jobs when tags or salary range change
    setPage(1); // Reset page number when tags or salary range change to refetch from the beginning
  }, [selectedLocationTags, selectedJobTags,selectedTagTags]);

  // Refetch jobs when tags, salary range or page change
  useEffect(() => {
    fetchJobs();
  }, [selectedLocationTags, selectedJobTags,selectedTagTags, page]);

  // Function to handle scroll event
  const handleScroll = () => {
    if (bottomBoundaryRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - bottomBoundaryRef.current.clientHeight) {
        setPage(prevPage => prevPage + 1); // Increment page to fetch more jobs
      }
    }
  };

  // Attach scroll listener on mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex justify-center p-4 mt-8">
      <ul className="space-y-4 w-full flex flex-col items-center">
        {jobs.map(({ id, position, company_name, location_restriction, tags, created_at }) => (
          <JobCard
            key={id}
            id={id}
            position={position}
            company_name={company_name}
            location_restriction={location_restriction}
            tags={tags}
            created_at={created_at}
          />
        ))}
        {loading && <p>Loading...</p>}
        <div ref={bottomBoundaryRef}></div>
      </ul>
    </div>
  );
};

export default JobList;