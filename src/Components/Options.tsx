import { set } from "date-fns";
import React, { useState, useEffect } from "react";

interface SelectedOptionsProps {
  selected?: string[];
  options: string[];
  name: string;
  onChange: (benefits: string[]) => void;
}

const SelectedOptions: React.FC<SelectedOptionsProps> = ({
  selected,
  options,
  name,
  onChange,
}) => {
  // console.log("Options: ", options);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const displayTagsLength = 10;
  const increament = 5;

  const [displayedOptions, setDisplayedOptions] = useState<string[]>([]);
  let [excessTagsCount, setExcessTagsCount] = useState<number>(0);

  const handleExpansion = () => {
    if (excessTagsCount > increament) {
      setDisplayedOptions(
        options.slice(0, displayedOptions.length + increament)
      );
      excessTagsCount -= increament;
      setExcessTagsCount(excessTagsCount);
    } else if (excessTagsCount < increament && excessTagsCount > 0) {
      setDisplayedOptions(
        options.slice(0, displayedOptions.length + excessTagsCount)
      );
      excessTagsCount = 0;
      setExcessTagsCount(excessTagsCount);
    } else {
      setDisplayedOptions(options.slice(0, displayTagsLength));
      excessTagsCount = options.length - displayTagsLength;
      setExcessTagsCount(excessTagsCount);
    }
  };

  const removeEmojis = (text: string) => {
    return text.replace(
      /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu,
      ""
    );
  };

  const handleOptionClick = (option: string) => {
    const normalizedOption = removeEmojis(option);
    const normalizedSelectedOptions = selectedOptions.map(removeEmojis);

    let newBenefitOptions: string[];

    if (normalizedSelectedOptions.includes(normalizedOption)) {
      // Remove the option by its original string with emojis
      newBenefitOptions = selectedOptions.filter(
        (item) => removeEmojis(item) !== normalizedOption
      );
    } else {
      // Add the option by its original string with emojis
      newBenefitOptions = [...selectedOptions, option];
    }

    setSelectedOptions(newBenefitOptions);
    onChange(newBenefitOptions);
  };

  useEffect(() => {
    if (selected) {
      setSelectedOptions(selected);
    }
    setDisplayedOptions(options.slice(0, displayTagsLength)); // Initialize displayed options when options change
    setExcessTagsCount(options.length - displayTagsLength); // Initialize excess count when options change
  }, [selected, options]);

  console.log("Selected: ", selectedOptions);
  // console.log("Options: ", displayedOptions);

  return (
    <div className="flex flex-wrap">
      {displayedOptions.map((option, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleOptionClick(option)}
          className={`m-1 px-2 py-1.5 ${
            selectedOptions.some(
              (selected) => removeEmojis(selected) === removeEmojis(option)
            )
              ? "bg-red-500"
              : "bg-gray-500"
          } border rounded-xl text-sm cursor-pointer text-white`}
        >
          {option}
        </button>
      ))}
      <button
        type="button"
        onClick={handleExpansion}
        className={`text-primary-500 text-xs font-semibold h-fit px-4 py-2 mt-1.5 hover:bg-gray-200 rounded-full transition-colors duration-150`}
      >
        {excessTagsCount ? `+${excessTagsCount}` : "Show less"}
      </button>
    </div>
  );
};

export default SelectedOptions;
