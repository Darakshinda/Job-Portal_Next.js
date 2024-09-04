"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import benefitOpns from "@/constants/data/benefits.json";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postJobSchema } from "@/lib/validator";
import { swalFailed, swalSuccess } from "@/lib/helpers/swal";
import JobPostForm from "@/Components/Forms/JobPostForm";
import Spinner from "@/Components/Loaders/Spinner";

type Schema = z.infer<typeof postJobSchema>;

type FormData = {
  emptype: string;
  primtg: string;
  tagsArray: string[];
  locns: string;
  desc: string;
  minSalary: string;
  maxSalary: string;
  currencyType: string;
  benefitsArray: string[];
  how2apply: string;
  feedback: string;
};

const EditJobPostPage = ({ params }: { params: { jobId: string } }) => {
  const router = useRouter();
  const jobId = params.jobId;
  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";

  const [formData, setFormData] = useState<FormData>({
    emptype: "",
    primtg: "",
    tagsArray: [],
    locns: "",
    desc: "",
    minSalary: "",
    maxSalary: "",
    currencyType: "USD",
    benefitsArray: [],
    how2apply: "",
    feedback: "",
  });

  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [currencyRates, setCurrencyRates] = useState<{ [key: string]: number }>(
    { USD: 1 }
  );

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

  const [previewMode, setPreviewMode] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [handleError, setHandleError] = useState({
    jobDescriptionError: "",
    howToApplyError: "",
    minsalMaxsalError: "",
  });

  benefitOpns.sort((a, b) => {
    const aInSubset = formData.benefitsArray!.includes(a);
    const bInSubset = formData.benefitsArray!.includes(b);

    if (aInSubset && bInSubset) {
      return (
        formData.benefitsArray!.indexOf(a) - formData.benefitsArray!.indexOf(b)
      );
    } else if (aInSubset) {
      return -1;
    } else if (bInSubset) {
      return 1;
    } else {
      return 0;
    }
  });

  // To Fetch data of the job post
  useEffect(() => {
    const fetchJobData = async () => {
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
              locns: response.data.location_restriction,
              desc: response.data.job_description,
              minSalary: response.data.annual_salary_min,
              maxSalary: response.data.annual_salary_max,
              currencyType: "USD",
              how2apply: response.data.how_to_apply,
              feedback: response.data.feedback,
              tagsArray: splitStringByComma(response.data.tags),
              benefitsArray: splitStringByComma(response.data.benefits),
            });
            setIsLoaded(true);
          })
          .catch((error) => {
            console.log(error.code);
            swalFailed({ title: "Failed to fetch job data 🤖", type: "toast" });
          });
      }
    };

    fetchJobData();
  }, [jobId, reset, baseurl]);

  const splitStringByComma = (inputString: string): string[] => {
    return inputString.split(",").map((tag) => tag.trim());
  };

  const currencyInBaseUSD = (currency: string, amount: number) => {
    const rate = currencyRates[currency];
    return Math.round(amount / rate);
  };

  // To handle errors manually for minSal and maxSal
  useEffect(() => {
    if (Number(formData.minSalary) > Number(formData.maxSalary)) {
      // console.log("Min Salary should be less than Max Salary");
      setHandleError((prevState) => {
        return {
          ...prevState,
          minsalMaxsalError:
            "Minimum salary should be less than maximum salary",
        };
      });
    } else {
      setHandleError((prevState) => ({
        ...prevState,
        minsalMaxsalError: "",
      }));
    }
  }, [formData.minSalary, formData.maxSalary]);

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
  }, [formData.desc]);

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
  }, [formData.how2apply]);

  useEffect(() => {
    const getVals = async () => {
      const apiKey = "6bec93c77b543a360c7e8995";
      const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

      try {
        const response = await axios.get(apiUrl);
        const currencyRates = response.data.conversion_rates;
        const List = Object.keys(currencyRates);
        // console.log("Fetched currency rates:", currencyRates);

        setCurrencyList(List);
        setCurrencyRates(currencyRates);
      } catch (error) {
        console.error("Failed to fetch currency rates:", error);
      }
    };

    if (currencyList.length === 0) getVals();
  }, []);

  const onSubmit = async (data: Schema) => {
    if (
      handleError.minsalMaxsalError ||
      handleError.jobDescriptionError ||
      handleError.howToApplyError
    )
      return;

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
      minSalary,
      maxSalary,
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

    // console.log("updating job");

    try {
      await axios
        .put(
          url_job,
          {
            annual_salary_max: currencyInBaseUSD(
              formData.currencyType!,
              Number(minSalary)
            ),
            annual_salary_min: currencyInBaseUSD(
              formData.currencyType!,
              Number(maxSalary)
            ),
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
          swalSuccess({
            title: "Job Post Updated Successfully",
            type: "toast",
          });
          router.push("/postedJobs");
        })
        .catch((error) => {
          console.error("There was an error registering the job!", error);
          swalFailed({ title: "Error occurred at server 🤖", type: "toast" });
        });
    } catch (error) {
      console.error("There was an error registering the job!", error);
      swalFailed({ title: "Error occurred at server 🤖", type: "toast" });
    }
  };

  return (
    <>
      {isLoaded ? (
        <JobPostForm
          type="edit"
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
          handleError={handleError}
          isDirty={isDirty}
          isFormDirty={isFormDirty}
          setIsFormDirty={setIsFormDirty}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-[100dvh]">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default EditJobPostPage;
