// import React, { useState } from "react";

// const RangeSliderMinMax = ({
//   minSal,
//   maxSal,
//   handleChange,
// }: {
//   minSal: number;
//   maxSal: number;
//   handleChange: (name: string, value: string | number) => void;
// }) => {
//   return (
//     <div className="relative mb-6">
//       <input
//         id="min-salary-input"
//         type="range"
//         value={minSal}
//         step="1"
//         min="1"
//         max={maxSal - 1}
//         className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
//         onChange={(e) => {
//           handleChange("minSalary", e.target.value);
//         }}
//       />

//       <input
//         id="max-salary-input"
//         type="range"
//         value={maxSal}
//         step="1"
//         // min={Number(minSalary) + 1}
//         min={minSal + 1}
//         max="75"
//         className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
//         onChange={(e) => {
//           handleChange("maxSalary", e.target.value);
//         }}
//       />

//       <div className="flex justify-between">
//         <span className="text-xs text-gray-500 font-semibold">
//           Min (₹<span id="min-salary-value">{minSal}</span> LPA)
//         </span>
//         <span className="text-xs text-gray-500 font-semibold">
//           Max (₹<span id="max-salary-value">{maxSal}</span> LPA)
//         </span>
//       </div>
//     </div>
//   );
// };

// export default RangeSliderMinMax;

// pages/index.tsx
// pages/index.tsx
// pages/index.tsx
"use client";
// pages/index.tsx
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useState, useEffect } from "react";
import { Range } from "react-range";

type Props = {
  currencyRates: { [key: string]: number };
  currencyList: string[];
};

const Home: React.FC<Props> = ({ currencyRates, currencyList }) => {
  const defaultCurrencyRates = currencyRates || { USD: 1 };
  const defaultCurrencyList = currencyList || ["USD"];

  const [range, setRange] = useState<number[]>([42000, 253000]);
  const [currency, setCurrency] = useState<string>("USD");
  const [conversionRate, setConversionRate] = useState<number>(
    defaultCurrencyRates[currency]
  );

  useEffect(() => {
    setConversionRate(defaultCurrencyRates[currency]);
  }, [currency, defaultCurrencyRates]);

  const handleSliderChange = (values: number[]) => {
    setRange(values);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    setConversionRate(defaultCurrencyRates[selectedCurrency]);
  };

  const formatCurrency = (value: number) => {
    return `${currency} ${new Intl.NumberFormat("en-US").format(value * conversionRate)}`;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-4 bg-blue-50 border border-blue-300 rounded-md w-full max-w-md">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Salary</h3>
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={() => {
              setRange([42000, 253000]);
              setCurrency("USD");
            }}
          >
            Clear
          </button>
        </div>
        <div className="mb-4 text-gray-600">
          {formatCurrency(range[0])} - {formatCurrency(range[1])}
        </div>
        <Range
          values={range}
          step={1000}
          min={0}
          max={500000}
          onChange={handleSliderChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 bg-gray-300 rounded-full"
              style={{ ...props.style }}
            >
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{
                  left: `${(range[0] / 500000) * 100}%`,
                  width: `${((range[1] - range[0]) / 500000) * 100}%`,
                }}
              />
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              key={index}
              className="h-5 w-5 bg-blue-500 rounded-full cursor-pointer border-2 border-blue-600"
              style={{ ...props.style }}
            />
          )}
        />
        <select
          value={currency}
          onChange={handleCurrencyChange}
          className="w-full p-2 mt-4 border border-gray-300 bg-white rounded"
        >
          {defaultCurrencyList.map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Fetch currency rates and list on the server-side
export const getServerSideProps: GetServerSideProps = async () => {
  const apiKey = "YOUR_EXCHANGE_RATE_API_KEY";
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  try {
    const response = await axios.get(apiUrl);
    const currencyRates = response.data.conversion_rates;
    const currencyList = Object.keys(currencyRates);

    return {
      props: {
        currencyRates,
        currencyList,
      },
    };
  } catch (error) {
    console.error("Failed to fetch currency rates:", error);
    return {
      props: {
        currencyRates: { USD: 1 }, // Default to USD if the API fails
        currencyList: ["USD"], // Ensure at least USD is available
      },
    };
  }
};

export default Home;
