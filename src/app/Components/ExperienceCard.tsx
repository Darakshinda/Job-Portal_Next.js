"use client"
import React, { useState } from 'react';
import CompanySelect from './CompanySelect';
import ToggleSwitch from './ToggleSwitch';
import DateSelect from './DatePickerComponent';
import { format } from 'date-fns';

interface ExperienceCardProps {
  company: string;
  title: string;
  start: Date | null;currentlyWorking:boolean;
  end: Date | null;
  description: string;Exps:object[];ind:number;
  update:Function;del:Function;flgedit:boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ company, title, start=null, end=null, description,currentlyWorking,ind,update,flgedit,del }) => {
    const [edit, setedit] = useState(false);const buttonbg='rgb(30, 7, 94)',buttondiv="flex space-x-4",labelcls="block text-sm font-medium text-[16px] font-bold";
    
    const handle = (key: string, value: string,obj:object,setObj:Function) => {

        if(obj[key]===value) return;
        setObj({...obj,[key]: value,});
         
      };

      const [expdef, setexpdef] = useState({
        company: company,title:title,start:start,end:end,currentlyWorking:currentlyWorking,desc: description,
      });
      const [exp, setexp] = useState(expdef);

      

      const formatDate = (date: Date | null) => {
        return date ? format(date, 'MMM yyyy') : '';
      };

      const updater = (exps: object[]) => {
        update(exps)
      };

      let startStr=formatDate(start),endStr=formatDate(end);
if(exp.currentlyWorking) endStr='Present';
  
return (
    <div>
    {!edit&&<div className="border rounded-lg p-4 shadow-md flex justify-between items-start hover:border-purple-400 bg-black mt-[9px]">
      <div className="flex items-start">
        
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <a href={`https://${company.toLowerCase().replace(/\s+/g, '')}.com`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {company}
          </a>
          <div className="text-white">{startStr} to {endStr}</div>
          <p className="mt-2 text-[11px]">{description}</p>
        </div>
      </div>
      <div>
        <button className="text-sm text-blue-600 hover:underline" onClick={(e)=>setedit(true)}>Edit</button>
      </div>
    </div>}
    {edit&&
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 bg-[black] p-[8px] border  border-white rounded">

        <div className="sm:col-span-2">
            <label htmlFor="website" className={labelcls}>Company*</label>
            <CompanySelect handle={(val:string)=>{handle('company',val,exp,setexp);}} val={exp.company || ''} />
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="website" className={labelcls}>Title*</label>
            <input
              className="mt-1 h-[35px] w-full rounded-md border border-gray-400 p-4"
              value={exp.title}
              onChange={(e)=>handle('title',e.target.value,exp,setexp)}
            /></div>
        
          <div className="sm:col-span-2">
            <label htmlFor="website" className={labelcls}>Start date*</label>
            <DateSelect value={exp.start} handleChange={(val:string)=>{handle('start',val,exp,setexp);}}/>
          </div>

          <div className="sm:col-span-2">
            {!exp.currentlyWorking && <div><label htmlFor="website" className={labelcls}>End date*</label>
            <DateSelect value={exp.end} handleChange={(val:string)=>{handle('end',val,exp,setexp);}}/></div>}
            <div className="mt-[14px] flex flex-row align-center items-center"><ToggleSwitch isChecked={exp.currentlyWorking} onToggle={(val:boolean)=>{handle('currentlyWorking',val,exp,setexp);}} />
            <span className="ml-[4px]">I currently work here</span></div></div>

          <div className="sm:col-span-2">
            <label htmlFor="website" className={labelcls}>Description</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 border border-gray-400 p-4 min-h-[205px]"
              placeholder="Description"
              value={exp.desc}
              onChange={(e)=>handle('desc',e.target.value,exp,setexp)}
            />
          </div>

          

       <div className={buttondiv}>
    
    
    <button className="text-white font-bold py-2 px-8 rounded" style={{backgroundColor:buttonbg}} onClick={(e)=>{setexp(expdef);setedit(false)}}>
      Cancel
    </button>
    <button className="bg-purple-500 text-white font-bold px-8 rounded" style={{backgroundColor:buttonbg}} 
    onClick={(e)=>{update(ind,exp);flgedit(true);setexpdef(exp);
    setedit(false);}}>
      Save
    </button>
    <button className="text-white text-[12px] ml-[11px] font-bold"
     onClick=
     {(e)=>{if (window.confirm('Are you sure you want to delete this Experience?'))
            {del(ind);flgedit(false);}}}>
      Remove Experience
    </button>
  </div>
        </div> }


    </div>
  );
};

export default ExperienceCard;
