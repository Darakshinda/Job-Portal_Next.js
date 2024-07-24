// SelectedOptions.tsx
import React, { useState, useEffect } from 'react';

interface Option {
  label: string;
  selected: boolean;
}

interface SelectedOptionsProps {
  options: Option[];
  keyy?: string;
  onChange: (key: string | undefined, value: string) => void;
}

const SelectedOptions: React.FC<SelectedOptionsProps> = ({ options, keyy, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(options);

  useEffect(() => {
    setSelectedOptions(options);
  }, [options]);

  useEffect(() => {
    onChange(keyy, getSelectedOptionsString());
  }, [selectedOptions, keyy, onChange]);

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

  return (
    <div>
      <div>
        {selectedOptions.map((option) => (
          <button
            type='button'
            key={option.label}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: option.selected ? 'red' : 'black',
              border: '1px solid black',
              borderRadius: '5px',
              cursor: 'pointer',
              color: 'white',
            }}
            onClick={() => handleOptionClick(option.label)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectedOptions;
