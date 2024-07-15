"use client";

import React, { useState } from 'react';

interface InputProps {
  keyy?: string;
  cls?: string;
  placeholder?: string;
  req?: boolean;
  val?: string;
  disabled?: boolean;
  onChange?: Function;
  type?: string;
  iconColor?: string; // Add iconColor prop
}

interface TextAreaProps {
  keyy?: string;
  cls?: string;
  req?: boolean;
  placeholder?: string;
  val?: string;
  onChange?: Function;
}

export const TextInput = ({
  keyy = "",
  cls = 'input w-full max-w-xs',
  placeholder = '',
  val,
  req = false,
  disabled = false,
  onChange,
  type = 'text',
  iconColor = 'black', // Default to black color for the icon
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const iconClasses = iconColor === 'white' ? 'text-white' : 'text-black'; // Set icon color class

  return (
    <div className="relative">
      <input
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        required={req}
        className={`w-full ${cls}`}
        placeholder={placeholder}
        value={val}
        disabled={disabled}
        onChange={(event) => onChange && onChange(keyy, event.target.value)}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={handleToggleVisibility}
          className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ${iconClasses}`} // Apply icon color class
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${iconClasses}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor" // Keep stroke as currentColor to use CSS class
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 12a3 3 0 01-6 0 3 3 0 016 0z" />
              <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
              <path d="M14 9l6 6m-6 0l6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${iconClasses}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor" // Keep stroke as currentColor to use CSS class
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 12a3 3 0 01-6 0 3 3 0 016 0z" />
              <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export const TextArea = ({
  keyy = "",
  cls = 'textarea w-full max-w-xs',
  placeholder = '',
  val,
  req = false,
  onChange,
}: TextAreaProps) => {
  return (
    <textarea
      style={{ height: "250px" }}
      required={req}
      className={cls}
      placeholder={placeholder}
      value={val}
      onChange={(event) => onChange && onChange(keyy, event.target.value)}
    />
  );
};