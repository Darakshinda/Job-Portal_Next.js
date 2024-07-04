"use client"

import React from 'react';



interface InputProps {
  keyy?: string;
  border?:string;
  cls?: string;
  placeholder?: string;
  req?:boolean;
  val?: string;
  disabled?: boolean;
  onChange?: Function;
}

interface TextAreaProps {
  keyy?: string;
  border?:string;
  cls?: string;
  req?:boolean;
  placeholder?: string;
  val?: string;
  onChange?: Function;
} 
export const TextInput = (
  {keyy="",
  cls = 'input w-full max-w-xs',
  placeholder = '',border='',
  val,req=false,
  disabled = false,
  onChange,
}: InputProps) => {
  

  return (
  <input
      type="text"
      required={req}
      className={cls}
      placeholder={placeholder}
      style={{border:border}}
      value={val}
      disabled={disabled}
      onChange={(event)=>onChange(keyy,event.target.value) }
    />
  );
};

export const TextArea = ({keyy,
  cls = 'textarea w-full max-w-xs',
  placeholder = '',border='',
  val,req=false,
  onChange,
}: TextAreaProps) => {
  return (
    <textarea style={{height:"250px",border:border}}
      required={req}
      className={cls}
      placeholder={placeholder}
      value={val}
      onChange={(event)=>onChange(keyy,event.target.value) }
    />
  );
};