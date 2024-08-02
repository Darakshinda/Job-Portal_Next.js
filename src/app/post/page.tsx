"use client";

import React, { useCallback, useEffect, useState } from "react";
import { TextInput, TextArea } from "../../stories/TextInput";
import JoditEditor from "../Components/Jodit-Editor";
import { Select } from "@/stories/Dropdown";
import { Tags } from "@/stories/Tags";
import Checkbox from "../Components/check";
import UploadButton from "../Components/ImgUpload";
import ColorPickerButton from "../Components/ColorPicker";
import JoditEditorComponent from "../Components/Jodit-Editor";
import SelectedOptions from "../Components/Options";
import {JobCard} from "../Components/Job-Card";
import axios from "axios";

import locnOpns from "../post/data/location.json";
import tagOpns from "../post/data/tags.json";
import benefitOpns from "../post/data/benefits.json";
import emptype from "../post/data/emptype.json";
import primTag from "../post/data/primTag.json";
import minSal from "../post/data/minsalary.json";
import maxSal from "../post/data/maxsalary.json";
import JobDetailsModal from "../Components/JobModal";
import Sidebar from "../Components/HireDashSidebar";
import { Router } from "next/router";
import { useSearchParams } from "next/navigation";

interface JobFormProps {}

const JobForm: React.FC<JobFormProps> = ({}) => {
  const [user, setuser] = useState({
    company: "",
    position: "",
    emptype: "Select Employment type",
    primtg: "Select a Primary tag for the Job",
    tags: "",
    locns: "",
    logo: "",
    minsal: "Minimum per year",
    maxsal: "Maximum per year",
    desc: "",
    benefits: "",
    how2apply: "",
    email4jobappl: "",
    applUrl: "",
    twtr: "",
    compMail: "",
    invMail: "",
    invAdrs: "",
    invNote: "",
    payLtr: false,
    pltrEml: "",
    fdbck: "",
    bgcolor: "#101011",
  });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const searchParams = useSearchParams();
  const jobID = searchParams.get("jobID");

  const handleChange = (key: string, value: string) => {
    setuser((prevState) => {
      if (prevState[key] === value) {
        return prevState; // Prevent unnecessary state updates
      }
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const [previewMode, setPreviewMode] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const getUserName = useCallback(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      axiosInstance
        .get(`${baseUrl}/accounts/profile/`)
        .then((response) => {
          setUserName(response.data.first_name.split(' ')[0]);
          setEmail(response.data.working_email);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [baseUrl]);

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  let errors = new Array(20).fill(0);

  const err = (value: string, ref: string, valid: boolean, i: number) => {
    if (value == ref) errors[i] = 1;
    else if (!valid) errors[i] = 2;
    else errors[i] = 0;
    if ((value == ref || !valid) && sbmt) return "solid";
    return "none";
  };

  const errchck = (value: string, ref: string, valid: boolean, i: number) => {
    if ((value == ref || !valid) && sbmt) return "solid";
    return "none";
  };

  function isValidEmail(email: string): boolean {
    if (email == "") return true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  function isValidURL(url: string): boolean {
    if (url == "") return true;
    console.log(url);
    const urlRegex =
      /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost)(:\d+)?(\/\S*)?$/;
    console.log(urlRegex.test(url));
    return urlRegex.test(url);
  }
  const [sbmt, setsbmt] = useState(false);
  console.log(`@@${errors[7]}`);

  function sal(sentence: string): number {
    // Function to escape special characters in a regex pattern
    if (sentence == "Minimum per year") return -1;
    if (sentence == "Maximum per year") return 1e8;
    return parseInt(sentence.replace(/[^0-9]/g, ""), 10);
  }

  let comp = user.company,
    pos = user.position,
    jobdesc = user.desc,
    how2apply = user.how2apply;
  if (comp == "") comp = "Company";
  if (pos == "") pos = "Position";
  const disp = () => {
    setsbmt(true);
    for (let i = 0; i < errors.length; i++)
      if (errors[i] == 1) {
        console.log("Value 1 at index: ", i);
        alert("Kindly fill the necessary Details");
        return false;
      }
    for (let i = 0; i < errors.length; i++)
      if (errors[i] == 2) {
        console.log("Value 2 at index: ", i);
        alert("Enter valid details");
        return false;
      }
    console.log(user);
    return true;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const res = disp();
    if (!res) return;
    const token = localStorage.getItem("access_token"); // Assuming you store your JWT token in localStorage
    if (jobID) {
      /*Update with url for edit job posting */
      const profile = `${baseUrl}/accounts/profile/`;
      const url = `${baseUrl}/jobs/${jobID}/update/`;
      const formData = new FormData();
      formData.append("working_email", email);
      formData.append("company_photo", user.logo);
      try {
        axios
          .put(profile, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            console.log("Profile updated successfully");
          })
          .catch((error) => {
            console.log(error.response.data || error.message);
          });
        axios
          .put(
            url,
            {
              annual_salary_max: sal(user.maxsal),
              annual_salary_min: sal(user.minsal),
              company_email: user.compMail,
              company_name: user.company,
              company_twitter: user.twtr,
              how_to_apply: user.how2apply,
              invoice_address: user.invAdrs,
              invoice_email: user.invMail,
              invoice_notes: user.invNote,
              pay_later: user.payLtr,
              job_description: user.desc,
              location_restriction: user.locns,
              primary_tag: user.primtg,
              benefits: user.benefits,
              position: user.position,
              tags: user.tags,
              apply_url: user.applUrl,
              apply_email_address: user.email4jobappl,
              feedback: user.fdbck,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            alert("Job updated successfully");
          })
          .catch((error) => {
            console.error("There was an error updating the job!", error);
            alert("Failed to update the job");
          });
      } catch (error) {
        console.error("There was an error updating the job!", error);
        alert("Failed to update the job");
      }
    } else {
      const url_job = `${baseUrl}/jobs/create/`;
      const profile = `${baseUrl}/accounts/profile/`;
      try {
        axios
          .put(
            profile,
            {
              company_photo: user.logo,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            alert("Profile updated successfully");
          })
          .catch((error) => {
            console.log(error.response.data || error.message);
          });
        axios
          .post(
            url_job,
            {
              annual_salary_max: sal(user.maxsal),
              annual_salary_min: sal(user.minsal),
              company_email: user.compMail,
              company_name: user.company,
              company_twitter: user.twtr,
              how_to_apply: user.how2apply,
              invoice_address: user.invAdrs,
              invoice_email: user.invMail,
              invoice_notes: user.invNote,
              pay_later: user.payLtr,
              job_description: user.desc,
              location_restriction: user.locns,
              primary_tag: user.primtg,
              benefits: user.benefits,
              position: user.position,
              tags: user.tags,
              apply_url: user.applUrl,
              apply_email_address: user.email4jobappl,
              feedback: user.fdbck,
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
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  useEffect(() => {
    if (jobID) {
      const token = localStorage.getItem("access_token");
      const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      axiosInstance
        .get(`${baseUrl}/posted-jobs/`)
        .then((response) => {
          console.log("Response:", response.data.results);

          const job = response.data.results.find(
            (job) => job.id.toString() === jobID.toString()
          );
          setuser({
            company: job.company_name,
            position: job.position,
            emptype: job.employment_type,
            primtg: job.primary_tag,
            tags: job.tags,
            locns: job.location_restriction,
            logo: job.company_logo,
            minsal: "USD " + job.annual_salary_min.toString() + " per year",
            maxsal: "USD " + job.annual_salary_max.toString() + " per year",
            desc: job.job_description,
            benefits: job.benefits,
            how2apply: job.how_to_apply,
            email4jobappl: job.apply_email_address,
            applUrl: job.apply_url,
            twtr: job.company_twitter,
            compMail: job.company_email,
            invMail: job.invoice_email,
            invAdrs: job.invoice_address,
            invNote: job.invoice_notes,
            payLtr: job.pay_later,
            pltrEml: job.pay_later_email,
            fdbck: job.feedback,
            bgcolor: job.background_color,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [jobID, baseUrl]);

  return (
    <div className="flex bg-[#10161e]">
      <Sidebar userName={username} />
      <div className="ml-[230px] pl-10">
        {!previewMode && (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6 bg-[#10161e] shadow-md"
          >
            <h2 className="text-purple-600 font-bold text-3xl">
              Primary Details
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <label
                className="col-span-1 block font-medium text-white text-lg"
                htmlFor="jobTitle"
              >
                Company Name*
              </label>
              <div
                style={{ border: `3px ${err(user.company, "", true, 1)} red` }}
              >
                <TextInput
                  keyy="company"
                  val={user.company}
                  placeholder={`Company name`}
                  onChange={handleChange}
                  req={true}
                  cls="input_company text-white"
                />
                {errchck(user.company, "", true, 1) == "solid" && (
                  <p
                    style={{
                      marginLeft: "2.5%",
                      color: "red",
                      fontSize: "11px",
                    }}
                  >
                    This is required
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 pb-2 gap-6">
              <label
                className="col-span-1 block font-medium text-gray-300 text-lg"
                htmlFor="jobTitle"
              >
                Position
                <p className="text-xs">
                  Please specify as single job position like "Marketing Manager"
                  or "Node JS Developer", not a sentence like "Looking for PM /
                  Biz Dev / Manager".
                </p>
              </label>
              <div
                style={{ border: `3px ${err(user.position, "", true, 2)} red` }}
              >
                <TextInput
                  keyy="position"
                  val={user.position}
                  placeholder={`Position`}
                  onChange={handleChange}
                  req={true}
                  cls="input_company text-white"
                />
                {errchck(user.position, "", true, 2) == "solid" && (
                  <p
                    style={{
                      marginLeft: "2.5%",
                      color: "red",
                      fontSize: "11px",
                    }}
                  >
                    This is required
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-1 block font-medium mt-2 text-gray-300 text-lg">
                Employment type
              </label>
              <div className="col-span-1 mt-2 space-y-2">
                <div
                  style={{
                    border: `3px ${err(user.emptype, "Select Employment type", true, 3)} red`,
                  }}
                >
                  <Select
                    keyy="emptype"
                    onChange={handleChange}
                    req={true}
                    cls="input_company  col-span-1 w-full px-3 py-2 border border-white rounded-md"
                    body={emptype}
                  />
                  {errchck(user.emptype, "Select Employment type", true, 3) ==
                    "solid" && (
                    <p
                      style={{
                        marginLeft: "2.5%",
                        color: "red",
                        fontSize: "11px",
                      }}
                    >
                      This is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-1 block font-medium mt-2 text-gray-300 text-lg">
                Primary Tag
              </label>
              <div className="col-span-1 mt-2 space-y-2">
                <div
                  style={{
                    border: `3px ${err(user.primtg, "Select a Primary tag for the Job", true, 4)} red`,
                  }}
                >
                  <Select
                    keyy="primtg"
                    onChange={handleChange}
                    cls="input_company text-white col-span-1 w-full px-3 py-2 border border-white rounded-md"
                    body={primTag}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-1 block mt-2 text-gray-300 font-medium text-lg">
                Tags, Keywords or Stack*
                <p className="text-xs">
                  Short tags are preferred. Use tags like industry and tech
                  stack. The first 3 or 4 tags are shown on the site, the other
                  tags aren't but the job will be shown on each tag specific
                  page (like /remote-react-jobs). We also sometimes generate
                  tags automatically after you post/edit to supplement.
                </p>
              </label>
              <div className="col-span-1 mt-2 space-y-2">
                <div
                  style={{ border: `3px ${err(user.tags, "", true, 4)} red` }}
                >
                  <Tags
                    keyy="tags"
                    cls="input_company text-white col-span-1 w-full px-3 py-2 border border-white rounded-md"
                    settgs={handleChange}
                    dynamic={true}
                    options={tagOpns}
                  />
                  {errchck(user.tags, "", true, 4) == "solid" && (
                    <p
                      style={{
                        marginLeft: "2.5%",
                        color: "red",
                        fontSize: "11px",
                      }}
                    >
                      This is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-1 block mt-2 text-gray-300 font-medium text-lg">
                Job is restricted to Locations?
                <p className="text-xs">
                  Only fill if you'd only like to hire people from a specific
                  location or timezone this job is restricted to. If not
                  restricted, please leave it as worldwide.
                </p>
              </label>
              <div className="col-span-1 mt-2 space-y-2">
                <div
                  style={{ border: `3px ${err(user.tags, "", true, 4)} red` }}
                >
                  <Tags
                    keyy="locns"
                    cls="input_company text-white col-span-1 w-full px-3 py-2 border border-white rounded-md"
                    settgs={handleChange}
                    dynamic={true}
                    options={locnOpns}
                    phdr="Type a location this job is restricted to"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-purple-600 font-bold pt-10 text-3xl">
              Company Info
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <label
                className="col-span-1 block font-medium text-gray-300 text-lg"
                htmlFor="jobTitle"
              >
                Company Twitter
                <p className="text-xs">
                  Twitter Username without @. Not required.
                </p>
              </label>
              <div
                style={{ border: `3px ${err(user.company, "", true, 1)} red` }}
              >
                <TextInput
                  keyy="twtr"
                  val={user.twtr}
                  placeholder={`username`}
                  onChange={handleChange}
                  cls="input_company text-white col-span-1 w-full px-3 py-2 border border-white rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label
                className="col-span-1 block font-medium text-gray-300 text-lg"
                htmlFor="jobTitle"
              >
                Company Email* (Private)
                <p className="text-xs">
                  Make sure this email is accessible by you! We use this to send
                  the invoice and edit link.{" "}
                </p>
              </label>
              <div
                style={{
                  border: `3px ${err(user.compMail, "", isValidEmail(user.compMail), 5)} red`,
                }}
              >
                <TextInput
                  keyy="compMail"
                  val={user.compMail}
                  placeholder={`Enter email`}
                  onChange={handleChange}
                  req={true}
                  cls="input_company text-white"
                />
                {errchck(user.compMail, "", true, 5) == "solid" && (
                  <p
                    style={{
                      marginLeft: "2.5%",
                      color: "red",
                      fontSize: "11px",
                    }}
                  >
                    This is required
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label
                className="col-span-1 block font-medium text-gray-300 text-lg"
                htmlFor="jobTitle"
              >
                Invoice Email* (Private)
                <p className="text-xs">
                  We send a copy of the invoice and edit link to here too. You
                  can write your finance department or accountant expenses email
                  here so they get a copy of the invoice for your bookkeeping.
                </p>
              </label>
              <div
                style={{
                  border: `3px ${err(user.compMail, "", isValidEmail(user.compMail), 5)} red`,
                }}
              >
                <TextInput
                  keyy="invMail"
                  val={user.invMail}
                  placeholder={`Enter email`}
                  onChange={handleChange}
                  cls="input_company text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label
                className="col-span-1 block font-medium text-gray-300 text-lg"
                htmlFor="jobTitle"
              >
                Invoice Address*
                <p className="text-xs">
                  Specify your company address here and we'll put it on your
                  invoice for your bookkeeping.
                </p>
              </label>
              <div
                style={{
                  border: `3px ${err(user.compMail, "", isValidEmail(user.compMail), 5)} red`,
                }}
              >
                <TextArea
                  keyy="invAdrs"
                  val={user.invAdrs}
                  placeholder={`e.g. your company's full name and full invoice address, including building, street, city and country; also things like your VAT number, this is shown on the invoice.`}
                  onChange={handleChange}
                  req={true}
                  cls="input_company text-white col-span-1 w-full px-3 py-2 border border-white rounded-md"
                />
                {errchck(user.invAdrs, "", true, 6) == "solid" && (
                  <p
                    style={{
                      marginLeft: "2.5%",
                      color: "red",
                      fontSize: "11px",
                    }}
                  >
                    This is required
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label
                className="col-span-1 block font-medium text-gray-300 text-lg"
                htmlFor="jobTitle"
              >
                <p className="text-white">Invoice Notes / PO Number</p>
                <p className="text-xs">
                  Not required. Add notes here that you'd like to see on the
                  invoice/receipt such as a Purchase Order number or any other
                  internal notes you need for reference. You can add or edit
                  this later.
                </p>
              </label>
              <div
                style={{
                  border: `3px ${err(user.compMail, "", isValidEmail(user.compMail), 5)} red`,
                }}
              >
                <TextInput
                  keyy="invNote"
                  val={user.invNote}
                  placeholder={`e.g. PO number 1234`}
                  onChange={handleChange}
                  cls="input_company text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-1 block font-medium text-gray-300 text-lg">
                Pay Later
                <p className="text-xs">
                  Need to get approval for this payment? Or send the invoice to
                  your finance department first? No problem, we'll save your job
                  post and send you (and your finance department below) a
                  payment link. Once it's paid we immediately publish it!
                </p>
              </label>
              <div className="col-span-1 mt-2 space-y-2">
                <div className="flex items-center">
                  <div style={{ marginLeft: "1.4%" }}>
                    <Checkbox
                      keyy="payLtr"
                      label="I'd like to pay later"
                      labelClassName="text-white" 
                      checked={user.payLtr}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {user.payLtr && (
              <div className="grid grid-cols-2 gap-6">
                <label
                  className="col-span-1 block font-medium text-gray-300 text-lg"
                  htmlFor="jobTitle"
                >
                  Pay Later Email*
                  <p className="text-xs">
                    We send a copy of the invoice and edit link to here too. You
                    can write your finance department or accountant expenses
                    email here so they get a copy of the invoice for your
                    bookkeeping.
                  </p>
                </label>
                <div
                  style={{
                    border: `3px ${err(user.compMail, "", isValidEmail(user.compMail), 5)} red`,
                  }}
                >
                  <TextInput
                    keyy="pltrEml"
                    val={user.pltrEml}
                    placeholder={`Pay later email address`}
                    onChange={handleChange}
                    req={true}
                    cls="input_company text-white"
                  />
                  {errchck(user.pltrEml, "", true, 7) == "solid" && (
                    <p
                      style={{
                        marginLeft: "2.5%",
                        color: "red",
                        fontSize: "11px",
                      }}
                    >
                      This is required
                    </p>
                  )}
                </div>
              </div>
            )}

            <h2 className="text-purple-600 font-bold pt-10 text-3xl">
              Job Details
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-1 block font-medium text-gray-300 text-lg">
                Company Logo
                <p className="text-xs">
                  Provide a square or round image of type .jpg or .png.
                </p>
              </label>
              <div className="col-span-1 mt-2 space-y-2">
                <div className="flex items-center">
                  <div style={{ marginLeft: "1.4%" }}>
                    <UploadButton keyy="logo" onChange={handleChange} />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "1%",
                        paddingTop: "3%",
                      }}
                    >
                      {/* <b className="text-white">Highlight with your company's 🌈 brand color:</b>
                      <ColorPickerButton change={handleChange} keyy="bgcolor" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label
                className="col-span-1 block text-lg font-medium text-gray-300"
                htmlFor="jobDescription"
              >
                Job description
              </label>
              <div className="col-span-1">
                <div
                  style={{
                    marginLeft: "1.4%",
                    marginRight: "2%",
                    border: `3px ${err(user.desc, "", err(user.desc, "<p><br></p>", true, 9) == "none", 9)} red`,
                  }}
                >
                  <JoditEditorComponent
                    keyy="desc"
                    value={user.desc}
                    onChange={handleChange}
                  />
                  {errchck(
                    user.desc,
                    "",
                    err(user.desc, "<p><br></p>", true, 7) == "none",
                    7
                  ) == "solid" && (
                    <p
                      style={{
                        color: "red",
                        marginLeft: "1.4%",
                        fontSize: "11px",
                      }}
                    >
                      This is required. Click outside the box after filling.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-1 block font-medium text-gray-300 text-lg">
                Annual Salary (Gross, Annualized, Full-Time-Equivalent (FTE) in
                INR equivalent)
                <p className="text-xs">
                  It's illegal to not share salary range on job posts since
                  2021. Posts without salary will automatically show an estimate
                  of salary based on similar jobs.
                </p>
              </label>
              <div className="col-span-1 mt-2 space-y-2">
                <div className="flex items-center">
                  <div
                    style={{
                      border: `3px ${err(user.minsal, "Minimum per year", err(user.maxsal, "Maximum per year", true, 10) == "none" && sal(user.minsal) <= sal(user.maxsal), 10)} red`,
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "inline", marginLeft: "8%" }}>
                      <Select
                        keyy="minsal"
                        onChange={handleChange}
                        req={true}
                        cls="input_company text-white w-full px-3 py-2 border border-white rounded-md"
                        body={minSal}
                        type="small"
                      />
                    </div>
                    <a
                      style={{
                        display: "inline",
                        fontSize: "30px",
                        marginLeft: "5%",
                        marginRight: "5%",
                      }}
                    >{`-`}</a>
                    <div style={{ display: "inline" }}>
                      <Select
                        keyy="maxsal"
                        onChange={handleChange}
                        req={true}
                        cls="input_company text-white w-full px-3 py-2 border border-white rounded-md"
                        body={maxSal}
                        type="small"
                      />
                    </div>
                  </div>
                  {errchck(
                    user.minsal,
                    "Minimum per year",
                    errchck(user.maxsal, "Maximum per year", true, 8) == "none",
                    8
                  ) == "solid" && (
                    <p
                      style={{
                        color: "red",
                        marginLeft: "18%",
                        fontSize: "11px",
                      }}
                    >
                      This is required
                    </p>
                  )}
                  {!(sal(user.minsal) <= sal(user.maxsal)) && (
                    <p
                      style={{
                        color: "red",
                        marginLeft: "25%",
                        fontSize: "11px",
                      }}
                    >
                      Min Salary must be lesser or equal to Max Salary
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
  <label className="col-span-1 block font-medium text-gray-300 text-lg">
    Benefits
  </label>
  <div className="col-span-1 mt-2 space-y-2">
    <div className="flex items-center">
      <div
        className="border-2 border-white bg-gray-900 p-4 rounded-lg"
        style={{ border: '1px solid white', 
          marginLeft: "1.4%" }} // Keep margin-left as needed
      >
        <SelectedOptions
          options={benefitOpns}
          keyy="benefits"
          onChange={handleChange}
        />
        {errchck(user.benefits, "", true, 9) === "solid" && (
          <p
            className="text-red-500 text-xs mt-2"
            style={{ marginLeft: "1.4%" }}
          >
            This is required
          </p>
        )}
      </div>
    </div>
  </div>
</div>


            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-1 block font-medium text-gray-300 text-lg">
                How to Apply?
              </label>
              <div className="col-span-1 mt-2 space-y-2">
                <div className="flex items-center">
                  <div style={{ marginLeft: "1.4%", marginRight: "2%" }}>
                    <JoditEditorComponent
                      keyy="how2apply"
                      value={user.how2apply}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-1 block font-medium text-gray-300 text-lg">
                Email to get Job Applications
                <p className="text-xs">
                  {/*Fill info for trials for job posting */}
                </p>
              </label>
              <div className="flex items-center w-full">
                <div
                  className="w-full"
                  style={{
                    border: `3px ${err(user.email4jobappl, "^~239874xzxdr46x?:trjan", isValidEmail(user.email4jobappl), 12)} red`,
                  }}
                >
                  <TextInput
                    keyy="email4jobappl"
                    val={user.email4jobappl}
                    placeholder={`Apply email address`}
                    onChange={handleChange}
                    req={true}
                    cls="input_company text-white col-span-1 w-full px-3 py-2 border border-white rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-1 block font-medium text-gray-300 text-lg">
                Apply URL
                <p className="text-xs">
                  If you'd like to use your own apply form or ATS you can enter
                  the URL here for people to apply.
                </p>
              </label>
              <div className="flex items-center w-full">
                <div
                  className="w-full"
                  style={{
                    border: `3px ${err(user.applUrl, "^~239874xzxdr46x?:trjan", isValidURL(user.applUrl), 12)} red`,
                  }}
                >
                  <TextInput
                    keyy="applUrl"
                    val={user.applUrl}
                    placeholder={`https://`}
                    onChange={handleChange}
                    cls="input_company text-white"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-purple-600 font-bold pt-10 text-3xl">
              Feedback
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <label
                className="col-span-1 block font-medium text-gray-300 text-lg"
                htmlFor="jobTitle"
              >
                Feedback about CodeUnity*
                <p className="text-xs">
                  If you have any feature requests or general feedback about
                  posting a job at Code Unity, leave it here.
                </p>
              </label>
              <div
                style={{
                  border: `3px ${err(user.compMail, "", isValidEmail(user.compMail), 5)} red`,
                }}
              >
                <TextArea
                  keyy="fdbck"
                  val={user.fdbck}
                  onChange={handleChange}
                  cls="input_company text-white w-full px-3 py-2 border border-white rounded-md"
                />
              </div>
            </div>

            {/* -------------------------------------- */}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                {jobID ? "Update" : "Post Job"}
              </button>
              <button
                onClick={handlePreview}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Preview
              </button>
            </div>
          </form>
        )}

        {previewMode && (
          <div className="bg-[#10161e] p-6 ml-10 w-[100%]">
            <h3 className="text-purple-600 font-bold text-3xl">Preview</h3>
            <p className="text-gray-300 text-lg py-3">
              Here is an preview of how your job post will look like, with the
              details:{" "}
            </p>
            <div className="flex justify-center py-6">
              <JobCard
                imgflg
                imgsrc={user.logo}
                bdg
                position={user.position}
                company_name={user.company}
                location_restriction={user.locns}
                tags={user.tags}
                created_at="5/17/2024 23:11:25"
                job={{
                  company: user.company,
                  position: user.position,
                  emptype: "Full-time",
                  primtg: user.primtg,
                  tags: user.tags,
                  locns: user.locns,
                  logo: user.logo,
                  minsal: sal(user.minsal),
                  maxsal: sal(user.maxsal),
                  desc: user.desc,
                  benefits: user.benefits,
                  how2apply: user.how2apply,
                }}
                viewDetails={setSelectedJob}
              />
            </div>
            <div className="flex justify-center py-6">
              {selectedJob && (
                <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />
              )}
            </div>
            <div className="flex justify-center">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded"
                onClick={handlePreview}
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobForm;