"use client";

import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface FormInputProps {
  key?: string;
  cls?: string;
  placeholder?: string;
  req?: boolean;
  disabled?: boolean;
  id: string;
  label?: string;
  type: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  name: string;
  description?: string;
}

const PostFormInput = ({
  id,
  name,
  type,
  label,
  register,
  placeholder,
  req,
  disabled,
  cls,
  errors,
  description,
}: FormInputProps) => {
  return (
    <div className="flex flex-col justify-center w-full">
      <label
        className="text-gray-700 font-semibold relative flex items-center gap-2"
        htmlFor={name}
      >
        {label}
        {description && (
          <>
            <button
              type="button"
              className="w-2 h-2 p-2.5 bg-gray-200 text-gray-400 text-sm rounded-full flex items-center justify-center outline-none hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-300 focus:text-gray-500 peer"
            >
              ?
            </button>
            <div className="absolute -z-10 left-0 transform translate-y-full top-full mb-2 max-w-sm bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:z-10 transition-all duration-300 ease-in-out">
              {description}
            </div>
          </>
        )}
        <span
          className={`text-red-500 ${req && label ? "inline-block" : "hidden"}`}
        >
          *
        </span>
      </label>

      <div className="relative w-full flex flex-col isolate">
        <input
          {...register(name)}
          id={id}
          name={name}
          type={type}
          required={req}
          className={`relative w-full md:mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic ${cls}`}
          placeholder={placeholder}
          disabled={disabled}
        />
        {/* {type === "password" && (
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
        )} */}
        <span
          className={`text-red-500 text-xs absolute mt-1 font-semibold  ${errors ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 top-full`}
        >
          {errors?.message}
        </span>
      </div>
    </div>
  );
};

export default PostFormInput;
