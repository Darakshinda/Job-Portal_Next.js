"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoginFormInput from "@/Components/Forms/LoginFormInput";
import {
  aboutSchema,
  educationSchema,
  generalSchema,
  socialProfilesSchema,
} from "@/lib/validator";
import { FaGithub, FaLinkedin, FaTelegram, FaGlobe } from "react-icons/fa";
import locOpns from "@/constants/data/location.json";
import ExperienceTags from "@/constants/data/expirence.json";
import companyType from "@/constants/data/companytype.json";
import SkillTags from "@/constants/data/tags.json";
import ethinicity from "@/constants/data/ethinicity.json";
import SignupFormInput from "@/Components/Forms/SignupFormInput";
import SearchSelectDropdown from "@/Components/Forms/SearchSelectDropdown";
import Image from "next/image";
import MultiSelect from "@/Components/MultiSelect";
import CompanySelect from "@/Components/CompanySelect";
import "react-datepicker/dist/react-datepicker.css";
import ExperienceForm from "@/Components/Forms/ExperienceForm";
import EducationForm from "@/Components/Forms/EducationForm";
import axios from "axios";
import ExperienceCard from "@/Components/ExperienceCard";
import { FaPlus } from "react-icons/fa";
import EducationCard from "@/Components/EducationCard";
import Swal from "sweetalert2";
import ImgUpload from "@/Components/ImgUpload";

const LocationTags = locOpns.countries;
type AboutSchema = z.infer<typeof aboutSchema>;
type SocialProfilesSchema = z.infer<typeof socialProfilesSchema>;
// type ExperienceSchema = z.infer<typeof experienceSchema>;
type EducationSchema = z.infer<typeof educationSchema>;

type GeneralSchema = z.infer<typeof generalSchema>;

type About = {
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_picture: File | null;
  profile_picture_url: string;
  location: string; // seeker
  designation?: string; // hirer
  years_of_experience: string; // seeker
  company_name: string; // hirer
  skillsArray: string[]; // both
  // primary_role: string;
  product_service: string; // hirer
  company_stage: string; // hirer
  company_description?: string; // hirer
  bio?: string; // seeker
};

type WorkExperience = {
  company_name: string;
  title: string;
  start_date: Date;
  end_date: Date | null;
  currently_working: boolean;
  description: string;
};

type Education = {
  college_name: string;
  year_of_graduation: number;
  degree: string;
  gpa: number;
  major: string;
};

type General = {
  achievements?: string;
  pronouns?: string;
  pronounsSelfdescribe?: string;
  gender?: string;
  genderSelfdescribe?: string;
  race_ethnicity?: string[];
};

const EditProfilePage = () => {
  const [aboutFormData, setAboutFormData] = useState<About>({
    profile_picture: null,
    location: "",
    years_of_experience: "",
    profile_picture_url: "",
    company_name: "",
    skillsArray: [],
    product_service: "",
    company_stage: "",
  });

  const [generalFormData, setGeneralFormData] = useState<General>({
    achievements: "",
    gender: "",
    pronouns: "",
    // pronounsSelfdescribe: "",
    // genderSelfdescribe: "",
    race_ethnicity: [],
  });

  const [workExperienceArray, setWorkExperienceArray] = useState<
    WorkExperience[]
  >([]);
  const [educationArray, setEducationArray] = useState<Education[]>([]);

  const [aboutReset, setAboutReset] = useState(false);
  const [isDirty, setIsFormDirty] = useState(false);
  const [isHirer, setIsHirer] = useState(false);
  const [expAddButton, setExpAddButton] = useState(true);
  const [educationAddButton, setEducationAddButton] = useState(true);

  const {
    register: aboutRegister,
    handleSubmit: handleAboutSubmit,
    formState: { errors: aboutErrors },
    setValue: setAboutValue,
  } = useForm<AboutSchema>({
    mode: "onChange",
    resolver: zodResolver(aboutSchema),
  });

  const {
    register: socialProfilesRegister,
    handleSubmit: socialProfilesHandleSubmit,
    formState: { errors: socialProfilesErrors },
    setValue,
  } = useForm<SocialProfilesSchema>({
    mode: "onChange",
    resolver: zodResolver(socialProfilesSchema),
  });

  const {
    register: generalRegister,
    handleSubmit: generalHandleSubmit,
    formState: { errors: generalErrors },
    watch,
  } = useForm<GeneralSchema>({
    mode: "onBlur",
    resolver: zodResolver(generalSchema),
  });

  const handleAboutChange = (key: string, value: string | boolean) => {
    setAboutFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSkillChange = (skills: string[]) => {
    setAboutFormData((prevState) => ({
      ...prevState,
      skillsArray: skills,
    }));
    setIsFormDirty(true);
  };

  const handleGeneralChange = (key: string, value: string | string[]) => {
    setGeneralFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    console.log("experience array", workExperienceArray);
  }, [workExperienceArray]);

  // useEffect(() => {
  //   console.log("submittting work experience");
  //   onSubmit(workExperienceArray);
  // }, [workExperienceArray]);

  // useEffect(() => {
  //   console.log("submittting education");
  //   onSubmit(educationArray);
  // }, [educationArray]);

  useEffect(() => {
    console.log("education array", educationArray);
  }, [educationArray]);

  const handleAboutFormSubmit = (data: AboutSchema) => {
    console.log("submitting about form");
    console.log(data); //To add to backend
    console.log(aboutFormData); //To add to backend
    const newFormData = {
      ...aboutFormData,
      ...data,
    };
    onSubmit(newFormData);
  };

  const handleAboutFormReset = () => {
    setAboutReset(true);
    console.log("resetting about form");
    setAboutFormData({
      profile_picture: null,
      location: "",
      years_of_experience: "",
      company_name: "",
      skillsArray: [],
      product_service: "",
      company_stage: "",
      profile_picture_url: "",
    });
    console.log(aboutFormData);
  };

  const socialProfilesFormSubmit = (data: SocialProfilesSchema) => {
    console.log("submitting social profiles form");
    console.log(data); //To add to backend
    onSubmit(data);
  };

  const socialProfilesFormReset = () => {
    console.log("resetting social profiles form");
  };

  const handleGeneralFormSubmit = (data: GeneralSchema) => {
    console.log("submitting general form");
    console.log(data);
    console.log(generalFormData);
    const newFormData = {
      ...generalFormData,
      ...data,
    };
    onSubmit(newFormData);
  };

  const handleGeneralFormReset = () => {
    console.log("resetting general form");
    setGeneralFormData({
      pronouns: "",
      pronounsSelfdescribe: "",
      gender: "",
      genderSelfdescribe: "",
    });
  };

  const handleExpSubmit = (data: WorkExperience[]) => {
    setWorkExperienceArray(data);
    onSubmit(data);
  };

  const handleEduSubmit = (data: Education[]) => {
    setEducationArray(data);
    onSubmit(data);
  };

  // const onSubmit = async (data: any) => {
  //   // console.log(data);
  //   const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  //   const access_token = localStorage.getItem("access_token");
  //   try {
  //     const response = await axios.put(
  //       `${baseurl}/accounts/profile/`,
  //       isHirer
  //         ? {
  //             ...data,
  //             account_type: isHirer ? "job_hirer" : "job_seeker",
  //             company_description: data.textarea,
  //           }
  //         : {
  //             ...data,
  //             account_type: isHirer ? "job_hirer" : "job_seeker",
  //             bio: data.textarea,
  //             work_experience_details: workExperienceArray,
  //             // education_details: educationArray,
  //           },
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Profile updated successfully",
  //       text: "Your profile has been updated successfully.",
  //     });
  //   } catch (error: any) {
  //     console.log(error.response.data || error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Cannot update profile",
  //       text: error.response.data || "Please try again.",
  //     });
  //   }
  // };

  const onSubmit = async (data: any) => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const access_token = localStorage.getItem("access_token");

    const formData = new FormData();

    // Append form data fields
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // If the key is 'profile_picture' and it's a file, append it as a file
        if (key === "profile_picture" && data[key] instanceof File) {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    // Append additional fields
    formData.append("account_type", isHirer ? "job_hirer" : "job_seeker");

    if (isHirer) {
      formData.append("company_description", data.textarea);
    } else {
      formData.append("bio", data.textarea);
      // formData.append("work_experience_details", JSON.stringify(workExperienceArray));
      // formData.append("education_details", JSON.stringify(educationArray)); // Uncomment if you have educationArray
    }

    try {
      const response = await axios.put(
        `${baseurl}/accounts/profile/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Profile updated successfully",
        text: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      console.log(error.response?.data || error);
      Swal.fire({
        icon: "error",
        title: "Cannot update profile",
        text: error.response?.data || "Please try again.",
      });
    }
  };

  // const experienceFormSubmit = (data: any) => {
  //   console.log("submitting experience form");
  //   console.log(educationFormData);
  // };

  // const experienceFormReset = () => {
  //   console.log("resetting experience form");
  //   setWorkExperienceFormData({
  //     company: "",
  //     title: "",
  //     start_date: "",
  //     end_date: "",
  //     is_working: false,
  //     description: "",
  //   });
  // };

  const defaultPostEditFormInputCls =
    "bg-gray-100 mt-1 p-2 rounded border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic placeholder-gray-400";
  const socialProfilesCls =
    "peer py-3 px-4 ps-11 block w-full bg-gray-100 rounded-lg outline-none disabled:opacity-50 disabled:pointer-events-none placeholder:text-gray-400";

  useEffect(() => {
    async function fetchData() {
      const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
      const access_token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(`${baseurl}/accounts/profile`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setIsHirer(response.data.account_type === "job_hirer");
        setAboutFormData({
          profile_picture: null,
          location: response.data.location,
          years_of_experience: "0",
          //remove yoe for hirer
          company_name: response.data.company_name,
          skillsArray:
            response.data.account_type === "job_hirer"
              ? [] // to be added in backend as hiring_skills
              : response.data.technical_skills.split(","), //not present
          product_service: response.data.product_service,
          company_stage: response.data.company_stage,
          profile_picture_url: response.data.profile_picture,
        });
        console.log("Achievements: ", response.data.achievements);

        setGeneralFormData({
          achievements: response.data.achievements, //doesn't exist for hirer
          pronouns: response.data.pronouns,
          gender: response.data.gender,
          // race_ethnicity: response.data.race_ethnicity
        });
        setWorkExperienceArray(response.data.work_experience_details);
        setEducationArray(response.data.education_details);
        setValue("website", response.data.website);
        setValue("linkedin", response.data.linkedin);
        setValue("github", response.data.github);
        setValue("telegram", response.data.telegram);
        setAboutValue("first_name", response.data.first_name);
        setAboutValue("last_name", response.data.last_name);
        setAboutValue("email", response.data.email);
        setAboutValue("designation", response.data.designation);
        setAboutValue(
          "textarea",
          response.data.company_description || response.data.bio
        );
      } catch (error: any) {
        console.log(error.response?.data || error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex-1 bg-white min-h-screen ps-20 ">
      <div className="mx-auto my-14 max-w-5xl space-y-10 border-2 rounded-md p-6">
        <form
          className="grid md:grid-cols-[30%,1fr] max-md:grid-cols-1 gap-x-6 gap-y-4"
          onSubmit={handleAboutSubmit(handleAboutFormSubmit)}
        >
          <div className="flex flex-col items-start gap-y-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-800 mb-2">
                About
              </h1>
              <p className="text-sm">
                Tell us more about youself so we could bring relevant
                inforamtion to you
              </p>
            </div>

            <div className="w-full flex justify-center">
              {/* <Image
                src="/assets/images/default-profile.webp"
                alt="Profile Image"
                width={100}
                height={100}
                className="rounded-full w-40 h-40 object-contain mx-auto"
              /> */}
              <ImgUpload
                keyy="profile_picture"
                onChange={handleAboutChange}
                val={aboutFormData.profile_picture_url}
                resetflg={aboutReset}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col sm:flex-row flex-1 gap-x-6 gap-y-4 items-center">
              <SignupFormInput
                id="first_name"
                name="first_name"
                type="text"
                label="First Name"
                register={aboutRegister}
                placeholder="John"
                req={false}
                cls={defaultPostEditFormInputCls}
                errors={aboutErrors.first_name}
              />

              <SignupFormInput
                id="last_name"
                name="last_name"
                type="text"
                label="Last Name"
                register={aboutRegister}
                placeholder="Doe"
                req={false}
                cls={defaultPostEditFormInputCls}
                errors={aboutErrors.last_name}
              />
            </div>

            <SignupFormInput
              id="email"
              name="email"
              type="email"
              label="Email"
              register={aboutRegister}
              placeholder="example@gmail.com"
              req={false}
              cls={defaultPostEditFormInputCls}
              errors={aboutErrors.email}
            />

            <div className="flex flex-col sm:flex-row gap-x-6 gap-y-4 items-center">
              {isHirer ? (
                <div className="flex-1 max-sm:w-full">
                  <SignupFormInput
                    id="designation"
                    name="designation"
                    type="text"
                    label="Designation"
                    register={aboutRegister}
                    placeholder="Eg: HR"
                    req={true}
                    cls={defaultPostEditFormInputCls}
                    errors={aboutErrors.designation}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center w-full">
                  <SearchSelectDropdown
                    selected={aboutFormData.location}
                    label="Location"
                    name="location"
                    labelcls="text-gray-500 font-semibold relative flex items-center gap-2"
                    placeholder="Location"
                    cls={defaultPostEditFormInputCls}
                    tags={LocationTags}
                    onSingleChange={handleAboutChange}
                    multiple={false}
                    req={true}
                  />
                </div>
              )}

              {isHirer ? (
                <div className="flex-1 max-sm:w-full">
                  <label className="text-gray-500 font-semibold block mb-1 me-1.5">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <CompanySelect
                    handle={(val: string) => {
                      handleAboutChange("company_name", val);
                    }}
                    val={aboutFormData.company_name}
                    reset={aboutReset}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center w-full">
                  <SearchSelectDropdown
                    selected={aboutFormData.years_of_experience}
                    label="Years of Experience"
                    name="years_of_experience"
                    labelcls="text-gray-500 font-semibold relative flex items-center gap-2"
                    placeholder="Experience"
                    cls={defaultPostEditFormInputCls}
                    tags={ExperienceTags}
                    onSingleChange={handleAboutChange}
                    multiple={false}
                    req={false}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <SearchSelectDropdown
                existingTags={aboutFormData.skillsArray}
                label={isHirer ? "Looking for" : "Skills"}
                name={isHirer ? "looking_for" : "skills"}
                labelcls="text-gray-500 font-semibold relative flex items-center gap-2"
                placeholder={isHirer ? "Looking for" : "Skills"}
                cls={defaultPostEditFormInputCls}
                tags={SkillTags}
                onChange={handleSkillChange}
                multiple={true}
                req={false}
              />
            </div>

            {isHirer && (
              <div className="flex flex-col sm:flex-row gap-x-6 gap-y-4 items-center">
                <div className="flex flex-col justify-center w-full">
                  <SearchSelectDropdown
                    selected={aboutFormData.product_service}
                    label="Product/Service based"
                    name="product_service"
                    labelcls="text-gray-500 font-semibold relative flex items-center gap-2"
                    placeholder="Eg: Product based"
                    cls={defaultPostEditFormInputCls}
                    tags={["Product based", "Service based", "Hybrid"]}
                    onSingleChange={handleAboutChange}
                    multiple={false}
                  />
                </div>

                <div className="flex flex-col justify-center w-full">
                  <SearchSelectDropdown
                    selected={aboutFormData.company_stage}
                    label="Company Stage"
                    name="company_stage"
                    labelcls="text-gray-500 font-semibold relative flex items-center gap-2"
                    placeholder="Eg: Startup"
                    cls={defaultPostEditFormInputCls}
                    tags={companyType}
                    onSingleChange={handleAboutChange}
                    multiple={false}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col w-full gap-1">
              <label
                htmlFor={isHirer ? "company_description" : "bio"}
                className="w-full text-gray-500 text-base font-semibold"
              >
                {isHirer ? "Company Description" : "Bio"}
                <span className="text-red-500 ms-1.5">*</span>
              </label>
              <textarea
                {...aboutRegister("textarea")}
                name="textarea"
                id="textarea"
                rows={6}
                className="bg-gray-100 border border-gray-300 text-gray-800 rounded w-full placeholder:text-sm px-4 py-3 min-h-28 max-h-60 placeholder:italic placeholder-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                placeholder={
                  isHirer
                    ? "Tell us about your company"
                    : "Tell us about yourself"
                }
              />
              <span
                className={`text-red-500 text-xs font-semibold  ${aboutErrors.textarea ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 top-full`}
              >
                {aboutErrors.textarea?.message}
              </span>
            </div>
          </div>

          <div className="md:col-start-2 md:col-span-1 justify-self-center space-x-4 pt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
            >
              Save
            </button>

            <button
              className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
              type="reset"
              onClick={handleAboutFormReset}
            >
              Reset
            </button>
          </div>
        </form>

        <form
          className="grid md:grid-cols-[30%,1fr] grid-cols-1 gap-x-6 gap-y-4"
          onSubmit={socialProfilesHandleSubmit(socialProfilesFormSubmit)}
        >
          <h1>Social Profiles</h1>

          <div className="flex flex-col gap-y-4">
            <LoginFormInput
              id="website"
              label="Website"
              type="url"
              register={socialProfilesRegister}
              errors={socialProfilesErrors.website}
              name="website"
              placeholder="https://"
              icon={<FaGlobe />}
              req={true}
              cls={
                socialProfilesCls +
                "  focus:outline-gray-700 focus:ring-gray-700"
              }
            />
            <LoginFormInput
              id="linkedin"
              label="LinkedIn"
              type="url"
              register={socialProfilesRegister}
              errors={socialProfilesErrors.linkedin}
              name="linkedin"
              placeholder="https://linkedin.com/in/username"
              icon={<FaLinkedin />}
              req={true}
              cls={
                socialProfilesCls +
                "  focus:outline-blue-700 focus:ring-blue-700"
              }
            />
            <LoginFormInput
              id="github"
              label="GitHub"
              type="url"
              register={socialProfilesRegister}
              errors={socialProfilesErrors.github}
              name="github"
              placeholder="https://github.com/username"
              icon={<FaGithub />}
              req={true}
              cls={
                socialProfilesCls +
                "  focus:outline-purple-500 focus:ring-purple-500"
              }
            />
            <LoginFormInput
              id="telegram"
              label="Telegram"
              type="url"
              register={socialProfilesRegister}
              errors={socialProfilesErrors.telegram}
              name="telegram"
              placeholder="https://t.me/username"
              icon={<FaTelegram />}
              req={true}
              cls={
                socialProfilesCls +
                "  focus:outline-blue-500 focus:ring-blue-500"
              }
            />
          </div>

          <div className="md:col-start-2 md:col-span-1 justify-self-center space-x-4 pt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
            >
              Save
            </button>

            <button
              type="reset"
              onClick={socialProfilesFormReset}
              className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>
        </form>

        {!isHirer && (
          <>
            <div className="grid md:grid-cols-[30%,1fr] grid-cols-1 gap-x-6 gap-y-4">
              <div>
                <h1>Experience</h1>
                <p className="text-sm">Which companies have you worked with?</p>
              </div>

              <div className="flex flex-col items-start w-full gap-4">
                {workExperienceArray.length > 0 &&
                  workExperienceArray.map((workExperience, index) => (
                    <ExperienceCard
                      key={index}
                      index={index}
                      company_name={workExperience.company_name}
                      title={workExperience.title}
                      start_date={workExperience.start_date}
                      end_date={workExperience.end_date}
                      currently_working={workExperience.currently_working}
                      description={workExperience.description}
                      // prop drill
                      setWorkExperienceArray={handleExpSubmit}
                      defaultPostEditFormInputCls={defaultPostEditFormInputCls}
                    />
                  ))}

                {expAddButton ? (
                  <div className="flex items-center justify-start">
                    <button
                      type="button"
                      onClick={() => setExpAddButton(false)}
                      className="text-blue-500 hover:text-blue-700 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 font-medium rounded px-5 py-2.5 text-center flex justify-center items-center gap-2"
                    >
                      <FaPlus className="ms-2" />
                      Add Work Experience
                    </button>
                  </div>
                ) : (
                  <ExperienceForm
                    setWorkExperienceArray={handleExpSubmit}
                    defaultPostEditFormInputCls={defaultPostEditFormInputCls}
                    dropdown={setExpAddButton}
                  />
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-[30%,1fr] grid-cols-1 gap-x-6 gap-y-4">
              <div>
                <h1>Education</h1>
                <p className="text-sm">
                  Tell us more about yourself so we could bring relevant
                  information to you.
                </p>
              </div>

              <div className="flex flex-col items-start w-full gap-4">
                {educationArray.length > 0 &&
                  educationArray.map((education, index) => (
                    <EducationCard
                      key={index}
                      index={index}
                      college_name={education.college_name}
                      year_of_graduation={education.year_of_graduation}
                      degree={education.degree}
                      gpa={education.gpa}
                      major={education.major}
                      // prop drill
                      setEducationArray={handleEduSubmit}
                      defaultPostEditFormInputCls={defaultPostEditFormInputCls}
                    />
                  ))}

                {educationAddButton ? (
                  <div className="flex items-center justify-start">
                    <button
                      type="button"
                      onClick={() => setEducationAddButton(false)}
                      className="text-blue-500 hover:text-blue-700 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 font-medium rounded px-5 py-2.5 text-center flex justify-center items-center gap-2"
                    >
                      <FaPlus className="ms-2" />
                      Add Education Qualifications
                    </button>
                  </div>
                ) : (
                  <EducationForm
                    setEducationArray={handleEduSubmit}
                    defaultPostEditFormInputCls={defaultPostEditFormInputCls}
                    dropdown={setEducationAddButton}
                  />
                )}
              </div>
            </div>
          </>
        )}

        {!isHirer && (
          <form
            className="grid md:grid-cols-[30%,1fr] grid-cols-1 gap-x-6 gap-y-4"
            onSubmit={generalHandleSubmit(handleGeneralFormSubmit)}
          >
            <h1>
              <label
                htmlFor="achievements"
                className="w-full text-gray-700 text-base font-semibold"
              >
                Achievements
              </label>
            </h1>

            <textarea
              name="achievements"
              id="achievements"
              rows={6}
              value={generalFormData.achievements}
              className="bg-gray-100 border border-gray-300 text-gray-800 rounded w-full placeholder:text-sm px-4 py-3 min-h-28 max-h-60 placeholder:italic placeholder-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              placeholder="It's OK to brag - e.g. I launched 3 successful Facebook apps which in total reached 2M+ users and generated $100k+ in revenue. I built everything from the front-end to the back-end and everything in between."
              onChange={(e) =>
                handleGeneralChange("achievements", e.target.value)
              }
            />

            {generalFormData.achievements && (
              <div className="md:col-start-2 md:col-span-1 justify-self-center space-x-4 pt-4">
                <button
                  type="submit"
                  // onClick={handleGeneralFormSubmit}
                  onClick={() => {
                    console.log(generalFormData.achievements);
                  }}
                  className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
                >
                  Save
                </button>

                <button
                  type="reset"
                  onClick={() => handleGeneralChange("achievements", "")}
                  className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
                >
                  Reset
                </button>
              </div>
            )}
          </form>
        )}

        <form
          className="grid md:grid-cols-[30%,1fr] grid-cols-1 gap-x-6 gap-y-4"
          onSubmit={generalHandleSubmit(handleGeneralFormSubmit)}
        >
          <h1>Identity</h1>

          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col sm:flex-row gap-x-6 gap-y-4 items-center">
              <div className="flex flex-col justify-center w-full">
                <SearchSelectDropdown
                  label="Pronouns"
                  name="pronouns"
                  labelcls="text-gray-500 text-base font-semibold relative flex items-center gap-2"
                  placeholder="Pronouns"
                  cls={defaultPostEditFormInputCls}
                  tags={["He/Him", "She/Her", "They/Them", "Self-describe"]}
                  onSingleChange={handleGeneralChange}
                  multiple={false}
                  selected={generalFormData.pronouns}
                />
              </div>

              <div className="flex flex-col justify-center w-full">
                <SearchSelectDropdown
                  label="Gender"
                  name="gender"
                  labelcls="text-gray-500 text-base font-semibold relative flex items-center gap-2"
                  placeholder="Eg: Male"
                  cls={defaultPostEditFormInputCls}
                  tags={[
                    "Male",
                    "Female",
                    "Trans",
                    "Prefer no to say",
                    "Self-describe",
                  ]}
                  onSingleChange={handleGeneralChange}
                  multiple={false}
                  selected={generalFormData.gender}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 items-center">
              {generalFormData.pronouns == "Self-describe" && (
                <div className="flex flex-col justify-center w-full">
                  <SignupFormInput
                    id="pronouns_self_describe"
                    name="pronouns_self_describe"
                    type="text"
                    label="Describe your pronouns"
                    register={generalRegister}
                    placeholder=""
                    req={false}
                    cls={defaultPostEditFormInputCls}
                    errors={generalErrors.pronouns_self_describe}
                  />
                </div>
              )}

              {generalFormData.gender == "Self-describe" && (
                <div className="flex flex-col justify-center w-full col-start-2">
                  <SignupFormInput
                    id="gender_self_describe"
                    name="gender_self_describe"
                    type="text"
                    label="Describe your gender"
                    register={generalRegister}
                    placeholder=""
                    req={false}
                    cls={defaultPostEditFormInputCls}
                    errors={generalErrors.gender_self_describe}
                  />
                </div>
              )}
            </div>

            <MultiSelect
              options={ethinicity}
              onSelectionChange={(val: string[]) => {
                handleGeneralChange("race_ethnicity", val);
              }}
              val={generalFormData.race_ethnicity}
            />
          </div>

          <div className="md:col-start-2 md:col-span-1 justify-self-center space-x-4 pt-4">
            <button
              type="submit"
              // onClick={handleGeneralFormSubmit}
              // onClick={() => {
              //   console.log(generalFormData);
              // }}
              className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
            >
              Save
            </button>

            <button
              type="reset"
              onClick={handleGeneralFormReset}
              className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
