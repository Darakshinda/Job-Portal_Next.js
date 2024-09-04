import React, { Dispatch, SetStateAction, useEffect } from "react";
import PostFormInput from "./Inputs/PostFormInput";
import SearchSelectDropdown from "./Custom/SearchSelectDropdown";
import EmploymentTags from "@/constants/data/employmentType.json";
import primaryTags from "@/constants/data/primaryTags.json";
import SkillTags from "@/constants/data/skillTags.json";
import locOpns from "@/constants/data/location.json";
import QuillEditorComponent from "./Custom/QuillComponent";
import SignupFormInput from "./Inputs/SignupFormInput";
import BenefitOptions from "./Custom/BenefitOptions";
import benefitOpns from "@/constants/data/benefits.json";
import JobCard from "../Cards/JobCard";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type JobPostFormProps = {
  type: string;
  // only post page props
  previewMode: boolean;
  setPreviewMode: Dispatch<SetStateAction<boolean>>;

  // react-hook-form props
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  errors: any;

  // common props
  // manual form data and error handling props
  currencyList: string[];
  formData: {
    emptype: string;
    primtg: string;
    tagsArray: string[];
    locns: string;
    desc: string;
    minSalary: string;
    maxSalary: string;
    how2apply: string;
    benefitsArray: string[];
    currencyType: string;
    feedback: string;
  };
  setFormData: Dispatch<SetStateAction<any>>;
  handleError: {
    jobDescriptionError: string;
    howToApplyError: string;
    minsalMaxsalError: string;
  };
  setIsFormDirty: any;
  isDirty: boolean;
  isFormDirty: boolean;
};

const JobPostForm = ({
  type,
  previewMode,
  setPreviewMode,
  handleSubmit,
  onSubmit,
  register,
  watch,
  errors,
  currencyList,
  formData,
  setFormData,
  handleError,
  setIsFormDirty,
  isDirty,
  isFormDirty,
}: JobPostFormProps) => {
  const LocationTags = locOpns.countries;

  const handlePreview = () => {
    setPreviewMode((prev: boolean) => !prev);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));

    setIsFormDirty(true);
  };

  const handleSkillChange = (skills: string[]) => {
    setFormData((prevState: any) => ({
      ...prevState,
      tagsArray: skills,
    }));
    setIsFormDirty(true);
  };

  const handleBenefitsChange = (benefitsList: string[]) => {
    setFormData((prevState: any) => ({
      ...prevState,
      benefitsArray: benefitsList,
    }));
    setIsFormDirty(true);
  };

  // To show a warning on reload request
  useEffect(() => {
    const handleBeforeUnload = (e: Event) => {
      if (isFormDirty || isDirty) {
        e.preventDefault();
        const message = "Form data will be lost if you leave the page.";
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty, isDirty]);

  useEffect(() => {
    if (previewMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [previewMode]);

  const postFormCls =
    "relative w-full mt-0.5 p-2 bg-gray-50 text-gray-800 rounded border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic";

  const labelCls =
    "text-gray-700 text-base font-semibold relative flex items-center gap-2";

  const manualErrorCls =
    "text-red-500 text-xs absolute font-semibold transition-all transform duration-300 absolute z-10 bg-red-50 rounded-b-md top-full px-2 py-0.5 before:content-[''] before:absolute before:w-2 before:h-2 before:bg-red-50 before:left-0 before:bottom-full after:content-[''] after:absolute after:z-10 after:w-2 after:h-2 after:bg-gray-50 after:rounded-bl-md after:border-l after:border-b after:border-gray-300 after:left-0 after:bottom-full";

  return (
    <div className="flex-1 bg-white min-h-screen md:mx-2 block">
      <form
        id="post-form"
        onSubmit={handleSubmit(onSubmit)}
        className="md:space-y-4 space-y-2 sm:p-8 py-6 px-2 max-w-5xl mx-auto sm:border sm:rounded-xl sm:my-6"
      >
        <h2 className="text-blue-500 font-bold pt-3 lg:text-3xl text-2xl">
          Primary Details
        </h2>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4">
          <PostFormInput
            id="company_name"
            name="company_name"
            type="text"
            label="Company Name"
            register={register}
            placeholder="Google"
            req={true}
            cls={postFormCls}
            errors={errors.company_name}
          />

          <PostFormInput
            id="position"
            name="position"
            type="text"
            label="Position"
            register={register}
            placeholder="Software Engineer"
            req={true}
            cls={postFormCls}
            errors={errors.position}
            description="Enter the position you are hiring for in your company or organization. This will be displayed on the job post. Eg: Software Engineer, Product Manager, etc. "
          />

          <div className="flex flex-col justify-center w-full">
            <SearchSelectDropdown
              label="Employment type"
              name="emptype"
              labelCls={labelCls}
              placeholder="Select Employment type"
              cls={postFormCls}
              tags={EmploymentTags}
              onSingleChange={handleChange}
              multiple={false}
              selected={type === "edit" ? formData.emptype : ""}
            />
          </div>

          <div className="flex flex-col justify-center w-full self-start">
            <SearchSelectDropdown
              label="Field of Work"
              name="primtg"
              labelCls={labelCls}
              placeholder="Work Field"
              cls={postFormCls}
              tags={primaryTags}
              onSingleChange={handleChange}
              multiple={false}
              selected={type === "edit" ? formData.primtg : ""}
            />
          </div>

          <div className="flex flex-col justify-center w-full self-end">
            <SearchSelectDropdown
              label="Skills Required"
              labelCls={labelCls}
              cls={postFormCls}
              tags={SkillTags}
              onChange={handleSkillChange}
              description="Short tags like industry and tech stack are preferred. Only the first 3 or 4 tags are displayed on the site, but all tags ensure the job appears on relevant tag-specific pages. Additional tags may be auto-generated after posting/editing to supplement."
              existingTags={type === "edit" ? formData.tagsArray : []}
            />
          </div>

          <div className="flex flex-col justify-center w-full self-start">
            <SearchSelectDropdown
              label="Restricted to Locations"
              name="locns"
              labelCls={labelCls}
              placeholder="Work Location"
              cls={postFormCls}
              tags={LocationTags}
              onSingleChange={handleChange}
              description="Only fill if you'd only like to hire people from a specific location or timezone this job is restricted to. If not restricted, please leave it as worldwide."
              multiple={false}
              selected={type === "edit" ? formData.locns : ""}
            />
          </div>
        </div>

        <h2 className="text-blue-500 font-bold pt-3 lg:text-3xl text-2xl">
          Job Details
        </h2>

        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label className={labelCls} htmlFor="jobDescription">
              Job description
              <span className="text-red-500">*</span>
            </label>
            <div className="col-span-1">
              <div className="relative">
                <QuillEditorComponent
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  setIsFormDirty={setIsFormDirty}
                />
                <span
                  className={`${manualErrorCls} ${handleError.jobDescriptionError ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} `}
                >
                  {handleError.jobDescriptionError}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              className="text-gray-700 text-base font-semibold relative flex items-start gap-2"
              htmlFor="HowToApply"
            >
              How to apply ?<span className="text-red-500">*</span>
            </label>
            <div className="col-span-1">
              <div className="relative">
                <QuillEditorComponent
                  name="how2apply"
                  value={formData.how2apply}
                  onChange={handleChange}
                  setIsFormDirty={setIsFormDirty}
                />
                <span
                  className={`${manualErrorCls} ${handleError.howToApplyError ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                >
                  {handleError.howToApplyError}
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4">
            <PostFormInput
              id="email4jobappl"
              name="email4jobappl"
              type="email"
              label="Email for Job Applications"
              register={register}
              placeholder="Apply email address"
              req={true}
              cls={postFormCls}
              errors={errors.email4jobappl}
              description="Provide the email where you would like to receive job applications"
            />

            <PostFormInput
              id="apply_url"
              name="apply_url"
              type="text"
              label="Apply URL"
              register={register}
              placeholder="https://"
              req={true}
              cls={postFormCls}
              errors={errors.apply_url}
              description="If you'd like to use your own apply form or ATS you can enter the URL here for people to apply."
            />
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-2 items-start">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label
                  className="flex-1 text-gray-700 text-base font-semibold relative flex items-start gap-2"
                  htmlFor="salary"
                >
                  Salary Margin
                  <button
                    type="button"
                    className="w-2 h-2 p-2.5 text-sm bg-gray-200 text-gray-400 rounded-full flex items-center justify-center outline-none hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-300 focus:text-gray-500 peer"
                  >
                    ?
                  </button>
                  <div className="absolute z-10 left-0 transform top-full translate-y-8 mb-2 max-w-sm bg-blue-100 text-gray-600 text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:z-10 transition-all duration-300 ease-in-out pointer-events-none">
                    It&apos;s illegal to not share salary range on job posts
                    since 2021. Posts without salary will automatically show an
                    estimate of salary based on similar jobs.
                  </div>
                </label>

                {currencyList.length > 0 && (
                  <SearchSelectDropdown
                    name="currencyType"
                    tags={currencyList}
                    cls="w-20 px-2 py-0.5 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
                    onSingleChange={handleChange}
                    placeholder="Currency"
                    multiple={false}
                    selected={formData.currencyType}
                  />
                )}
              </div>

              <div className="flex w-full justify-between relative items-center gap-2.5 mt-0.5">
                <SignupFormInput
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  placeholder="Min Salary"
                  cls={postFormCls}
                  handleChange={handleChange}
                  req={true}
                  value={type === "edit" ? formData.minSalary : ""}
                />
                <span className="text-lg italic"> to </span>
                <SignupFormInput
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  placeholder="Max Salary"
                  cls={postFormCls}
                  handleChange={handleChange}
                  req={true}
                  value={type === "edit" ? formData.maxSalary : ""}
                />
                <span
                  className={`text-red-500 text-xs mt-1 font-semibold absolute ${handleError.minsalMaxsalError ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 top-full`}
                >
                  {handleError.minsalMaxsalError}
                </span>
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-base font-semibold relative flex items-start gap-2">
                Benefits
              </label>
              <div className="col-span-1 mt-2 space-y-2">
                <div className="flex items-center">
                  <div>
                    <BenefitOptions
                      options={benefitOpns}
                      onChange={handleBenefitsChange}
                      selected={type === "edit" ? formData.benefitsArray : []}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-blue-500 font-bold pt-3 lg:text-3xl text-2xl">
          Feedback
        </h2>

        <div className="flex flex-col gap-y-2">
          <label
            className="text-gray-700 text-base font-semibold relative flex items-start gap-2"
            htmlFor="jobDescription"
          >
            Feedback about CodeUnity
            <button
              type="button"
              className="w-2 h-2 p-2.5 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center outline-none hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-300 focus:text-gray-500 peer"
            >
              ?
            </button>
            <div className="absolute z-10 left-0 transform top-full translate-y-8 mb-2 max-w-sm bg-blue-100 text-gray-600 text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:z-10 transition-all duration-300 ease-in-out pointer-events-none">
              If you have any feature requests or general feedback about posting
              a job at Code Unity, leave it here.
            </div>
          </label>
          <div className="col-span-1">
            <QuillEditorComponent
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              setIsFormDirty={setIsFormDirty}
            />
          </div>
        </div>

        <div className="mx-auto w-fit">
          <div className="flex gap-4 flex-wrap mt-6">
            {type === "post" && (
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-gray-200 hover:bg-blue-200 hover:text-blue-500 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:text-gray-500"
                disabled={!isDirty && !isFormDirty}
              >
                Post
              </button>
            )}

            {type === "edit" && (
              <button
                type="submit"
                className="px-4 py-2 rounded-full font-semibold bg-blue-200 text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isFormDirty && !isDirty}
              >
                Update Job Post
              </button>
            )}

            <button
              className="px-4 py-2 rounded-full bg-gray-200 hover:bg-blue-200 hover:text-blue-500 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:text-gray-500"
              type="button"
              onClick={handlePreview}
              disabled={!isDirty && !isFormDirty}
            >
              Preview
            </button>
          </div>
        </div>
      </form>

      {previewMode && (
        <>
          {/* Overlay Background */}
          <div className="fixed inset-0 bg-black opacity-80 backdrop-blur-sm z-[60] transition-opacity duration-300"></div>

          <div className="fixed inset-0 flex md:justify-center items-center z-[80] w-full overflow-auto">
            <div className="min-w-[52rem] h-fit px-10 rounded-lg">
              <h3 className="text-purple-600 font-bold text-3xl">Preview</h3>
              <p className="text-gray-200 text-lg py-3">
                Here is a preview of how your job post will look like, with the
                details:
              </p>
              <JobCard
                type="preview"
                job={{
                  company_name: watch && watch("company_name"),
                  position: watch && watch("position"),
                  emptype: formData.emptype,
                  primtg: formData.primtg,
                  tags: formData.tagsArray,
                  locns: formData.locns,
                  desc: formData.desc,
                  minsal: Number(formData.minSalary),
                  maxsal: Number(formData.maxSalary),
                  how2apply: formData.how2apply,
                  benefits: formData.benefitsArray,
                  email4jobappl: watch && watch("email4jobappl"),
                  apply_url: watch && watch("apply_url"),
                }}
                seekerside={false}
              />

              <div className="w-full flex mt-3">
                <button
                  className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg mx-auto"
                  onClick={handlePreview}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobPostForm;
