// components/ColorPickerButton.tsx
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import styles from './ColorPicker.module.css';

interface Props {
    change: Function;keyy:string;
  }

const ColorPickerButton: React.FC<Props> = ({change,keyy}) => {
  const [color, setColor] = useState<string>('#fefba4');
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    setColor(color.hex);change(keyy,color.hex);
  };

  return (
    <div>
      <button className={styles.colorButton} onClick={handleClick} style={{ backgroundColor: color,display:"inline",marginLeft:"15px"}}>
        &nbsp;
      </button>
      {displayColorPicker ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPickerButton;