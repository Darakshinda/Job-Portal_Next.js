"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import tagOpns from "@/constants/data/tags.json";
import Link from "next/link";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SignupFormInput from "@/Components/Forms/SignupFormInput";
import { recruiterSignupFormSchema } from "@/lib/validator";
import SearchSelectDropdown from "@/Components/Forms/SearchSelectDropdown";
import PhoneInput from "react-country-phone-input";
import "react-country-phone-input/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

type Schema = z.infer<typeof recruiterSignupFormSchema>;

const Signup = () => {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const [formData, setFormData] = useState<{
    phone_number: string;
    looking_for: string;
    hiring_skills: string[];
  }>({
    phone_number: "",
    looking_for: "",
    hiring_skills: [],
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Schema>({
    resolver: zodResolver(recruiterSignupFormSchema),
    mode: "onChange", // onChange might effect browser performance so use onBlur/onTouched if needed
  });
  const [formDataErrors, setFormDataErrors] = useState<{
    phone_number: string;
  }>({
    phone_number: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    if (key === "phone_number") {
      validatePhoneNumber(value);
    }
  };

  const handleSkillChange = (skills: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      hiring_skills: skills,
    }));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const fullNumber = phoneNumber;
    const parsedNumber = parsePhoneNumberFromString("+" + fullNumber);

    if (parsedNumber && parsedNumber.isValid()) {
      console.log("Valid number:", parsedNumber.formatInternational());
      setFormDataErrors((prevState) => ({
        ...prevState,
        phone_number: "",
      }));
      setFormData((prevState) => ({
        ...prevState,
        phone_number: parsedNumber.formatInternational(),
      }));
      return true;
    } else {
      setFormDataErrors((prevState) => ({
        ...prevState,
        phone_number: "Invalid phone number",
      }));
      return false;
    }
  };

  // console.log(formData);
  // console.log(errors);
  // console.log(watch("first_name"));

  const onSubmit = async (data: Schema) => {
    console.log("logging");
    const {
      first_name,
      last_name,
      email,
      working_email,
      username,
      password,
      how_heard_about_codeunity,
    } = data;
    const { phone_number, looking_for, hiring_skills } = formData;
    console.log(
      first_name,
      last_name,
      email,
      working_email,
      username,
      password,
      phone_number,
      looking_for,
      hiring_skills,
      how_heard_about_codeunity
    );
    let skills = "";
    for (let i = 0; i < hiring_skills.length; i++) {
      if (i === hiring_skills.length - 1) {
        skills += hiring_skills[i];
      } else {
        skills += hiring_skills[i] + ", ";
      }
    }
    const formattedPhoneNumber = phone_number.replace(/\s/g, "");

    try {
      const response = await axios.post(
        `${baseurl}/accounts/register/job-hirer/`,
        {
          first_name,
          last_name,
          email,
          working_email,
          username,
          formattedPhoneNumber,
          password,
          looking_for,
          skills,
          how_heard_about_codeunity,
        }
      );
      console.log("Registration successful:", response.data);
      Swal.fire({
        title: "Registration Successful",
        text: "You have registered successfully!",
        showClass: {
          popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
        },
        hideClass: {
          popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
        },
      }).then(() => {
        // Redirect to the homepage
        router.push("/login");
      });

      console.log("Signedup successfully");
      // Optionally redirect or show success message to the user
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data);
      Swal.fire({
        title: "Registration Failed",
        text: error?.response?.data?.username[0] || "An error occurred",
        showClass: {
          popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
        },
        hideClass: {
          popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
        },
      });
      // Handle error and display appropriate message to the user
    }
  };

  const defaultCls =
    "relative mt-1 p-2 bg-gray-200 text-primary-700 rounded-lg border border-gray-300 outline-none focus:border-primary-500";

  return (
    <div className="min-h-screen bg-gray-800 flex lg:flex-row flex-col sm:gap-y-8 gap-y-3 bg-signup bg-cover bg-no-repeat bg-center">
      <div className="flex flex-col items-center justify-center max-lg:mt-12">
        <div className="text-center lg:space-y-16 md:space-y-12 sm:space-y-8 space-y-6 px-10">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={400}
            height={400}
            priority
            className="mx-auto lg:max-h-[400px] lg:max-w-[400px]  object-contain"
          />

          <div className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl text-primary-700 leading-relaxed">
            <p className="font-bold">
              Get the <span className="text-[#9737bd]">best engineering</span>
              <br />
              <span className="text-[#9737bd]">minds </span>
              to bring your product
              <br />
              vision to life.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-8 lg:mr-6 max-lg:px-2 h-screen flex-1">
        <div className="md:text-3xl sm:text-2xl text-xl text-primary-700 leading-relaxed  tracking-tighter font-bold sm:ml-2 mb-2">
          Connect with Top Engineers
        </div>
        <div className="h-full">
          <form
            id="signup-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 h-[80%] overflow-y-scroll snap-y snap-mandatory overscroll-contain sm:p-4 p-2"
          >
            <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
              <div className="flex flex-col flex-1">
                <SignupFormInput
                  id="first_name"
                  name="first_name"
                  type="text"
                  label="First Name"
                  // register={register}
                  control={control}
                  placeholder="John"
                  req={true}
                  cls={defaultCls}
                  errors={errors.first_name}
                />
              </div>

              <div className="flex flex-col flex-1">
                <SignupFormInput
                  id="last_name"
                  name="last_name"
                  type="text"
                  label="Last Name"
                  // register={register}
                  control={control}
                  placeholder="Doe"
                  req={true}
                  cls={defaultCls}
                  errors={errors.last_name}
                />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <SignupFormInput
                id="email"
                name="email"
                type="email"
                label="Email"
                // register={register}
                control={control}
                placeholder="name@personal.com"
                req={true}
                cls={defaultCls}
                errors={errors.email}
              />
            </div>

            <div className="flex flex-col flex-1">
              <SignupFormInput
                id="working_email"
                name="working_email"
                type="email"
                label="Work Email"
                // register={register}
                control={control}
                placeholder="name@work.com"
                req={true}
                cls={defaultCls}
                errors={errors.working_email}
              />
            </div>

            <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
              <div className="flex flex-col flex-1">
                <SignupFormInput
                  id="username"
                  name="username"
                  type="text"
                  label="Username"
                  // register={register}
                  control={control}
                  placeholder="username"
                  req={true}
                  cls={defaultCls}
                  errors={errors.username}
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
                  {formDataErrors.phone_number}
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
                    // register={register}
                    control={control}
                    placeholder="••••••••"
                    req={true}
                    cls={defaultCls}
                    errors={errors.password}
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <SignupFormInput
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    label="Confirm Password"
                    // register={register}
                    control={control}
                    placeholder="••••••••"
                    req={true}
                    cls={defaultCls}
                    errors={errors.confirm_password}
                  />
                </div>
              </div>
            </div>
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

            <div className="w-full">
              <SearchSelectDropdown
                usingIn="signup"
                label="Technical Skills"
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
                // register={register}
                control={control}
                placeholder="How did you hear about us"
                req={false}
                cls={defaultCls}
                errors={errors.how_heard_about_codeunity}
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

export default Signup;
