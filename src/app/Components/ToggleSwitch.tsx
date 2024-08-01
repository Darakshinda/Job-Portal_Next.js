// components/ToggleSwitch.tsx
import React from 'react';
import styled from 'styled-components';

interface ToggleSwitchProps {
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
}

const Switch = styled.div<{ isChecked: boolean }>`
  position: relative;
  width: 40px;
  height: 20px;
  background: ${props => (props.isChecked ? '#4caf50' : '#ccc')};
  border-radius: 34px;
  cursor: pointer;
  transition: background 0.3s;
`;

const Slider = styled.div<{ isChecked: boolean }>`
  position: absolute;
  top: 2px;
  left: ${props => (props.isChecked ? '22px' : '2px')};
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: left 0.3s;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked, onToggle,}) => {
  return (
      <Switch isChecked={isChecked} onClick={() => onToggle(!isChecked)}>
        <Slider isChecked={isChecked} />
      </Switch>
  );
};

export default ToggleSwitch;