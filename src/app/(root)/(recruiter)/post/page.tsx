"use client";

import React, { useCallback, useEffect, useState } from "react";
import { TextInput, TextArea } from "@/stories/TextInput";
import JoditEditor from "@/Components/Jodit-Editor";
import { Select } from "@/stories/Dropdown";
import Tags from "@/stories/Tags";
import Checkbox from "@/Components/check";
import UploadButton from "@/Components/ImgUpload";
import ColorPickerButton from "@/Components/ColorPicker";
import JoditEditorComponent from "@/Components/Jodit-Editor";
import SelectedOptions from "@/Components/Options";
import JobCard from "@/Components/JobCard";
import axios from "axios";

import locOpns from "@/constants/data/location.json";
import SkillTags from "@/constants/data/tags.json";
import benefitOpns from "@/constants/data/benefits.json";
import EmployementTags from "@/constants/data/emptype.json";
import primaryTag from "@/constants/data/primTag.json";
import minSal from "@/constants/data/minsalary.json";
import maxSal from "@/constants/data/maxsalary.json";
import JobDetailsModal from "@/Components/JobModal";
import Sidebar from "@/Components/HireDashSidebar";
import { Router } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import SignupFormInput from "@/Components/Forms/SignupFormInput";
import { postJobSchema } from "@/_lib/validator";
import PostFormInput from "@/Components/Forms/PostFormInput";
import SearchSelectDropdown from "@/Components/Forms/SearchSelectDropdown";

type Schema = z.infer<typeof postJobSchema>;

const JobForm = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const searchParams = useSearchParams();
  const jobID = searchParams.get("jobID");

  const LocationTags = locOpns.countries;

  const [formData, setFormData] = useState<{
    emptype: string;
    primtg: string;
    tags: string[];
    locns: string;
    desc: string;
    minSal: number;
    maxSal: number;
    benefits: string;
    how2apply: string;
    feedback: string;
  }>({
    emptype: "",
    primtg: "",
    tags: [],
    locns: "",
    desc: "",
    minSal: 0,
    maxSal: 0,
    benefits: "Nothing",
    how2apply: "",
    feedback: "",
  });
  const [parseErrors, setParseErrors] = useState<any>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(postJobSchema),
  });

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  const validateUseStateInputs = () => {
    try {
      postJobSchema.parse({
        ...formData,
        company_name: watch("company_name"),
        position: watch("position"),
        email4jobappl: watch("email4jobappl"),
        apply_url: watch("apply_url"),
      });
      setParseErrors({});
    } catch (error: any) {
      const validationErrors: { [key: string]: string } = {};
      console.log(error.errors);
      error.errors.forEach((err: any) => {
        validationErrors[err.path[0]] = err.message;
      });
      setParseErrors(validationErrors);
    }
  };

  const handleChange = (name: string, value: string) => {
    if (name === "minSal" || name === "maxSal") {
      const val = parseInt(value.split(" ")[0]);
      console.log(val);
      setFormData((prevState) => ({
        ...prevState,
        [name]: val,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    validateUseStateInputs();
  };

  const handleSkillChange = (skills: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      tags: skills,
    }));
  };

  console.log(formData);
  console.log("email4jobappl", watch("email4jobappl"));
  console.log("apply_url", watch("apply_url"));

  const isInvalid = () => {
    console.log("Total errors: ", parseErrors);
  };

  const onSubmit = async (data: Schema) => {
    const token = localStorage.getItem("access_token"); // Assuming you store your JWT token in localStorage
    const url_job = `${baseUrl}/jobs/create/`;
    const { company_name, position, email4jobappl, apply_url } = data;
    const {
      maxSal,
      minSal,
      emptype,
      primtg,
      locns,
      desc,
      benefits,
      how2apply,
      feedback,
      tags,
    } = formData;
    let allTags = "";
    for (let i = 0; i < tags.length; i++) {
      allTags = allTags + tags[i];
    }
    console.log("registering");

    try {
      console.log("posting job");
      await axios
        .post(
          url_job,
          {
            annual_salary_max: maxSal,
            annual_salary_min: minSal,
            emptype: emptype,
            company_email: apply_url,
            company_name: company_name,
            how_to_apply: how2apply,
            job_description: desc,
            location_restriction: locns,
            primary_tag: primtg,
            benefits: benefits,
            position: position,
            tags: tags,
            apply_url: apply_url,
            apply_email_address: email4jobappl,
            feedback: feedback,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          alert("Job registered successfully");
        })
        .catch((error) => {
          console.error("There was an error registering the job!", error);
          alert("Failed to register the job");
        });
    } catch (error) {
      console.error("There was an error registering the job!", error);
      alert("Failed to register the job");
    }
  };

  const warnBeforeReload = () => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      const message = "Form data will be lost if you leave the page.";
      e.returnValue = message;
      return message;
    });
  };

  useEffect(() => {
    warnBeforeReload();
  }, []);

  // useEffect(() => {
  //   getUserName();
  // }, []);

  // useEffect(() => {
  //   if (jobID) {
  //     const token = localStorage.getItem("access_token");
  //     const axiosInstance = axios.create({
  //       baseURL: baseUrl,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     axiosInstance
  //       .get(`${baseUrl}/posted-jobs/`)
  //       .then((response) => {
  //         console.log("Response:", response.data.results);

  //         const job = response.data.results.find(
  //           (job) => job.id.toString() === jobID.toString()
  //         );
  //         setuser({
  //           company: job.company_name,
  //           position: job.position,
  //           emptype: job.employment_type,
  //           primtg: job.primary_tag,
  //           tags: job.tags,
  //           locns: job.location_restriction,
  //           logo: job.company_logo,
  //           minsal: "USD " + job.annual_salary_min.toString() + " per year",
  //           maxsal: "USD " + job.annual_salary_max.toString() + " per year",
  //           desc: job.job_description,
  //           benefits: job.benefits,
  //           how2apply: job.how_to_apply,
  //           email4jobappl: job.apply_email_address,
  //           applUrl: job.apply_url,
  //           twtr: job.company_twitter,
  //           compMail: job.company_email,
  //           invMail: job.invoice_email,
  //           invAdrs: job.invoice_address,
  //           invNote: job.invoice_notes,
  //           payLtr: job.pay_later,
  //           pltrEml: job.pay_later_email,
  //           fdbck: job.feedback,
  //           bgcolor: job.background_color,
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [jobID, baseUrl]);

  return (
    <div className="flex-1 bg-white h-screen md:mx-2 block">
      {/* <div className="p-10 h-full"> */}
      {/* {!previewMode && ( */}
      <form
        id="post-form"
        onSubmit={handleSubmit(onSubmit, isInvalid)}
        className="md:space-y-4 space-y-2 px-6 py-6 max-w-5xl mx-auto h-full overflow-y-scroll snap-y snap-mandatory overscroll-contain"
      >
        <h2 className="text-purple-600 font-bold text-3xl">Primary Details</h2>

        <PostFormInput
          id="company_name"
          name="company_name"
          type="text"
          label="Company Name"
          register={register}
          placeholder="Google"
          req={true}
          cls=""
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
          cls=""
          errors={errors.position}
          description="Enter the position you are hiring for in your company or organization. This will be displayed on the job post. Eg: Software Engineer, Product Manager, etc. "
        />

        <div className="grid md:grid-cols-2 max-md:grid-rows-2 gap-x-6">
          <SearchSelectDropdown
            label="Employment type"
            name="emptype"
            labelcls="text-gray-800 text-lg font-semibold relative flex items-center gap-2"
            placeholder="Select Employment type"
            cls="relative w-full md:mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus:border-primary-500"
            tags={EmployementTags}
            onSingleChange={handleChange}
            multiple={false}
          />
        </div>

        <div className="grid md:grid-cols-2 max-md:grid-rows-2 gap-x-6">
          <SearchSelectDropdown
            label="Field of Work"
            name="primtg"
            labelcls="text-gray-800 text-lg font-semibold relative flex items-center gap-2"
            placeholder="Work Field"
            cls="relative w-full md:mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus:border-primary-500"
            tags={primaryTag}
            onSingleChange={handleChange}
            multiple={false}
          />
        </div>

        <div className="grid md:grid-cols-2 max-md:grid-rows-[min(fit_content, fit_content)] gap-x-6 items-start">
          <SearchSelectDropdown
            label="Skills Required"
            labelcls="text-gray-800 text-lg font-semibold relative flex items-center gap-2 md:mt-4 mt-2"
            cls="relative w-full -mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus:border-primary-500"
            tags={SkillTags}
            onChange={handleSkillChange}
            description="Short tags like industry and tech stack are preferred. Only the first 3 or 4 tags are displayed on the site, but all tags ensure the job appears on relevant tag-specific pages. Additional tags may be auto-generated after posting/editing to supplement."
          />
        </div>

        <div className="grid md:grid-cols-2 max-md:grid-rows-[min(fit_content, fit_content)] gap-x-6 items-start">
          <SearchSelectDropdown
            label="Restricted to Locations"
            name="locns"
            labelcls="text-gray-800 text-lg font-semibold relative flex items-center gap-2 mt-4"
            placeholder="Work Location"
            cls="relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus:border-primary-500"
            tags={LocationTags}
            onSingleChange={handleChange}
            description="Only fill if you'd only like to hire people from a specific location or timezone this job is restricted to. If not restricted, please leave it as worldwide."
            multiple={false}
          />
        </div>

        <h2 className="text-purple-600 font-bold pt-10 text-3xl">
          Job Details
        </h2>

        <div className="grid md:grid-cols-2 max-md:grid-rows-[min(fit_content, fit_content)] gap-x-6 gap-y-2 items-start">
          <label
            className="text-gray-800 text-lg font-semibold relative flex mt-4 gap-2 items-center"
            htmlFor="jobDescription"
          >
            Job description
          </label>
          <div className="col-span-1">
            <div
            // style={{
            //   marginLeft: "1.4%",
            //   marginRight: "2%",
            //   border: `3px red`,
            // }}
            >
              <JoditEditorComponent
                keyy="desc"
                value={formData.desc}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 max-md:grid-rows-[min(fit_content, fit_content)] gap-x-6 gap-y-2 items-start">
          <label
            className="text-gray-800 text-lg font-semibold relative flex mt-4 gap-2 items-center"
            htmlFor="salary"
          >
            Salary Margin
            <button
              type="button"
              className="w-2 h-2 p-2.5 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center outline-none hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-300 focus:text-gray-500 peer"
            >
              ?
            </button>
            {/* <div className="absolute left-20 transform bottom-0 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-900 opacity-0 peer-hover:opacity-100 transition-opacity"></div> */}
            <div className="absolute left-0 top-full -z-10 max-w-sm bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:z-10 transition-opacity">
              It&apos;s illegal to not share salary range on job posts since
              2021. Posts without salary will automatically show an estimate of
              salary based on similar jobs.
            </div>
          </label>

          <div className="flex w-full justify-between items-center gap-4">
            <SearchSelectDropdown
              labelcls="text-gray-800 text-lg font-semibold relative flex items-center gap-2"
              cls="relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus:border-primary-500"
              name="minSal"
              tags={minSal}
              onSingleChange={handleChange}
              multiple={false}
            />
            <span className="text-2xl"> - </span>
            <SearchSelectDropdown
              labelcls="text-gray-800 text-lg font-semibold relative flex items-center gap-2"
              cls="relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus:border-primary-500"
              name="maxSal"
              tags={maxSal}
              onSingleChange={handleChange}
              multiple={false}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 max-md:grid-rows-[min(fit_content, fit_content)] gap-x-6 gap-y-2 items-start">
          <label className="text-gray-800 text-lg font-semibold relative flex items-start mt-4 gap-2">
            Benefits
          </label>
          <div className="col-span-1 mt-2 space-y-2">
            <div className="flex items-center">
              <div>
                <SelectedOptions
                  options={benefitOpns}
                  name="benefits"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 max-md:grid-rows-[min(fit_content, fit_content)] gap-x-6 gap-y-2 items-start">
          <label
            className="text-gray-800 text-lg font-semibold relative flex items-start mt-4 gap-2"
            htmlFor="jobDescription"
          >
            How to apply?
          </label>
          <div className="col-span-1">
            <div>
              <JoditEditorComponent
                keyy="how2apply"
                value={formData.how2apply}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <PostFormInput
          id="email4jobappl"
          name="email4jobappl"
          type="email"
          label="Email for Job Applications"
          register={register}
          placeholder="Apply email address"
          req={true}
          cls=""
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
          cls=""
          errors={errors.apply_url}
          description="If you'd like to use your own apply form or ATS you can enter the URL here for people to apply."
        />

        <h2 className="text-purple-600 font-bold pt-10 text-3xl">Feedback</h2>

        <div className="grid md:grid-cols-2 max-md:grid-rows-[min(fit_content, fit_content)] gap-x-6 gap-y-2 items-start">
          <label
            className="text-gray-800 text-lg font-semibold relative flex items-center mt-4 gap-2"
            htmlFor="jobDescription"
          >
            Feedback about CodeUnity
            <button
              type="button"
              className="w-2 h-2 p-2.5 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center outline-none hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-300 focus:text-gray-500 peer"
            >
              ?
            </button>
            {/* <div className="absolute left-20 transform bottom-0 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-900 opacity-0 peer-hover:opacity-100 transition-opacity"></div> */}
            <div className="absolute left-0 top-8 -z-10 max-w-sm bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:z-10 transition-opacity">
              If you have any feature requests or general feedback about posting
              a job at Code Unity, leave it here.
            </div>
          </label>
          <div className="col-span-1">
            <div>
              <JoditEditorComponent
                keyy="feedback"
                value={formData.feedback}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto w-fit">
          <div className="flex gap-4 flex-wrap mt-4">
            <button type="submit" className="px-4 py-2 rounded-lg bg-gray-200">
              Post
            </button>

            <button
              className="px-4 py-2 rounded-lg bg-gray-200"
              type="button"
              onClick={handlePreview}
            >
              Preview
            </button>
          </div>
        </div>
      </form>
      {/* )} */}
      {previewMode && (
        <>
          {/* Overlay Background */}
          <div className="fixed inset-0 bg-black opacity-80 backdrop-blur-lg z-40 transition-opacity duration-300"></div>

          <div className="fixed inset-0 flex md:justify-center items-center z-50 w-full overflow-auto">
            <div className="min-w-[52rem] h-fit px-10 rounded-lg">
              <h3 className="text-purple-600 font-bold text-3xl">Preview</h3>
              <p className="text-gray-200 text-lg py-3">
                Here is a preview of how your job post will look like, with the
                details:
              </p>
              <JobCard
                type="preview"
                job={{
                  company_name: watch("company_name"),
                  position: watch("position"),
                  emptype: formData.emptype,
                  primtg: formData.primtg,
                  tags: formData.tags,
                  locns: formData.locns,
                  desc: formData.desc,
                  minsal: formData.minSal,
                  maxsal: formData.maxSal,
                  how2apply: formData.how2apply,
                  benefits: formData.benefits,
                  email4jobappl: watch("email4jobappl"),
                  apply_url: watch("apply_url"),
                }}
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

export default JobForm;
