// SalaryRangeSlider.tsx

import React from 'react';
import { Range, getTrackBackground } from 'react-range';

interface SalaryRangeSliderProps {
  onRangeChange: (values: number[]) => void;
  salaryRange: number[];
}

const STEP = 1000;
const MIN = 0;
const MAX = 200000;

const SalaryRangeSlider: React.FC<SalaryRangeSliderProps> = ({
  onRangeChange,
  salaryRange,
}) => {
  return (
    <div className="salary-range-slider">
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={[salaryRange[0]]} // Only one thumb at the beginning
        onChange={onRangeChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '8px', // Adjust the height of the track
              width: '200px', // Full width of the container
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
              height: '24px', // Adjust the height of the thumb
              width: '24px', // Adjust the width of the thumb
              backgroundColor: '#FFF',
              border: '1px solid #CCC',
              borderRadius: '50%',
              boxShadow: '0px 2px 6px #AAA',
              zIndex: 1, // Ensure thumb stays above the track
            }}
          />
        )}
      />
      <output className="mt-2 text-white">${salaryRange[0]}</output>
    </div>
  );
};

export default SalaryRangeSlider;
