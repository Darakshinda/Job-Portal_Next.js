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
      const val = value;
      setFormData((prevState) => ({
        ...prevState,
        [key]: val,
      }));

      if (val) {
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

  console.log(formData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(seekerSignupFormSchema),
  });

  const onSubmit = async (data: Schema) => {
    // console.log("registering");
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
    // console.log(first_name, last_name, email, working_email, username, password, phone_number, how_heard_about_codeunity, looking_for, technical_skills);
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
      console.log("Registration successful:", response.data);
      swalSuccess({
        title: "Registration Successful",
        message: "You have registered successfully!",
      });
      router.push("/login");

      console.log("Signed up successfully");
    } catch (error: any) {
      console.error("Registration failed:", error.response.data);
      swalFailed({ title: "Registration Failed", error: error });
    }
  };

  const SignupFormCls =
    "relative mt-1 p-2 bg-gray-200 text-primary-700 rounded-lg border border-gray-300 outline-none focus:border-primary-500";

  return (
    // <div className="min-h-screen bg-gray-800 flex lg:flex-row flex-col sm:gap-y-8 gap-y-3 bg-signup bg-cover bg-no-repeat bg-center">
    //   <div className="flex flex-col items-center justify-center max-lg:mt-12">
    //     <div className="text-center lg:space-y-16 md:space-y-12 sm:space-y-8 space-y-6 px-10">
    //       <Image
    //         src="/assets/icons/logo.svg"
    //         alt="logo"
    //         width={400}
    //         height={400}
    //         priority
    //         className="mx-auto lg:max-h-[400px] lg:max-w-[400px]  object-contain"
    //       />

    //       <div className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl text-primary-700 leading-relaxed">
    //         <p className="font-bold">
    //           Get the <span className="text-[#9737bd]">best engineering</span>
    //           <br />
    //           <span className="text-[#9737bd]">minds </span>
    //           to bring your product
    //           <br />
    //           vision to life.
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="mt-4 mb-8 lg:mr-6 max-lg:px-2 h-screen flex-1">
    //     <div className="md:text-3xl sm:text-2xl text-xl text-primary-700 leading-relaxed  tracking-tighter font-bold sm:ml-2 lg:mb-2">
    //       Connect with Top Engineers
    //     </div>
    //     <div className="h-full">
    //       <form
    //         id="signup-form"
    //         onSubmit={handleSubmit(onSubmit)}
    //         className="space-y-4 h-[80%] overflow-y-scroll snap-y snap-mandatory overscroll-contain sm:p-4 p-2"
    //       >
    //         <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
    //           <div className="flex flex-col flex-1">
    //             <SignupFormInput
    //               id="first_name"
    //               name="first_name"
    //               type="text"
    //               label="First Name"
    //               // register={register}
    //               control={control}
    //               placeholder="John"
    //               req={true}
    //               cls={defaultCls}
    //               errors={errors.first_name}
    //             />
    //           </div>

    //           <div className="flex flex-col flex-1">
    //             <SignupFormInput
    //               id="last_name"
    //               name="last_name"
    //               type="text"
    //               label="Last Name"
    //               // register={register}
    //               control={control}
    //               placeholder="Doe"
    //               req={true}
    //               cls={defaultCls}
    //               errors={errors.last_name}
    //             />
    //           </div>
    //         </div>

    //         <div className="flex flex-col flex-1">
    //           <SignupFormInput
    //             id="email"
    //             name="email"
    //             type="email"
    //             label="Email"
    //             // register={register}
    //             control={control}
    //             placeholder="name@personal.com"
    //             req={true}
    //             cls={defaultCls}
    //             errors={errors.email}
    //           />
    //         </div>

    //         <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
    //           <div className="flex flex-col flex-1">
    //             <SignupFormInput
    //               id="username"
    //               name="username"
    //               type="text"
    //               label="Username"
    //               // register={register}
    //               control={control}
    //               placeholder="username"
    //               req={true}
    //               cls={defaultCls}
    //               errors={errors.username}
    //             />
    //           </div>

    //           <div className="flex flex-col flex-1">
    //             <label
    //               className="text-gray-500 font-semibold mb-1"
    //               htmlFor="phoneNumber"
    //             >
    //               Contact Number <span className="text-red-500">*</span>
    //             </label>
    //             <PhoneInput
    //               country={"in"}
    //               enableSearch={true}
    //               disableSearchIcon={true}
    //               autocompleteSearch={true}
    //               autoFormat={true}
    //               defaultErrorMessage="Invalid phone number"
    //               value={formData.phone_number}
    //               onChange={(value) => handleChange("phone_number", value!)}
    //             />
    //             <span
    //               className={`text-red-500 text-xs font-semibold  ${formDataErrors.phone_number ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 top-full`}
    //             >
    //               {formDataErrors.phone_number || ""}
    //             </span>
    //           </div>
    //         </div>

    //         <div className="flex flex-col flex-1">
    //           <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
    //             <div className="flex flex-col flex-1">
    //               <SignupFormInput
    //                 id="password"
    //                 name="password"
    //                 type="password"
    //                 label="Password"
    //                 // register={register}
    //                 control={control}
    //                 placeholder="••••••••"
    //                 req={true}
    //                 cls={defaultCls}
    //                 errors={errors.password}
    //               />
    //             </div>

    //             <div className="flex flex-col flex-1">
    //               <SignupFormInput
    //                 id="confirm_password"
    //                 name="confirm_password"
    //                 type="password"
    //                 label="Confirm Password"
    //                 // register={register}
    //                 control={control}
    //                 placeholder="••••••••"
    //                 req={true}
    //                 cls={defaultCls}
    //                 errors={errors.confirm_password}
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="flex flex-col flex-1">
    //           <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
    //             <div className="flex flex-col flex-1">
    //               <SignupFormInput
    //                 id="location"
    //                 name="location"
    //                 type="text"
    //                 label="Location"
    //                 // register={register}
    //                 control={control}
    //                 placeholder="Location"
    //                 req={true}
    //                 cls={defaultCls}
    //                 errors={errors.location}
    //               />
    //             </div>

    //             <div className="flex flex-col flex-1">
    //               <SignupFormInput
    //                 id="experience"
    //                 name="experience"
    //                 type="number"
    //                 label="Years of Experience"
    //                 // register={register}
    //                 control={control}
    //                 placeholder="Experience"
    //                 req={true}
    //                 cls={defaultCls}
    //                 errors={errors.experience}
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="w-full">
    //           <SearchSelectDropdown
    //             usingIn="signup"
    //             label="Search and add a skill"
    //             onChange={handleSkillChange}
    //             tags={tagOpns}
    //             cls={
    //               "relative p-2 bg-gray-200 text-primary-700 rounded-lg border border-gray-300 outline-none focus:border-primary-500"
    //             }
    //           />
    //         </div>

    //         <div className="flex flex-col">
    //           <SignupFormInput
    //             id="how_heard_about_codeunity"
    //             name="how_heard_about_codeunity"
    //             type="text"
    //             label="How did you hear about CodeUnity?"
    //             // register={register}
    //             control={control}
    //             placeholder="How did you hear about us"
    //             req={false}
    //             cls={defaultCls}
    //             errors={errors.how_heard_about_codeunity}
    //           />
    //         </div>

    //         <button
    //           type="submit"
    //           className="mt-4 w-full disabled:bg-[#9737bd]/70 bg-[#9737bd]/90 hover:bg-[#9737bd] active:scale-95 transition-all duration-300 text-white font-bold py-2 px-4 rounded-xl outline-none focus-visible:outline-primary-700"
    //         >
    //           Register
    //         </button>
    //       </form>

    //       <p className="text-sm mt-4 mx-4">
    //         By submitting, you acknowledge that you have read and agreed to our{" "}
    //         <a
    //           href="https://s3.us-east-2.amazonaws.com/flexiple-marketing/pdf/terms-of-use.pdf"
    //           className="italic font-semibold text-sm text-[#9737bd] hover:underline outline-none focus-visible:underline focus-visible:text mr-1"
    //           target="_blank"
    //         >
    //           Terms of Service
    //         </a>
    //         and
    //         <a
    //           href="https://s3.us-east-2.amazonaws.com/flexiple-marketing/pdf/privacy-policy.pdf"
    //           className="italic font-semibold text-sm text-[#9737bd] hover:underline outline-none focus-visible:underline focus-visible:text ml-1"
    //           target="_blank"
    //         >
    //           Privacy Policy
    //         </a>
    //         .
    //       </p>

    //       <p className="text-center text-sm mt-3">
    //         Already have an account?
    //         <Link href="/login">
    //           <span className="ml-2 text-[#9737bd] hover:underline italic font-bold text-base">
    //             Login
    //           </span>
    //         </Link>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <SignupForm
      type="Seeker"
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

export default SignupSeeker;
