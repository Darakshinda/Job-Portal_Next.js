"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  aboutSchema,
  generalSchema,
  socialProfilesSchema,
} from "@/lib/validator";
import {
  FaPlus,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaGlobe,
} from "react-icons/fa";
import locOpns from "@/constants/data/location.json";
import ExperienceTags from "@/constants/data/experience.json";
import companyType from "@/constants/data/companytype.json";
import SkillTags from "@/constants/data/skillTags.json";
import ethnicity from "@/constants/data/ethnicity.json";
import LoginFormInput from "@/Components/Forms/Inputs/LoginFormInput";
import SignupFormInput from "@/Components/Forms/Inputs/SignupFormInput";
import CompanySelect from "@/Components/Forms/Inputs/apiLinked/CompanySelect";
import SearchSelectDropdown from "@/Components/Forms/Custom/SearchSelectDropdown";
import PdfUploadForm from "@/Components/Forms/Custom/ResumeUpload";
import ImgUpload from "@/Components/Forms/Custom/ImgUpload";
import MultiSelect from "@/Components/Forms/Custom/MultiSelect";
import ExperienceForm from "@/Components/Forms/ExperienceForm";
import EducationForm from "@/Components/Forms/EducationForm";
import ExperienceCard from "@/Components/Cards/ExperienceCard";
import EducationCard from "@/Components/Cards/EducationCard";
import Spinner from "@/Components/Loaders/Spinner";
import { swalFailed, swalSuccess } from "@/lib/helpers/swal";
import "react-datepicker/dist/react-datepicker.css";

const LocationTags = locOpns.countries;
type AboutSchema = z.infer<typeof aboutSchema>;
type SocialProfilesSchema = z.infer<typeof socialProfilesSchema>;
type GeneralSchema = z.infer<typeof generalSchema>;

type About = {
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_picture: File | null;
  resume: File | null;
  profile_picture_url: string;
  location: string; // seeker
  designation?: string; // hirer
  years_of_experience: string; // seeker
  company_name: string; // hirer
  skillsArray: string[]; // seeker
  // primary_role: string;
  product_service: string; // hirer
  company_stage: string; // hirer
  company_description?: string; // hirer
  bio?: string; // seeker
  resume_url: string; //seeker
};

type WorkExperience = {
  company_name: string;
  title: string;
  start_date: string;
  end_date: string | null;
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
  pronouns: string;
  gender: string;
  pronounsSelfDescribe?: string;
  genderSelfDescribe?: string;
  race_ethnicity: string[];
};

const EditProfilePage = () => {
  const [initialAboutFormData, setInitialAboutFormData] = useState<About>({
    profile_picture: null,
    location: "",
    years_of_experience: "",
    profile_picture_url: "",
    company_name: "",
    skillsArray: [],
    product_service: "",
    company_stage: "",
    resume: null,
    resume_url: "",
  });
  const [zodAboutFormData, setZodAboutFormData] = useState<AboutSchema>({
    first_name: "",
    last_name: "",
    email: "",
    designation: null,
    textarea: "",
  });

  const [aboutFormData, setAboutFormData] = useState<About>({
    profile_picture: null,
    location: "",
    years_of_experience: "",
    profile_picture_url: "",
    company_name: "",
    skillsArray: [],
    product_service: "",
    company_stage: "",
    resume: null,
    resume_url: "",
  });

  const [zodSocialProfilesFormData, setZodSocialProfilesFormData] =
    useState<SocialProfilesSchema>({
      linkedin: "",
      github: "",
      website: "",
      telegram: "",
    });

  const [initialGeneralFormData, setInitialGeneralFormData] = useState<General>(
    {
      pronouns: "",
      gender: "",
      race_ethnicity: [],
    }
  );
  const [zodGeneralFormData, setZodGeneralFormData] = useState<GeneralSchema>({
    achievements: "",
    gender_self_describe: null,
    pronouns_self_describe: null,
  });

  const [generalFormData, setGeneralFormData] = useState<General>({
    pronouns: "",
    gender: "",
    race_ethnicity: [],
  });

  const [workExperienceArray, setWorkExperienceArray] = useState<
    WorkExperience[]
  >([]);
  const [educationArray, setEducationArray] = useState<Education[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isHirer, setIsHirer] = useState(false);
  const [profilePicChanged, setProfilePicChanged] = useState(false);
  const [resumeChanged, setResumeChanged] = useState(false);
  const [aboutFormDirty, setAboutFormDirty] = useState(false);
  const [aboutReset, setAboutReset] = useState(false);
  const [expAddButton, setExpAddButton] = useState(true);
  const [educationAddButton, setEducationAddButton] = useState(true);
  const [identityFormDirty, setIdentityFormDirty] = useState(false);

  const {
    control: aboutControl,
    handleSubmit: handleAboutSubmit,
    formState: { errors: aboutErrors, isDirty: aboutIsDirty },
    reset: aboutFieldReset,
  } = useForm<AboutSchema>({
    mode: "onChange",
    resolver: zodResolver(aboutSchema),
    defaultValues: zodAboutFormData,
  });

  const {
    register: socialProfilesRegister,
    handleSubmit: socialProfilesSubmit,
    formState: { errors: socialProfilesErrors, isDirty: socialProfilesIsDirty },
    reset: socialProfilesReset,
  } = useForm<SocialProfilesSchema>({
    mode: "onChange",
    resolver: zodResolver(socialProfilesSchema),
    defaultValues: zodSocialProfilesFormData,
  });

  const {
    control: generalControl,
    handleSubmit: generalHandleSubmit,
    formState: { errors: generalErrors, isDirty: generalIsDirty },
    reset: generalFieldReset,
    watch: generalFormWatch,
  } = useForm<GeneralSchema>({
    mode: "onChange",
    resolver: zodResolver(generalSchema),
    defaultValues: {
      pronouns_self_describe: "",
      gender_self_describe: "",
    },
  });

  const handleAboutChange = (key: string, value: string | boolean) => {
    setAboutFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    setAboutFormDirty(true);
  };

  const handleSkillChange = (skills: string[]) => {
    setAboutFormData((prevState) => ({
      ...prevState,
      skillsArray: skills,
    }));
    setAboutFormDirty(true);
  };

  const handleGeneralChange = (key: string, value: string | string[]) => {
    setGeneralFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    setIdentityFormDirty(true);
  };

  const handleAboutFormSubmit = (data: AboutSchema) => {
    // console.log("submitting about form");
    // console.log(data); //To add to backend
    // console.log(aboutFormData); //To add to backend
    const totalFormData = {
      ...aboutFormData,
      ...data,
    };
    onSubmit(totalFormData);
  };

  const handleAboutFormReset = () => {
    setAboutReset(true);
    // console.log("resetting about form");
    setAboutFormData(initialAboutFormData);
    aboutFieldReset(zodAboutFormData);
    // console.log(aboutFormData);
  };

  const handleSocialProfilesFormSubmit = (data: SocialProfilesSchema) => {
    // console.log("submitting social profiles form");
    // console.log(data); //To add to backend
    onSubmit(data);
  };

  const handleSocialProfilesFormReset = () => {
    // console.log("resetting social profiles form");
    socialProfilesReset(zodSocialProfilesFormData);
  };

  const handleGeneralFormSubmit = (data: GeneralSchema) => {
    // console.log("submitting general form");
    // console.log(data);
    // console.log(generalFormData);
    const totalFormData = {
      ...generalFormData,
      ...data,
    };
    onSubmit(totalFormData);
  };

  const handleGeneralFormReset = () => {
    // console.log("resetting general form");
    setGeneralFormData(initialGeneralFormData);
    setZodGeneralFormData(zodGeneralFormData);
  };

  const yoeStringToNumber = (yoe: string): string => {
    if (yoe === "Less than 1 year") {
      return "0";
    }
    const match = yoe.match(/\d+/);
    return match ? match[0] : "0";
  };

  const onSubmitArrays = async (
    updatedWorkExperienceArray?: WorkExperience[],
    updatedEducationArray?: Education[]
  ) => {
    // console.log(updatedWorkExperienceArray);
    // console.log(updatedEducationArray);
    const workExperienceToSubmit =
      updatedWorkExperienceArray ?? workExperienceArray;
    const educationToSubmit = updatedEducationArray ?? educationArray;

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const access_token = localStorage.getItem("access_token");
    try {
      const response = await axios.put(
        `${baseurl}/accounts/profile/`,
        {
          work_experience_details: workExperienceToSubmit,
          education_details: educationToSubmit,
          account_type: isHirer ? "job_hirer" : "job_seeker", // this is only for seeker
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      // console.log(response.data);
      swalSuccess({ title: "Profile updated successfully", type: "toast" });
    } catch (error: any) {
      console.log(error.response?.data || error);
      swalFailed({
        title: "Profile update failed. Please try again",
        type: "toast",
      });
    }
  };

  const onSubmit = async (data: any) => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const access_token = localStorage.getItem("access_token");

    const formData = new FormData();

    if (profilePicChanged && aboutFormData.profile_picture) {
      formData.append("profile_picture", aboutFormData.profile_picture);
    }

    if (resumeChanged && aboutFormData.resume) {
      formData.append("resume", aboutFormData.resume);
    }

    let skills = "";
    for (var i = 0; i < aboutFormData.skillsArray.length; i++) {
      skills += aboutFormData.skillsArray[i];
      if (i !== aboutFormData.skillsArray.length - 1) {
        skills += ",";
      }
    }

    // Append form data fields
    Object.keys(data).forEach((key) => {
      if (
        key !== "profile_picture" &&
        key !== "years_of_experience" &&
        key !== "skillsArray" &&
        key !== "work_experience_details" &&
        key !== "education_details" &&
        key !== "resume"
      ) {
        formData.append(key, data[key]);
      }
      if (key === "skillsArray") {
        if (isHirer) {
          formData.append("hiring_skills", skills);
        } else {
          formData.append("technical_skills", skills);
        }
      }
    });

    if (isHirer) {
      formData.append("company_description", data.textarea);
    } else {
      formData.append("bio", data.textarea);
    }
    formData.append("account_type", isHirer ? "job_hirer" : "job_seeker");

    // console.log("FormData: ", formData);

    // Append additional fields
    // for (var i = 0; i < generalFormData.race_ethnicity!.length; i++) {
    //   races += generalFormData.race_ethnicity![i];
    //   if (i !== generalFormData.race_ethnicity!.length - 1) {
    //     races += ",";
    //   }
    // }

    // formData.append("race_ethnicity", races);
    // formData.append("work_experience_details", JSON.stringify(workExperienceArray));
    // formData.append("education_details", JSON.stringify(educationArray)); // Uncomment if you have educationArray

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

      const responsetwo = await axios.put(
        `${baseurl}/accounts/profile/`,
        {
          years_of_experience: yoeStringToNumber(
            aboutFormData.years_of_experience
          ),
          account_type: isHirer ? "job_hirer" : "job_seeker",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      ); //This is not the right way to do but formData object doesn't take number data type

      // console.log(response.data);
      // console.log(responsetwo.data);

      swalSuccess({ title: "Profile updated successfully", type: "toast" });
    } catch (error: any) {
      // console.log(error.response?.data || error);
      if (error.response?.data.profile_picture) {
        swalFailed({
          title: "Please upload a valid image file",
          type: "toast",
        });
      } else {
        swalFailed({
          title: "Profile update failed. Please try again",
          type: "toast",
        });
      }
    }
  };

  useEffect(() => {
    function yoeToString(yoe: number): string {
      if (yoe === 0) {
        return "Less than 1 year";
      } else if (yoe === 1) {
        return "1 year";
      } else if (yoe === 10) {
        return "10+ years";
      } else {
        return `${yoe} years`;
      }
    }

    const fetchData = async () => {
      const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
      const access_token = localStorage.getItem("access_token");

      try {
        const response = await axios.get(`${baseurl}/accounts/profile`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setIsHirer(response.data.account_type === "job_hirer");

        const loadedAboutFormData = {
          profile_picture: null,
          location: response.data.location,
          years_of_experience: !isHirer
            ? yoeToString(Math.floor(response.data.years_of_experience))
            : "",
          //remove yoe for hirer
          company_name: response.data.company_name,
          skillsArray:
            response.data.account_type === "job_hirer"
              ? response.data.hiring_skills?.split(",") // to be added in backend as hiring_skills
              : response.data.technical_skills.split(","), //not present
          product_service: response.data.product_service,
          company_stage: response.data.company_stage,
          profile_picture_url: response.data.profile_picture,
          resume: null, //update this
          resume_url: response.data.resume,
        };
        setInitialAboutFormData(loadedAboutFormData);
        setAboutFormData(loadedAboutFormData);

        const aboutDetails = {
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          designation:
            response.data.account_type === "job_hirer"
              ? response.data.designation
              : null,
          textarea:
            response.data.account_type === "job_hirer"
              ? response.data.company_description
              : response.data.bio,
        };
        aboutFieldReset(aboutDetails);
        setZodAboutFormData(aboutDetails);

        const socialLinks = {
          website: response.data.website,
          linkedin: response.data.linkedin,
          github: response.data.github,
          telegram: response.data.telegram,
        };
        socialProfilesReset(socialLinks);
        setZodSocialProfilesFormData(socialLinks);

        const loadedGeneralFormData = {
          pronouns: response.data.pronouns,
          gender: response.data.gender,
          race_ethnicity: response.data.race_ethnicity,
        };
        setInitialGeneralFormData(loadedGeneralFormData);
        setGeneralFormData(loadedGeneralFormData);

        const generalDetails = {
          achievements: response.data.achievements,
          pronouns_self_describe: "",
          gender_self_describe: "",
          // pronouns_self_describe: response.data.pronouns_self_describe, // to be added in backend
          // gender_self_describe: response.data.gender_self_describe, // to be added in backend
        };
        generalFieldReset(generalDetails);
        setZodGeneralFormData(generalDetails);

        setWorkExperienceArray(response.data.work_experience_details);
        setEducationArray(response.data.education_details);

        setIsLoading(false);
      } catch (error: any) {
        console.log(error.response?.data || error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("experience array", workExperienceArray);
  // }, [workExperienceArray]);

  // useEffect(() => {
  //   console.log("education array", educationArray);
  // }, [educationArray]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[100dvh]">
        <Spinner />
      </div>
    );
  }

  const defaultPostEditFormInputCls =
    "relative w-full mt-0.5 p-2 bg-gray-50 text-gray-800 rounded border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic";
  const socialProfilesCls =
    "peer py-2.5 px-4 ps-11 block w-full bg-gray-50 rounded border border-gray-300 outline-none placeholder:text-gray-400 focus-visible:ring-2";
  const manualErrorCls =
    "text-red-500 text-xs absolute font-semibold transition-all transform duration-300 absolute z-10 bg-red-50 rounded-b-md top-full px-2 py-0.5 before:content-[''] before:absolute before:w-2 before:h-2 before:bg-red-50 before:left-0 before:bottom-full after:content-[''] after:absolute after:z-10 after:w-2 after:h-2 after:bg-gray-50 after:rounded-bl-md after:border-l after:border-b after:border-gray-300 after:left-0 after:bottom-full";

  return (
    <div className="flex-1 flex justify-center bg-white min-h-screen min-[450px]:ps-[4.5rem] ">
      <div className="lg:my-14 md:my-12 sm:my-10 my-6 md:mx-4 sm:mx-2 max-w-5xl space-y-10 sm:border-2 sm:rounded-md sm:p-6 p-3">
        <form
          className="grid md:grid-cols-[30%,1fr] max-md:grid-cols-1 gap-x-6 gap-y-4"
          onSubmit={handleAboutSubmit(handleAboutFormSubmit)}
        >
          <div className="flex flex-col items-start md:gap-y-10 sm:gap-y-8 gap-y-4">
            <div>
              <h1 className="md:text-2xl text-lg font-semibold font-RadioGrotesk tracking-wide text-gray-800 mb-2">
                About
              </h1>
              <p className="text-sm">
                Tell us about your background, and we&apos;ll connect you with
                the opportunities that matter.
              </p>
            </div>

            <div className="w-full flex justify-center">
              <ImgUpload
                name="profile_picture"
                onChange={handleAboutChange}
                Url={aboutFormData.profile_picture_url}
                file={aboutFormData.profile_picture}
                setFlag={setProfilePicChanged} //changes when profile pic is changed
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
                control={aboutControl}
                placeholder="John"
                req={false}
                cls={defaultPostEditFormInputCls}
                error={aboutErrors.first_name}
              />

              <SignupFormInput
                id="last_name"
                name="last_name"
                type="text"
                label="Last Name"
                control={aboutControl}
                placeholder="Doe"
                req={false}
                cls={defaultPostEditFormInputCls}
                error={aboutErrors.last_name}
              />
            </div>

            <SignupFormInput
              id="email"
              name="email"
              type="email"
              label="Email"
              control={aboutControl}
              placeholder="example@gmail.com"
              req={false}
              cls={defaultPostEditFormInputCls}
              error={aboutErrors.email}
            />

            <div className="flex flex-col sm:flex-row gap-x-6 gap-y-4 items-center">
              {isHirer ? (
                <div className="flex-1 max-sm:w-full">
                  <SignupFormInput
                    id="designation"
                    name="designation"
                    type="text"
                    label="Designation"
                    control={aboutControl}
                    placeholder="Eg: HR"
                    req={true}
                    cls={defaultPostEditFormInputCls}
                    error={aboutErrors.designation}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center w-full relative">
                  <SearchSelectDropdown
                    selected={aboutFormData.location}
                    label="Location"
                    name="location"
                    labelCls="text-gray-500 font-semibold relative flex items-center gap-2"
                    placeholder="Location"
                    cls={defaultPostEditFormInputCls}
                    tags={LocationTags}
                    onSingleChange={handleAboutChange}
                    multiple={false}
                    req={true}
                  />
                  <span
                    className={`${manualErrorCls} ${aboutFormData.location === "" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} `}
                  >
                    Location is required
                  </span>
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
                <div className="flex flex-col justify-center w-full relative">
                  <SearchSelectDropdown
                    selected={aboutFormData.years_of_experience}
                    label="Years of Experience"
                    name="years_of_experience"
                    labelCls="text-gray-500 font-semibold relative flex items-center gap-2"
                    placeholder="Experience"
                    cls={defaultPostEditFormInputCls}
                    tags={ExperienceTags}
                    onSingleChange={handleAboutChange}
                    multiple={false}
                    req={false}
                  />
                  <span
                    className={`${manualErrorCls} ${aboutFormData.years_of_experience === "" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} `}
                  >
                    Years of experience is required
                  </span>
                </div>
              )}
            </div>

            {!isHirer && (
              <div className="flex flex-col relative">
                <SearchSelectDropdown
                  existingTags={
                    aboutFormData.skillsArray?.length > 0
                      ? aboutFormData.skillsArray
                      : []
                  }
                  label="Skills"
                  name="skills"
                  labelCls="text-gray-500 font-semibold relative flex items-center gap-2"
                  placeholder="Skills"
                  cls={defaultPostEditFormInputCls}
                  tags={SkillTags}
                  onChange={handleSkillChange}
                  multiple={true}
                  req={false}
                />
                <span
                  className={`${manualErrorCls} ${aboutFormData.skillsArray?.length === 0 ? "-translate-y-0 opacity-100" : "translate-y-full opacity-0"} `}
                >
                  Skills are required
                </span>
              </div>
            )}

            {isHirer && (
              <div className="flex flex-col sm:flex-row gap-x-6 gap-y-4 items-center">
                <div className="flex flex-col justify-center w-full relative">
                  <SearchSelectDropdown
                    selected={aboutFormData.product_service}
                    label="Product/Service based"
                    name="product_service"
                    labelCls="text-gray-500 font-semibold relative flex items-center gap-2"
                    placeholder="Eg: Product based"
                    cls={defaultPostEditFormInputCls}
                    tags={["Product based", "Service based", "Hybrid"]}
                    onSingleChange={handleAboutChange}
                    multiple={false}
                  />
                  <span
                    className={`${manualErrorCls} ${aboutFormData.product_service === "" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} `}
                  >
                    This Field is required
                  </span>
                </div>

                <div className="flex flex-col justify-center w-full relative">
                  <SearchSelectDropdown
                    selected={aboutFormData.company_stage}
                    label="Company Stage"
                    name="company_stage"
                    labelCls="text-gray-500 font-semibold relative flex items-center gap-2"
                    placeholder="Eg: Startup"
                    cls={defaultPostEditFormInputCls}
                    tags={companyType}
                    onSingleChange={handleAboutChange}
                    multiple={false}
                  />
                  <span
                    className={`${manualErrorCls} ${aboutFormData.company_stage === "" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} `}
                  >
                    Company Stage is required
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col w-full gap-1 relative">
              <label
                htmlFor={isHirer ? "company_description" : "bio"}
                className="w-full text-gray-500 text-base font-semibold"
              >
                {isHirer ? "Company Description" : "Bio"}
                <span className="text-red-500 ms-1.5">*</span>
              </label>
              <Controller
                name="textarea"
                control={aboutControl}
                render={({ field }) => (
                  <textarea
                    {...field}
                    name="textarea"
                    id="textarea"
                    rows={6}
                    className="textarea bg-gray-50 border border-gray-300 text-gray-800 rounded w-full placeholder:text-sm px-4 py-3 min-h-28 max-h-60 placeholder:italic placeholder-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                    placeholder={
                      isHirer
                        ? "Tell us about your company"
                        : "Tell us about yourself"
                    }
                  />
                )}
              />
              <span
                className={`${manualErrorCls} ${aboutErrors.textarea ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} `}
              >
                {aboutErrors.textarea?.message}
              </span>
            </div>

            <div className="flex flex-col justify-center w-full gap-1.5">
              {!isHirer && (
                <PdfUploadForm
                  setFormData={handleAboutChange}
                  formDataKey="resume"
                  setFlg={setResumeChanged}
                  val={aboutFormData.resume_url}
                />
              )}
            </div>
          </div>

          <div
            className={`md:col-start-2 md:col-span-1 justify-self-center space-x-4 pt-2 transition-all duration-300 ${
              aboutFormDirty || aboutIsDirty
                ? "translate-y-0 opacity-100 scale-100"
                : "-translate-y-full opacity-0 scale-0"
            }`}
          >
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
              disabled={
                aboutFormData.location === "" ||
                aboutFormData.skillsArray.length === 0 ||
                aboutFormData.years_of_experience === ""
              }
            >
              Save
            </button>

            <button
              type="reset"
              className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
              onClick={handleAboutFormReset}
            >
              Reset
            </button>
          </div>
        </form>

        <form
          className="grid md:grid-cols-[30%,1fr] grid-cols-1 gap-x-6 gap-y-4"
          onSubmit={socialProfilesSubmit(handleSocialProfilesFormSubmit)}
        >
          <div>
            <h1 className="md:text-2xl text-lg font-semibold font-RadioGrotesk tracking-wide text-gray-800 mb-2">
              Social Profiles
            </h1>
            <p className="text-sm text-pretty">
              Let us know more about your passions and expertise to improve your
              profile connections.
            </p>
          </div>

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
              cls={socialProfilesCls + " focus-visible:ring-gray-700"}
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
              cls={socialProfilesCls + "  focus-visible:ring-blue-700"}
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
              cls={socialProfilesCls + "  focus-visible:ring-purple-500"}
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
              cls={socialProfilesCls + "  focus-visible:ring-blue-500"}
            />
          </div>

          <div
            className={`md:col-start-2 md:col-span-1 justify-self-center space-x-4 pt-2 transition-all duration-300 ${
              socialProfilesIsDirty
                ? "translate-y-0 opacity-100 scale-100"
                : "-translate-y-full opacity-0 scale-0"
            }`}
          >
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
              disabled={
                !!(
                  socialProfilesErrors.website ||
                  socialProfilesErrors.linkedin ||
                  socialProfilesErrors.github ||
                  socialProfilesErrors.telegram
                )
              }
            >
              Save
            </button>

            <button
              type="button"
              onClick={handleSocialProfilesFormReset}
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
                <h1 className="md:text-2xl text-lg font-semibold font-RadioGrotesk tracking-wide text-gray-800 mb-2">
                  Experience
                </h1>
                <p className="text-sm">
                  Outline your professional experience and key roles.
                </p>
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
                      workExperienceArray={workExperienceArray}
                      setWorkExperienceArray={setWorkExperienceArray}
                      onSubmitArrays={onSubmitArrays}
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
                    onSubmitArrays={onSubmitArrays}
                    setWorkExperienceArray={setWorkExperienceArray}
                    defaultPostEditFormInputCls={defaultPostEditFormInputCls}
                    dropdown={setExpAddButton}
                    // workExperienceArray={workExperienceArray}
                    // onSubmitFn={onSubmitArrays}
                  />
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-[30%,1fr] grid-cols-1 gap-x-6 gap-y-4">
              <div>
                <h1 className="md:text-2xl text-lg font-semibold font-RadioGrotesk tracking-wide text-gray-800 mb-2">
                  Education
                </h1>
                <p className="text-sm">
                  Provide details about your educational qualifications.
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
                      educationArray={educationArray}
                      setEducationArray={setEducationArray}
                      onSubmitArrays={onSubmitArrays}
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
                    onSubmitArrays={onSubmitArrays}
                    setEducationArray={setEducationArray}
                    defaultPostEditFormInputCls={defaultPostEditFormInputCls}
                    dropdown={setEducationAddButton}
                    educationArray={educationArray}
                    onSubmit={() => {
                      onSubmitArrays();
                    }}
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
                className="md:text-2xl text-lg font-semibold font-RadioGrotesk tracking-wide text-gray-800 inline-block mb-2"
              >
                Achievements
              </label>

              <p className="text-sm">
                Detail the significant accomplishments that set you apart
              </p>
            </h1>

            <Controller
              name="achievements"
              control={generalControl}
              render={({ field }) => (
                <textarea
                  {...field}
                  name="achievements"
                  id="achievements"
                  rows={6}
                  className="textarea bg-gray-50 border border-gray-300 text-gray-800 rounded w-full placeholder:text-sm px-4 py-3 min-h-28 max-h-60 placeholder:italic placeholder-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                  placeholder="It's OK to brag - e.g. I launched 3 successful Facebook apps which in total reached 2M+ users and generated $100k+ in revenue. I built everything from the front-end to the back-end and everything in between."
                />
              )}
            />

            <div
              className={`md:col-start-2 md:col-span-1 justify-self-center space-x-4 pt-2 transition-all duration-300 ${
                generalIsDirty
                  ? "translate-y-0 opacity-100 scale-100"
                  : "-translate-y-full opacity-0 scale-0"
              }`}
            >
              <button
                type="submit"
                // onClick={handleGeneralFormSubmit}
                // onClick={() => {
                //   console.log(generalFormData.achievements);
                // }}
                className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
                disabled={generalFormData.achievements === ""}
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
          </form>
        )}

        <form
          className="grid md:grid-cols-[30%,1fr] grid-cols-1 gap-x-6 gap-y-4"
          onSubmit={generalHandleSubmit(handleGeneralFormSubmit)}
        >
          <div>
            <h1 className="md:text-2xl text-lg font-semibold font-RadioGrotesk tracking-wide text-gray-800 mb-2">
              Identity
            </h1>
            <p className="text-sm">
              Describe your personal and professional identity here.
            </p>
          </div>

          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col sm:flex-row gap-x-6 gap-y-4 items-center">
              <div className="flex flex-col justify-center w-full relative">
                <SearchSelectDropdown
                  label="Pronouns"
                  name="pronouns"
                  labelCls="text-gray-500 text-base font-semibold relative flex items-center gap-2"
                  placeholder="Pronouns"
                  cls={defaultPostEditFormInputCls}
                  tags={["He/Him", "She/Her", "They/Them", "Self-describe"]}
                  onSingleChange={handleGeneralChange}
                  multiple={false}
                  selected={generalFormData.pronouns}
                />
                <span
                  className={`${manualErrorCls} ${generalFormData.pronouns === "" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} `}
                >
                  Pronouns is required
                </span>
              </div>

              <div className="flex flex-col justify-center w-full relative">
                <SearchSelectDropdown
                  label="Gender"
                  name="gender"
                  labelCls="text-gray-500 text-base font-semibold relative flex items-center gap-2"
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
                <span
                  className={`${manualErrorCls} ${generalFormData.gender === "" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} `}
                >
                  Gender is required
                </span>
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
                    control={generalControl}
                    placeholder=""
                    req={true}
                    cls={defaultPostEditFormInputCls}
                    error={generalErrors.pronouns_self_describe}
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
                    control={generalControl}
                    placeholder=""
                    req={true}
                    cls={defaultPostEditFormInputCls}
                    error={generalErrors.gender_self_describe}
                  />
                </div>
              )}
            </div>

            <MultiSelect
              options={ethnicity}
              onSelectionChange={(val: string[]) => {
                handleGeneralChange("race_ethnicity", val);
              }}
              val={generalFormData.race_ethnicity}
            />
          </div>

          <div
            className={`md:col-start-2 md:col-span-1 justify-self-center space-x-4 pt-2 transition-all duration-300 ${
              generalIsDirty || identityFormDirty
                ? "translate-y-0 opacity-100 scale-100"
                : "-translate-y-full opacity-0 scale-0"
            }`}
          >
            <button
              type="submit"
              disabled={
                generalFormData.pronouns === "" ||
                generalFormData.gender === "" ||
                (generalFormData.pronouns === "Self-describe" &&
                  (generalFormWatch("pronouns_self_describe") === "" ||
                    undefined)) ||
                (generalFormData.gender === "Self-describe" &&
                  generalFormWatch("gender_self_describe") === "") ||
                !identityFormDirty
              }
              className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
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
