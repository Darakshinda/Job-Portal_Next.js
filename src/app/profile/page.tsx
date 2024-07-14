"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiLinkedin, FiInstagram, FiGithub } from 'react-icons/fi'; // Import icons from react-icons
import { format } from 'date-fns'; // Example for date formatting

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
        const accessToken = localStorage.getItem('access_token');
        const accountType = localStorage.getItem('account_type');

        if (!accessToken || !accountType) {
          throw new Error('Access token or account type not found');
        }

        const response = await axios.get(`${baseUrl}/accounts/profile/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          params: {
            account_type: accountType
          }
        });

        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-3xl w-full mx-auto p-4 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4">{profileData.first_name} {profileData.last_name}</h1>
        
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <p className="mb-2"><strong>Phone Number:</strong> {profileData.phone_number}</p>
            <p className="mb-2"><strong>Location:</strong> {profileData.location}</p>
            <p className="mb-2"><strong>Gender:</strong> {profileData.gender || 'Not provided'}</p>
            <p className="mb-2"><strong>Years of Experience:</strong> {profileData.years_of_experience || 'Not provided'}</p>
            {/* Add more fields as needed */}
          </div>
          
          <div>
            <p className="mb-2"><strong>LinkedIn:</strong> {profileData.linkedin ? <a href={profileData.linkedin} target="_blank" className="text-blue-600"><FiLinkedin className="inline-block align-middle mr-1" /> LinkedIn</a> : 'Not provided'}</p>
            <p className="mb-2"><strong>Instagram:</strong> {profileData.instagram ? <a href={profileData.instagram} target="_blank" className="text-purple-600"><FiInstagram className="inline-block align-middle mr-1" /> Instagram</a> : 'Not provided'}</p>
            <p className="mb-2"><strong>Github:</strong> {profileData.github ? <a href={profileData.github} target="_blank" className="text-gray-800"><FiGithub className="inline-block align-middle mr-1" /> GitHub</a> : 'Not provided'}</p>
            {/* Add more social links as needed */}
          </div>
        </div>
        
        <div className="mt-4">
          <p className="mb-2"><strong>Bio:</strong> {profileData.bio || 'Not provided'}</p>
          <p className="mb-2"><strong>Spoken Languages:</strong> {profileData.spoken_languages || 'Not provided'}</p>
          <p className="mb-2"><strong>Available for Work From:</strong> {profileData.available_for_work_from_date ? format(new Date(profileData.available_for_work_from_date), 'MM/dd/yyyy') : 'Not provided'}</p>
          <p className="mb-2"><strong>Preferred Annual Pay:</strong> {profileData.preferred_annual_pay || 'Not provided'}</p>
          <p className="mb-2"><strong>Preferred Hourly Pay:</strong> {profileData.preferred_hourly_pay || 'Not provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
