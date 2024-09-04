import React from "react";
import { IoMdClose } from "react-icons/io";

type CoverLetterModalProps = {
  setIsCoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  jobDetails: any;
  index: number;
};

const CoverLetterModal = ({
  setIsCoverOpen,
  jobDetails,
  index,
}: CoverLetterModalProps) => {
  return (
    <div className="overflow-y-auto overflow-x-hidden fixed z-[70] flex justify-center items-center w-full inset-0 h-full select-none">
      <div className="relative p-4 w-full max-w-md h-auto">
        <div className="relative p-4 flex flex-col w-full text-center bg-gray-100 rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <h2 className="text-gray-500 font-semibold w-full mb-4">
            Cover Letter
          </h2>
          <button className="absolute top-3 right-3">
            <IoMdClose
              size={24}
              className="text-red-500 "
              onClick={() => setIsCoverOpen(false)}
            />
          </button>
          <p>
            {jobDetails.applications[index].applicant_cover_letter ||
              "I'm interested in this opportunity and I believe I have the right skills for this opportunity."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterModal;
