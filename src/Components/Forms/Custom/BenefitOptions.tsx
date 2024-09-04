import React, { useState, useEffect } from "react";

interface BenefitOptionsProps {
  selected?: string[];
  options: string[];
  onChange: (benefits: string[]) => void;
}

const BenefitOptions = ({
  selected,
  options,
  onChange,
}: BenefitOptionsProps) => {
  // console.log("Options: ", options);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [displayedOptions, setDisplayedOptions] = useState<string[]>([]);
  let [excessTagsCount, setExcessTagsCount] = useState<number>(0);

  const displayTagsLength = 10;
  const increment = 5;

  const removeEmojis = (text: string) => {
    return text.replace(
      /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu,
      ""
    );
  };

  const handleExpansion = () => {
    if (excessTagsCount > increment) {
      setDisplayedOptions(
        options.slice(0, displayedOptions.length + increment)
      );
      setExcessTagsCount((prev) => prev - increment);
    } else if (excessTagsCount <= increment && excessTagsCount > 0) {
      setDisplayedOptions(options);
      setExcessTagsCount(0);
    } else {
      setDisplayedOptions(options.slice(0, displayTagsLength));
      setExcessTagsCount(options.length - displayTagsLength);
    }
  };

  const handleOptionClick = (option: string) => {
    const normalizedOption = removeEmojis(option);
    const normalizedSelectedOptions = selectedOptions.map(removeEmojis);

    let newSelectedOptions: string[];

    if (normalizedSelectedOptions.includes(normalizedOption)) {
      newSelectedOptions = selectedOptions.filter(
        (item) => removeEmojis(item) !== normalizedOption
      );
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  // Initialize selected options when 'selected' prop changes
  useEffect(() => {
    if (selected && selected.length !== 0) {
      setSelectedOptions(selected);
    }
  }, [selected]);

  // Initialize displayed options and excess count when 'options' prop changes
  useEffect(() => {
    setDisplayedOptions(options.slice(0, displayTagsLength));
    setExcessTagsCount(Math.max(0, options.length - displayTagsLength));
  }, [options]);

  return (
    <div className="flex flex-wrap items-center">
      {displayedOptions.map((option, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleOptionClick(option)}
          className={`m-1 px-2 py-1.5 ${
            selectedOptions.some(
              (selected) => removeEmojis(selected) === removeEmojis(option)
            )
              ? "bg-blue-100 text-blue-500"
              : "bg-gray-100 text-gray-500"
          } border rounded-md inline-flex items-center text-sm cursor-pointer font-semibold transition-colors duration-150`}
        >
          {option}
        </button>
      ))}
      <button
        type="button"
        onClick={handleExpansion}
        className={`text-blue-500 text-xs font-semibold h-fit px-2.5 py-1 hover:bg-gray-200 rounded-full transition-colors duration-150`}
      >
        {excessTagsCount ? `+${excessTagsCount}` : "Show less"}
      </button>
    </div>
  );
};

export default BenefitOptions;
