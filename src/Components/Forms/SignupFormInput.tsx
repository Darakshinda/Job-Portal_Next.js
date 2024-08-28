import { useEffect, useState } from "react";
import {
  FieldError,
  Control,
  Controller,
  Merge,
  FieldErrorsImpl,
} from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface FormInputProps {
  key?: string;
  cls?: string;
  labelCls?: string;
  placeholder?: string;
  req?: boolean;
  disabled?: boolean;
  id: string;
  label?: string;
  type: string;
  name: string;
  control?: Control<any>; // Make control optional
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  handleChange?: (key: string, value: string) => void;
  resetflg?: boolean;
  setResetFlg?: (val: boolean) => void;
  value?: string;
}

const SignupFormInput = ({
  id,
  name,
  type,
  label,
  control,
  placeholder,
  req,
  disabled,
  cls,
  labelCls,
  error,
  handleChange,
  resetflg,
  setResetFlg,
  value,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (resetflg) {
      setInputValue("");
      setResetFlg && setResetFlg(false);
    }
  }, [resetflg, setResetFlg]);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  // Use Controller if control is provided
  if (control) {
    return (
      <div className="relative flex flex-col w-full">
        <label
          className={`text-gray-500 font-semibold inline-block w-fit ${labelCls}`}
          htmlFor={name}
        >
          {label}
          <span
            title="Required"
            className={`text-red-500 ${req && label ? "ms-1.5 inline-block" : "hidden"}`}
          >
            *
          </span>
        </label>

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="relative w-full">
              <input
                {...field}
                id={id}
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                onPaste={(e) => {
                  if (type === "password") {
                    e.preventDefault();
                    return false;
                  }
                }}
                className={cls + " w-full"}
                placeholder={placeholder}
                required={req}
                disabled={disabled}
                onChange={(e) => {
                  field.onChange(e); // Update React Hook Form state
                  handleChange && handleChange(name, e.target.value);
                }}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                  className={`absolute top-3 right-1.5 p-1 flex items-center text-sm h-fit outline-none focus-visible:ring-2 ring-gray-400 rounded-lg`} // Apply icon color class
                >
                  {showPassword ? (
                    <FaRegEye size={20} className="text-gray-500" />
                  ) : (
                    <FaRegEyeSlash size={20} className="text-gray-500" />
                  )}
                </button>
              )}
            </div>
          )}
        />
        <span
          className={`text-red-500 text-xs font-semibold  ${error ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 absolute z-10 bg-red-50 rounded-b-md top-full px-2 py-0.5`}
        >
          {error?.message?.toString()}
        </span>
      </div>
    );
  }

  // Fallback to a regular input if control is not provided
  return (
    <div className="relative flex flex-col w-full">
      <label
        className={`text-gray-500 font-semibold ${labelCls}`}
        htmlFor={name}
      >
        {label}
        <span
          title="Required"
          className={`text-red-500 ${req && label ? "ms-1.5 inline-block" : "hidden"}`}
        >
          *
        </span>
      </label>
      <input
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
        className={cls + " w-full"}
        placeholder={placeholder}
        disabled={disabled}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleChange && handleChange(name, e.target.value);
        }}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
          className={`absolute top-3 right-1.5 p-1 flex items-center text-sm h-fit outline-none focus-visible:ring-2 ring-gray-400 rounded-lg`} // Apply icon color class
        >
          {showPassword ? (
            <FaRegEye size={20} className="text-gray-500" />
          ) : (
            <FaRegEyeSlash size={20} className="text-gray-500" />
          )}
        </button>
      )}
      <span
        className={`text-red-500 text-xs font-semibold  ${error ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 absolute z-10 bg-white rounded-lg top-full mt-1`}
      >
        {error?.message?.toString()}
      </span>
    </div>
  );
};

export default SignupFormInput;
