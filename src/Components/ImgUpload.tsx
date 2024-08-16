"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

interface ImgProps {
  keyy: string;
  onChange: Function;
  val: string | null;
  setflg?: Function;
}

const UploadButton: React.FC<ImgProps> = ({ onChange, keyy, setflg, val }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backgroundImg, setBackgroundImg] = useState<string | null>(null);

  // Update backgroundImg when resetflg is true and val is different
  // useEffect(() => {
  //   if (val !== backgroundImg) {
  //     setBackgroundImg(val);
  //     console.log("Background Image Updated:", val);
  //   }
  // }, [val, backgroundImg]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImg(imageUrl); // Update background image
      onChange(keyy, file); // Handle file upload logic
      setflg && setflg(true);
    }
  };

  useEffect(() => {
    if (val) {
      setBackgroundImg(val);
    }
  }, [val]);

  return (
    <div
      className={`flex items-center justify-center w-28 h-28 border-2 border-gray-300 rounded-full cursor-pointer relative bg-white ${backgroundImg ? `bg-cover bg-center` : ""}`}
      style={{
        backgroundImage: backgroundImg ? `url(${backgroundImg})` : "none",
      }} // Background image set conditionally
      onClick={backgroundImg ? handleButtonClick : undefined}
    >
      {!backgroundImg && (
        <div className="flex flex-col w-full h-full items-center relative">
          <Image
            src="/assets/images/default-profile.webp"
            alt="Upload Icon"
            sizes="100%"
            width={100}
            height={100}
            className="w-32 aspect-square rounded-full bg-white"
          />

          <label
            htmlFor="image"
            className="text-sm text-gray-200 font-semibold absolute top-1/2 -translate-y-1/2 bg-gray-500 px-1.5 py-1 rounded cursor-pointer"
          >
            Upload
          </label>
        </div>
      )}
      <input
        id="image"
        name="image"
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadButton;
