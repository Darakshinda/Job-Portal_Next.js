import React, { useState, useEffect } from "react";

interface SelectedOptionsProps {
  options: string[]; // Array of strings (including emojis)
  name: string;
  onChange: (key: string, value: string) => void;
}

const SelectedOptions: React.FC<SelectedOptionsProps> = ({
  options,
  name,
  onChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Initialize as an array of strings

  // useEffect(() => {
  //   setSelectedOptions([]); // Reset selected options if options change
  // }, [options]);

  const handleOptionClick = (label: string) => {
    setSelectedOptions((prevSelected) => {
      const updatedSelected = prevSelected.includes(label)
        ? prevSelected.filter((option) => option !== label) // Remove if already selected
        : [...prevSelected, label]; // Add if not selected

      onChange(name, updatedSelected.join(", ")); // Call onChange with selected options as string
      return updatedSelected;
    });
  };

  return (
    <div>
      <div className="flex flex-wrap">
        {options.map((option, index) => (
          <button
            type="button"
            className={`m-1 px-2 py-1.5 ${
              selectedOptions.includes(option) ? "bg-red-500" : "bg-gray-500"
            } border rounded-xl text-sm cursor-pointer text-white`}
            key={index}
            onClick={() => handleOptionClick(option)}
          >
            {option} {/* Display the option label (with emoji) */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectedOptions;
