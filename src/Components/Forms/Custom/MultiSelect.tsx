import React, { useState, useEffect } from "react";

interface MultiSelectProps {
  options: string[];
  onSelectionChange: (selectedOptions: string[]) => void;
  val: string[] | undefined;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onSelectionChange,
  val,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selfDescribe, setSelfDescribe] = useState<string>("");

  useEffect(() => {
    if (val && val !== selectedOptions) {
      setSelectedOptions(val);
    }
  }, [val, selectedOptions]);

  const handleCheckboxChange = (option: string) => {
    let updatedSelectedOptions;
    if (option === "Self-describe") {
      updatedSelectedOptions = selectedOptions.includes(selfDescribe)
        ? selectedOptions.filter(
            (selectedOption) => selectedOption !== selfDescribe
          )
        : [...selectedOptions, selfDescribe];
    } else {
      updatedSelectedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((selectedOption) => selectedOption !== option)
        : [...selectedOptions, option];
    }

    setSelectedOptions(updatedSelectedOptions);
    onSelectionChange(updatedSelectedOptions);
  };

  const handleSelfDescribeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSelfDescribe(value);
    if (selectedOptions.includes(selfDescribe)) {
      const updatedSelectedOptions = selectedOptions.map((option) =>
        option === selfDescribe ? value : option
      );
      setSelectedOptions(updatedSelectedOptions);
      onSelectionChange(updatedSelectedOptions);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option} className="mt-2 text-[14px]">
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.includes(
                option === "Self-describe" ? selfDescribe : option
              )}
              onChange={() => handleCheckboxChange(option)}
              className="bg-red-500 mr-2"
            />
            {option}
          </label>
          <br />
          {option === "Self-describe" &&
            selectedOptions.includes(selfDescribe) && (
              <input
                className="mt-1 h-[35px] w-full rounded-md border-gray-300 border p-4"
                type="text"
                value={selfDescribe}
                onChange={handleSelfDescribeChange}
                placeholder="Please describe"
              />
            )}
        </div>
      ))}
    </div>
  );
};

export default MultiSelect;
