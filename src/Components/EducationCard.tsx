"use client";
import React, { useState } from "react";
import CompanySelect from "./CompanySelect";
import { format } from "date-fns";
import EducationSelect from "./EducationSelect";
import degreeOpns from "@/constants/data/degree.json";
import ExperienceForm from "./Forms/ExperienceForm";
import EducationForm from "./Forms/EducationForm";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";

interface EducationCardProps {
  index: number;
  college_name: string;
  year_of_graduation: number | null;
  degree: string;
  gpa: number;
  major: string;
  //prop drill
  setEducationArray: Function;
  defaultPostEditFormInputCls: string;
}

const EducationCard: React.FC<EducationCardProps> = ({
  index,
  college_name,
  year_of_graduation,
  degree,
  gpa,
  major,
  setEducationArray,
  defaultPostEditFormInputCls,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    setEducationArray((prev: any) => {
      return prev.filter((_: any, i: number) => i !== index);
    });
  };

  return (
    <div className="flex-1 w-full">
      {!isEditing && (
        <div
          className="border rounded p-4 shadow-sm 
        hover:shadow-md transition-all duration-300 hover:border-blue-400 bg-white"
        >
          <div className="relative w-full">
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2 w-[85%] truncate">
                <h3 className="font-semibold text-gray-800">{degree}</h3>
                <span className="font-normal text-gray-600 italic">from</span>
                <h3 className="font-semibold text-gray-800">{college_name}</h3>
              </div>

              <div className="flex gap-2 text-gray-600">
                <p>
                  {year_of_graduation
                    ? "Graduated in " + year_of_graduation
                    : "Currently Studying"}
                </p>
                <span>|</span>
                <p>{gpa} GPA</p>
              </div>
            </div>

            <div className="absolute right-0 top-0 flex flex-row items-center gap-1.5">
              <button
                className="text-sm text-blue-600 outline-none rounded p-0.5"
                title="Edit"
                onClick={() => setIsEditing(true)}
              >
                <MdOutlineEdit size={20} />
              </button>
              <button
                className="text-sm text-red-600 outline-none rounded p-0.5"
                title="Delete"
                onClick={handleDelete}
              >
                <MdOutlineDeleteForever size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditing && (
        <EducationForm
          index={index}
          setIsEditing={setIsEditing}
          formData={{
            college_name: college_name,
            year_of_graduation: year_of_graduation,
            degree: degree,
            gpa: gpa,
            major: major,
          }}
          // prop drill
          setEducationArray={setEducationArray}
          defaultPostEditFormInputCls={defaultPostEditFormInputCls}
        />
      )}
    </div>
  );
};

export default EducationCard;
