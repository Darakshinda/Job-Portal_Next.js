"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import EducationSelect from "../EducationSelect";
import SignupFormInput from "./SignupFormInput";
import SearchSelectDropdown from "./SearchSelectDropdown";
import degreeOpns from "@/constants/data/degree.json";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { educationSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import majorOpns from "@/constants/data/major.json";

type EducationSchema = z.infer<typeof educationSchema>;

type Education = {
  college_name: string;
  degree?: string;
  major?: string;
  year_of_graduation?: number | null;
  gpa?: number;
};

interface EducationFormProps {
  setEducationArray: Function;
  defaultPostEditFormInputCls?: string;
  dropdown?: Dispatch<SetStateAction<boolean>>;
  formData?: Education;
  index?: number;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
}

const EducationForm = ({
  setEducationArray,
  defaultPostEditFormInputCls,
  dropdown,
  formData,
  index,
  setIsEditing,
}: EducationFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
    mode: "onChange",
  });

  const [educationFormData, setEducationFormData] = useState<Education>({
    college_name: "",
    degree: "",
    major: "",
    // year_of_graduation: new Date().getFullYear() - 100,
    // gpa: 0,
  });
  const [educationFormReset, setEducationFormReset] = useState(false);

  useEffect(() => {
    if (formData) {
      console.log("setting form data");
      console.log("formData", formData);
      setEducationFormData(formData);
    }
    setValue("year_of_graduation", formData?.year_of_graduation!);
    setValue("gpa", formData?.gpa!);
  }, [formData]);

  const handleEducationChange = (key: string, value: string | boolean) => {
    // if (key === "is_studying" && value === true) {
    //   setEducationFormData((prevState) => ({
    //     ...prevState,
    //     [key]: value,
    //   }));
    //   setValue("year_of_graduation", null);
    // } else {
    setEducationFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    // }
  };

  const handleAddEducation = (data: EducationSchema) => {
    console.log("submitting");
    const finalEdu = {
      ...educationFormData,
      ...data,
    };
    console.log("finalFormData", finalEdu); //To add to backend
    if (index !== undefined) {
      setEducationArray((prev: Education[]) => {
        prev[index] = finalEdu;
        return [...prev];
      });
    } else {
      setEducationArray((prev: Education[]) => [...prev, finalEdu]);
    }

    dropdown && dropdown(true); // show add Education button
    setIsEditing && setIsEditing(false); // hide form after editing

    // setEducationArray((prev: Education[]) => [...prev, finalEdu]);
    // dropdown(false);
  };

  const handleEducationFormReset = () => {
    console.log("resetting experience form");
    setEducationFormReset(true);
    setEducationFormData({
      college_name: "",
      degree: "",
      major: "",
    });
  };

  // console.log("errors", errors);
  // console.log(watch("year_of_graduation"));

  useEffect(() => {
    console.log("educationFormData", educationFormData);
  }, [educationFormData]);

  return (
    <form onSubmit={handleSubmit(handleAddEducation)} className="w-full">
      <div className="flex flex-col gap-y-4">
        <div className="flex-1 max-sm:w-full">
          <label className="text-gray-500 font-semibold block mb-1.5 me-1.5">
            University <span className="text-red-500">*</span>
          </label>
          <EducationSelect
            handle={(val: string) => handleEducationChange("college_name", val)}
            val={
              formData?.college_name !== ""
                ? formData?.college_name!
                : educationFormData.college_name
            }
            reset={educationFormReset}
          />
          {/* {errors.college_name && (
                <p className="text-red-500">{errors.college_name.message}</p>
              )} */}
        </div>

        <div className="grid sm:grid-cols-[1fr,20%] max-sm:grid-flow-row max-sm:grid-rows-2 gap-x-6 gap-y-4 items-start">
          <div className="flex flex-col justify-center w-full">
            <SearchSelectDropdown
              selected={educationFormData.degree}
              label="Degree"
              name="degree"
              labelcls="text-gray-500 text-base font-semibold relative flex items-center gap-2"
              placeholder="Eg: B.Tech"
              cls={defaultPostEditFormInputCls}
              tags={degreeOpns}
              onSingleChange={handleEducationChange}
              multiple={false}
            />
            {/* {errors.degree && (
                <p className="text-red-500">{errors.degree.message}</p>
              )} */}
          </div>

          <div className="flex-1 flex flex-col justify-center w-full">
            <SignupFormInput
              id="year_of_graduation"
              name="year_of_graduation"
              type="number"
              label="Graduation"
              placeholder="20xx"
              cls={defaultPostEditFormInputCls}
              register={register}
              errors={errors.year_of_graduation}
              req={false}
            />
            {/* {errors.year_of_graduation && (
                <p className="text-red-500">{errors.year_of_graduation.message}</p>
              )} */}
          </div>
        </div>

        <div className="grid sm:grid-cols-[1fr,20%] max-sm:grid-flow-row max-sm:grid-rows-2 gap-x-6 gap-y-4 items-start">
          <div className="flex flex-col justify-center w-full">
            <SearchSelectDropdown
              selected={educationFormData.major}
              label="Major"
              name="major"
              labelcls="text-gray-500 text-base font-semibold relative flex items-center gap-2"
              placeholder="Eg: Computer Science"
              cls={defaultPostEditFormInputCls}
              tags={majorOpns}
              onSingleChange={handleEducationChange}
              multiple={false}
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <SignupFormInput
              id="gpa"
              name="gpa"
              type="number"
              label="CGPA"
              placeholder="Eg: 8.45"
              cls={defaultPostEditFormInputCls}
              register={register}
              req={true}
              errors={errors.gpa}
            />
            {/* {errors.gpa && (
                <p className="text-red-500">{errors.gpa.message}</p>
              )} */}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-x-4 pt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
        >
          Save
        </button>

        <button
          type="reset"
          onClick={handleEducationFormReset}
          className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default EducationForm;
