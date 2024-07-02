import React from 'react';
import Tag from '@/app/Components/Tag';
import ClickOutsideDiv from '../app/Components/ClickoutsideDiv';
import "../app/Components/Clickoutsidediv.css";

import { useState } from 'react';

interface Option {
  label: string;
}

interface Props {
 
    closeable?:boolean;linktg?:boolean;color?:string;dynamic?:boolean;size?:string;phdr: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;settgs?:Function;
    cls?: string;keyy?:string;
    options: Option[];
    req?: boolean;
  }

/*

*/
let mySet: Set<string> = new Set();
  export const Tags = ({closeable=false,linktg=false,color="white",dynamic=false,size="sm",cls = 'select',settgs=()=>{},
    phdr="Type a tag or keyword to search and add it",keyy,
    options,
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
        className={`search-input ${cls}`} style={{width:"350px",borderStyle:"none"}}
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
  
  if(size=="lg")
    return(
    <Tag closable={closeable} className="badge badge-outline bg-yellow-100" style={{backgroundColor:`${color}`,height:"40px",width:"66px"}}>
        {linktg&&<a target="_blank" href="https://rsuitejs.com" rel="noreferrer">Link-Tag</a>}
        {!linktg&&"Tag"}
    </Tag>);

   if(size=="md")
    return(
    <Tag closable={closeable} size="sm" className="badge badge-outline bg-yellow-100" style={{backgroundColor:`${color}`,height:"30px",width:"50px"}}>
        {linktg&&<a target="_blank" href="https://rsuitejs.com" rel="noreferrer">Link-Tag</a>}
        {!linktg&&"Tag"}
    </Tag>);

  if(!dynamic) 
    return(
    <Tag closable={closeable} className="badge badge-outline bg-yellow-100" style={{backgroundColor:`${color}`}}>
        {linktg&&<a target="_blank" href="https://rsuitejs.com" rel="noreferrer">Link-Tag</a>}
        {!linktg&&"Tag"}
    </Tag>);
   
  
  return (
    <ClickOutsideDiv onOutsideClick={handleOutsideClick}><div  className={`searchable-select ${cls}`} style={{justifyItems:"center",backgroundSize:"cover",}}>
    {tags.map((item, index) => printtag(item,index))}
    {renderInput()}
  </div>
  {sel==1 && <div role="listbox" className="scrollable-div" style={{backgroundColor:`white`,marginLeft:"1.5%",zIndex:"20000px", maxWidth:"95%"}}><ul tabIndex={0} className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box`}>
  {filteredOptions.map(option => fun(option))}
</ul></div>}</ClickOutsideDiv>
    );
  
  };