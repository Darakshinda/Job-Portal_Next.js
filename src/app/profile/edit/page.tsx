"use client"
import UploadButton from "@/app/Components/ImgUpload";
import LocationSearch from "@/app/Components/LocationSearch";
import SearchableSelect from "@/app/Components/SearchableSelect";
import primRole from './data/primryRole.json';import expOpns from './data/expOpns.json';import skillsOpns from './data/skills.json';
import pronouns from './data/pronouns.json';import genderOpns from './data/gender.json';import ethinicity from './data/ethinicity.json';
import { useState } from "react";
import SelectTags from "@/app/Components/SelectTags";import Select, { MultiValue, SingleValue } from 'react-select';
import { TextInput } from "@/stories/TextInput";
import Sidebar from "@/app/Components/HireDashSidebar";
import "./Stylin.css"
import ToggleSwitch from "@/app/Components/ToggleSwitch";
import MultiSelect from "@/app/Components/MultiSelect";




const Home: React.FC = () => {
  const [aboutFetch, setaboutFetch]=useState({
    name: "",locn: "faridabad",primrole: "",yrs: "",openroles:[],
    logo:'',bio:"",
  });
  const [about, setabout] = useState(aboutFetch);

  const [socialmediaFetch, setsocialmediaFetch]=useState({
    website: "",linkedin: "",github: "",twtr: "",
  });
  const [socialmedia, setsocialmedia] = useState(socialmediaFetch);

  const [skillsFetch, setskillsFetch]=useState([]);
  const [skills, setskills] = useState(skillsFetch);  
  
  const [achievementsFetch, setachieveFetch]=useState('');
  const [achievements, setachieve] = useState(achievementsFetch);

  const [identityFetch, setidentityFetch]=useState({
    pronouns: "",pronounsdisp: false,gender: "",ethnicity: [],
  });
  const [identity, setidentity] = useState(identityFetch);

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

  console.log(about);console.log(identity);
  const divcls='border-t border-t-white pt-[37px]',buttonbg='rgb(30, 7, 94)';

  return (

    <div><Sidebar/>
      
      <main className="grid w-full h-full pl-[240px]">
        <div className="min-h-screen bg-gray-900 text-white">
        
    <div className="max-w-[80%] mx-auto py-10 px-4 sm:px-6 lg:px-8">
   
      <div className="space-y-8 border border-white rounded-md mt-[5px] mb-[5px] p-[5%]">

      <div className={`flex flex-row`}>
        <div className="w-[35%]">
        <h2 className="text-lg font-medium ">About</h2>
        <p className="text-sm ">Tell us about yourself so startups know who you are.</p></div>

        <div className="w-[61%] ml-[4%]">
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
          
          <div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium ">Your name*</label>
            <input
              className="mt-1 h-[35px] w-full rounded-md border border-gray-400 p-4"
              value={about.name}
              onChange={(e)=>handle('name',e.target.value,about,setabout)}
            />
            
            <div className="mt-[14px] flex flex-row align-center items-center">
              <UploadButton imgsrc='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTloMhHd2WEOdSnlj28yN-agPUzYU4U1iGekw&s' bgcol='rgb(62, 62, 62)' buttonBg="rgb(30, 7, 94)" keyy="logo" resetflg val={about.logo} onChange={(key: string, value: string) => {handle(key,value,about,setabout);}}/>
            <span className="ml-[4px]">Upload your Profile pic</span></div>
            {about.logo!='' && <button className="text-white mt-[8px] font-bold py-2 px-8 rounded" onClick={(e)=>handle('logo','',about,setabout)} style={{backgroundColor:'rgb(30, 7, 94)'}}>
      Remove
    </button>}
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium ">Where are you based?*</label>
            <LocationSearch val={about.locn} handle={(val:string)=>{handle('locn',val,about,setabout);}}/>
          </div>

          <div className="flex flex-row w-[220%]">
          <div className="sm:col-span-2 w-[70%]">
            <label htmlFor="website" className="block text-sm font-medium ">Select your primary role*</label>
           <SearchableSelect options={primRole} phdr="Select your primary role" handle={(val:string)=>{handle('primrole',val,about,setabout);}} val={about.primrole}/>
          </div>
          <div className="sm:col-span-2 w-[25%] ml-[5%]">
            <label htmlFor="website" className="block text-sm font-medium ">Years*</label>
            <SearchableSelect options={expOpns} phdr='Experience' handle={(val:string)=>{handle('yrs',val,about,setabout);}} val={about.yrs}/>
          </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium ">Open to the following roles</label>
            <SelectTags options={primRole} phdr='Select Roles' handle={(val:any)=>{handle('openroles',val,about,setabout);}} val={about.openroles}/>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium ">Your bio</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 border border-gray-400 p-4 min-h-[205px]"
              placeholder="Stanford CS, Full stack generalist; launched a successful Android app, worked at Google"
              value={about.bio}
              onChange={(e)=>handle('bio',e.target.value,about,setabout)}
            />
          </div>

          {!deepEqual(about,aboutFetch) && <div className="flex space-x-4">
    <button className="text-white font-bold py-2 px-8 rounded" style={{backgroundColor:buttonbg}} onClick={(e)=>setabout(aboutFetch)}>
      Reset
    </button>
    <button className="bg-purple-500 text-white font-bold px-8 rounded" style={{backgroundColor:buttonbg}} onClick={(e)=>setaboutFetch(about)}>
      Save
    </button>
  </div>}
        </div> 

        </div></div>

    <div className={`flex flex-row ${divcls}`}>
        <div className="w-[35%]">
        <h2 className="text-lg font-medium ">Social Profiles</h2>
        <p className="text-sm ">Where can people find you online?</p></div>

        <div className="w-[61%] ml-[4%]">
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
          
<div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium ">
              <div className="flex items-center space-x-4">
              <img src="https://img.freepik.com/free-vector/www-internet-globe-grid_78370-2008.jpg?size=338&ext=jpg&ga=GA1.1.1826414947.1720569600&semt=ais_hybrid" alt="Description of Image" className="w-[49px] h-[55px] object-cover rounded-lg shadow-md"/>
              <p className="">Website</p>
            </div>
            </label>
            <input
              className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4" placeholder="https://"
              onChange={(e)=>handle('website',e.target.value,socialmedia,setsocialmedia)} value={socialmedia.website}
            /></div>

<div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium ">
              <div className="flex items-center space-x-4">
              <img src="https://banner2.cleanpng.com/20180518/yk/kisspng-computer-icons-linkedin-5aff0283a31f04.0344839015266617636682.jpg" alt="Description of Image" className="w-[49px] h-[55px] object-cover rounded-lg shadow-md"/>
              <p className="">LinkedIn</p>
            </div>
            </label>
            <input
              className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4" placeholder="https://linkedin.com/in/username"
              onChange={(e)=>handle('linkedin',e.target.value,socialmedia,setsocialmedia)} value={socialmedia.linkedin}/></div>

<div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium ">
              <div className="flex items-center space-x-4">
              <img src="https://static-00.iconduck.com/assets.00/github-icon-2048x2048-823jqxdr.png" alt="Description of Image" className="w-[49px] h-[55px] object-cover rounded-lg shadow-md"/>
              <p className="">GitHub</p>
            </div>
            </label>
            <input
              className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4" placeholder="https://github.com/username"
              onChange={(e)=>handle('github',e.target.value,socialmedia,setsocialmedia)} value={socialmedia.github}/></div>

<div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium ">
              <div className="flex items-center space-x-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRVa8lLOwmvEjX6C_zHd7IzDOUShvDBpjLw&s" alt="Description of Image" className="w-[49px] h-[55px] object-cover rounded-lg shadow-md"/>
              <p className="">Twitter</p>
            </div>
            </label>
            <input
              className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4" placeholder="https://twitter.com/username"
              onChange={(e)=>handle('twtr',e.target.value,socialmedia,setsocialmedia)} value={socialmedia.twtr}/></div>
      
      {!deepEqual(socialmedia,socialmediaFetch) && <div className="flex space-x-4">
    <button className="bg-purple-500 text-white font-bold py-2 px-8 rounded" onClick={(e)=>setsocialmedia(socialmediaFetch)} style={{backgroundColor:buttonbg}}>
      Reset
    </button>
    <button className="bg-purple-500 text-white font-bold px-8 rounded" onClick={(e)=>setsocialmediaFetch(socialmedia)} style={{backgroundColor:buttonbg}}>
      Save
    </button>
  </div>}
        </div> 

        

        </div></div>

        <div className={`flex flex-row ${divcls}`}>
        <div className="w-[35%]">
        <h2 className="text-lg font-medium ">Your Skills</h2>
        <p className="text-sm ">This will help startups hone in on your strengths.</p></div>

        <div className="w-[61%] ml-[4%]">
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
          
<div className="sm:col-span-2">
      
            <SelectTags options={skillsOpns} phdr='Select Roles' handle={setskills} val={skills}/></div>
      
            {!arraysEqual(skills,skillsFetch) && <div className="flex space-x-4">
    <button className="bg-purple-500 text-white font-bold py-2 px-8 rounded" onClick={(e)=>setskills(skillsFetch)} style={{backgroundColor:buttonbg}}>
      Reset
    </button>
    <button className="bg-purple-500 text-white font-bold px-8 rounded" onClick={(e)=>setskillsFetch(skills)} style={{backgroundColor:buttonbg}}>
      Save
    </button>
  </div>}
        </div> 

        </div></div>

        <div className={`flex flex-row ${divcls}`}>
        <div className="w-[35%]">
        <h2 className="text-lg font-medium ">Achievements</h2>
        <p className="text-sm ">Sharing more details about yourself will help you stand out more.</p></div>

        <div className="w-[61%] ml-[4%]">
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
          
<div className="sm:col-span-2">
      
          <textarea
              className="mt-1 block w-full rounded-md border-gray-300 border border-gray-400 p-4 min-h-[205px]"
              placeholder="It's OK to brag - e.g. I launched 3 successful Facebook apps which in total reached 2M+ users and generated $100k+ in revenue. I built everything from the front-end to the back-end and everything in between."
              onChange={(e)=>setachieve(e.target.value)} value={achievements}/></div>
      
      {achievements!=achievementsFetch && <div className="flex space-x-4">
    <button className="bg-purple-500 text-white font-bold py-2 px-8 rounded" onClick={(e)=>setachieve(achievementsFetch)} style={{backgroundColor:buttonbg}}>
      Reset
    </button>
    <button className="bg-purple-500 text-white font-bold px-8 rounded" onClick={(e)=>setachieveFetch(achievements)} style={{backgroundColor:buttonbg}}>
      Save
    </button>
  </div>}
        </div> 

        </div></div>


    <div className={`flex flex-row ${divcls}`}>
        <div className="w-[35%]">
        <h2 className="text-lg font-medium ">Identity</h2>
        <p className="text-sm ">At CodeUnity, we’re committed to helping companies hire in a more inclusive way. Part of that includes asking candidates to share demographic information so we can help recruiters understand and build their pipeline.

Self identifying is completely optional, and we'll handle your information with care. Your responses to gender and ethnicity will not be displayed on your profile, and displaying your pronouns is optional.</p></div>

        <div className="w-[61%] ml-[4%]">
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
          
<div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium ">
              <p className="">Pronouns</p>
            </label>
             <SearchableSelect options={pronouns} handle={(val:string)=>{handle('pronouns',val,identity,setidentity);}} val={identity.pronouns}/>
             </div>

<div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium ">
               <p className="">Gender Identity</p>
            </label>
            <SearchableSelect options={genderOpns} handle={(val:string)=>{handle('gender',val,identity,setidentity);}} val={identity.gender}/>
            <div className="mt-[14px] flex flex-row align-center items-center">
            <ToggleSwitch isChecked={identity.pronounsdisp} onToggle={(val:boolean)=>{handle('pronounsdisp',val,identity,setidentity);}} />
            <span className="ml-[4px]">Display pronouns on my profile</span></div>
           </div>

<div className="sm:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium ">
               <p className="">Race/Ethnicity</p>
               <p className="text-[11px]" style={{color:'rgb(175, 175, 175)'}}>You can select multiple</p>
            </label><br/>
            <MultiSelect options={ethinicity} onSelectionChange={(val:string)=>{handle('ethnicity',val,identity,setidentity);}} val={identity.ethnicity} />
            
           </div>


      
      {!deepEqual(identity,identityFetch) && <div className="flex space-x-4">
    <button className="bg-purple-500 text-white font-bold py-2 px-8 rounded" onClick={(e)=>setidentity(identityFetch)} style={{backgroundColor:buttonbg}}>
      Reset
    </button>
    <button className="bg-purple-500 text-white font-bold px-8 rounded" onClick={(e)=>setidentityFetch(identity)} style={{backgroundColor:buttonbg}}>
      Save
    </button>
  </div>}
        </div> 

        

        </div></div>


    </div>
    </div>


    </div></main></div>
  );
};

export default Home;
