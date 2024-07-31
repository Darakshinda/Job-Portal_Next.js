// components/SearchableSelect.tsx
import React, { useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import 'tailwindcss/tailwind.css';

interface Option {
  value: string;
  label: string;
}

interface Props {
 
    options:Option[];phdr:string;handle:Function;val:MultiValue<Option>;
  }

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

  const areArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    
    for(let i=0;i<arr1.length;i++)
      if(arr1[i]!=arr2[i].value)
      return false;
    return true;
  };



const SelectTags: React.FC<Props> = ({options,phdr='Select Options',handle,val}) => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>(val);
  const [flg, setflg] = useState(0);
  
  const handleSelectChange = (selected: MultiValue<Option> | SingleValue<Option>) => {
    setSelectedOptions(selected as MultiValue<Option>);setflg(1);
    

  };

  if(flg==1)
  {const valuesArray = selectedOptions.map(obj => obj.value);console.log(valuesArray);
    handle(valuesArray);setflg(0);}

    if(!areArraysEqual(val,selectedOptions)) 
      { const objectArray = val.map(item => ({
        value: item,
        label: item
                      }));
      
        setSelectedOptions(objectArray);}

  return (
    
      <Select
        classNamePrefix="react-select"
        options={options}
        placeholder={phdr}
        
        isSearchable
        isMulti
        value={selectedOptions}
        onChange={handleSelectChange}
        styles={{
          control: (provided) => ({
            ...provided,
            borderColor: 'border-gray-300',
            boxShadow: 'none',
            '&:hover': {
              borderColor: 'border-gray-400',
            },
            backgroundColor: '#f3f4f6',
            color: 'black',
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#E2E8F0',
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: '#1a202c',
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: '#A0AEC0',
            ':hover': {
              backgroundColor: '#CBD5E0',
              color: '#718096',
            },
          }),
          option: (styles, { isSelected }) => {
            return {
              ...styles,
              backgroundColor: isSelected ? 'black' : '#f3f4f6',
              color: isSelected ? '#f3f4f6' : 'black',
            };
          },
          input: (styles) => ({ ...styles, color: 'white' }),
        }}
      />
  
  );
};

export default SelectTags;