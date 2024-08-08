// "use client";
// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
// import { TextInput } from "@/stories/TextInput";
// import tagOpns from "@/constants/data/tags.json";
// import locOpns from "@/constants/data/location.json";
// import Tags  from "@/stories/Tags";
// import Link from "next/link";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     password: "",
//     phone_number: "",
//     username: "",
//     email: "",
//     technical_skills: "",
//     years_of_experience: "",
//     location: "",
//   });
//   const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
//   const router = useRouter();

//   const handleChange = (key: string, value: string) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };
//   const handler = (key:string, value:string) => {
//     setFormData((prevState) => {
//       if (prevState[key] === value) {
//         return prevState; // Prevent unnecessary state updates
//       }
//       return {
//         ...prevState,
//         [key]: value,
//       };
//     });
//   };

//   const [errors, setErrors] = useState(new Array(20).fill(0));
//   const [submitted, setSubmitted] = useState(false);

//   const isValidEmail = (email: string): boolean => {
//     if (email === "") return true;
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
//   };

//   const isValidMobileNo = (phone: string): boolean => {
//     if (phone === "") return true;
//     const tenDigitRegex = /^\d{10}$/;
//     return tenDigitRegex.test(phone);
//   };

//   const isValidUsername = (username: string): boolean => {
//     if (username === "") return true;
//     if (username.length > 150) return false;
//     const regex =
//       /[A-Za-z]/.test(username) &&
//       /[0-9]/.test(username) &&
//       /[^A-Za-z0-9]/.test(username);
//     return regex;
//   };

//   const isValidExperience = (experience: string): boolean => {
//     // Check if experience is a valid integer
//     if (experience === "") return true;
//     const intValue = parseInt(experience);
//     return !isNaN(intValue) && intValue >= 0;
//   };

//   const validateField = (
//     value: string,
//     reference: string,
//     valid: boolean,
//     index: number
//   ): string => {
//     if ((value === reference || !valid) &&submitted){
//       errors[index] = 1;
//       return "red";
//     } else {
//       errors[index] = 0;
//       return "#ccc";
//     }
//   };

//   const checkError = (
//     value: string,
//     reference: string,
//     valid: boolean,
//     index: number
//   ): boolean => {
//     return validateField(value, reference, valid, index) === "red";
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true); // Mark the form as submitted

//     // Validation checks for each field
//     const errorsArray = [
//       checkError(formData.first_name, "", true, 1),
//       checkError(formData.last_name, "", true, 2),
//       checkError(formData.email, "", true, 3) || !isValidEmail(formData.email),
//       checkError(formData.username, "", true, 4) ||
//         !isValidUsername(formData.username),
//       checkError(formData.password, "", true, 5),
//       checkError(formData.location, "", true, 6),
//       checkError(formData.phone_number, "", true, 7) ||
//         !isValidMobileNo(formData.phone_number),
//       checkError(formData.years_of_experience, "", true, 8),
//       !isValidExperience(formData.years_of_experience),
//       checkError(formData.technical_skills, "", true, 9),

//       // Add more checks as needed
//     ];

//     // Check if any field has errors
//     if (errorsArray.some((error) => error)) {
//       // If there are errors, prevent form submission
//       return;
//     }

//     try {
//       // Perform API request to register the user
//       const response = await axios.post(
//         `${baseurl}/accounts/register/job-seeker/`,
//         formData
//       );
//       console.log("Registration successful:", response.data);

//       // Show success message using SweetAlert2
//       Swal.fire({
//         title: "Registration Successful",
//         text: "You have registered successfully!",
//         showClass: {
//           popup: `
//             animate__animated
//             animate__fadeInUp
//             animate__faster
//           `
//         },
//         hideClass: {
//           popup: `
//             animate__animated
//             animate__fadeOutDown
//             animate__faster
//           `
//         }
//       }).then(() => {
//         // Redirect to the homepage
//         router.push('/login');
//       });

//       console.log("Signedup successfully");
//       // Optionally redirect or show success message to the user
//     } catch (error) {
//       console.error('Registration failed:', error);
//       Swal.fire({
//         title: "Registration Failed",
//         text: "Please try again.",
//         showClass: {
//           popup: `
//             animate__animated
//             animate__fadeInUp
//             animate__faster
//           `
//         },
//         hideClass: {
//           popup: `
//             animate__animated
//             animate__fadeOutDown
//             animate__faster
//           `
//         }
//       });
//       // Handle error and display appropriate message to the user
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-800 flex">
//       <div className="relative">
//         <div className="absolute top-0 left-0 pl-24 pt-16 text-white text-4xl">
//           <strong>CodeUnity</strong>
//         </div>
//         <div className="text-5xl text-white pt-60 pl-24 tracking-wider leading-relaxed">
//           <p>
//             <strong>
//               Get the <span style={{ color: "#9457CF" }}>best engineering</span>
//               <br />
//               <span style={{ color: "#9457CF" }}>minds </span>
//               to bring your product
//               <br />
//               vision to life.
//             </strong>
//           </p>
//         </div>
//       </div>
//       <div className="ml-16 mt-10 mr-8 mb-8 h-screen border border-white rounded-lg flex-1">
//         <div className="h-full overflow-y-auto p-8">
//           <div className="text-3xl text-white tracking-wider leading-relaxed font-bold pr-4 mb-8">
//             Connect with Top Engineers
//           </div>
//           <div className="flex space-x-6">
//             <div className="flex flex-col flex-1">
//               <div className="formGroup"></div>
//               <label className="text-gray-500 font-medium" htmlFor="first_name">
//                 First Name <span className="text-red-500">*</span>
//               </label>
//               <TextInput
//                 keyy="first_name"
//                 type="text"
//                 placeholder="John"
//                 cls="mt-1 p-2 bg-gray-900 text-white rounded border border-gray-700"
//                 val={formData.first_name}
//                 onChange={handleChange}
//               />
//               {submitted && checkError(formData.first_name, "", true, 1) && (
//                 <p className="text-xs text-red-500 mt-1 ml-2">
//                   This is required
//                 </p>
//               )}
//             </div>
//             <div className="flex flex-col flex-1">
//               <label className="text-gray-500 font-medium" htmlFor="last_name">
//                 Last Name <span className="text-red-500">*</span>
//               </label>
//               <TextInput
//                 keyy="last_name"
//                 type="text"
//                 placeholder="Doe"
//                 cls="mt-1 p-2 bg-gray-900 text-white rounded border border-gray-700"
//                 val={formData.last_name}
//                 onChange={handleChange}
//               />
//               {submitted && checkError(formData.last_name, "", true, 1) && (
//                 <p className="text-xs text-red-500 mt-1 ml-2">
//                   This is required
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="flex flex-col mt-6 relative">
//             <label
//               className="text-gray-500 font-medium"
//               htmlFor="working_email"
//             >
//               Email <span className="text-red-500">*</span>
//             </label>
//             <TextInput
//               keyy="email"
//               type="email"
//               placeholder="name@personal.com"
//               cls="mt-1 p-2 bg-gray-900 text-white rounded border border-gray-700"
//               val={formData.email}
//               onChange={handleChange}
//             />
//             {submitted && checkError(formData.email, "", true, 1) && (
//               <p className="text-xs text-red-500 mt-1 ml-2">This is required</p>
//             )}
//             {!isValidEmail(formData.email) && (
//               <p className="text-xs text-red-500 mt-1 ml-2">
//                 Enter a valid email
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col mt-6">
//             <label className="text-gray-500 font-medium" htmlFor="username">
//               Username <span className="text-red-500">*</span>
//             </label>
//             <TextInput
//               keyy="username"
//               type="text"
//               placeholder="username"
//               cls="mt-1 p-2 bg-gray-900 text-white rounded border border-gray-700"
//               val={formData.username}
//               onChange={handleChange}
//             />
//           </div>
//           {submitted && checkError(formData.username, "", true, 1) && (
//             <p className="text-xs text-red-500 mt-1 ml-2">This is required</p>
//           )}
//           <div style={{ marginBottom: "1.5rem" }}>
//             {!isValidUsername(formData.username) && (
//               <p className="text-xs text-red-500 mt-1 ml-2">
//                 Username must contain alphabets, digits and special characters
//                 and should be lesser than 150 characters
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col mt-6">
//             <label className="text-gray-500 font-medium" htmlFor="password">
//               Password <span className="text-red-500">*</span>
//             </label>
//             <TextInput
//               keyy="password"
//               type="password"
//               placeholder="password"
//               cls="mt-1 p-2 bg-gray-900 text-white rounded border border-gray-700"
//               val={formData.password}
//               onChange={handleChange}
//               iconColor="white"
//             />
//             {submitted && checkError(formData.password, "", true, 1) && (
//               <p className="text-xs text-red-500 mt-1 ml-2">This is required</p>
//             )}
//           </div>
//           <div className="flex flex-col mt-6">
//             <label
//               className="text-gray-500 font-medium"
//               htmlFor="location"
//             >
//               Location <span className="text-red-500">*</span>
//             </label>
//             <Tags keyy='location'cls="mt-1 p-2 bg-gray-900 text-white rounded border border-gray-700" optionMrgn='0%' optionWdth='100%' settgs={handler}
//             dynamic={true} options={locOpns} border={`1px solid ${validateField(formData.location,"",true,7)}`} phdr='location' srchwdth='37%'
//             scrollht="107px"/>
//             {submitted &&
//               checkError(formData.location, "", true, 1) && (
//                 <p className="text-xs text-red-500 mt-1 ml-2">
//                   This is required
//                 </p>
//               )}
//           </div>
//           <div className="flex flex-col mt-6">
//             <label className="text-gray-500 font-medium" htmlFor="phoneNumber">
//               Contact Number <span className="text-red-500">*</span>
//             </label>
//             <div className="flex mt-1">
//               <select
//                 className="p-2 bg-gray-900 text-white rounded-l border border-gray-700"
//                 style={{ minWidth: "90px" }}
//               >
//                 <option value="India +91">India +91</option>
//                 {/* Add more options here if needed */}
//               </select>
//               <TextInput
//                 keyy="phone_number"
//                 type="text"
//                 placeholder="00000 00000"
//                 cls="flex-1 p-2 bg-gray-900 text-white rounded-r border border-gray-700 ml-4"
//                 val={formData.phone_number}
//                 onChange={handleChange}
//               />
//             </div>
//             {submitted && checkError(formData.phone_number, "", true, 1) && (
//               <p className="text-xs text-red-500 mt-1 ml-2">This is required</p>
//             )}
//             {!isValidMobileNo(formData.phone_number) && (
//               <p className="text-xs text-red-500 mt-1 ml-2">
//                 Enter a valid phone no
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col mt-6">
//             <label
//               className="text-gray-500 font-medium"
//               htmlFor="years_of_experience"
//             >
//               Years of experience? <span className="text-red-500">*</span>
//             </label>
//             <TextInput
//               keyy="years_of_experience"
//               type="text"
//               placeholder="experience"
//               cls="mt-1 p-2 bg-gray-900 text-white rounded border border-gray-700"
//               val={formData.years_of_experience}
//               onChange={handleChange}
//             />
//             {submitted &&
//               checkError(formData.years_of_experience, "", true, 1) && (
//                 <p className="text-xs text-red-500 mt-1 ml-2">
//                   This is required
//                 </p>
//               )}
//             {!isValidExperience(formData.years_of_experience) && (
//               <p className="text-xs text-red-500 mt-1 ml-2">
//                 Enter a valid no
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col mt-6">
//             <label
//               className="text-gray-500 font-medium"
//               htmlFor="technical_skills"
//             >
//               Technical Skills <span className="text-red-500">*</span>
//             </label>
//             <Tags keyy='technical_skills'cls="mt-1 p-2 bg-gray-900 text-white rounded border border-gray-700" optionMrgn='0%' optionWdth='100%' settgs={handler}
//             dynamic={true} options={tagOpns} border={`1px solid ${validateField(formData.technical_skills,"",true,7)}`} phdr='Search and add a skill' srchwdth='37%'
//             scrollht="107px"/>
//             {submitted &&
//               checkError(formData.technical_skills, "", true, 1) && (
//                 <p className="text-xs text-red-500 mt-1 ml-2">
//                   This is required
//                 </p>
//               )}
//           </div>

//           <div className="mt-8">
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               style={{ backgroundColor: "#9457CF" }}
//               onClick={handleSubmit}
//             >
//               Register
//             </button>
//           </div>
//           <div className="mt-8"></div>
//           <div className="justify-center text-center mt-8">
//             <div
//               className="bubble-element Text cpaKaOaE0"
//               style={{
//                 whiteSpace: "pre-wrap",
//                 overflow: "visible",
//                 fontFamily: "Space Grotesk",
//                 fontSize: "20px",
//                 fontWeight: 400,
//                 color: "rgba(255, 255, 255, 0.6)",
//                 lineHeight: 1.4,
//                 borderRadius: 0,
//                 opacity: 1,
//                 alignSelf: "center",
//                 minWidth: "16px",
//                 order: 18,
//                 minHeight: "10px",
//                 height: "max-content",
//                 flexGrow: 0,
//                 flexShrink: 0,
//                 width: "auto",
//                 margin: "0px",
//                 zIndex: 203,
//               }}
//             >
//               Already have an account?{" "}
//               <font color="#9457CF">
//                 <Link href="/login">Login</Link>
//               </font>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

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
import {
  recruiterSignupFormSchema,
  seekerSignupFormSchema,
} from "@/_lib/validator";
import SearchSelectDropdown from "@/Components/Forms/SearchSelectDropdown";
import PhoneInput from "react-country-phone-input";
import "react-country-phone-input/lib/style.css";
// import "react-phone-input-2/lib/material.css";

type Schema = z.infer<typeof seekerSignupFormSchema>;

const Signup = () => {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const [formData, setFormData] = useState<{
    phone_number: string;
    technical_skills: string[];
    // confirm_password: string;
  }>({
    phone_number: "",
    technical_skills: [],
    // confirm_password: "",
  });

  const handleChange = (key: string, value: string) => {
    if (key === "phone_number") {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(seekerSignupFormSchema),
    defaultValues: formData,
  });

  const onSubmit = async (data: Schema) => {
    console.log("registering");
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      phone_number,
      location,
      experience,
      how_heard_about_codeunity,
    } = data;
    const { technical_skills } = formData;
    // console.log(first_name, last_name, email, working_email, username, password, phone_number, how_heard_about_codeunity, looking_for, technical_skills);
    let skills = "";
    for (let i = 0; i < technical_skills.length; i++) {
      if (i === technical_skills.length - 1) {
        skills += technical_skills[i];
      } else {
        skills += technical_skills[i] + ", ";
      }
    }

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
          experience,
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

      console.log("Signed up successfully");
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

  return (
    <div className="min-h-screen bg-gray-800 flex lg:flex-row flex-col gap-y-8 bg-bg3 bg-cover bg-no-repeat bg-center">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="text-center space-y-16 px-10">
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
        <div className="md:text-3xl sm:text-2xl text-xl text-primary-700 leading-relaxed  tracking-tighter font-bold sm:ml-2 lg:mb-2">
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

            {/* <div className="flex flex-col flex-1">
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
            </div> */}

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
            {/* <div className="flex flex-col">
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
            </div> */}

            <div className="flex flex-col flex-1">
              <div className="flex gap-x-6 gap-y-4 max-[500px]:flex-col flex-row">
                <div className="flex flex-col flex-1">
                  <SignupFormInput
                    id="location"
                    name="location"
                    type="text"
                    label="Location"
                    register={register}
                    placeholder="Location"
                    req={true}
                    cls=""
                    errors={errors.location}
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <SignupFormInput
                    id="experience"
                    name="experience"
                    type="number"
                    label="Years of Experience"
                    register={register}
                    placeholder="Experience"
                    req={true}
                    cls=""
                    errors={errors.experience}
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <SearchSelectDropdown
                label="Search and add a skill"
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

          <p className="text-sm mt-2 mx-4">
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
