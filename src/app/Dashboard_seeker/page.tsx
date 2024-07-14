import React from "react";
import JobList from "../Components/JobList"; // Make sure the path is correct

const Seekerd: React.FC = () => {
  

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="w-full max-w-4xl px-4">  {/* Adjusted the container width and padding */}
        <h1 className="text-4xl font-bold px-4 mt-16">Find Your Dream Job</h1>
        <JobList
          selectedLocationTags={[]}  // Empty arrays as we are not using these filters
          selectedJobTags={[]}
          selectedTagTags={[]}
        />
      </div>
    </div>
  );
};

export default Seekerd;
