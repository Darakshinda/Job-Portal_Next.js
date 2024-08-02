import React from 'react';

// Define the option type
interface Option {
  label?: string;
}

// Props for Select component
interface SelectProps {
  keyy?: string;
  cls?: string;
  onChange?: (key: string, value: string) => void;
  req?: boolean;
  body?: Option[];
  id?: string;
  type?: string;
}

// Props for Dropdown component
interface DropdownProps {
  cls?: string;
  bgcolor?: string;
  btncolor?: string;
}

// Select component
export const Select = ({
  keyy = '',
  cls = 'select select-bordered w-full max-w-xs',
  req = false,
  onChange,
  body = [],
  id,
  type = '',
}: SelectProps) => {
  // Common styles for select options
  const commonStyle = {
    backgroundColor: 'black', // Ensures background is black
    color: 'white',           // Ensures text is white
  };

  if (type === 'small') {
    return (
      <select
        className={cls}
        required={req}
        onChange={(event) => onChange && onChange(keyy, event.target.value)}
        id={id}
        style={{ ...commonStyle, display: 'inline', width: '37%' }}
      >
        {body.map((option, index) => (
          <option key={index} style={commonStyle}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <select
      className={cls}
      required={req}
      onChange={(event) => onChange && onChange(keyy, event.target.value)}
      id={id}
      style={commonStyle}
    >
      {body.map((option, index) => (
        <option key={index} style={commonStyle}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// Dropdown component
export const Dropdown = ({
  bgcolor = 'black',
  btncolor = 'gray',
  cls = 'dropdown',
}: DropdownProps) => {
  return (
    <div className={cls}>
      <div
        tabIndex={0}
        role="button"
        className="btn m-1"
        style={{ backgroundColor: btncolor, color: 'white' }} // Button color
      >
        Click
      </div>
      <ul
        tabIndex={0}
        className={`dropdown-content z-[1] menu p-2 shadow rounded-box w-52`}
        style={{ backgroundColor: bgcolor, color: 'white' }} // Dropdown menu color
      >
        <li>
          <button onClick={() => console.log('clicked 1')} style={{ color: 'white' }}>
            Item 1
          </button>
        </li>
        <li>
          <button onClick={() => console.log('clicked 2')} style={{ color: 'white' }}>
            Item 2
          </button>
        </li>
      </ul>
    </div>
  );
};
