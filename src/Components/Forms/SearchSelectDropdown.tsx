"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import ClickOutsideDiv from "../ClickoutsideDiv";

type SearchSelectDropdownProps = {
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
};

const SearchSelectDropdown: React.FC<SearchSelectDropdownProps> = ({
  req,
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
}) => {
  const techTags = tags;
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredTags, setFilteredTags] = useState<string[]>(techTags);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const tagsToShow = isExpanded ? selectedTags : selectedTags.slice(0, 10);
  const excessTagsCount = selectedTags.length - 10;

  // useEffect(() => {
  //   onChange(selectedTags);
  // }, [selectedTags, onChange]);

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
  };

  return (
    <>
      {label && (
        <label
          className={`text-gray-500 font-semibold relative flex items-center ${labelcls}`}
          htmlFor="technical_skills"
        >
          {label}
          {description && (
            <>
              <button
                type="button"
                className="w-2 h-2 p-2.5 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center outline-none hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-300 focus:text-gray-500 peer"
              >
                ?
              </button>
              {/* <div className="absolute left-20 transform bottom-0 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-900 opacity-0 peer-hover:opacity-100 transition-opacity"></div> */}
              <div className="absolute left-0 top-full -z-10 max-w-sm bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:z-10 transition-opacity">
                {description}
              </div>
            </>
          )}
          {req && <span className="text-red-500">*</span>}
        </label>
      )}
      <ClickOutsideDiv onOutsideClick={() => setDropdownOpen(false)}>
        <div
          className={`flex w-full gap-x-6 gap-y-3 ${labelcls && "flex-col-reverse"}`}
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
              <ul className="absolute top-12 w-full max-h-52 overflow-y-auto border border-gray-300 bg-white z-10 rounded-md">
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
            <div className="md:mt-2 flex flex-1 flex-wrap gap-2">
              {tagsToShow.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 px-2 py-1 rounded-md"
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
                  onClick={handleToggle}
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
