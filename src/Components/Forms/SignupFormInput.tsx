"use client";

import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface FormInputProps {
  key?: string;
  cls?: string;
  labelcls?: string;
  placeholder?: string;
  req?: boolean;
  disabled?: boolean;
  id: string;
  label?: string;
  type: string;
  register?: UseFormRegister<any>;
  errors?: FieldError;
  name: string;
  handleChange?: (key: string, value: string) => void;
}

const SignupFormInput = ({
  id,
  name,
  type,
  label,
  register,
  placeholder,
  req,
  disabled,
  cls,
  labelcls,
  errors,
  handleChange,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>();

  return (
    <div className="relative flex flex-col w-full isolate">
      <label
        className={`text-gray-500 font-semibold ${labelcls}`}
        htmlFor={name}
      >
        {label}{" "}
        <span
          className={`text-red-500 ${req && label ? "inline-block" : "hidden"}`}
        >
          *
        </span>
      </label>
      <input
        {...(register && register(name))}
        id={id}
        name={name}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        required={req}
        onPaste={(e) => {
          if (type === "password") {
            e.preventDefault();
            return false;
          }
        }}
        className={cls}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => handleChange && handleChange(name, e.target.value)}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
          className={`absolute top-9 right-1.5 p-1 flex items-center text-sm h-fit outline-none focus-visible:ring-2 ring-gray-400 rounded-lg`} // Apply icon color class
        >
          {showPassword ? (
            <FaRegEye size={20} className="text-gray-500" />
          ) : (
            <FaRegEyeSlash size={20} className="text-gray-500" />
          )}
        </button>
      )}
      <span
        className={`text-red-500 text-xs font-semibold  ${errors ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 top-full`}
      >
        {errors?.message}
      </span>
    </div>
  );
};

export default SignupFormInput;
