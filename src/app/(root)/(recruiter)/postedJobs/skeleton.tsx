import React from "react";

const Skeleton = () => {
  return (
    <div className="flex animate-pulse ps-14">
      <div
        role="status"
        className="min-w-full flex flex-col gap-4 animate-pulse"
      >
        <div className="h-48 bg-gray-300 rounded-2xl min-w-full"></div>
        <div className="h-48 bg-gray-300 rounded-2xl min-w-full"></div>
        <div className="h-48 bg-gray-300 rounded-2xl min-w-full"></div>
        <div className="h-48 bg-gray-300 rounded-2xl min-w-full"></div>
        <div className="h-48 bg-gray-300 rounded-2xl min-w-full"></div>
        <div className="h-48 bg-gray-300 rounded-2xl min-w-full"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Skeleton;
