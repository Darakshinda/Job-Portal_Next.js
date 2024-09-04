"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postJobSchema } from "@/lib/validator";
import { swalFailed, swalSuccess } from "@/lib/helpers/swal";
import JobPostForm from "@/Components/Forms/JobPostForm";

type Schema = z.infer<typeof postJobSchema>;

type FormData = {
  emptype: string;
  primtg: string;
  tagsArray: string[];
  locns: string;
  desc: string;
  how2apply: string;
  minSalary: string;
  maxSalary: string;
  currencyType: string;
  benefitsArray: string[];
  feedback: string;
};

const JobForm = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [formData, setFormData] = useState<FormData>({
    emptype: "",
    primtg: "",
    tagsArray: [],
    locns: "",
    desc: "",
    how2apply: "",
    minSalary: "0",
    maxSalary: "0",
    currencyType: "USD",
    benefitsArray: [],
    feedback: "",
  });

  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [currencyRates, setCurrencyRates] = useState<{ [key: string]: number }>(
    { USD: 1 }
  );

  const [isPosting, setIsPosting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const [handleError, setHandleError] = useState({
    jobDescriptionError: "",
    howToApplyError: "",
    minsalMaxsalError: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      company_name: "",
      position: "",
      email4jobappl: "",
      apply_url: "",
    },
  });

  const currencyInBaseUSD = (currency: string, amount: number) => {
    const rate = currencyRates[currency];
    return Math.round(amount / rate);
  };

  useEffect(() => {
    if (
      (formData.desc === "" || formData.desc === "<p><br></p>") &&
      isFormDirty
    ) {
      setHandleError((prevState) => ({
        ...prevState,
        jobDescriptionError: "This Field is Required",
      }));
    } else {
      setHandleError((prevState) => ({
        ...prevState,
        jobDescriptionError: "",
      }));
    }
  }, [formData.desc, isFormDirty]);

  useEffect(() => {
    if (
      (formData.how2apply === "" || formData.how2apply === "<p><br></p>") &&
      isFormDirty
    ) {
      setHandleError((prevState) => ({
        ...prevState,
        howToApplyError: "This Field is Required",
      }));
    } else {
      setHandleError((prevState) => ({
        ...prevState,
        howToApplyError: "",
      }));
    }
  }, [formData.how2apply, isFormDirty]);

  useEffect(() => {
    if (Number(formData.minSalary) > Number(formData.maxSalary)) {
      setHandleError((prevState) => ({
        ...prevState,
        minsalMaxsalError: "Minimum salary should be less than maximum salary",
      }));
    } else {
      setHandleError((prevState) => ({
        ...prevState,
        minsalMaxsalError: "",
      }));
    }
  }, [formData.minSalary, formData.maxSalary]);

  const onSubmit = async (data: Schema) => {
    if (
      handleError.minsalMaxsalError ||
      handleError.jobDescriptionError ||
      handleError.howToApplyError
    )
      return;

    if (isPosting) return;

    setIsPosting(true);

    const token = localStorage.getItem("access_token");
    const { company_name, position, email4jobappl, apply_url } = data;
    const {
      maxSalary,
      minSalary,
      emptype,
      primtg,
      locns,
      desc,
      benefitsArray,
      how2apply,
      feedback,
      tagsArray,
    } = formData;

    let allTags = "";
    for (let i = 0; i < tagsArray.length; i++) {
      allTags = allTags + tagsArray[i];
      if (i < tagsArray.length - 1) {
        allTags = allTags + ",";
      }
    }

    let allBenefits = "";
    for (let i = 0; i < benefitsArray.length; i++) {
      allBenefits = allBenefits + benefitsArray[i];
      if (i < benefitsArray.length - 1) {
        allBenefits = allBenefits + ",";
      }
    }

    // console.log(company_name, position, email4jobappl, apply_url);
    // console.log(
    //   minSalary,
    //   maxSalary,
    //   emptype,
    //   primtg,
    //   locns,
    //   desc,
    //   how2apply,
    //   feedback
    // );
    // console.log(allTags, allBenefits);
    try {
      await axios
        .post(
          `${baseUrl}/jobs/create/`,
          {
            annual_salary_min: currencyInBaseUSD(
              formData.currencyType,
              Number(minSalary)
            ),
            annual_salary_max: currencyInBaseUSD(
              formData.currencyType,
              Number(maxSalary)
            ),
            emptype: emptype,
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
          swalSuccess({ title: "Job registered successfully", type: "toast" });
          router.push("/postedJobs");
        })
        .catch((error) => {
          // console.error("There was an error registering the job!", error);
          // alert("Failed to register the job");
          swalFailed({ title: "Failed to register the job", type: "toast" });
        });
    } catch (error) {
      // console.error("There was an error registering the job!", error);
      // alert("Failed to register the job");
      swalFailed({
        title: "Server Error 🤖. Please try again",
        type: "toast",
      });
    }

    setIsPosting(false);
  };

  // useEffect(() => {
  //   console.log(formData.currencyType);
  // }, [formData.currencyType]);

  return (
    <JobPostForm
      type="post"
      previewMode={previewMode}
      setPreviewMode={setPreviewMode}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      watch={watch}
      errors={errors}
      formData={formData}
      setFormData={setFormData}
      currencyList={currencyList}
      setCurrencyList={setCurrencyList}
      setCurrencyRates={setCurrencyRates}
      handleError={handleError}
      isDirty={isDirty}
      isFormDirty={isFormDirty}
      setIsFormDirty={setIsFormDirty}
      isPosting={isPosting}
    />
  );
};

export default JobForm;
