// components/Tag.tsx
import React from 'react';

interface TagProps {
  tag: {label: string };
  onRemove: (value: string) => void;
} 

const Tag: React.FC<TagProps> = ({ tag, onRemove }) => {
  return (
    <div className="tag"  style={{backgroundColor:`${"white"}`,display:"inline",marginLeft:"7px"}}>
      <span>{tag.label}</span>
      <button onClick={() => onRemove(tag.label)}>✖</button>
      <style jsx>{`
        .tag {
          display: flex;
          align-items: center;
          background-color: #f1f1f1;
          color: black;
          border-radius: 16px;border:solid;border-width: 1px;
          padding: 5px;
          margin: 5px;margin-top: 7px;
        }
        .tag span {
          margin-right: 5px;
        }
        .tag button {
          background:none;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Tag;