import React from 'react';

interface option{label?:string}

interface Props {
 
  keyy?:string;cls?: string;onChange?: Function;req?:boolean;body?:option[];id?:string;type?:string;
}
interface Propd {
 
  cls?: string;bgcolor?: string;btncolor?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Select = ({keyy='',
  cls=`select select-bordered w-full max-w-xs`,req=false,onChange,body=[],id,type="",
}: Props) => {
if(type=="small") return(
  
  <select className={`${cls}`} required={req} onChange={(event)=>onChange(keyy,event.target.value) } id={id} style={{display:"inline",width:"37%"}}>
  {body.map((option) => (
        <option>
          {option.label}
        </option>
      ))}
</select>
  );
  
  return(
  
  <select className={`${cls}`} required={req} onChange={(event)=>onChange(keyy,event.target.value)} id={id}>
  {body.map((option) => (
        <option>
          {option.label}
        </option>
      ))}
</select>
  );
};

export const Dropdown = ({bgcolor="base",btncolor="base",
  cls=`dropdown`,
}: Propd) => {

 return (
    <div className={cls}>
  <div tabIndex={0} role="button" className="btn m-1" style={{backgroundColor:`${btncolor}`}}>Click</div>
  <ul tabIndex={0} className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52`} style={{backgroundColor:`${bgcolor}`}}>
    <li><button onClick={()=>console.log("clicked 1")}>Item 1</button></li>
    <li><button onClick={()=>console.log("clicked 2")}>Item 2</button></li>
  </ul>
</div>
  );

};