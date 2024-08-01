import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { enUS } from 'date-fns/locale';
import { format } from 'date-fns';
import { SingleValue } from 'react-select';

registerLocale('en-US', enUS);

interface DateSelectProps {
  value: Date | null;
  handleChange: (date:string) => void;
}


const DateSelect: React.FC<DateSelectProps> = ({ value, handleChange }) => {

  

  const handleDateChange = (date: Date | null) => {
    handleChange(date);
  };

  return (
    <div className="date-select-container">
      <DatePicker
        selected={value}
        onChange={handleDateChange}
        dateFormat="MM-yyyy"
        showMonthYearPicker
        locale="en-US"
        placeholderText="Select month and year"
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default DateSelect;