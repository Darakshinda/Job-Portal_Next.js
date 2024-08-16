"use client";

import React, { useEffect, useState } from "react";
import SelectedOptions from "@/Components/Options";
import axios from "axios";
import locOpns from "@/constants/data/location.json";
import SkillTags from "@/constants/data/tags.json";
import benefitOpns from "@/constants/data/benefits.json";
import EmployementTags from "@/constants/data/emptype.json";
import primaryTag from "@/constants/data/primTag.json";
import minSal from "@/constants/data/minsalary.json";
import maxSal from "@/constants/data/maxsalary.json";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postJobSchema } from "@/lib/validator";
import PostFormInput from "@/Components/Forms/PostFormInput";
import SearchSelectDropdown from "@/Components/Forms/SearchSelectDropdown";
import QuillEditorComponent from "@/Components/Forms/QuillComponent";
import Swal from "sweetalert2";

type Schema = z.infer<typeof postJobSchema>;

type FormData = {
  emptype: string;
  primtg: string;
  tags: string;
  tagsArray?: string[];
  locns: string;
  desc: string;
  minSal: number;
  maxSal: number;
  benefits: string;
  benefitsArray?: string[];
  how2apply: string;
  feedback: string;
};

const EditJobPostPage = ({ params }: { params: { jobId: string } }) => {
  // console.log(params);
  const router = useRouter();
  const jobId = params.jobId;
  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";

  const [formData, setFormData] = useState<FormData>({
    emptype: "",
    primtg: "",
    tags: "",
    tagsArray: [],
    locns: "",
    desc: "",
    minSal: 0,
    maxSal: 0,
    benefits: "Nothing",
    benefitsArray: [],
    how2apply: "",
    feedback: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      company_name: "",
      position: "",
      email4jobappl: "",
      apply_url: "",
    },
  });
  const LocationTags = locOpns.countries;
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [handleError, setHandleError] = useState({
    minsalMaxsalError: "",
  });

  // To Fetch data of the job post
  useEffect(() => {
    const access_token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (access_token) {
      axios
        .get(`${baseurl}/jobs/${jobId}/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          // console.log(response.data);
          reset({
            company_name: response.data.company_name,
            position: response.data.position,
            email4jobappl: response.data.apply_email_address,
            apply_url: response.data.apply_url,
          });
          setFormData({
            emptype: response.data.employee_type,
            primtg: response.data.primary_tag,
            tags: response.data.tags,
            locns: response.data.location_restriction,
            desc: response.data.job_description,
            minSal: Number(response.data.annual_salary_min),
            maxSal: Number(response.data.annual_salary_max),
            benefits: response.data.benefits,
            how2apply: response.data.how_to_apply,
            feedback: response.data.feedback,
            tagsArray: splitStringByComma(response.data.tags),
            benefitsArray: splitStringByComma(response.data.benefits),
          });
          setIsLoaded(true);
        })
        .catch((error) => {
          console.log(error.code);
        });
    }
  }, [jobId, reset, baseurl]);

  // const validateUseStateInputs = () => {
  //   try {
  //     postJobSchema.parse({
  //       ...formData,
  //       company_name: watch("company_name"),
  //       position: watch("position"),
  //       email4jobappl: watch("email4jobappl"),
  //       apply_url: watch("apply_url"),
  //     });
  //     setParseErrors({});
  //   } catch (error: any) {
  //     const validationErrors: { [key: string]: string } = {};
  //     console.log(error.errors);
  //     error.errors.forEach((err: any) => {
  //       validationErrors[err.path[0]] = err.message;
  //     });
  //     setParseErrors(validationErrors);
  //   }
  // };

  const handleChange = (name: string, value: string) => {
    if (name === "minSal" || name === "maxSal") {
      const val = parseInt(value.split(" ")[0]);
      // console.log(val);
      setFormData((prevState) => ({
        ...prevState,
        [name]: val,
      }));

      // Number()
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setIsFormDirty(true);
    // validateUseStateInputs();
  };

  // To handle errors manually for minSal and maxSal
  useEffect(() => {
    if (formData.minSal > formData.maxSal) {
      console.log("Min Salary should be less than Max Salary");
      setHandleError({
        minsalMaxsalError: "Min Salary should be less than Max Salary",
      });
    } else {
      setHandleError({
        minsalMaxsalError: "",
      });
    }
  }, [formData.minSal, formData.maxSal]);

  const handleSkillChange = (skills: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      tagsArray: skills,
    }));
    setIsFormDirty(true);
  };

  const handleBenefitsChange = (benefits: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      benefitsArray: benefits,
    }));
    setIsFormDirty(true);
  };

  const splitStringByComma = (inputString: string): string[] => {
    // Split the string by comma and trim each element
    return inputString.split(",").map((tag) => tag.trim());
  };

  // useEffect(() => {
  //   if (isLoaded) {
  //     const tagsArray = splitStringByComma(formData.tags);
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       tagsArray,
  //     }));

  //     let benefitsArray = splitStringByComma(formData.benefits);
  //     benefitsArray = benefitsArray.map((benefit) => removeEmojis(benefit));
  //     console.log(benefitsArray);
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       benefitsArray,
  //     }));
  //   }
  // }, [isLoaded, formData.tags, formData.benefits]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onSubmit = async (data: Schema) => {
    if (handleError.minsalMaxsalError) {
      return;
    }
    const token = localStorage.getItem("access_token");
    const url_job = `${baseurl}/jobs/${jobId}/update/`; // Update your endpoint
    // Prepare your payload and send the update request...
    const { company_name, position, email4jobappl, apply_url } = data;
    const {
      emptype,
      primtg,
      tagsArray,
      locns,
      desc,
      minSal,
      maxSal,
      benefitsArray,
      how2apply,
      feedback,
    } = formData;
    let allTags = "";
    for (let i = 0; i < tagsArray!.length; i++) {
      allTags = allTags + tagsArray![i];
      if (i < tagsArray!.length - 1) {
        allTags = allTags + ",";
      }
    }
    let allBenefits = "";
    for (let i = 0; i < benefitsArray!.length; i++) {
      allBenefits = allBenefits + benefitsArray![i];
      if (i < benefitsArray!.length - 1) {
        allBenefits = allBenefits + ",";
      }
    }

    console.log("updating job");

    try {
      await axios
        .put(
          url_job,
          {
            annual_salary_max: maxSal.toString(),
            annual_salary_min: minSal.toString(),
            employee_type: emptype,
            company_email: email4jobappl,
            company_name: company_name,
            how_to_apply: how2apply,
            job_description: desc,
            location_restriction: locns,
            primary_tag: primtg,
            benefits: allBenefits,
            position: position,
            tags: allTags,
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
          Swal.fire({
            title: "Job updated successfully 🎉",
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
          router.push("/postedJobs");
        })
        .catch((error) => {
          console.error("There was an error registering the job!", error);
          Swal.fire({
            title: "Failed to Update Job Post 🤖",
            icon: "error",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        });
    } catch (error) {
      console.error("There was an error registering the job!", error);
      Swal.fire({
        title: "Error occurred at server 🤖",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
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

  return (
    <div className="flex-1 bg-white min-h-screen md:mx-2 block">
      {/* <div className="p-10 h-full"> */}
      {/* {!previewMode && ( */}
      <form
        id="post-form"
        onSubmit={handleSubmit(onSubmit)}
        className="md:space-y-4 space-y-2 px-6 py-6 max-w-5xl mx-auto"
      >
        <h2 className="text-purple-600 font-bold py-6 text-3xl">
          Primary Details
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
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

          <div className="flex flex-col justify-center w-full">
            <SearchSelectDropdown
              label="Employment type"
              name="emptype"
              labelcls="text-gray-700 text-base font-semibold relative flex items-center gap-2"
              placeholder="Select Employment type"
              cls="relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
              tags={EmployementTags}
              selected={isLoaded ? formData.emptype : ""}
              onSingleChange={handleChange}
              multiple={false}
            />
          </div>

          <div className="flex flex-col justify-center w-full self-start">
            <SearchSelectDropdown
              label="Field of Work"
              name="primtg"
              labelcls="text-gray-700 text-base font-semibold relative flex items-center gap-2"
              placeholder="Work Field"
              cls="relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
              tags={primaryTag}
              selected={isLoaded ? formData.primtg : ""}
              onSingleChange={handleChange}
              multiple={false}
            />
          </div>

          <div className="flex flex-col justify-center w-full self-end">
            <SearchSelectDropdown
              label="Skills Required"
              labelcls="text-gray-700 text-base font-semibold relative flex items-center gap-2"
              cls="relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
              tags={SkillTags}
              existingTags={isLoaded ? formData.tagsArray : []}
              onChange={handleSkillChange}
              description="Short tags like industry and tech stack are preferred. Only the first 3 or 4 tags are displayed on the site, but all tags ensure the job appears on relevant tag-specific pages. Additional tags may be auto-generated after posting/editing to supplement."
            />
          </div>

          <div className="flex flex-col justify-center w-full self-start">
            <SearchSelectDropdown
              label="Restricted to Locations"
              name="locns"
              labelcls="text-gray-700 text-base font-semibold relative flex items-center gap-2"
              placeholder="Work Location"
              cls="relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
              tags={LocationTags}
              selected={isLoaded ? formData.locns : ""}
              onSingleChange={handleChange}
              description="Only fill if you'd only like to hire people from a specific location or timezone this job is restricted to. If not restricted, please leave it as worldwide."
              multiple={false}
            />
          </div>
        </div>

        <h2 className="text-purple-600 font-bold py-6 text-3xl">Job Details</h2>

        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label
              className="text-gray-700 text-base font-semibold relative flex items-center gap-2"
              htmlFor="jobDescription"
            >
              Job description
              <span className="text-red-500">*</span>
            </label>
            <div className="col-span-1">
              <div>
                {/* <JoditEditorComponent
                  keyy="desc"
                  value={formData.desc}
                  onChange={handleChange}
                /> */}
                <QuillEditorComponent
                  keyy="desc"
                  value={formData.desc}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              className="text-gray-700 text-base font-semibold relative flex items-start gap-2"
              htmlFor="jobDescription"
            >
              How to apply ?<span className="text-red-500">*</span>
            </label>
            <div className="col-span-1">
              <div>
                {/* <JoditEditorComponent
                  keyy="how2apply"
                  value={formData.how2apply}
                  onChange={handleChange}
                /> */}
                <QuillEditorComponent
                  keyy="how2apply"
                  value={formData.how2apply}
                  onChange={handleChange}
                />
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
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-2 items-start">
            <div>
              <label
                className="text-gray-700 text-base font-semibold relative flex items-start gap-2"
                htmlFor="salary"
              >
                Salary Margin
                <button
                  type="button"
                  className="w-2 h-2 p-2.5 text-sm bg-gray-200 text-gray-400 rounded-full flex items-center justify-center outline-none hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-300 focus:text-gray-500 peer"
                >
                  ?
                </button>
                {/* <div className="absolute left-20 transform bottom-0 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-900 opacity-0 peer-hover:opacity-100 transition-opacity"></div> */}
                <div className="absolute -z-10 left-0 transform top-full translate-y-full mb-2 max-w-sm bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:z-10 transition-all duration-300 ease-in-out">
                  It&apos;s illegal to not share salary range on job posts since
                  2021. Posts without salary will automatically show an estimate
                  of salary based on similar jobs.
                </div>
              </label>

              <div className="flex w-full justify-between items-center relative gap-2.5">
                <SearchSelectDropdown
                  placeholder="Min Salary"
                  labelcls="text-gray-800 text-lg font-semibold relative flex items-center gap-2"
                  cls="relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
                  name="minSal"
                  tags={minSal}
                  selected={isLoaded ? `${formData.minSal} LPA` : ""}
                  onSingleChange={handleChange}
                  multiple={false}
                />
                <span className="text-lg italic"> to </span>
                <SearchSelectDropdown
                  placeholder="Max Salary"
                  labelcls="text-gray-800 text-lg font-semibold relative flex items-center gap-2"
                  cls="relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
                  name="maxSal"
                  tags={maxSal}
                  selected={isLoaded ? `${formData.maxSal} LPA` : ""}
                  onSingleChange={handleChange}
                  multiple={false}
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
                    <SelectedOptions
                      selected={isLoaded ? formData.benefitsArray : []}
                      options={benefitOpns}
                      name="benefits"
                      onChange={handleBenefitsChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-purple-600 font-bold py-6 text-3xl">Feedback</h2>

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
            {/* <div className="absolute left-20 transform bottom-0 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-900 opacity-0 peer-hover:opacity-100 transition-opacity"></div> */}
            <div className="absolute left-0 top-8 -z-10 max-w-sm bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:z-10 transition-opacity">
              If you have any feature requests or general feedback about posting
              a job at Code Unity, leave it here.
            </div>
          </label>
          <div className="col-span-1">
            <div>
              {/* <JoditEditorComponent
                keyy="feedback"
                value={formData.feedback}
                onChange={handleChange}
              /> */}
              <QuillEditorComponent
                keyy="feedback"
                value={formData.feedback}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto w-fit">
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={!isFormDirty}
              className="px-4 py-2 rounded-full font-semibold bg-blue-200 text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Job Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditJobPostPage;
