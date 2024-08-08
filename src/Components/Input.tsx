"use client"

import React, { useState } from 'react';

interface Option {
  label: string;
}

interface SearchableSelectInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  cls?: string;
  options: Option[];
  req?: boolean;
}

export const SearchableSelectInput: React.FC<SearchableSelectInputProps> = ({
  cls = 'select',
  value,
  onChange,
  options,
  req = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sel, setsel] = useState(0);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`searchable-select  ${cls}`}>
      <input
        type="text"
        className={`search-input ${cls}`} style={{width:"350px",borderStyle:"none"}}
        placeholder="Type a tag or keyword to search and add it"
        value={searchTerm}
        onChange={e => {setSearchTerm(e.target.value);setsel(1);}}
      />
{sel==1 && <ul tabIndex={0} className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box`} style={{backgroundColor:`white`}}>
        {filteredOptions.map(option => (
          <li><button onClick={()=>{setSearchTerm(option.label);setsel(0);}}>{option.label}</button></li>
          
        ))}
      </ul>}
 
</div>
  );
};