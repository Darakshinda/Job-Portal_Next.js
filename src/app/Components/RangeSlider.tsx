import React from 'react';
import { Range, getTrackBackground } from 'react-range';

interface SalaryRangeSliderProps {
  onRangeChange: (values: number[]) => void;
  salaryRange: number[];
  label?: string; // Add label prop
}

const STEP = 1000;
const MIN = 0;
const MAX = 200000;

const SalaryRangeSlider: React.FC<SalaryRangeSliderProps> = ({
  onRangeChange,
  salaryRange,
  label = "Salary", // Default label value
}) => {
  return (
    <div className="salary-range-slider">
      <div className="flex justify-between items-center mb-2">
        <span>${salaryRange[0]}</span> {/* Display selected salary */}
      </div>
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={[salaryRange[0]]}
        onChange={onRangeChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '8px',
              width: '200px',
              background: getTrackBackground({
                values: salaryRange,
                colors: ['#ccc', '#548BF4', '#ccc'],
                min: MIN,
                max: MAX,
              }),
              borderRadius: '4px',
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '24px',
              width: '24px',
              backgroundColor: '#FFF',
              border: '1px solid #CCC',
              borderRadius: '50%',
              boxShadow: '0px 2px 6px #AAA',
              zIndex: 1,
            }}
          />
        )}
      />
    </div>
  );
};

export default SalaryRangeSlider;