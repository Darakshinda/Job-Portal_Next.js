import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ApplicantProps {
  val: number;
  applicant: {
    applicant_name: string;
    applicant_email: string;
    applicant_phone: string;
    applicant_profile_picture: string | null;
    applicant_resume: string | null;
    applied_at: string;
  };
  setIndex?: React.Dispatch<React.SetStateAction<number>>;
  setIsCoverOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApplicantCard = ({
  applicant,
  val,
  setIndex,
  setIsCoverOpen,
}: ApplicantProps) => {
  return (
    <div className="flex border justify-between flex-wrap p-4 rounded-lg bg-gray-100 gap-y-3">
      <div className="flex items-center gap-x-4">
        <div className="shrink-0">
          <Image
            src={
              applicant.applicant_profile_picture ||
              "/assets/images/default-profile.webp"
            }
            alt={applicant.applicant_name}
            width={64}
            height={64}
            className="rounded-full sm:w-16 sm:h-16 max-[450px]:w-12 max-[450px]:h-12 w-8 h-8 object-cover"
          />
        </div>

        <div className="sm:space-y-1 space-y-0.5 w-full max-w-md">
          <h3 className="font-bold text-gray-700 xl:text-base lg:text-sm text-xs line-clamp-1">
            {applicant.applicant_name}
          </h3>
          <p className="md:text-sm text-xs text-gray-500 line-clamp-1">
            {applicant.applicant_email}
          </p>
          <p className="md:text-sm text-xs text-gray-500 line-clamp-1">
            {applicant.applicant_phone}
          </p>
          <p className="sm:text-xs text-[10px] text-gray-400 line-clamp-1">
            Applied - {new Date(applicant.applied_at).toDateString()}
          </p>
        </div>
      </div>

      <div className="flex sm:flex-col flex-row max-sm:mx-auto items-center sm:justify-center gap-2">
        <button
          onClick={() => {
            setIndex && setIndex(val);
            setIsCoverOpen && setIsCoverOpen(true);
          }}
          className="sm:px-4 sm:py-2 px-2.5 py-1 text-sm w-full font-semibold text-gray-600 hover:text-gray-50 bg-gray-300 hover:bg-blue-400 rounded-lg transition-colors duration-300 whitespace-nowrap"
        >
          Cover Letter
        </button>
        <Link
          href={applicant.applicant_resume || ""}
          className="sm:px-4 sm:py-2 px-2.5 py-1 text-sm w-full font-semibold text-gray-600 hover:text-gray-50 bg-gray-300 hover:bg-blue-400 rounded-lg transition-colors duration-300 text-center"
        >
          Resume
        </Link>
      </div>
    </div>
  );
};

export default ApplicantCard;
