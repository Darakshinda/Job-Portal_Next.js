// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { profile } from "console";
// import {
//   FaGithub,
//   FaLinkedin,
//   FaEdit,
//   FaTelegram,
//   FaGlobe,
// } from "react-icons/fa";
// import Link from "next/link";
// import Sidebar from "../../../Components/HireDashSidebar";
// import Image from "next/image";
// import Spinner from "@/Components/Spinner";

// interface ProfileData {
//   first_name: string;
//   last_name: string;
//   phone_number: string;
//   location: string;
//   linkedin: string | null;
//   instagram: string | null;
//   bio?: string | null;
//   telegram: string | null;
//   github: string | null;
//   gender: string | null;
//   spoken_languages?: string | null;
//   available_for_work_from_date?: string | null;
//   preferred_annual_pay?: string | null;
//   preferred_hourly_pay?: string | null;
//   years_of_experience?: number | null;
//   profile_picture: string | null;
//   account_type?: string;
//   designation?: string;
//   company_name?: string;
//   company_stage?: string;
//   company_description?: string;
//   product_service?: string;
//   website?: string;
//   // Add other fields as per your API response
// }

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// const ProfilePage = () => {
//   const [profileData, setProfileData] = useState<ProfileData | null>(null);
//   const [isHirer, setIsHirer] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const accessToken = localStorage.getItem("access_token");
//         //const accountType = localStorage.getItem('account_type');

//         if (!accessToken) {
//           throw new Error("Access token or account type not found");
//         }

//         const response = await axios.get(`${baseUrl}/accounts/profile/`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         setProfileData(response.data);
//         if (response.data.account_type === "job_hirer") {
//           setIsHirer(true);
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (!profileData) {
//     return (
//       <div className="flex items-center justify-center w-full h-[100dvh]">
//         <Spinner />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white flex">
//       <div className="w-full flex-1 py-6 flex justify-center">
//         <div className="bg-[#fffff0] shadow-lg rounded-lg py-6 px-12 w-4/5">
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center gap-2">
//               <Image
//                 className="w-16 h-16 rounded-full mr-4"
//                 src={
//                   profileData.profile_picture ||
//                   "https://via.placeholder.com/150"
//                 }
//                 alt="Profile Picture"
//                 width={64}
//                 height={64}
//               />
//               <div className="text-gray-700">
//                 <h2 className="text-2xl font-semibold">
//                   {profileData.first_name} {profileData.last_name}
//                 </h2>
//                 <p className="text-gray-500">
//                   {profileData.designation} • {profileData.company_name} •{" "}
//                   {profileData.company_stage}
//                 </p>
//                 {/* <button className="mt-1 px-4 py-0.5 bg-gray-200 text-gray-800 rounded-lg">
//                 Resume
//               </button> */}
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <Link href={`/profile/edit`}>
//                 <FaEdit
//                   size={20}
//                   className="text-gray-500 hover:text-orange-500 cursor-pointer"
//                 />
//               </Link>
//               <Link href={profileData.telegram as string}>
//                 <FaTelegram
//                   size={20}
//                   className="text-gray-500 hover:text-blue-500 cursor-pointer"
//                 />
//               </Link>
//               <Link href={profileData.github as string}>
//                 <FaGithub
//                   size={20}
//                   className="text-gray-500 hover:text-purple-600 cursor-pointer"
//                 />
//               </Link>
//               <Link href={profileData.linkedin as string}>
//                 <FaLinkedin
//                   size={20}
//                   className="text-gray-500 hover:text-blue-500 cursor-pointer"
//                 />
//               </Link>
//               <Link href={profileData.website as string}>
//                 <FaGlobe
//                   size={20}
//                   className="text-gray-500 hover:text-black cursor-pointer"
//                 />
//               </Link>
//             </div>
//           </div>
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold text-gray-700">
//               About Company
//             </h3>
//             <p className="text-gray-500">
//               {profileData.company_description || "No Details provided"}
//             </p>
//           </div>
//           <div className="mb-">
//             <h3 className="text-lg font-semibold text-gray-700">
//               Company Type
//             </h3>
//             <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 text-gray-500">
//               <span className="bg-gray-200/80 text-gray-600 px-2.5 py-1 rounded-full">
//                 {profileData.product_service} based -{" "}
//                 {profileData.company_stage}
//               </span>
//             </div>
//           </div>
//           {/* <div className="mb-4">
//             <h3 className="text-lg font-semibold text-gray-700">Achievements</h3>
//             <p className="text-gray-500">
//               Winner of 'Avadhan 2023' business case study competition conducted
//               as part of PARSEC 3.0; Finalists of 'DevHack 4.0' hackathon as part
//               of PARSEC 4.0.
//             </p>
//           </div>
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold text-gray-700">Education</h3>
//             <p className="text-gray-500">BEng, Electrical Engineering</p>
//             <p className="text-gray-500">Indian Institute Of Technology • 2025</p>
//           </div>
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
//             <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 text-gray-500">
//               <span className="bg-gray-200/80 text-gray-600 px-2.5 py-1 rounded-full">
//                 Python
//               </span>
//               <span className="bg-gray-200/80 text-gray-600 px-2.5 py-1 rounded-full">
//                 C++
//               </span>
//               <span className="bg-gray-200/80 text-gray-600 px-2.5 py-1 rounded-full">
//                 MongoDB
//               </span>
//               <span className="bg-gray-200/80 text-gray-600 px-2.5 py-1 rounded-full">
//                 Node.js
//               </span>
//               <span className="bg-gray-200/80 text-gray-600 px-2.5 py-1 rounded-full">
//                 Express.js
//               </span>
//               <span className="bg-gray-200/80 text-gray-600 px-2.5 py-1 rounded-full">
//                 React
//               </span>
//               <span className="bg-gray-200/80 text-gray-600 px-2.5 py-1 rounded-full">
//                 Matlab/Simulink
//               </span>
//               <span className="bg-gray-200/80 text-gray-600 px-2.5 py-1 rounded-full">
//                 MERN Stack - Javascript (ES5 & ES6), MongoDB, Express.Js, React,
//                 Node.Js
//               </span>
//             </div>
//           </div>
//           <div className="mb-4 text-gray-500">
//             <h3 className="text-lg font-semibold text-gray-700">Ideal next opportunity</h3>
//             <p>Desired Salary: US$16,719 / ₹1,400,000</p>
//             <p>Desired Role: Full-Stack Engineer</p>
//             <p>Remote Work: Onsite Or Remote</p>
//             <p>Desired Location: India (current)</p>
//             <div className="mb-4">
//               <h4 className="text-lg font-semibold text-gray-700">Desired Tech Stack</h4>
//               <div className="flex flex-wrap gap-2">
//                 <span className="bg-gray-200/80 rounded-full text-gray-500 px-2.5 py-1.5">
//                   Node.js
//                 </span>
//                 <span className="bg-gray-200/80 rounded-full text-gray-500 px-2.5 py-1.5">
//                   React
//                 </span>
//                 <span className="bg-gray-200/80 rounded-full text-gray-500 px-2.5 py-1.5">
//                   Express.js
//                 </span>
//                 <span className="bg-gray-200/80 rounded-full text-gray-500 px-2.5 py-1.5">
//                   C++
//                 </span>
//                 <span className="bg-gray-200/80 rounded-full text-gray-500 px-2.5 py-1.5">
//                   Python
//                 </span>
//               </div>
//             </div>
//             <div className="mb-4">
//               <h4 className="text-lg font-semibold text-gray-700">Desired Company Size</h4>
//               <div className="flex flex-wrap gap-2">
//                 <span className="bg-gray-200/80 text-gray-500 px-2.5 py-1.5 rounded-full">
//                   51-200
//                 </span>
//                 <span className="bg-gray-200/80 text-gray-500 px-2.5 py-1.5 rounded-full">
//                   201-500
//                 </span>
//                 <span className="bg-gray-200/80 text-gray-500 px-2.5 py-1.5 rounded-full">
//                   501-1000
//                 </span>
//                 <span className="bg-gray-200/80 text-gray-500 px-2.5 py-1.5 rounded-full">
//                   1000+
//                 </span>
//                 <span className="bg-gray-200/80 text-gray-500 px-2.5 py-1.5 rounded-full">
//                   Open to 11-50
//                 </span>
//                 <span className="bg-gray-200/80 text-gray-500 px-2.5 py-1.5 rounded-full text-red-600">
//                   Not interested in 1-10
//                 </span>
//               </div>
//             </div>
//             <div className="mb-4">
//               <h4 className="text-lg font-semibold text-gray-700">Wants</h4>
//               <ul className="list-disc list-inside text-gray-500">
//                 <li>To solve technical problems</li>
//                 <li>Company with clear roles</li>
//                 <li>To learn new things and develop skills</li>
//                 <li>Quiet office</li>
//                 <li>Progression to management</li>
//                 <li>Team members to learn from</li>
//                 <li>A flexible remote work policy</li>
//               </ul>
//             </div>
//           </div>*/}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaGithub, FaLinkedin, FaTelegram, FaGlobe } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/Components/Spinner";

type WorkExperience = {
  company_name: string;
  title: string;
  start_date: string;  // Change Date to string for simplicity
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

interface ProfileData {
  first_name: string;
  last_name: string;
  phone_number: string;
  location: string;
  email: string;
  linkedin: string | null;
  instagram: string | null;
  bio?: string | null;
  telegram: string | null;
  github: string | null;
  gender: string | null;
  available_for_work_from_date?: string | null;
  years_of_experience?: number | null;
  profile_picture: string | null;
  achievements?: string;
  account_type?: string;
  designation?: string;
  company_name?: string;
  company_stage?: string;
  company_description?: string;
  product_service?: string;
  website?: string;
  work_experience?: WorkExperience[];
  education?: Education[];
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await axios.get(`${baseUrl}/accounts/profile/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Map backend fields to the ProfileData structure
        const data = response.data;
        const mappedData: ProfileData = {
          ...data,
          education: data.education_details || [],
          work_experience: data.work_experience || [], 
        };

        setProfileData(mappedData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) {
    return (
      <div className="flex items-center justify-center w-full h-[100dvh]">
        <Spinner />
      </div>
    );
  }

  // Transform achievements to an array if it is a string
  const achievementsList: string[] = profileData.achievements
    ? profileData.achievements.split(',').map(item => item.trim())
    : [];

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-[#fffff0] shadow-lg rounded-lg py-6 px-12 w-4/5 max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Image
              src={
                profileData.profile_picture ||
                "/assets/images/default-profile.webp"
              }
              width={64}
              height={64}
              alt="Profile Picture"
              className="w-16 h-16 rounded-full mr-2"
            />
            <div className="text-gray-700">
              <h2 className="text-2xl font-semibold">
                {profileData.first_name} {profileData.last_name}
              </h2>
              <p className="text-gray-500">{profileData.email}</p>
              {profileData.account_type === "job_hirer" && (
                <p className="text-gray-500">
                  {profileData.designation} • {profileData.company_name} •{" "}
                  {profileData.company_stage}
                </p>
              )}
            </div>
          </div>

          <Link
            href="/profile/edit"
            title="Edit Profile"
            className="text-gray-500 hover:text-orange-500 hover:scale-110 transition-all duration-300 outline-none focus:outline-none focus:text-orange-500 focus:scale-110"
          >
            <FiEdit size={30} />
          </Link>
        </div>

        {/* Display phone number and location */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Contact Information</h3>
          <p className="text-gray-500">
            Phone: {profileData.phone_number || "Not provided"} <br />
            Location: {profileData.location || "Not specified"}
          </p>
        </div>

        {profileData.account_type === "job_hirer" && (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                About Company
              </h3>
              <p className="text-gray-500">
                {profileData.company_description || "No Details provided"}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Company Type
              </h3>
              <div className="flex text-sm font-semibold text-gray-500">
                <span className="bg-gray-200/80 text-gray-600 px-3 py-1.5 rounded-full">
                  {profileData.product_service} based -{" "}
                  {profileData.company_stage}
                </span>
              </div>
            </div>
          </>
        )}

        {profileData.account_type === "job_seeker" && (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Bio</h3>
              <p className="text-gray-500">
                {profileData.bio || "No Bio provided"}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Experience
              </h3>
              <p className="text-gray-500">
                {profileData.years_of_experience} years of experience
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Achievements
              </h3>
              <ul className="list-disc list-inside text-gray-500">
                {achievementsList.length > 0 ? (
                  achievementsList.map((achievement: string, index: number) => (
                    <li key={index}>{achievement}</li>
                  ))
                ) : (
                  "No achievements provided"
                )}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Work Experience
              </h3>
              {profileData.work_experience && profileData.work_experience.length > 0 ? (
                profileData.work_experience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <h4 className="font-semibold text-gray-700">
                      {exp.title} at {exp.company_name}
                    </h4>
                    <p className="text-gray-500">
                      {exp.start_date} - {exp.end_date ? exp.end_date : (exp.currently_working ? "Present" : "N/A")}
                    </p>
                    <p className="text-gray-500">{exp.description}</p>
                  </div>
                ))
              ) : (
                "No work experience provided"
              )}
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Education
              </h3>
              {profileData.education && profileData.education.length > 0 ? (
                profileData.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <h4 className="font-semibold text-gray-700">
                      {edu.degree} in {edu.major} from {edu.college_name}
                    </h4>
                    <p className="text-gray-500">
                      Graduated in {edu.year_of_graduation} with a GPA of {edu.gpa}
                    </p>
                  </div>
                ))
              ) : (
                "No education details provided"
              )}
            </div>
          </>
        )}

        <ul className="mt-5 flex flex-col gap-y-3">
          <div className="flex flex-col gap-4">
            <Link
              href={profileData.telegram || "#"}
              className="flex items-center gap-2.5 group w-fit px-1.5 py-0.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <FaTelegram
                size={20}
                className="text-gray-500 group-hover:text-blue-500 cursor-pointer"
              />
              <p className="text-sm text-gray-500 underline group-hover:text-blue-500 group-hover:decoration-2 focus:outline-none focus:decoration-2">
                Telegram
              </p>
            </Link>
            <Link
              href={profileData.github || "#"}
              className="flex items-center gap-2.5 group w-fit px-1.5 py-0.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <FaGithub
                size={20}
                className="text-gray-500 group-hover:text-blue-500 cursor-pointer"
              />
              <p className="text-sm text-gray-500 underline group-hover:text-blue-500 group-hover:decoration-2 focus:outline-none focus:decoration-2">
                Github
              </p>
            </Link>
            <Link
              href={profileData.linkedin || "#"}
              className="flex items-center gap-2.5 group w-fit px-1.5 py-0.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <FaLinkedin
                size={20}
                className="text-gray-500 group-hover:text-blue-500 cursor-pointer"
              />
              <p className="text-sm text-gray-500 underline group-hover:text-blue-500 group-hover:decoration-2 focus:outline-none focus:decoration-2">
                LinkedIn
              </p>
            </Link>
            <Link
              href={profileData.website || "#"}
              className="flex items-center gap-2.5 group w-fit px-1.5 py-0.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <FaGlobe
                size={20}
                className="text-gray-500 group-hover:text-blue-500 cursor-pointer"
              />
              <p className="text-sm text-gray-500 underline group-hover:text-blue-500 group-hover:decoration-2 focus:outline-none focus:decoration-2">
                Website
              </p>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
