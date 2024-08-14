// SalaryFilterBox.tsx

import React, { useState } from 'react';
import SalaryRangeSlider from './RangeSlider';

interface SalaryFilterBoxProps {
  onRangeChange: (values: number[]) => void;
  salaryRange: number[];label?:string;
}

const SalaryFilterBox: React.FC<SalaryFilterBoxProps> = ({
  onRangeChange,
  salaryRange,label='Salary',
}) => {
  const [showSlider, setShowSlider] = useState(false);

  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  return (
    <div className="filter-box">
      <div className="filter-title" onClick={toggleSlider}>
        <div className="inline-block rounded-full border border-gray-300 px-4 py-2 cursor-pointer">
          <h3 className="text-lg mb-0">{label}</h3>
        </div>
      </div>
      {showSlider && (
        <div className="filter-content mt-2"> {/* Added mt-2 for margin top */}
          <SalaryRangeSlider onRangeChange={onRangeChange} salaryRange={salaryRange} />
        </div>
      )}
    </div>
  );
};

export default SalaryFilterBox;