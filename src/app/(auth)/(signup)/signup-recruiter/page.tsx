"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { recruiterSignupFormSchema } from "@/lib/validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import SignupForm from "@/Components/Forms/SignupForm";
import { swalSuccess, swalFailed } from "@/lib/helpers/swal";

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
    control,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<Schema>({
    resolver: zodResolver(recruiterSignupFormSchema),
    mode: "onChange", // onChange might effect browser performance so use onBlur/onTouched if needed
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      working_email: "",
      username: "",
      password: "",
      confirm_password: "",
      how_heard_about_codeunity: "",
    },
  });

  const [formDataErrors, setFormDataErrors] = useState<{
    phone_number: string;
    years_of_experience: string;
  }>({
    phone_number: "",
    years_of_experience: "",
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
    // console.log("logging");
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
    // console.log(
    //   first_name,
    //   last_name,
    //   email,
    //   working_email,
    //   username,
    //   password,
    //   phone_number,
    //   looking_for,
    //   hiring_skills,
    //   how_heard_about_codeunity
    // );
    let skills = "";
    for (let i = 0; i < hiring_skills.length; i++) {
      if (i === hiring_skills.length - 1) {
        skills += hiring_skills[i];
      } else {
        skills += hiring_skills[i] + ", ";
      }
    }
    const formattedPhoneNumber = phone_number.replace(/\s/g, ""); // removing spaces from the phone number

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
      // console.log("Registration successful:", response.data);
      swalSuccess({
        title: "Registration Successful",
        message: "You have registered successfully!",
      });
      // Redirect to the homepage
      router.push("/login");

      // console.log("Signed up successfully");
      // Optionally redirect or show success message to the user
    } catch (error: any) {
      // console.error("Registration failed:", error.response?.data);
      swalFailed({
        title: "Registration Failed",
        error: error,
      });
    }
  };

  const SignupFormCls =
    "relative mt-1 p-2 bg-gray-200 text-primary-700 rounded-lg border border-gray-300 outline-none focus:border-primary-500";

  return (
    <SignupForm
      type="Recruiter"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      defaultCls={SignupFormCls}
      errors={errors}
      handleChange={handleChange}
      formData={formData}
      formDataErrors={formDataErrors}
      handleSkillChange={handleSkillChange}
    />
  );
};

export default Signup;
