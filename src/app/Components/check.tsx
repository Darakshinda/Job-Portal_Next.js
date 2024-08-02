import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(prev => !prev);
    onChange(!isChecked); // Use isChecked instead of checked to toggle the state correctly
  };

  return (
    <label style={styles.label}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        style={styles.checkbox}
      />
      <span style={styles.labelText}>{label}</span>
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
  labelText: {
    color: 'white', // Ensure text color is white
  },
};

export default Checkbox;
