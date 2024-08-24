import Image from "next/image";
import SignupFormInput from "./SignupFormInput";
import Link from "next/link";
import PhoneInput from "react-country-phone-input";
import "react-country-phone-input/lib/style.css";
import { FaRegClock } from "react-icons/fa";
import { IoBriefcaseOutline } from "react-icons/io5";
import SearchSelectDropdown from "./SearchSelectDropdown";
import tagOpns from "@/constants/data/tags.json";
import ExperienceTags from "@/constants/data/expirence.json";
import { Control, FieldErrors } from "react-hook-form";

type SignupFormProps = {
  type: string;
  handleSubmit: Function;
  onSubmit: Function;
  control: Control<any>;
  defaultCls: string;
  errors: FieldErrors;
  formData: {
    phone_number: string;
    looking_for?: string;
    hiring_skills?: string[];
    techincal_skills?: string[];
    years_of_experience?: string;
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
  defaultCls,
  errors,
  formData,
  handleChange,
  formDataErrors,
  handleSkillChange,
}: SignupFormProps) => {
  return (
    <div className="min-h-screen flex lg:flex-row flex-col sm:gap-y-8 gap-y-3 bg-gray-100 bg-fixed bg-signup bg-cover bg-no-repeat bg-center">
      <div className="lg:fixed lg:z-20 lg:w-[50%] h-full flex flex-col items-center justify-center max-lg:mt-12">
        <div className="text-center lg:space-y-12 md:space-y-10 sm:space-y-8 space-y-6 px-10">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={400}
            height={400}
            priority
            className="mx-auto lg:max-h-[400px] lg:max-w-[400px] object-contain"
          />

          <div className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl text-primary-700 leading-relaxed">
            <p className="font-bold">
              Get the <span className="text-[#9737bd]">best engineering </span>
              <span className="text-[#9737bd]">minds </span>
              to bring your product vision to life.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:ml-[50%] mt-4 mb-8 lg:mr-6 max-lg:px-2 h-fit flex-1">
        <div className="h-full">
          <form
            id="signup-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 sm:p-4 p-2"
          >
            <div className="md:text-3xl sm:text-2xl text-xl text-primary-700 leading-relaxed tracking-tighter font-bold lg:mb-2">
              Connect with Top Engineers
            </div>
            <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
              <div className="flex flex-col flex-1">
                <SignupFormInput
                  id="first_name"
                  name="first_name"
                  type="text"
                  label="First Name"
                  control={control}
                  placeholder="John"
                  req={true}
                  cls={defaultCls}
                  error={errors.first_name}
                />
              </div>

              <div className="flex flex-col flex-1">
                <SignupFormInput
                  id="last_name"
                  name="last_name"
                  type="text"
                  label="Last Name"
                  control={control}
                  placeholder="Doe"
                  req={true}
                  cls={defaultCls}
                  error={errors.last_name}
                />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <SignupFormInput
                id="email"
                name="email"
                type="email"
                label="Email"
                control={control}
                placeholder="name@personal.com"
                req={true}
                cls={defaultCls}
                error={errors.email}
              />
            </div>

            {type === "Recruiter" && (
              <div className="flex flex-col flex-1">
                <SignupFormInput
                  id="working_email"
                  name="working_email"
                  type="email"
                  label="Work Email"
                  control={control}
                  placeholder="name@work.com"
                  req={true}
                  cls={defaultCls}
                  error={errors.working_email}
                />
              </div>
            )}

            <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
              <div className="flex flex-col flex-1">
                <SignupFormInput
                  id="username"
                  name="username"
                  type="text"
                  label="Username"
                  control={control}
                  placeholder="username"
                  req={true}
                  cls={defaultCls}
                  error={errors.username}
                />
              </div>

              <div className="flex flex-col flex-1">
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
                  className={`text-red-500 text-xs font-semibold  ${formDataErrors.phone_number ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 top-full`}
                >
                  {formDataErrors.phone_number || ""}
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
                <div className="flex flex-col flex-1">
                  <SignupFormInput
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    control={control}
                    placeholder="••••••••"
                    req={true}
                    cls={defaultCls}
                    error={errors.password}
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <SignupFormInput
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    label="Confirm Password"
                    control={control}
                    placeholder="••••••••"
                    req={true}
                    cls={defaultCls}
                    error={errors.confirm_password}
                  />
                </div>
              </div>
            </div>

            {type === "Recruiter" ? (
              <div className="flex flex-col">
                <label className="text-gray-500 font-semibold">
                  What are you looking for ?{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-x-6 gap-y-4 lg:flex-row flex-col mt-1">
                  <button
                    type="button"
                    className={`flex flex-1 items-center text-white rounded-xl border-2 px-4 py-3 cursor-pointer outline-none focus-visible:border-primary-700 ${formData.looking_for === "freelance" ? "border-primary-50 bg-primary-500" : "border-transparent bg-gray-400"}`}
                    onClick={() => {
                      handleChange("looking_for", "freelance");
                    }}
                  >
                    <FaRegClock size={20} />
                    <div className="ml-2 text-gray-200 font-medium">
                      Freelance Contractor
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-1 items-center text-white rounded-xl border-2 px-4 py-3 cursor-pointer outline-none focus-visible:border-primary-700 ${formData.looking_for === "full_time" ? "border-primary-50 bg-primary-500" : "border-transparent bg-gray-400"}`}
                    onClick={() => {
                      handleChange("looking_for", "full_time");
                    }}
                  >
                    <IoBriefcaseOutline size={20} />
                    <div className="ml-2 text-gray-200 font-medium">
                      Full Time Employee
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col flex-1">
                <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
                  <div className="flex flex-col flex-1">
                    <SignupFormInput
                      id="location"
                      name="location"
                      type="text"
                      label="Location"
                      control={control}
                      placeholder="Location"
                      req={true}
                      cls={defaultCls}
                      error={errors.location}
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <SearchSelectDropdown
                      selected={formData.years_of_experience}
                      label="Years of Experience"
                      name="years_of_experience"
                      labelcls="text-gray-500 font-semibold relative flex items-center gap-2"
                      placeholder="Experience"
                      cls={defaultCls}
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
              </div>
            )}

            <div className="w-full">
              <SearchSelectDropdown
                usingIn="signup"
                label={
                  type === "Recruiter"
                    ? "Skills Required"
                    : "Search and add a skill"
                }
                onChange={handleSkillChange}
                tags={tagOpns}
                cls={
                  "relative p-2 bg-gray-200 text-primary-700 rounded-lg border border-gray-300 outline-none focus:border-primary-500"
                }
              />
            </div>

            <div className="flex flex-col">
              <SignupFormInput
                id="how_heard_about_codeunity"
                name="how_heard_about_codeunity"
                type="text"
                label="How did you hear about CodeUnity?"
                control={control}
                placeholder="How did you hear about us"
                req={false}
                cls={defaultCls}
                error={errors.how_heard_about_codeunity}
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full disabled:bg-[#9737bd]/70 bg-[#9737bd]/90 hover:bg-[#9737bd] active:scale-95 transition-all duration-300 text-white font-bold py-2 px-4 rounded-xl outline-none focus-visible:outline-primary-700"
            >
              Register
            </button>
          </form>

          <p className="text-sm mt-4 mx-4">
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
              className="italic font-semibold text-sm text-[#9737bd] hover:underline outline-none focus-visible:underline focus-visible:text ml-1"
              target="_blank"
            >
              Privacy Policy
            </a>
            .
          </p>

          <p className="text-center text-sm mt-3">
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
