"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { seekerSignupFormSchema } from "@/lib/validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import SignupForm from "@/Components/Forms/SignupForm";
import { swalFailed, swalSuccess } from "@/lib/helpers/swal";

type Schema = z.infer<typeof seekerSignupFormSchema>;

const SignupSeeker = () => {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const [formData, setFormData] = useState<{
    phone_number: string;
    technical_skills: string[];
    years_of_experience: string;
  }>({
    phone_number: "",
    technical_skills: [],
    years_of_experience: "",
  });

  const [formDataErrors, setFormDataErrors] = useState<{
    phone_number: string;
    years_of_experience: string;
  }>({
    phone_number: "",
    years_of_experience: "",
  });

  const handleChange = (key: string, value: string) => {
    if (key === "years_of_experience") {
      // console.log("handling change");
      setFormData((prevState) => ({
        ...prevState,
        [key]: value,
      }));

      if (value) {
        setFormDataErrors((prevState) => ({
          ...prevState,
          years_of_experience: "",
        }));
      } else {
        setFormDataErrors((prevState) => ({
          ...prevState,
          years_of_experience: "Years of experience is required",
        }));
      }
    } else {
      if (key === "phone_number") {
        const val = value;
        setFormData((prevState) => ({
          ...prevState,
          [key]: val,
        }));
        validatePhoneNumber(val);
      }
      setFormData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const handleSkillChange = (skills: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      technical_skills: skills,
    }));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const fullNumber = phoneNumber;
    const parsedNumber = parsePhoneNumberFromString("+" + fullNumber);

    if (parsedNumber && parsedNumber.isValid()) {
      // console.log("Valid number:", parsedNumber.formatInternational());
      setFormDataErrors((prevState) => ({
        ...prevState,
        phone_number: "",
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

  const yoeStringToNumber = (yoe: string): string => {
    if (yoe === "Less than 1 year") {
      return "0";
    }
    const match = yoe.match(/\d+/);
    return match ? match[0] : "0";
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(seekerSignupFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
      location: "",
      how_heard_about_codeunity: "",
    },
  });

  const onSubmit = async (data: Schema) => {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      location,
      how_heard_about_codeunity,
    } = data;
    const { technical_skills, phone_number, years_of_experience } = formData;

    let skills = "";
    for (let i = 0; i < technical_skills.length; i++) {
      if (i === technical_skills.length - 1) {
        skills += technical_skills[i];
      } else {
        skills += technical_skills[i] + ", ";
      }
    }
    phone_number.replaceAll(" ", "");

    try {
      const response = await axios.post(
        `${baseurl}/accounts/register/job-seeker/`,
        {
          first_name,
          last_name,
          email,
          username,
          password,
          phone_number,
          how_heard_about_codeunity,
          location,
          experience: yoeStringToNumber(years_of_experience),
          skills,
        }
      );

      swalSuccess({
        title: "Registration Successful",
        message: "You have registered successfully!",
      });
      router.push("/login");

      // console.log("Signed up successfully");
    } catch (error: any) {
      // console.error("Registration failed:", error.response.data);
      swalFailed({ title: "Registration Failed", error: error });
    }
  };

  return (
    <SignupForm
      type="Seeker"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      errors={errors}
      handleChange={handleChange}
      formData={formData}
      formDataErrors={formDataErrors}
      handleSkillChange={handleSkillChange}
    />
  );
};

export default SignupSeeker;
