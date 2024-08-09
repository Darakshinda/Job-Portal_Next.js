"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import tagOpns from "@/constants/data/tags.json";
import Link from "next/link";
import Image from "next/image";
import codes from "country-calling-code";
import { FaRegClock } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SignupFormInput from "@/Components/Forms/SignupFormInput";
import { recruiterSignupFormSchema } from "@/_lib/validator";
import SearchSelectDropdown from "@/Components/Forms/SearchSelectDropdown";
import PhoneInput from "react-country-phone-input";
import "react-country-phone-input/lib/style.css";
// import "react-phone-input-2/lib/material.css";

type Schema = z.infer<typeof recruiterSignupFormSchema>;

// const Schema = z.object({
//   test: z.string(),
// });

// type schema = z.infer<typeof Schema>;

const Signup = () => {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const [formData, setFormData] = useState<{
    phone_number: string;
    looking_for: string;
    hiring_skills: string[];
    // confirm_password: string;
  }>({
    phone_number: "",
    looking_for: "",
    hiring_skills: [],
    // confirm_password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(recruiterSignupFormSchema),
    // defaultValues: formData,
  });

  const handleChange = (key: string, value: string) => {
    if (key === "phone_number") {
      console.log("phone number", value);
    }
    // if (key === "looking_for")
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    // if (key === "phone_number") {
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [key]: value,
    // }));
    // }
  };

  const handleSkillChange = (skills: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      hiring_skills: skills,
    }));
  };

  console.log(errors);
  // console.log(watch("phone_number"));

  const onSubmit = async (data: Schema) => {
    console.log("logging");
    const {
      // test,
      first_name,
      last_name,
      email,
      working_email,
      username,
      password,
      // phone_number,
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
      // phone_number,
      how_heard_about_codeunity,
      looking_for,
      hiring_skills
    );
    let skills = "";
    for (let i = 0; i < hiring_skills.length; i++) {
      if (i === hiring_skills.length - 1) {
        skills += hiring_skills[i];
      } else {
        skills += hiring_skills[i] + ", ";
      }
    }

    try {
      const response = await axios.post(
        `${baseurl}/accounts/register/job-hirer/`,
        {
          // test,
          first_name,
          last_name,
          email,
          working_email,
          username,
          password,
          phone_number,
          how_heard_about_codeunity,
          looking_for,
          skills,
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
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        title: "Registration Failed",
        text: "Please try again.",
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

  console.log(formData);

  return (
    <div className="min-h-screen bg-gray-800 flex lg:flex-row flex-col gap-y-8 bg-bg3 bg-cover bg-no-repeat bg-center">
      <div className="flex flex-col items-center justify-center max-lg:mt-12">
        <div className="text-center lg:space-y-16 md:space-y-12 sm:space-y-8 space-y-6 px-10">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={400}
            height={400}
            className=" mx-auto"
          />

          <div className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-primary-700 leading-relaxed">
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
                  register={register}
                  placeholder="John"
                  req={true}
                  cls=""
                  errors={errors.first_name}
                />
              </div>

              <div className="flex flex-col flex-1">
                <SignupFormInput
                  id="last_name"
                  name="last_name"
                  type="text"
                  label="Last Name"
                  register={register}
                  placeholder="Doe"
                  req={true}
                  cls=""
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
                register={register}
                placeholder="name@personal.com"
                req={true}
                cls=""
                errors={errors.email}
              />
            </div>

            <div className="flex flex-col flex-1">
              <SignupFormInput
                id="working_email"
                name="working_email"
                type="email"
                label="Work Email"
                register={register}
                placeholder="name@work.com"
                req={true}
                cls=""
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
                  register={register}
                  placeholder="username"
                  req={true}
                  cls=""
                  errors={errors.username}
                />
              </div>

              <div className="flex flex-col flex-1">
                <label
                  className="text-gray-500 font-semibold"
                  htmlFor="phoneNumber"
                >
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <PhoneInput
                  country={"in"}
                  value={formData.phone_number}
                  onChange={(value) => handleChange("phone_number", value!)}
                />
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
                    register={register}
                    placeholder="••••••••"
                    req={true}
                    cls=""
                    errors={errors.password}
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <SignupFormInput
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    label="Confirm Password"
                    register={register}
                    placeholder="••••••••"
                    req={true}
                    cls=""
                    errors={errors.confirm_password}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-500 font-semibold">
                What are you looking for?{" "}
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
                label="Technical Skills"
                onChange={handleSkillChange}
                tags={tagOpns}
                cls={
                  "relative mt-1 p-2 bg-gray-200 text-primary-700 rounded-lg border border-gray-300 outline-none focus:border-primary-500"
                }
              />
            </div>

            <div className="flex flex-col">
              <SignupFormInput
                id="how_heard_about_codeunity"
                name="how_heard_about_codeunity"
                type="text"
                label="How did you hear about CodeUnity?"
                register={register}
                placeholder="How did you hear about us"
                req={false}
                cls=""
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

          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="bg-white text-black"
              {...register("test")}
            />
            <button type="submit">submit</button>
          </form> */}

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
