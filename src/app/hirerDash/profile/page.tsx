"use client"

import Sidebar from '@/app/Components/HireDashSidebar'
import { useRouter } from 'next/navigation'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

const ProfileHirer = () => {
  const [userName, setUserName] = useState<string>("");
  const Router = useRouter();
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const getUserName = () => {
    const token = localStorage.getItem('access_token');
    if (!token){
      Router.push('/login');
    }
    axios.get(`${baseurl}/accounts/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      setUserName(response.data.first_name);
    })
    .catch((error) => {
      console.log(error.response.data || error.message);
    })
  }

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div className='bg-[#10161e] h-full w-full'>
      <Sidebar userName={userName}/>
      <div className="md:pl-[15%] sm:pl-[19%]">
        <form className="space-y-6 p-6 shadow-md">
          <h2 className="text-purple-600 text-bold text-3xl">Profile</h2>
        </form>
      </div>
    </div>
  )
}

export default ProfileHirer