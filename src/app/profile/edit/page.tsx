"use client"
import UploadButton from "@/app/Components/ImgUpload";
import LocationSearch from "@/app/Components/LocationSearch";
import SearchableSelect from "@/app/Components/SearchableSelect";
import primRole from './data/primryRole.json';import expOpns from './data/expOpns.json';import skillsOpns from './data/skills.json';
import { useState } from "react";
import SelectTags from "@/app/Components/SelectTags";import Select, { MultiValue, SingleValue } from 'react-select';
import { TextInput } from "@/stories/TextInput";




const Home: React.FC = () => {
  const aboutFetch={
    name: "",locn: "faridabad",primrole: "",yrs: "",openroles:[],
    logo:'',bio:"",
  };
  const [about, setabout] = useState(aboutFetch);

  const socialmediaFetch={
    website: "",linkedin: "",github: "",twtr: "",
  };
  const [socialmedia, setsocialmedia] = useState(socialmediaFetch);

  const skillsFetch=[];
  const [skills, setskills] = useState(skillsFetch);  

  const achievementsFetch='';
  const [achievements, setachieve] = useState(achievementsFetch);

  const deepEqual = (obj1:object, obj2:object) => {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
  };

  const arraysEqual = (arr1: any[], arr2: any[]): boolean => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  };


  const handle = (key: string, value: string,obj:object,setObj:Function) => {

    if(obj[key]===value) return;
    setObj({...obj,[key]: value,});

  };

  console.log(about);
  const divcls='border-t border-t-black'

  return (
    <div className="max-w-[65%] mx-auto py-10 px-4 sm:px-6 lg:px-8">

      <div className="space-y-8 border border-black rounded-md mt-[5px] mb-[5px] p-[5%]">

      <div className={`flex flex-row`}>
        <div className="w-[35%]">
        <h2 className="text-lg font-medium text-gray-900">About</h2>
        <p className="text-sm text-gray-600">Tell us about yourself so startups know who you are.</p></div>

        <div className="w-[61%] ml-[4%]">
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">

          <div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">Your name*</label>
            <input
              className="mt-1 h-[35px] w-full rounded-md border border-gray-400 p-4"
              value={about.name}
              onChange={(e)=>handle('name',e.target.value,about,setabout)}
            />

            <div className="mt-[14px] flex flex-row align-center items-center">
              <UploadButton keyy="logo" resetflg val={about.logo} onChange={(key: string, value: string) => {handle(key,value,about,setabout);}}/>
            <span className="ml-[4px]">Upload your Profile pic</span></div>
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">Where are you based?*</label>
            <LocationSearch val={about.locn} handle={(val:string)=>{handle('locn',val,about,setabout);}}/>
          </div>

          <div className="flex flex-row w-[220%]">
          <div className="sm:col-span-2 w-[70%]">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">Select your primary role*</label>
            <SearchableSelect options={primRole} phdr="Select your primary role" handle={(val:string)=>{handle('primrole',val,about,setabout);}}/>
          </div>
          <div className="sm:col-span-2 w-[25%] ml-[5%]">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">Years*</label>
            <SearchableSelect options={expOpns} phdr='Experience' handle={(val:string)=>{handle('yrs',val,about,setabout);}}/>
          </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">Open to the following roles</label>
            <SelectTags options={primRole} phdr='Select Roles' handle={(val:any)=>{handle('openroles',val,about,setabout);}}/>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">Your bio</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 border border-gray-400 p-4 min-h-[205px]"
              placeholder="Stanford CS, Full stack generalist; launched a successful Android app, worked at Google"
              value={about.bio}
              onChange={(e)=>handle('bio',e.target.value,about,setabout)}
            />
          </div>

          {!deepEqual(about,aboutFetch) && <div className="flex space-x-4 p-4">
    <button className="bg-purple-500 text-white font-bold py-2 px-8 rounded" onClick={(e)=>setabout(aboutFetch)}>
      Reset
    </button>
    <button className="bg-purple-500 text-white font-bold px-8 rounded">
      Save
    </button>
  </div>}
        </div> 

        </div></div>

    <div className={`flex flex-row ${divcls}`}>
        <div className="w-[35%]">
        <h2 className="text-lg font-medium text-gray-900">Social Profiles</h2>
        <p className="text-sm text-gray-600">Where can people find you online?</p></div>

        <div className="w-[61%] ml-[4%]">
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">

<div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-4">
              <img src="https://img.freepik.com/free-vector/www-internet-globe-grid_78370-2008.jpg?size=338&ext=jpg&ga=GA1.1.1826414947.1720569600&semt=ais_hybrid" alt="Description of Image" className="w-[49px] h-[55px] object-cover rounded-lg shadow-md"/>
              <p className="text-gray-700">Website</p>
            </div>
            </label>
            <input
              className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4" placeholder="https://"
              onChange={(e)=>handle('website',e.target.value,socialmedia,setsocialmedia)}
            /></div>

<div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-4">
              <img src="https://banner2.cleanpng.com/20180518/yk/kisspng-computer-icons-linkedin-5aff0283a31f04.0344839015266617636682.jpg" alt="Description of Image" className="w-[49px] h-[55px] object-cover rounded-lg shadow-md"/>
              <p className="text-gray-700">LinkedIn</p>
            </div>
            </label>
            <input
              className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4" placeholder="https://linkedin.com/in/username"
              onChange={(e)=>handle('linkedin',e.target.value,socialmedia,setsocialmedia)}/></div>

<div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-4">
              <img src="https://static-00.iconduck.com/assets.00/github-icon-2048x2048-823jqxdr.png" alt="Description of Image" className="w-[49px] h-[55px] object-cover rounded-lg shadow-md"/>
              <p className="text-gray-700">GitHub</p>
            </div>
            </label>
            <input
              className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4" placeholder="https://github.com/username"
              onChange={(e)=>handle('github',e.target.value,socialmedia,setsocialmedia)}/></div>

<div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRVa8lLOwmvEjX6C_zHd7IzDOUShvDBpjLw&s" alt="Description of Image" className="w-[49px] h-[55px] object-cover rounded-lg shadow-md"/>
              <p className="text-gray-700">Twitter</p>
            </div>
            </label>
            <input
              className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4" placeholder="https://twitter.com/username"
              onChange={(e)=>handle('twtr',e.target.value,socialmedia,setsocialmedia)}/></div>

      {!deepEqual(socialmedia,socialmediaFetch) && <div className="flex space-x-4 p-4">
    <button className="bg-purple-500 text-white font-bold py-2 px-8 rounded">
      Reset
    </button>
    <button className="bg-purple-500 text-white font-bold px-8 rounded">
      Save
    </button>
  </div>}
        </div> 



        </div></div>

        <div className={`flex flex-row ${divcls}`}>
        <div className="w-[35%]">
        <h2 className="text-lg font-medium text-gray-900">Your Skills</h2>
        <p className="text-sm text-gray-600">This will help startups hone in on your strengths.</p></div>

        <div className="w-[61%] ml-[4%]">
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">

<div className="sm:col-span-2">

            <SelectTags options={skillsOpns} phdr='Select Roles' handle={setskills}/></div>

            {!arraysEqual(skills,skillsFetch) && <div className="flex space-x-4 p-4">
    <button className="bg-purple-500 text-white font-bold py-2 px-8 rounded">
      Reset
    </button>
    <button className="bg-purple-500 text-white font-bold px-8 rounded">
      Save
    </button>
  </div>}
        </div> 

        </div></div>

        <div className={`flex flex-row ${divcls}`}>
        <div className="w-[35%]">
        <h2 className="text-lg font-medium text-gray-900">Achievements</h2>
        <p className="text-sm text-gray-600">Sharing more details about yourself will help you stand out more.</p></div>

        <div className="w-[61%] ml-[4%]">
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">

<div className="sm:col-span-2">

          <textarea
              className="mt-1 block w-full rounded-md border-gray-300 border border-gray-400 p-4 min-h-[205px]"
              placeholder="It's OK to brag - e.g. I launched 3 successful Facebook apps which in total reached 2M+ users and generated $100k+ in revenue. I built everything from the front-end to the back-end and everything in between."
              onChange={(e)=>setachieve(e.target.value)}/></div>

      {achievements!=achievementsFetch && <div className="flex space-x-4 p-4">
    <button className="bg-purple-500 text-white font-bold py-2 px-8 rounded">
      Reset
    </button>
    <button className="bg-purple-500 text-white font-bold px-8 rounded">
      Save
    </button>
  </div>}
        </div> 

        </div></div>

    </div>
    </div>
  );
};

export default Home;