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
  start_date: string; // Change Date to string for simplicity
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
          work_experience: data.work_experience_details || [],
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
    ? profileData.achievements.split(",").map((item) => item.trim())
    : [];

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-white py-8 ps-[4.5rem]">
      <div className="bg-[#fffff0] shadow-lg rounded-lg py-6 px-12 w-4/5 max-w-5xl border border-gray-200">
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
          <h3 className="text-lg font-semibold text-gray-700">
            Contact Information
          </h3>
          <p className="text-gray-500">
            Phone: {profileData.phone_number || "Not provided"} <br />
          </p>
          {profileData.account_type === "job_seeker" && (
            <p className="text-gray-500">Location: {profileData.location}</p>
          )}
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
                {Math.floor(Number(profileData.years_of_experience))} years of
                experience
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Achievements
              </h3>
              <ul className="list-disc list-inside text-gray-500">
                {achievementsList.length > 0
                  ? achievementsList.map(
                      (achievement: string, index: number) => (
                        <li key={index}>{achievement}</li>
                      )
                    )
                  : "No achievements provided"}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Work Experience
              </h3>
              {profileData.work_experience &&
              profileData.work_experience.length > 0
                ? profileData.work_experience.map((exp, index) => (
                    <div key={index} className="mb-3">
                      <h4 className="font-semibold text-gray-700">
                        {exp.title} at {exp.company_name}
                      </h4>
                      <p className="text-gray-500">
                        {exp.start_date} -{" "}
                        {exp.end_date
                          ? exp.end_date
                          : exp.currently_working
                            ? "Present"
                            : "N/A"}
                      </p>
                      <p className="text-gray-500">{exp.description}</p>
                    </div>
                  ))
                : "No work experience provided"}
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Education</h3>
              {profileData.education && profileData.education.length > 0
                ? profileData.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <h4 className="font-semibold text-gray-700">
                        {edu.degree} in {edu.major} from {edu.college_name}
                      </h4>
                      <p className="text-gray-500">
                        Graduated in {edu.year_of_graduation} with a GPA of{" "}
                        {edu.gpa}
                      </p>
                    </div>
                  ))
                : "No education details provided"}
            </div>
          </>
        )}

        <ul className="mt-5 flex flex-col gap-y-3">
          <div className="flex flex-col gap-1">
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
