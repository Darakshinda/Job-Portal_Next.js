"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import SearchSelectDropdown from "./SearchSelectDropdown";

type RangeSliderProps = {
  label?: string;
  name?: string;
  labelCls?: string;
  minSalary: string;
  maxSalary: string;
  currencyType?: string;
  handleChange: (name: string, value: string) => void;
};

const RangeSlider = ({
  label,
  name,
  labelCls,
  minSalary,
  maxSalary,
  currencyType,
  handleChange,
}: RangeSliderProps) => {
  const [min, setMin] = useState<number>(1500);
  const [max, setMax] = useState<number>(90000);
  const [step, setStep] = useState<number>(500);
  const [values, setValues] = useState([Number(minSalary), Number(maxSalary)]);
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [currencyRates, setCurrencyRates] = useState<{ [key: string]: number }>(
    { USD: 1 }
  );

  // console.log(values);
  const determineStepValue = (currencyType: string) => {
    switch (currencyType) {
      case "INR":
        return 1; // INR in Lakhs, so step by 1 LPA
      case "USD":
        return 500; // USD, step by $500
      case "EUR":
        return 400; // EUR, step by €400
      case "JPY":
        return 50000; // JPY, step by ¥50000
      case "GBP":
        return 300; // GBP, step by £300
      // Add cases for other currencies as needed
      default:
        return 500; // Fallback step value
    }
  };

  useEffect(() => {
    const getVals = async () => {
      // const apiKey = "6bec93c77b543a360c7e8995";
      // const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

      // try {
      //   const response = await axios.get(apiUrl);
      //   const currencyRates = response.data.conversion_rates;
      //   const List = Object.keys(currencyRates);
      //   // console.log("Fetched currency rates:", currencyRates);

      //   setCurrencyList(List);
      //   setCurrencyRates(currencyRates);
      // } catch (error) {
      //   console.error("Failed to fetch currency rates:", error);
      // }
      const apiUrl =
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

      try {
        const response = await axios.get(apiUrl);
        // console.log("Fetched currency rates:", response.data);
        const List = Object.keys(response.data.usd);
        setCurrencyList(List);
        const currencyRates = response.data.usd;
        // console.log("Fetched currency rates:", currencyRates);
        setCurrencyRates(currencyRates);
      } catch (error) {
        console.error("Failed to fetch currency rates:", error);
      }
    };

    if (currencyList.length === 0) getVals();
  }, []);

  const handleValueChange = (newValues: number[]) => {
    if (newValues[0] >= newValues[1]) return;
    setValues(newValues);
  };

  const convertCurrency = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => {
    const fromRate = currencyRates[fromCurrency];
    const toRate = currencyRates[toCurrency];

    if (fromRate === toRate) return amount;

    const amountInUSD = amount / fromRate;
    let convertedValue = amountInUSD * toRate;
    return Math.round(convertedValue);
  };

  const handleCurrencyChange = (name: string, newCurrencyType: string) => {
    const newMinLimit = convertCurrency(min, currencyType!, newCurrencyType);
    const newMaxLimit = convertCurrency(max, currencyType!, newCurrencyType);
    setMin(newMinLimit);
    setMax(newMaxLimit);

    const convertedMin = convertCurrency(
      values[0],
      currencyType!,
      newCurrencyType
    );

    const convertedMax = convertCurrency(
      values[1],
      currencyType!,
      newCurrencyType
    );
    // console.log("Converted min:", convertedMin);
    setStep(determineStepValue(newCurrencyType));
    setValues([Math.round(convertedMin), Math.round(convertedMax)]);
    handleChange(name, newCurrencyType);
  };

  // console.log(values);

  return (
    <div className="flex flex-col justify-center w-full py-4 px-1">
      <div className="flex justify-between items-start">
        <label htmlFor={name} className={labelCls + " text-left"}>
          {label}
        </label>

        {currencyList.length > 0 && (
          <SearchSelectDropdown
            name="currencyType"
            tags={currencyList}
            cls="w-20 px-2 py-0.5 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
            onSingleChange={handleCurrencyChange}
            selected={currencyType}
            placeholder="Currency"
            multiple={false}
          />
        )}
      </div>

      <Slider.Root
        className="relative flex items-center w-full h-6 my-2"
        value={values}
        min={min}
        max={max}
        step={step}
        onValueChange={handleValueChange}
        onValueCommit={(values) => {
          handleChange("minSalary", values[0].toString());
          handleChange("maxSalary", values[1].toString());
        }}
      >
        <Slider.Track className="bg-gray-300 relative flex-grow h-1 rounded-full">
          <Slider.Range className="absolute bg-blue-500 h-full rounded-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-blue-500 border rounded-full outline-none relative"
          aria-label="Minimum Value"
        >
          <div className="absolute font-semibold -bottom-6 right-full translate-x-full text-xs text-gray-500 whitespace-nowrap">
            {currencyType === "INR"
              ? `${Math.round(values[0] / 100000)} LPA`
              : `${Math.round(values[0] / 1000)}K`}
          </div>
        </Slider.Thumb>
        <Slider.Thumb
          className="block w-5 h-5 bg-blue-500 border rounded-full outline-none relative"
          aria-label="Maximum Value"
        >
          <div className="absolute font-semibold -bottom-6 left-full -translate-x-[70%] text-xs text-gray-500 whitespace-nowrap">
            {currencyType === "INR"
              ? `${Math.round(values[1] / 100000)} LPA`
              : `${Math.round(values[1] / 1000)}K`}
          </div>
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
};

export default RangeSlider;
