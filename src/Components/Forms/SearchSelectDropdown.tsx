"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import ClickOutsideDiv from "../ClickoutsideDiv";

type SearchSelectDropdownProps = {
  usingIn?: string;
  req?: boolean;
  label?: string;
  tags: string[];
  cls?: string;
  labelcls?: string;
  onChange?: (tags: string[]) => void;
  onSingleChange?: (key: string, tag: string) => void;
  multiple?: boolean;
  name?: string;
  placeholder?: string;
  description?: string;
  displayTagsLength?: number;
  selected?: string;
  existingTags?: string[];
};

const SearchSelectDropdown: React.FC<SearchSelectDropdownProps> = ({
  usingIn = "other",
  req = true,
  label,
  tags,
  cls,
  labelcls,
  name,
  onChange,
  onSingleChange,
  multiple = true,
  placeholder = "Search for a tag...",
  description,
  displayTagsLength = 10,
  selected,
  existingTags,
}) => {
  const techTags = tags;
  const [inputValue, setInputValue] = useState<string>(selected || "");
  const [filteredTags, setFilteredTags] = useState<string[]>(techTags);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    existingTags || []
  );
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const tagsToShow = isExpanded
    ? selectedTags
    : selectedTags.slice(0, displayTagsLength);
  const excessTagsCount = selectedTags.length - displayTagsLength;

  useEffect(() => {
    if (selected) {
      setInputValue(selected);
    } else {
      setInputValue(""); // Clear input if selected is empty
    }
  }, [selected]);

  useEffect(() => {
    console.log("existing Tags:", existingTags);
    if (existingTags) {
      setSelectedTags(existingTags);
    }
  }, [existingTags]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredTags(
      techTags.filter(
        (tag) =>
          tag.toLowerCase().includes(value.toLowerCase()) &&
          !selectedTags.includes(tag)
      )
    );
    setDropdownOpen(true);
  };

  const handleTagClick = (tag: string): void => {
    if (multiple) {
      if (!selectedTags.includes(tag)) {
        const newSelectedTags = [...selectedTags, tag];
        // console.log(newSelectedTags);
        setSelectedTags(newSelectedTags);
        // console.log("Selected Tags:", newSelectedTags);

        setFilteredTags(
          techTags.filter(
            (tag) =>
              tag.toLowerCase().includes(inputValue.toLowerCase()) &&
              !newSelectedTags.includes(tag)
          )
        );
        if (onChange) {
          onChange(newSelectedTags);
        }
      }
      setInputValue("");
      setDropdownOpen(true);
    } else {
      setInputValue(tag);
      handleSingleSelect(name!, tag);
      setDropdownOpen(false);
    }
  };

  const handleSingleSelect = (name: string, tag: string): void => {
    if (onSingleChange) {
      onSingleChange(name, tag);
    }
  };

  const handleTagRemove = (tag: string): void => {
    const newSelectedTags = selectedTags.filter(
      (selectedTag) => selectedTag !== tag
    );
    setSelectedTags(newSelectedTags);
    setFilteredTags(
      techTags.filter(
        (tag) =>
          tag.toLowerCase().includes(inputValue.toLowerCase()) &&
          !newSelectedTags.includes(tag)
      )
    );
    if (onChange) {
      onChange(newSelectedTags);
    }
    if (onSingleChange) {
      onSingleChange(name!, "");
    }
  };

  return (
    <>
      {label && (
        <label
          className={`text-gray-500 font-semibold relative flex gap-1.5 items-center ${labelcls}`}
          htmlFor="technical_skills"
        >
          {label}
          {description && (
            <>
              <button
                type="button"
                className="w-2 h-2 p-2.5 text-sm bg-gray-200 text-gray-400 rounded-full flex items-center justify-center outline-none hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-300 focus:text-gray-500 peer"
              >
                ?
              </button>
              {/* <div className="absolute left-20 transform bottom-0 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-900 opacity-0 peer-hover:opacity-100 transition-opacity"></div> */}
              <div className="absolute -z-10 left-0 transform top-full translate-y-full mb-2 max-w-sm bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:z-10 transition-all duration-300 ease-in-out">
                {description}
              </div>
            </>
          )}
          {req && <span className="text-red-500">*</span>}
        </label>
      )}
      <ClickOutsideDiv onOutsideClick={() => setDropdownOpen(false)}>
        <div
          className={`flex w-full gap-x-6 gap-y-2 ${usingIn !== "signup" ? (dropdownOpen ? "flex-col-reverse" : "flex-col") : "flex-row max-[500px]:flex-col-reverse"}`}
        >
          <div className="relative flex-1 w-full" ref={dropdownRef}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setDropdownOpen(true)}
              placeholder={placeholder}
              className={`w-full ${cls}`}
            />
            {dropdownOpen && filteredTags.length > 0 && (
              <ul
                className="absolute w-full max-h-40 overflow-y-auto border border-gray-300 bg-white z-10 rounded-md custom-scrollbar"
                style={{ top: "calc(100% + 0.125rem)" }} // Do not remove this, this is kept intensionally to fix the dropdown position rather than passing it as an arbitrary value which is not considered by tailwind css
              >
                {filteredTags.map((tag, index) => (
                  <li
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    className="p-2 cursor-pointer hover:bg-gray-100 select-none"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {multiple && (
            <div className="flex flex-1 flex-wrap gap-1">
              {tagsToShow.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 px-2 py-2 rounded-md text-sm h-fit"
                >
                  {tag}
                  <span
                    className="ml-2 cursor-pointer text-red-500"
                    onClick={() => handleTagRemove(tag)}
                  >
                    &times;
                  </span>
                </div>
              ))}
              {excessTagsCount > 0 && (
                <button
                  type="button"
                  onClick={() => setIsExpanded((curr) => !curr)}
                  className={`text-primary-500 text-sm font-semibold py-1 px-2 hover:bg-gray-200 rounded-full transition-colors duration-150 ${isExpanded && "px-3"}`}
                >
                  {isExpanded ? "Show less" : `+${excessTagsCount}`}
                </button>
              )}
            </div>
          )}
        </div>
      </ClickOutsideDiv>
    </>
  );
};

export default SearchSelectDropdown;
