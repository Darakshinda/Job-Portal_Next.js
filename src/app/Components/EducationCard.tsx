"use client";
import React, { useState } from "react";
import CompanySelect from "./CompanySelect";
import ToggleSwitch from "./ToggleSwitch";
import DateSelect from "./DatePickerComponent";
import { format } from "date-fns";
import EducationSelect from "./EducationSelect";
import SearchableSelect from "./SearchableSelect";
import degreeOpns from "../profile/edit/data/degree.json";

interface EducationCardProps {
  education: string;
  graduation: Date | null;
  gpa: string;
  maxgpa: string;
  degree: string;
  ind: number;
  EdusAtInd: Function;
  update: Function;
  del: Function;
  flgedit: boolean;
}

const EducationCard: React.FC<EducationCardProps> = ({
  education,
  degree,
  graduation = null,
  gpa,
  maxgpa,
  ind,
  update,
  EdusAtInd,
  flgedit,
  del,
}) => {
  const [edit, setedit] = useState(false);
  const buttonbg = "rgb(30, 7, 94)",
    buttondiv = "flex space-x-4",
    labelcls = "block text-sm font-medium text-[16px] font-bold";

  const handle = (
    key: string,
    value: string,
    obj: object,
    setObj: Function
  ) => {
    if (obj[key] === value) return;
    setObj({ ...obj, [key]: value });
  };

  const getYear = (dateString: string): number | string => {
    if (dateString == "") return "";
    const parts = dateString.split(" ");
    const year = parseInt(parts[1], 10);
    return year;
  };

  const [edudef, setedudef] = useState({
    education: education,
    degree: degree,
    graduation: graduation,
    gpa: gpa,
    maxgpa: maxgpa,
  });
  const [edu, setedu] = useState(edudef);

  const formatDate = (date: Date | null) => {
    return date ? format(date, "MMM yyyy") : "";
  };

  const updater = (exps: object[]) => {
    update(exps);
  };

  let graduationStr = formatDate(graduation);

  return (
    <div>
      {!edit && (
        <div className="border rounded-lg p-4 shadow-md flex justify-between items-start hover:border-purple-400 bg-black mt-[9px]">
          <div className="flex items-start">
            <div>
              <h3 className="text-lg font-semibold">{education}</h3>
              <p className="text-white hover:underline">{degree}</p>
              {gpa && (
                <div className="text-white">
                  {gpa}
                  {maxgpa != "" && <a>/{maxgpa}</a>} GPA
                </div>
              )}
              <p className="mt-2 text-[11px]">{getYear(graduationStr)}</p>
            </div>
          </div>
          <div>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={(e) => setedit(true)}
            >
              Edit
            </button>
          </div>
        </div>
      )}
      {edit && (
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 bg-[black] p-[8px] border  border-white rounded">
          <div className="sm:col-span-2">
            <label htmlFor="website" className={labelcls}>
              Education*
            </label>
            <EducationSelect
              handle={(val: string) => {
                handle("education", val, edu, setedu);
              }}
              val={edu.education || ""}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="website" className={labelcls}>
              Graduation*
            </label>
            <DateSelect
              value={edu.graduation}
              handleChange={(val: string) => {
                handle("graduation", val, edu, setedu);
              }}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="website" className={labelcls}>
              Degree & Major
            </label>
            <SearchableSelect
              options={degreeOpns}
              handle={(val: string) => {
                handle("degree", val, edu, setedu);
              }}
              val={edu.degree}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="website" className={labelcls}>
              GPA
            </label>
            <div className="flex flex-row ">
              <div className="sm:col-span-2 w-[47.5%]">
                <input
                  className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4"
                  placeholder="GPA"
                  value={edu.gpa}
                  onChange={(e) => handle("gpa", e.target.value, edu, setedu)}
                />
              </div>
              <div className="sm:col-span-2 w-[47.5%] ml-[5%]">
                <input
                  className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4"
                  placeholder="Max"
                  value={edu.maxgpa}
                  onChange={(e) =>
                    handle("maxgpa", e.target.value, edu, setedu)
                  }
                />
              </div>
            </div>
          </div>
          <div className={buttondiv}>
            <button
              className="text-white font-bold py-2 px-8 rounded"
              style={{ backgroundColor: buttonbg }}
              onClick={(e) => {
                update(ind, edu);
                flgedit(true);
                setedudef(edu);
                setedit(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-purple-500 text-white font-bold px-8 rounded"
              style={{ backgroundColor: buttonbg }}
              onClick={(e) => {
                update(ind, edu);
                flgedit(true);
                setedudef(edu);
                setedit(false);
              }}
            >
              Save
            </button>
            <button
              className="text-white text-[12px] ml-[11px] font-bold"
              onClick={(e) => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this Education?"
                  )
                ) {
                  del(ind);
                  flgedit(false);
                  console.log(EdusAtInd(ind + 1));
                  setedudef(EdusAtInd(ind + 1));
                  setedu(EdusAtInd(ind + 1));
                  setedit(false);
                }
              }}
            >
              Remove Education
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationCard;
