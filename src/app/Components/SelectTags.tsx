// components/SearchableSelect.tsx
import React, { useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import 'tailwindcss/tailwind.css';

interface Option {
  value: string;
  label: string;
}

interface Props {
 
    options:Option[];phdr:string;handle:Function;
  }



const SelectTags: React.FC<Props> = ({options,phdr='Select Options',handle}) => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([]);
  const [flg, setflg] = useState(0);
  
  const handleSelectChange = (selected: MultiValue<Option> | SingleValue<Option>) => {
    setSelectedOptions(selected as MultiValue<Option>);setflg(1);
    

  };

  if(flg==1)
  {const valuesArray = selectedOptions.map(obj => obj.value);console.log(valuesArray);
    handle(valuesArray);setflg(0);}

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
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#E2E8F0',
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: '#1A202C',
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: '#A0AEC0',
            ':hover': {
              backgroundColor: '#CBD5E0',
              color: '#718096',
            },
          }),
        }}
      />
  
  );
};

export default SelectTags;
