import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CompanySelect from "../CompanySelect";
import SearchSelectDropdown from "./SearchSelectDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignupFormInput from "./SignupFormInput";
import { useForm } from "react-hook-form";
import { experienceSchema } from "@/lib/validator";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ExperienceCard from "../ExperienceCard";

type ExperienceSchema = z.infer<typeof experienceSchema>;

type Experience = {
  company_name: string;
  title?: string;
  start_date: Date | null;
  end_date: Date | null;
  currently_working: boolean;
  description?: string;
};

interface ExperienceFormProps {
  setWorkExperienceArray: Function;
  defaultPostEditFormInputCls: string;
  dropdown?: Dispatch<SetStateAction<boolean>>;
  formData?: Experience;
  index?: number;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
}

const ExperienceForm = ({
  setWorkExperienceArray,
  defaultPostEditFormInputCls,
  dropdown,
  formData,
  index,
  setIsEditing,
}: ExperienceFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
    mode: "onBlur",
  });

  const [experienceFormData, setExperienceFormData] = useState<Experience>({
    company_name: "",
    start_date: null,
    end_date: null,
    currently_working: false,
  });
  const [experienceFormReset, setExperienceFormReset] = useState(false);

  useEffect(() => {
    if (formData) {
      console.log("setting form Data");
      // console.log("formData", formData);
      setExperienceFormData(formData);
    }
    setValue("title", formData?.title!);
    setValue("description", formData?.description!);
  }, [formData]); // do not add setValue in the dependency array, that may cause the variable sized argument error

  const handleExperienceChange = (
    key: string,
    value: string | boolean | Date | null
  ) => {
    if (key === "currently_working" && value === true) {
      setExperienceFormData((prevState) => ({
        ...prevState,
        [key]: value,
        end_date: null, // Clear end_date when "currently_working" is true
      }));
    } else {
      setExperienceFormData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const handleAddWorkExperience = (data: ExperienceSchema) => {
    console.log("submitting");
    const finalFormData = {
      ...experienceFormData,
      ...data,
    };
    console.log("finalFormData", finalFormData); //To add to backend
    if (index !== undefined) {
      setWorkExperienceArray((prev: Experience[]) => {
        prev[index] = finalFormData;
        return [...prev];
      });
    } else {
      setWorkExperienceArray((prev: Experience[]) => [...prev, finalFormData]);
    }

    dropdown && dropdown(true); // show add Experience button
    setIsEditing && setIsEditing(false); // hide the form
  };

  const handleExperienceFormReset = () => {
    console.log("resetting experience form");
    setExperienceFormReset(true);
    setExperienceFormData({
      company_name: "",
      start_date: null,
      end_date: null,
      currently_working: false,
    });
  };

  useEffect(() => {
    console.log(experienceFormData);
  }, [experienceFormData]);

  return (
    <form onSubmit={handleSubmit(handleAddWorkExperience)} className="w-full">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col sm:flex-row gap-x-6 gap-y-4 items-start">
          <div className="flex-1 max-sm:w-full">
            <label className="text-gray-500 font-semibold block mb-1 me-1.5">
              Company Name <span className="text-red-500">*</span>
            </label>
            <CompanySelect
              handle={(val: string) =>
                handleExperienceChange("company_name", val)
              }
              val={
                formData?.company_name !== ""
                  ? formData?.company_name!
                  : experienceFormData.company_name
              }
              reset={experienceFormReset}
            />
            {/* {errors.company && (
                <p className="text-red-500">{errors.company.message}</p>
              )} */}
          </div>

          <div className="flex-1 max-sm:w-full">
            <SignupFormInput
              id="title"
              name="title"
              type="text"
              label="Title"
              register={register}
              placeholder="Eg: FrontEnd Developer"
              req={true}
              cls={defaultPostEditFormInputCls}
              errors={errors.title}
            />
          </div>
          {/* {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )} */}
        </div>

        <div className="flex flex-col sm:flex-row gap-x-6 gap-y-4 items-center">
          <div
            className={`flex flex-col justify-center w-full ${experienceFormData.currently_working && "sm:w-[48%]"}`}
          >
            <label className="text-gray-500 font-semibold block mb-1.5 me-1.5">
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center bg-gray-100 w-full rounded relative border border-gray-300 h-[2.6875rem]">
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={experienceFormData.start_date}
                maxDate={new Date()}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(date: Date | null) =>
                  handleExperienceChange("start_date", date)
                }
                className="input-field pl-3 caret-transparent"
                wrapperClassName="datePicker"
              />
            </div>
            {/* {errors.start_date && (
                <p className="text-red-500">{errors.start_date.message}</p>
              )} */}
          </div>

          {!experienceFormData.currently_working && (
            <div className="flex flex-col justify-center w-full">
              <label className="text-gray-500 font-semibold block mb-1.5 me-1.5">
                End Date <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center bg-gray-100 w-full rounded relative border border-gray-300 h-[2.6875rem]">
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={
                    experienceFormData.end_date
                      ? new Date(experienceFormData.end_date)
                      : null
                  }
                  minDate={experienceFormData.start_date!}
                  maxDate={new Date()}
                  onChange={(date: Date | null) =>
                    handleExperienceChange("end_date", date)
                  }
                  onKeyDown={(e) => e.preventDefault()}
                  className="input-field pl-3 caret-transparent"
                  wrapperClassName="datePicker"
                />
              </div>
              {/* {errors.end_date && (
                  <p className="text-red-500">{errors.end_date.message}</p>
                )} */}
            </div>
          )}
        </div>
        <div className="flex items-center flex-1">
          <div className="flex items-center mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={experienceFormData.currently_working}
                onChange={(e) =>
                  handleExperienceChange("currently_working", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                I currently work here
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <label
            htmlFor="description"
            className="w-full text-gray-500 text-base font-semibold"
          >
            Work Description
            <span className="text-red-500 ms-1.5">*</span>
          </label>
          <textarea
            {...register("description")}
            //   value={experienceFormData.description}
            name="description"
            id="description"
            rows={6}
            //   onChange={(e) =>
            //     handleExperienceChange("description", e.target.value)
            //   }
            className="bg-gray-100 border border-gray-300 text-gray-800 rounded w-full placeholder:text-sm px-4 py-3 min-h-28 max-h-60 placeholder:italic placeholder-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            placeholder="Tell us more about your work experience"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
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
          onClick={handleExperienceFormReset}
          className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>
    </form>
    // </div>
  );
};

export default ExperienceForm;
