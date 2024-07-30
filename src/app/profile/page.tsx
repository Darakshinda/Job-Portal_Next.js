"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { profile } from "console";
import { FaGithub, FaLinkedin, FaEdit } from "react-icons/fa";
import Link from "next/link";

interface ProfileData {
  first_name: string;
  last_name: string;
  phone_number: string;
  location: string;
  linkedin: string | null;
  instagram: string | null;
  bio: string | null;
  telegram: string | null;
  github: string | null;
  gender: string | null;
  spoken_languages: string | null;
  available_for_work_from_date: string | null;
  preferred_annual_pay: string | null;
  preferred_hourly_pay: string | null;
  years_of_experience: number | null;
  // Add other fields as per your API response
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        //const accountType = localStorage.getItem('account_type');

        if (!accessToken) {
          throw new Error("Access token or account type not found");
        }

        const response = await axios.get(`${baseUrl}/accounts/profile/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="bg-black shadow-md rounded-lg p-6 max-w-3xl mx-auto">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <img className="w-16 h-16 rounded-full mr-4" src="https://via.placeholder.com/150" alt="Profile Picture"/>
        <div className="">
            <h2 className="text-2xl font-semibold">Praneeth Karthikeya Indana</h2>
            <p className="text-gray-600">India • 0.5 hours behind • Open to remote</p>
            <button className="mt-1 px-4 py-0.5 bg-gray-200 text-gray-800 rounded-lg">Resume</button>
        </div>
      </div>

      <div className="flex gap-2">
        <Link href={`/profile/edit`}>
        
        <FaEdit size={20} className="text-gray-300 hover:text-orange-500 cursor-pointer" />
        </Link>
        <Link href={profileData.github as string}>
        <FaGithub size={20} className="text-gray-300 hover:text-purple-600 cursor-pointer" />
        </Link>
        <Link href={profileData.linkedin as string}>
        <FaLinkedin size={20} className="text-gray-300 hover:text-blue-500 cursor-pointer" />
        </Link>
      </div>
    </div>
    <div className="mb-4">
        <h3 className="text-lg font-semibold">Looking for</h3>
        <p>Being a fresher, I would like to work at a place where I can work on challenging problems, building products and also learn new things and develop skills from others who are more experienced than me.</p>
    </div>
    <div className="mb-4">
        <h3 className="text-lg font-semibold">Achievements</h3>
        <p>Winner of 'Avadhan 2023' business case study competition conducted as part of PARSEC 3.0; Finalists of 'DevHack 4.0' hackathon as part of PARSEC 4.0.</p>
    </div>
    <div className="mb-4">
        <h3 className="text-lg font-semibold">Education</h3>
        <p>BEng, Electrical Engineering</p>
        <p>Indian Institute Of Technology • 2025</p>
    </div>
    <div className="mb-4">
        <h3 className="text-lg font-semibold">Skills</h3>
        <div className="flex flex-wrap gap-2">
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Python</span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">C++</span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">MongoDB</span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Node.js</span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Express.js</span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">React</span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Matlab/Simulink</span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">MERN Stack - Javascript (ES5 & ES6), MongoDB, Express.Js, React, Node.Js</span>
        </div>
    </div>
    <div className="mb-4">
        <h3 className="text-lg font-semibold">Ideal next opportunity</h3>
        <p>Desired Salary: US$16,719 / ₹1,400,000</p>
        <p>Desired Role: Full-Stack Engineer</p>
        <p>Remote Work: Onsite Or Remote</p>
        <p>Desired Location: India (current)</p>
        <div className="mb-4">
            <h4 className="text-lg font-semibold">Desired Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Node.js</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">React</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Express.js</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">C++</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Python</span>
            </div>
        </div>
        <div className="mb-4">
            <h4 className="text-lg font-semibold">Desired Company Size</h4>
            <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">51-200</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">201-500</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">501-1000</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">1000+</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Open to 11-50</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-red-600">Not interested in 1-10</span>
            </div>
        </div>
        <div className="mb-4">
            <h4 className="text-lg font-semibold">Wants</h4>
            <ul className="list-disc list-inside">
                <li>To solve technical problems</li>
                <li>Company with clear roles</li>
                <li>To learn new things and develop skills</li>
                <li>Quiet office</li>
                <li>Progression to management</li>
                <li>Team members to learn from</li>
                <li>A flexible remote work policy</li>
            </ul>
        </div>
    </div>
</div>
  );
};

export default ProfilePage;
