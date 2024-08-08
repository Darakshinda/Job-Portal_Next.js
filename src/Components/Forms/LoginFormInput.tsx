"use client";

import React, { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  name: string;
  placeholder: string;
  req: boolean;
  icon: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  register,
  errors,
  name,
  placeholder,
  req,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>();

  return (
    <div className="relative z-0 w-full group isolate">
      <div className="relative">
        <label
          htmlFor={id}
          className="text-gray-500 font-semibold mb-2 text-sm"
        >
          {label}
          <span
            className={`text-red-500 ${req && label ? "inline-block ml-2" : "hidden"}`}
          >
            *
          </span>
        </label>
        <input
          {...register(name)}
          id={id}
          name={name}
          type={
            type === "password" ? (!showPassword ? "password" : "text") : type
          }
          className="peer py-3 px-4 ps-11 block w-full bg-gray-200 rounded-lg outline-none focus:outline-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder={placeholder}
          required={req}
        />
        <div className="absolute top-10 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          {icon}
        </div>
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
      </div>
      <span
        className={`text-red-500 text-xs font-semibold  ${errors ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} transition-all transform duration-300 absolute mt-1 ml-2`}
      >
        {errors?.message}
      </span>
    </div>
  );
};

export default FormInput;
