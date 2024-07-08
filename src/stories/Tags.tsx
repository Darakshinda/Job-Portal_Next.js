import React from 'react';
import Tag from '@/app/Components/Tag';
import ClickOutsideDiv from '@/app/Components/ClickoutsideDiv';
import "@/app/Components/Clickoutsidediv.css";

import { useState } from 'react';

interface Option {
  label: string;
}

interface Props {
 
    closeable?:boolean;linktg?:boolean;color?:string;dynamic?:boolean;size?:string;phdr: string;border?:string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;settgs?:Function;
    cls?: string;keyy?:string;
    options: Option[];
    req?: boolean;srchwdth?:string;scrollht?:string;
    optionMrgn:string;optionWdth:string;
  }

/*

*/
let mySet: Set<string> = new Set();

  export const Tags = ({closeable=false,linktg=false,color="white",dynamic=false,size="sm",cls = 'select',settgs=()=>{},
    phdr="Type a tag or keyword to search and add it",keyy,srchwdth="350px",scrollht="200px",border='',
    options,optionMrgn="1.5%",optionWdth="95%",
    req = false,}: Props) => 
      {
       
        const [searchTerm, setSearchTerm] = useState('');
        const [sel, setsel] = useState(0);
       
        
      const filt=(option:Option,)=>{
        
        return (option.label.toLowerCase().includes(searchTerm.toLowerCase())||option.label=="REGION"||option.label=="COUNTRIES")&&!mySet.has(option.label);}
      
        const filteredOptions = options.filter(option =>
          filt(option)
        );

    const [tags, setTags] = React.useState([]);
  const [typing, setTyping] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("$$");

  settgs(keyy,tags.join(","));

  const handleOutsideClick = () => {
    setsel(0);setSearchTerm("");
  };
   

  const removeTag = (tag:string) => {
    mySet.delete(tag);
    const nextTags = tags.filter(item => item !== tag);
    setTags(nextTags);
  };

  const addTag = () => {
    
    const nextTags = searchTerm ? [...tags, searchTerm] : tags;
    setTags(nextTags);
    setTyping(false);setInputValue("$$");setSearchTerm("");

  };

  const handleButtonClick = () => {
    setTyping(true);
  };
  
  if(inputValue=="done") addTag();


  const renderInput = () => {
      return (
        <div style={{display:"inline"}}>
      <input
        type="text"
        className={`search-input ${cls}`} style={{width:srchwdth,height:"2%",borderStyle:"none",}}
        placeholder={phdr}
        value={searchTerm}
        onChange={e => {setSearchTerm(e.target.value);setsel(1);}} onClick={e=>setsel(1)}
      /></div>
      );
   

  };
  const fun=(option:Option)=>{
    if(option.label=="REGION"||option.label=="COUNTRIES") return(<div><br/><p><b>{option.label}</b></p><br/></div>);
      if(option.label!="") return(
    <li><button onClick={()=>{setInputValue("done");setSearchTerm(option.label);setsel(0);mySet.add(option.label);}}>{option.label}</button></li>);}
  
    const printtag=(item:string,index:number)=>{
      return(
        <Tag tag={{label:item}} key={index} onRemove={() => removeTag(item)}>
          {item}
        </Tag>
      )}
 

  return (
    <ClickOutsideDiv onOutsideClick={handleOutsideClick}>
      
    <div  className={`searchable-select ${cls}`} style={{justifyItems:"center",border:border}}>
    {tags.map((item, index) => printtag(item,index))}
    {renderInput()}
  </div>
  {sel==1 && <div role="listbox" className="scrollable-div" style={{backgroundColor:`white`,marginLeft:optionMrgn,zIndex:"20000px", width:optionWdth,color:"black",maxHeight:scrollht}}><ul tabIndex={0} className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box`}>
  {filteredOptions.map(option => fun(option))}
</ul></div>}</ClickOutsideDiv>
    );
  
  };