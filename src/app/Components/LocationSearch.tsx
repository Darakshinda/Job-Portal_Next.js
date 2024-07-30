// components/LocationSearch.tsx
import React, { useState } from 'react';
import Select, { SingleValue, ActionMeta, InputActionMeta, components  } from 'react-select';
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
        setInputValue('');
     
    } else if (actionMeta.action === 'clear') {
      setSelectedOption(null);handle('');
      setInputValue('');
    }
  };

  const handleCreate = () => {
    const newOption = { value: inputValue, label: inputValue };
    setSelectedOption(newOption);
    handle(inputValue);
    setOptions([]);
    setInputValue('');
  };

  const CustomMenu = (props: any) => {
    return (
      <components.Menu {...props}>
        {props.children}
        {inputValue && (
          <div
            className="p-2 cursor-pointer border border-white rounded text-center"
            onMouseDown={(e) => {
              e.preventDefault();
              handleCreate();
            }}
          >
            Create "{inputValue}"
          </div>
        )}
      </components.Menu>
    );
  };

  return (
    <ClickOutsideDiv onOutsideClick={()=>{if(inputValue!='') {setOptions([]);setInputValue('')}}}>
      <div className="custom-select-container">
      <Select
        options={options}
        value={{value:val,label:val}}
        classNamePrefix="react-select"
        onInputChange={handleInputChange}
        onChange={handleChange}
        placeholder="Search for a location"
        isClearable
        menuIsOpen={(inputValue!='')}
        components={{ Menu: CustomMenu }}
      />
     </div>
    </ClickOutsideDiv>
  );
};

export default LocationSearch;
