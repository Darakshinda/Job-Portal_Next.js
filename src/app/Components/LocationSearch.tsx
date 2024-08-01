// components/LocationSearch.tsx
import React, { useState } from 'react';
import Select, { SingleValue, ActionMeta, InputActionMeta } from 'react-select';
import axios from 'axios';
import ClickOutsideDiv from './ClickoutsideDiv';

interface OptionType {
  value: string;
  label: string;
}

interface Props {
  handle: Function;val:string;
}



const LocationSearch: React.FC<Props> = ({handle,val}) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>({value:val,label:val});
  const [inputValue, setInputValue] = useState('');
  
  if(inputValue=='' && options.length) setOptions([]);
 
  const fetchOptions = async (input: string) => {
    if (!input) return;

    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json`, {
        params: {
          access_token: 'pk.eyJ1IjoicmFoMDdrdXJ1cCIsImEiOiJjbHoxNm9md2cybGhzMmtxcmN0anI1cmU5In0.OJaGtWazM-Nu-gwkl8MU8g',
          autocomplete: true,
        },
      });

      const newOptions = response.data.features.map((feature: any) => ({
        value: feature.place_name,
        label: feature.place_name,
      }));

      setOptions(newOptions);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action === 'input-change') {
      setInputValue(newValue);
      fetchOptions(newValue);
    }
  };



  const handleChange = (selected: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
    if (actionMeta.action === 'select-option') {
        setSelectedOption(selected);handle(selected?.value || '');setOptions([]);
        setInputValue(selected?.label || '');
     
    } else if (actionMeta.action === 'clear') {
      setSelectedOption(null);
      setInputValue('');
    }
  };

  return (
    <ClickOutsideDiv onOutsideClick={()=>{if(options.length)setOptions([])}}>
      <Select
        options={options}
        value={{value:val,label:val}}
        onInputChange={handleInputChange}
        onChange={handleChange}
        placeholder="Search for a location"
        isClearable
        menuIsOpen={options.length > 0}
        styles={{
          control: (styles) => ({...styles, backgroundColor: 'black', color: 'white'}),
          input: (styles) => ({...styles, color: 'white'}),
          singleValue: (styles) => ({...styles, color: 'white'}),
          option: (styles, isSelected) => {
            return {
              ...styles,
              backgroundColor: isSelected ? 'white' : 'black',
              color: isSelected ? 'black' : 'white',
            };
          }
        }}
      />
     
    </ClickOutsideDiv>
  );
};

export default LocationSearch;