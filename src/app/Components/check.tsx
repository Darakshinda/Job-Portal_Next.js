import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label="Pay Later", checked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    onChange(!checked);
  };

  return (
    <label style={styles.label}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        style={styles.checkbox}
      />
      {label}
    </label>
  );
};

const styles = {
  label: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkbox: {
    marginRight: '8px',
  },
};

export default Checkbox;