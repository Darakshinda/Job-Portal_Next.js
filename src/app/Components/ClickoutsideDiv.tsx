import React, { useRef, useEffect } from 'react';

interface ClickOutsideDivProps {
  cls:string;
  onOutsideClick: () => void;
}

const ClickOutsideDiv: React.FC<ClickOutsideDivProps> = ({ children, onOutsideClick,cls='', }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onOutsideClick]);

  return (
    <div className={cls} ref={divRef}>
      {children}
    </div>
  );
};

export default ClickOutsideDiv;
