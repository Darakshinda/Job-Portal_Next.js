import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import enUS from 'date-fns/locale/en-US';

registerLocale('enUS', enUS);

interface DatePickerComponentProps {
  value: Date | null;
  handleChange: (date: Date | null) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ value, handleChange }) => {
  return (
   
      <DatePicker
        selected={value}
        onChange={handleChange}
        placeholderText="Start date"
        dateFormat="yyyy-MM-dd"
        todayButton="Today"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        locale="enUS"
        className="mt-1 h-[35px] w-full rounded-md border border-gray-400 p-4"
      />

  );
};

export default DatePickerComponent;
