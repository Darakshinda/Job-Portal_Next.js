// components/SearchableSelect.tsx
import React, { useState } from 'react';
import Select, { SingleValue, ActionMeta, InputActionMeta } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface Props {
 
    options:Option[];phdr:string;
    handle: Function;val:string;
    
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


const SearchableSelect: React.FC<Props> = ({options,phdr='Select an Option',handle,val}) => {

  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>({value:val,label:val});


  
  const handleChange = (selected: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
    if (actionMeta.action === 'select-option') {
        handle(selected?.value || '');setSelectedOption({value:(selected?.label || ''),label:(selected?.label || '')})
     
    } else if (actionMeta.action === 'clear') {
      handle('');setSelectedOption({value:'',label:''})
    }}

    if(!deepEqual(selectedOption,{value:val,label:val})) setSelectedOption({value:val,label:val});


  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      placeholder={phdr}
      isClearable
      styles={{
        singleValue: (styles) => {
          return {
            ...styles,
            color: 'black',
          }
        },
        control: (styles) => {
          return {
            ...styles,
            backgroundColor: '#f3f4f6',
            color: 'black',
          }
        },
        option: (styles, isSelected) => {
          return {
            ...styles,
            backgroundColor: isSelected ? '#f3f4f6' : 'black',
            color: isSelected ? 'black' : '#f3f4f6',
          }
        }
      }}
    />
  );
};

export default SearchableSelect;