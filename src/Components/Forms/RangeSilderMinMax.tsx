import React from "react";

const RangeSliderMinMax = ({
  minSal,
  maxSal,
  handleChange,
}: {
  minSal: number;
  maxSal: number;
  handleChange: (name: string, value: string | number) => void;
}) => {
  return (
    <div className="relative mb-6">
      <input
        id="min-salary-input"
        type="range"
        value={minSal}
        step="1"
        min="1"
        max={maxSal - 1}
        className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        onChange={(e) => {
          handleChange("minSalary", e.target.value);
        }}
      />

      <input
        id="max-salary-input"
        type="range"
        value={maxSal}
        step="1"
        // min={Number(minSalary) + 1}
        min={minSal + 1}
        max="75"
        className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        onChange={(e) => {
          handleChange("maxSalary", e.target.value);
        }}
      />

      <div className="flex justify-between">
        <span className="text-xs text-gray-500 font-semibold">
          Min (₹<span id="min-salary-value">{minSal}</span> LPA)
        </span>
        <span className="text-xs text-gray-500 font-semibold">
          Max (₹<span id="max-salary-value">{maxSal}</span> LPA)
        </span>
      </div>
    </div>
  );
};

export default RangeSliderMinMax;
