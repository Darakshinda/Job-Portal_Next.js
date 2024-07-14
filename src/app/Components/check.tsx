import React from 'react';

interface CheckboxProps {
  keyy:string;
  label: string;
  checked: boolean;
  onChange: Function;
  additionalInfo?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ keyy,label, checked, onChange, additionalInfo }) => {
  const styles = {
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px 0',
    },
    checkbox: {
      marginRight: '10px',
    },
    label: {
      fontSize: '16px',
    },
    additionalInfo: {
      marginLeft: '5px',
      color: 'red', // Adjust the color as needed
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(keyy,e.target.checked)}
        style={styles.checkbox}
      />
      <label style={styles.label}>
        {label} {additionalInfo && <span style={styles.additionalInfo}>{additionalInfo}</span>}
      </label>
    </div>
  );
};

export default Checkbox;
