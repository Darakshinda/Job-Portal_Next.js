// components/SearchableSelect.tsx
import React from 'react';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface Props {
 
    options:Option[];phdr:string;
    handle: Function;
    
  }


const SearchableSelect: React.FC<Props> = ({options,phdr='Select an Option'}) => {
  return (
    <Select
      options={options}
      placeholder={phdr}
      isClearable
    />
  );
};

export default SearchableSelect;
