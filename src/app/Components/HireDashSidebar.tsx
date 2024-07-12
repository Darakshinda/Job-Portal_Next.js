"use client"
import React, { useState } from 'react';
import ClickOutsideDiv from './ClickoutsideDiv';

const Sidebar: React.FC = () => {
  const [showTrialOptions, setShowTrialOptions] = useState(false);

  return (
    <div className="bg-gray-900 text-white h-screen w-64 fixed flex flex-col  min-w-[230px] border-r min-h-screen">
      <div className="p-4 font-bold text-xl">CodeUnity</div>
      <nav className="flex-grow">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <a href="#">Home</a>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <a href="#">Posted Jobs</a>
          </li>
        </ul>
      </nav>
      <div className="p-4">
      {showTrialOptions && (
          
            <ClickOutsideDiv onOutsideClick={() => setShowTrialOptions(!showTrialOptions)}>
              <div className="mt-2 bg-gray-800">
            <button className="block w-full text-left p-2 hover:bg-gray-700">Profile</button>
            <button className="block w-full text-left p-2 hover:bg-gray-700">Logout</button>
          </div>
          </ClickOutsideDiv>
        )}
        <button
          className="flex items-center p-2 w-full hover:bg-gray-700"
          onClick={() => setShowTrialOptions(!showTrialOptions)}
        >
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-[4px]">
            <div className="w-[35px] rounded-full border border-black"><img src={`https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg`} /></div>
          </div>
          User
        </button>
       
      </div>
    </div>
  );
};

export default Sidebar;
