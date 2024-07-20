// SelectedOptions.tsx
import React, { useState } from 'react';

interface Option {
  label: string;
  selected: boolean;
}

interface SelectedOptionsProps {
  options: Option[];keyy?:string;onChange:Function;
}

const SelectedOptions: React.FC<SelectedOptionsProps> = ({ options ,keyy,onChange}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(options);

  const handleOptionClick = (label: string) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.label === label ? { ...option, selected: !option.selected } : option
      )
    );
  };

  const getSelectedOptionsString = (): string => {
    return selectedOptions
      .filter((option) => option.selected)
      .map((option) => option.label)
      .join(', ');
  };
  const fun=(keyy:string)=>{onChange(keyy,getSelectedOptionsString());return "";}

  return (
    <div>
      <div>
        {selectedOptions.map((option) => (
          <button type='button'
            key={option.label}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: option.selected ? 'red' : 'white',
              border: '1px solid black',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => {handleOptionClick(option.label);}}
          >
            {option.label}
          </button>
        ))}
      </div><a>{fun(keyy)}</a>
    </div>
  );
};

export default SelectedOptions;
