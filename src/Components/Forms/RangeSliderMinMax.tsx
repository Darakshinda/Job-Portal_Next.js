"use client";

import React, { useState, useRef, useEffect, SetStateAction } from "react";

const DoubleThumbSlider = ({
  minSalary,
  maxSalary,
  currencyType,
  handleChange,
}: {
  minSalary: string;
  maxSalary: string;
  currencyType: string;
  handleChange: (name: string, value: string) => void;
}) => {
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(7000);
  const [dragging, setDragging] = useState(null); // 'min' or 'max'

  const sliderRef = useRef<HTMLDivElement>(null);

  const min = 100;
  const max = 50000;
  const step = 500;

  const handleMinChange = (value: number) => {
    const newMinPrice = Math.min(Math.max(value, min), maxPrice - step);
    setMinPrice(Math.round(newMinPrice / step) * step);
    handleChange("minSalary", newMinPrice.toString());
  };

  const handleMaxChange = (value: number) => {
    const newMaxPrice = Math.max(Math.min(value, max), minPrice + step);
    setMaxPrice(Math.round(newMaxPrice / step) * step);
    handleChange("maxSalary", newMaxPrice.toString());
  };

  const minPercentage = ((minPrice - min) / (max - min)) * 100;
  const maxPercentage = ((maxPrice - min) / (max - min)) * 100;

  const handleMouseDown =
    (type: string | React.SetStateAction<null>) => (e: any) => {
      e.preventDefault();
      setDragging(type as React.SetStateAction<null>);
    };

  const handleMouseMove = (e: any) => {
    if (!dragging || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const newX = Math.max(
      0,
      Math.min(e.clientX - sliderRect.left, sliderRect.width)
    );
    const newValue =
      min + Math.round(((newX / sliderRect.width) * (max - min)) / step) * step;

    if (dragging === "min") {
      handleMinChange(newValue);
    } else if (dragging === "max") {
      handleMaxChange(newValue);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    setMinPrice(Number(minSalary));
    setMaxPrice(Number(maxSalary));
  }, [minSalary, maxSalary]);

  return (
    <div className="flex justify-center items-center">
      <div className="relative max-w-xl w-full px-4">
        <div ref={sliderRef} className="relative h-2">
          <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
          <div
            className="absolute z-20 top-0 bottom-0 rounded-md bg-blue-400"
            style={{
              left: `${minPercentage}%`,
              right: `${100 - maxPercentage}%`,
            }}
          ></div>
          <div
            className="absolute z-40 w-6 h-6 top-0 bg-blue-500 rounded-full -mt-2 -ml-3 cursor-pointer"
            style={{ left: `${minPercentage}%` }}
            onMouseDown={handleMouseDown("min")}
          ></div>
          <div
            className="absolute z-40 w-6 h-6 top-0 bg-blue-500 rounded-full -mt-2 -mr-3 cursor-pointer"
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={handleMouseDown("max")}
          ></div>
        </div>

        <div className="flex justify-between items-center py-5">
          <div>
            <input
              type="number"
              min={min}
              max={max}
              step={step}
              value={minPrice}
              onChange={(e) => handleMinChange(+e.target.value)}
              className="px-3 py-2 border bg-white border-gray-200 rounded w-24 text-center"
            />
          </div>
          <div>
            <input
              type="number"
              min={min}
              max={max}
              step={step}
              value={maxPrice}
              onChange={(e) => handleMaxChange(+e.target.value)}
              className="px-3 py-2 border bg-white border-gray-200 rounded w-24 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleThumbSlider;

// import axios from "axios";
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { Range } from "react-range";
// import SearchSelectDropdown from "./SearchSelectDropdown";
// import debounce from "lodash/debounce";

// type RangeSliderProps = {
//   minSalary: string;
//   maxSalary: string;
//   currencyType: string;
//   handleChange: (name: string, value: string) => void;
// };

// const RangeSliderMinMax = ({
//   minSalary,
//   maxSalary,
//   currencyType,
//   handleChange,
// }: RangeSliderProps) => {
//   const [currencyList, setCurrencyList] = useState<string[]>([]);
//   const [currencyRates, setCurrencyRates] = useState({ USD: 1 });

//   const [currency, setCurrency] = useState<string>(currencyType);
//   const [range, setRange] = useState<number[]>([
//     Number(minSalary),
//     Number(maxSalary),
//   ]);
//   // console.log("Range: ", range);
//   // const [conversionRate, setConversionRate] = useState<number>(
//   //   currencyRates[currency]
//   // );

//   useEffect(() => {
//     const getVals = async () => {
//       const apiKey = "6bec93c77b543a360c7e8995";
//       const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

//       try {
//         const response = await axios.get(apiUrl);
//         const currencyRates = response.data.conversion_rates;
//         const List = Object.keys(currencyRates);
//         // console.log("Fetched currency list:", List);

//         setCurrencyList(List);
//         setCurrencyRates(currencyRates);
//       } catch (error) {
//         console.error("Failed to fetch currency rates:", error);
//       }
//     };

//     getVals();
//   }, []);

//   // useEffect(() => {
//   //   setConversionRate(currencyRates[currency]);
//   // }, [currency, currencyRates]);
//   const rangeRef = useRef<number[]>(range);

//   // Function to handle slider change, with debouncing
//   const handleSliderChange = useCallback(
//     debounce((values: number[]) => {
//       // Update ref to avoid unnecessary state updates
//       handleChange("minSalary", values[0].toString());
//       handleChange("maxSalary", values[1].toString());
//       rangeRef.current = values;
//     }, 200), // Adjust the debounce delay as needed
//     []
//   );

//   // Function to handle final value change
//   const handleFinalChange = (values: number[]) => {
//     handleChange("minSalary", values[0].toString());
//     handleChange("maxSalary", values[1].toString());
//     setRange(values); // Update state only on final change
//   };

//   // const handleSliderChange = (values: number[]) => {
//   //   handleChange("minSal", values[0].toString());
//   //   handleChange("maxSal", values[1].toString());
//   //   setRange(values);
//   // };

//   // const formatCurrency = (value: number) => {
//   //   return `${currency} ${new Intl.NumberFormat("en-US").format(value * conversionRate)}`;
//   // };

//   const defaultFieldStylesCls =
//     "relative w-full mt-1 p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic";

//   return (
//     <div className="bg-gray-100">
//       <div className="py-2 px-4 bg-gray-100 border border-gray-300 rounded-md w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           {/* <h3 className="text-lg font-semibold">Salary</h3> */}
//           <div className="text-gray-600">
//             {/* {formatCurrency(range[0])} - {formatCurrency(range[1])} */}
//           </div>
//           <button
//             className="text-sm text-blue-500 hover:underline"
//             onClick={() => {
//               setRange([0, 75]);
//               setCurrency("USD");
//             }}
//           >
//             Clear
//           </button>
//         </div>

//         <Range
//           label="Salary Range"
//           labelledBy="salary-range-label"
//           values={range}
//           step={1}
//           min={0}
//           max={75}
//           onChange={handleSliderChange}
//           onFinalChange={handleFinalChange}
//           renderTrack={({ props, children }) => (
//             <div
//               {...props}
//               className="h-2 bg-gray-300 rounded-full"
//               style={{ ...props.style }}
//             >
//               <div
//                 className="h-full absolute bg-blue-500 rounded-full -mx-1"
//                 style={{
//                   left: `${(range[0] / Number(maxSalary)) * 100}%`,
//                   width: `${((range[1] - range[0]) / Number(maxSalary)) * 100}%`,
//                 }}
//               />
//               {children}
//             </div>
//           )}
//           renderThumb={({ props, index }) => (
//             <div
//               {...props}
//               key={index}
//               className="h-4 w-4 absolute top-0 bg-blue-500 rounded-full cursor-pointer border-2 border-blue-600 outline-none"
//               style={{ ...props.style }}
//             />
//           )}
//         />

//         <div className="my-2">
//           {currencyList.length > 0 && (
//             <SearchSelectDropdown
//               name="currencyType"
//               tags={currencyList}
//               cls={defaultFieldStylesCls}
//               onSingleChange={handleChange}
//               selected="USD"
//               placeholder="Select currency"
//               multiple={false}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RangeSliderMinMax;

// // Fetch currency rates and list on the server-side

// import React, { useState, useRef, useEffect } from "react";
// import SearchSelectDropdown from "./SearchSelectDropdown";

// type RangeSliderProps = {
//   minSalary: string;
//   maxSalary: string;
//   currencyType: string;
//   handleChange: (name: string, value: string) => void;
// };

// const SalaryRangeSlider = ({
//   minSalary,
//   maxSalary,
//   currencyType,
//   handleChange,
// }: RangeSliderProps) => {
//   const [minSal, setMinSal] = useState<number>(Number(minSalary));
//   const [maxSal, setMaxSal] = useState<number>(Number(maxSalary));
//   const [isDragging, setIsDragging] = useState(false);
//   const [activeThumbs, setActiveThumbs] = useState({ min: false, max: false });

//   const sliderRef = useRef<HTMLDivElement>(null);

//   const MIN_RANGE = Number(minSalary);
//   const MAX_RANGE = Number(maxSalary);

//   const getPercent = (value: number) => {
//     return ((value - MIN_RANGE) / (MAX_RANGE - MIN_RANGE)) * 100;
//   };

//   const handleMouseDown = (e: React.MouseEvent, thumb: "min" | "max") => {
//     setIsDragging(true);
//     setActiveThumbs({ ...activeThumbs, [thumb]: true });
//   };

//   const handleMouseUp = () => {
//     if (isDragging) {
//       // Call handleChange when dragging is completed
//       handleChange("minSalary", minSal.toString());
//       handleChange("maxSalary", maxSal.toString());
//     }
//     setIsDragging(false);
//     setActiveThumbs({ min: false, max: false });
//   };

//   const handleMouseMove = (e: MouseEvent) => {
//     if (!isDragging || !sliderRef.current) return;

//     const sliderRect = sliderRef.current.getBoundingClientRect();
//     const percent = Math.min(
//       Math.max((e.clientX - sliderRect.left) / sliderRect.width, 0),
//       1
//     );
//     const value = Math.round(percent * (MAX_RANGE - MIN_RANGE) + MIN_RANGE);

//     if (activeThumbs.min) {
//       setMinSal(Math.min(value, maxSal - 1));
//     } else if (activeThumbs.max) {
//       setMaxSal(Math.max(value, minSal + 1));
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDragging, activeThumbs, minSalary, maxSalary]);

//   return (
//     <div className="w-full max-w-md mx-auto p-4">
//       <div className="text-lg font-semibold mb-2">Salary</div>
//       <div className="text-gray-600 mb-4">
//         ${minSalary}k - ${maxSalary}k
//       </div>
//       <div className="relative h-2" ref={sliderRef}>
//         <div className="absolute w-full h-1 bg-gray-200 rounded-full top-1/2 transform -translate-y-1/2"></div>
//         <div
//           style={{
//             width: `${getPercent(maxSal) - getPercent(minSal)}%`,
//             left: `${getPercent(minSal)}%`,
//           }}
//           className="absolute h-1 bg-blue-500 rounded-full top-1/2 transform -translate-y-1/2"
//         ></div>
//         <div
//           style={{ left: `${getPercent(minSal)}%` }}
//           className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
//           onMouseDown={(e) => handleMouseDown(e, "min")}
//         ></div>
//         <div
//           style={{ left: `${getPercent(maxSal)}%` }}
//           className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
//           onMouseDown={(e) => handleMouseDown(e, "max")}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default SalaryRangeSlider;

// import React, { useState, useRef, useEffect } from "react";

// type RangeSliderProps = {
//   minSalary: string;
//   maxSalary: string;
//   currencyType: string;
//   handleChange: (name: string, value: string) => void;
// };

// const SalaryRangeSlider = ({
//   minSalary,
//   maxSalary,
//   currencyType,
//   handleChange,
// }: RangeSliderProps) => {
//   const step = 1000; // Default step value
//   const [minSal, setMinSal] = useState<number>(Number(minSalary));
//   const [maxSal, setMaxSal] = useState<number>(Number(maxSalary));
//   const [isDragging, setIsDragging] = useState(false);
//   const [activeThumbs, setActiveThumbs] = useState({ min: false, max: false });

//   const sliderRef = useRef<HTMLDivElement>(null);

//   const MIN_RANGE = Number(minSalary);
//   const MAX_RANGE = Number(maxSalary);

//   // Calculate percentage based on the entire range
//   const getPercent = (value: number) => {
//     return ((value - MIN_RANGE) / (MAX_RANGE - MIN_RANGE)) * 100;
//   };

//   // Handle the mouse down event
//   const handleMouseDown = (e: React.MouseEvent, thumb: "min" | "max") => {
//     setIsDragging(true);
//     setActiveThumbs({ ...activeThumbs, [thumb]: true });
//   };

//   // Handle the mouse up event
//   const handleMouseUp = () => {
//     if (isDragging) {
//       handleChange("minSalary", minSal.toString());
//       handleChange("maxSalary", maxSal.toString());
//     }
//     setIsDragging(false);
//     setActiveThumbs({ min: false, max: false });
//   };

//   // Handle the mouse move event
//   const handleMouseMove = (e: MouseEvent) => {
//     if (!isDragging || !sliderRef.current) return;

//     const sliderRect = sliderRef.current.getBoundingClientRect();
//     const percent = Math.min(
//       Math.max((e.clientX - sliderRect.left) / sliderRect.width, 0),
//       1
//     );
//     let value = Math.round(percent * (MAX_RANGE - MIN_RANGE) + MIN_RANGE);

//     // Adjust value according to the step
//     value = Math.round(value / step) * step;

//     if (activeThumbs.min) {
//       setMinSal(Math.min(value, maxSal)); // Allow minSal to go up to maxSal
//     } else if (activeThumbs.max) {
//       setMaxSal(Math.max(value, minSal)); // Allow maxSal to go down to minSal
//     }
//   };

//   // Update thumb positions based on minSal and maxSal
//   useEffect(() => {
//     const minPercent = getPercent(minSal);
//     const maxPercent = getPercent(maxSal);

//     const minThumb = sliderRef.current?.querySelector(".min-thumb");
//     const maxThumb = sliderRef.current?.querySelector(".max-thumb");

//     if (minThumb) {
//       (minThumb as HTMLElement).style.left = `${minPercent}%`;
//     }
//     if (maxThumb) {
//       (maxThumb as HTMLElement).style.left = `${maxPercent}%`;
//     }
//   }, [minSal, maxSal]);

//   useEffect(() => {
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDragging, activeThumbs, minSal, maxSal, step]);

//   return (
//     <div className="w-full max-w-md mx-auto p-4">
//       <div className="text-lg font-semibold mb-2">Salary</div>
//       <div className="text-gray-600 mb-4">
//         {currencyType}
//         {minSal}k - {currencyType}
//         {maxSal}k
//       </div>
//       <div
//         className="relative h-2 w-full bg-gray-200 rounded-full"
//         ref={sliderRef}
//       >
//         {/* Background slider track */}
//         {/* <div
//           style={{
//             left: `${getPercent(minSal)}%`,
//             width: `${getPercent(maxSal) - getPercent(minSal)}%`,
//           }}
//           className="absolute h-1 bg-blue-500 rounded-full top-1/2 transform -translate-y-1/2"
//         ></div> */}

//         {/* Minimum thumb */}
//         <div
//           className="min-thumb absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
//           onMouseDown={(e) => handleMouseDown(e, "min")}
//         ></div>

//         {/* Maximum thumb */}
//         <div
//           className="max-thumb absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
//           onMouseDown={(e) => handleMouseDown(e, "max")}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default SalaryRangeSlider;
