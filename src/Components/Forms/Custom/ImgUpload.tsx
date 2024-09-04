"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";

interface ImgProps {
  name: string;
  onChange: Function;
  Url: string | null;
  file: File | null;
  setFlag?: Function;
}

const UploadButton: React.FC<ImgProps> = ({
  onChange,
  name,
  setFlag,
  Url,
  file,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backgroundImg, setBackgroundImg] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getImageAsFile = async (imagePath: string) => {
    // Fetch the image from the public folder
    const response = await fetch(imagePath);
    // Convert the response to a Blob
    const blob = await response.blob();
    // Extract the filename from the path
    const filename = imagePath.split("/").pop();
    // Create a new File object using the Blob
    const file = new File([blob], filename!, { type: blob.type });
    return file;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    console.log("File:", file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("Image URL:", imageUrl);
      setBackgroundImg(imageUrl); // Update background image
      onChange(name, file); // Handle file upload logic
      setFlag && setFlag(true);
    }
  };

  const handleFileRemove = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const file = await getImageAsFile("/assets/images/default-profile.webp");
    const imageUrl = URL.createObjectURL(file);
    setBackgroundImg(imageUrl); // Update background image with the public folder file URL
    onChange(name, imageUrl); // Handle file remove logic by passing the public folder file URL
    setFlag && setFlag(true);
  };

  useEffect(() => {
    if (Url && !file) {
      setBackgroundImg(Url);
    }
  }, [Url, file]);

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
      <button
        onClick={(e) => {
          handleFileRemove(e);
          e.stopPropagation();
        }}
        className="absolute right-0 bottom-1"
      >
        <MdCancel size={24} className="text-red-500 bg-white rounded-full" />
      </button>
    </div>
  );
};

export default UploadButton;
