"use client";

import Image from "next/image";
import SignupFormInput from "./SignupFormInput";
import Link from "next/link";
import PhoneInput from "react-country-phone-input";
import "react-country-phone-input/lib/style.css";
import { FaClock } from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
import SearchSelectDropdown from "./SearchSelectDropdown";
import tagOpns from "@/constants/data/tags.json";
import ExperienceTags from "@/constants/data/experience.json";
import { Control, FieldErrors } from "react-hook-form";

type SignupFormProps = {
  type: string;
  handleSubmit: Function;
  onSubmit: Function;
  control: Control<any>;
  errors: FieldErrors;
  formData: {
    phone_number: string;
    looking_for?: string; // hirer
    hiring_skills?: string[]; // hirer
    technical_skills?: string[]; // seeker
    years_of_experience?: string; // seeker
  };
  handleChange: (key: string, value: string) => void;
  formDataErrors: {
    phone_number: string;
    years_of_experience: string;
  };
  handleSkillChange: (skills: string[]) => void;
};

const SignupForm = ({
  type,
  handleSubmit,
  onSubmit,
  control,
  errors,
  formData,
  handleChange,
  formDataErrors,
  handleSkillChange,
}: SignupFormProps) => {
  const SignupFormCls =
    "relative mt-1 p-2 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300";

  return (
    <div className="lg:h-screen min-h-screen flex flex-col lg:flex-row sm:gap-y-8 gap-y-3 bg-gray-100 bg-fixed bg-signup bg-cover bg-no-repeat bg-center">
      <div className="flex-1 flex flex-col items-center justify-center max-lg:mt-12">
        <div className="text-center lg:space-y-12 md:space-y-10 sm:space-y-8 space-y-6 px-10">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={400}
            height={400}
            priority
            className="mx-auto max-h-[250px] max-w-[250px] object-contain"
          />

          <div className="font-Insomatte tracking-wide xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-xl text-gray-800 leading-loose">
            <div className="font-bold">
              {type === "Recruiter" ? (
                <p>
                  Assemble{" "}
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    top engineering
                  </span>{" "}
                  talent to <br className="sm:block hidden" /> turn your product
                  vision into reality.
                </p>
              ) : (
                <p>
                  Unlock{" "}
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    top opportunities
                  </span>{" "}
                  and <br />
                  accelerate your career.
                </p>
              )}

              {type === "Recruiter" ? (
                <Image
                  src="/assets/images/recruiter.svg"
                  alt="logo"
                  width={400}
                  height={400}
                  priority
                  className="mx-auto max-[400px]:hidden lg:max-h-[400px] lg:max-w-[400px] object-contain"
                />
              ) : (
                <Image
                  src="/assets/images/seeker.svg"
                  alt="logo"
                  width={400}
                  height={400}
                  priority
                  className="mx-auto max-[400px]:hidden lg:max-h-[400px] lg:max-w-[400px] object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 lg:mx-6 max-lg:px-2">
        <div className="h-full border-2 rounded-xl bg-white overflow-y-auto scrollbar-hide">
          <form
            id="signup-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 sm:p-5 p-2"
          >
            <div className="md:text-3xl sm:text-2xl text-xl text-gray-800 font-RadioGrotesk leading-relaxed tracking-normal font-bold lg:mb-2">
              Connect with Top Engineers
            </div>
            <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
              <SignupFormInput
                id="first_name"
                name="first_name"
                type="text"
                label="First Name"
                control={control}
                placeholder="John"
                req={true}
                cls={SignupFormCls}
                error={errors.first_name}
              />

              <SignupFormInput
                id="last_name"
                name="last_name"
                type="text"
                label="Last Name"
                control={control}
                placeholder="Doe"
                req={true}
                cls={SignupFormCls}
                error={errors.last_name}
              />
            </div>

            <SignupFormInput
              id="email"
              name="email"
              type="email"
              label="Email"
              control={control}
              placeholder="name@personal.com"
              req={true}
              cls={SignupFormCls}
              error={errors.email}
            />

            {type === "Recruiter" && (
              <SignupFormInput
                id="working_email"
                name="working_email"
                type="email"
                label="Work Email"
                control={control}
                placeholder="name@work.com"
                req={true}
                cls={SignupFormCls}
                error={errors.working_email}
              />
            )}

            <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
              <div className="flex-1">
                <SignupFormInput
                  id="username"
                  name="username"
                  type="text"
                  label="Username"
                  control={control}
                  placeholder="username"
                  req={true}
                  cls={SignupFormCls}
                  error={errors.username}
                />
              </div>

              <div className="flex flex-col flex-1 relative">
                <label
                  className="text-gray-500 font-semibold mb-1"
                  htmlFor="phoneNumber"
                >
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <PhoneInput
                  country={"in"}
                  enableSearch={true}
                  disableSearchIcon={true}
                  autocompleteSearch={true}
                  autoFormat={true}
                  defaultErrorMessage="Invalid phone number"
                  value={formData.phone_number}
                  onChange={(value) => handleChange("phone_number", value!)}
                />
                <span
                  className={`text-red-500 text-xs font-semibold  ${formDataErrors.phone_number ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 z-10 absolute bg-red-50 rounded-b-md top-full px-2 py-0.5`}
                >
                  {formDataErrors.phone_number || ""}
                </span>
              </div>
            </div>

            {/* <div className="flex flex-col flex-1"> */}
            <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
              {/* <div className="flex flex-col flex-1"> */}
              <SignupFormInput
                id="password"
                name="password"
                type="password"
                label="Password"
                control={control}
                placeholder="••••••••"
                req={true}
                cls={SignupFormCls}
                error={errors.password}
              />
              {/* </div> */}

              {/* <div className="flex flex-col flex-1"> */}
              <SignupFormInput
                id="confirm_password"
                name="confirm_password"
                type="password"
                label="Confirm Password"
                control={control}
                placeholder="••••••••"
                req={true}
                cls={SignupFormCls}
                error={errors.confirm_password}
              />
              {/* </div> */}
            </div>
            {/* </div> */}

            {type === "Recruiter" ? (
              <div className="flex flex-col">
                <label className="text-gray-500 font-semibold">
                  What are you looking for ?{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-x-6 gap-y-4 sm:flex-row flex-col mt-1">
                  <button
                    type="button"
                    className={`flex flex-1 items-center rounded-md px-4 py-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-300 transition-colors duration-300 ${formData.looking_for === "freelance" ? "bg-blue-300 text-white" : "bg-gray-200 text-gray-600"}`}
                    onClick={() => {
                      handleChange("looking_for", "freelance");
                    }}
                  >
                    <span className="p-1.5 border rounded-full inline-block w-8 h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                      <FaClock className="text-white w-full h-full" />
                    </span>
                    {/* <FaRegClock size={20} /> */}
                    <div className="flex-1 font-medium text-lg font-RadioGrotesk tracking-wide text-center whitespace-nowrap">
                      Freelance Contractor
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-1 items-center rounded-md px-4 py-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-300 transition-colors duration-300 
                    ${formData.looking_for === "full_time" ? "bg-blue-300 text-white" : "bg-gray-200 text-gray-600"}`}
                    onClick={() => {
                      handleChange("looking_for", "full_time");
                    }}
                  >
                    <span className="p-1.5 border rounded-full inline-block w-8 h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                      <IoBriefcase className="text-white w-full h-full" />
                    </span>
                    <div className="flex-1 font-medium text-lg font-RadioGrotesk tracking-wide text-center whitespace-nowrap">
                      Full Time Employee
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
                <div className="flex-1">
                  <SignupFormInput
                    id="location"
                    name="location"
                    type="text"
                    label="Location"
                    control={control}
                    placeholder="Location"
                    req={true}
                    cls={SignupFormCls}
                    error={errors.location}
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <SearchSelectDropdown
                    // selected={formData.years_of_experience}
                    label="Years of Experience"
                    name="years_of_experience"
                    labelCls="text-gray-500 font-semibold relative flex items-center gap-2"
                    placeholder="Experience"
                    cls={SignupFormCls}
                    tags={ExperienceTags}
                    onSingleChange={handleChange}
                    multiple={false}
                    req={true}
                  />
                  <span
                    className={`text-red-500 text-xs font-semibold  ${formDataErrors.years_of_experience ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 top-full`}
                  >
                    {formDataErrors.years_of_experience || ""}
                  </span>
                </div>
              </div>
            )}

            <div className="w-full">
              <SearchSelectDropdown
                usingIn="signup"
                placeholder="Search and add a skill"
                label={
                  type === "Recruiter"
                    ? "Skills Required"
                    : "Search and add a skill"
                }
                onChange={handleSkillChange}
                tags={tagOpns}
                cls={
                  "relative mt-1 p-2 bg-gray-50 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                }
              />
            </div>

            <SignupFormInput
              id="how_heard_about_codeunity"
              name="how_heard_about_codeunity"
              type="text"
              label="How did you hear about CodeUnity?"
              control={control}
              placeholder="How did you hear about us"
              req={false}
              cls={SignupFormCls}
              error={errors.how_heard_about_codeunity}
            />

            <button
              type="submit"
              className="mt-4 text-lg w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 active:scale-95 transition-all duration-300 text-white font-bold py-2 px-4 rounded-xl outline-none focus-visible:outline-primary-700"
            >
              Register
            </button>
          </form>

          <p className="text-sm mx-4">
            By submitting, you acknowledge that you have read and agreed to our{" "}
            <a
              href="https://s3.us-east-2.amazonaws.com/flexiple-marketing/pdf/terms-of-use.pdf"
              className="italic font-semibold text-sm text-[#9737bd] hover:underline outline-none focus-visible:underline focus-visible:text mr-1"
              target="_blank"
            >
              Terms of Service
            </a>
            and
            <a
              href="https://s3.us-east-2.amazonaws.com/flexiple-marketing/pdf/privacy-policy.pdf"
              className="italic font-semibold text-sm text-[#9737bd] hover:underline outline-none focus-visible:underline focus-visible:text ml-1 inline-block"
              target="_blank"
            >
              Privacy Policy
            </a>
            .
          </p>

          <p className="text-center text-sm my-3">
            Already have an account?
            <Link href="/login">
              <span className="ml-2 text-[#9737bd] hover:underline italic font-bold text-base">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
