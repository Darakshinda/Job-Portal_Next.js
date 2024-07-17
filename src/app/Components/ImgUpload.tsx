import React, { useRef, useState } from 'react';

interface ImgProps {
    keyy:string;
    onChange: Function;
  }

const UploadButton: React.FC<ImgProps> = ({onChange,keyy}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);onChange(keyy,imageUrl);
      // Handle file upload logic here if needed
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100px',
        height: '100px',
        border: '2px solid #ddd',
        borderRadius: '50%',
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: '#101011',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleButtonClick}
    >
      {!backgroundImage && <div style={{display:"flex",backgroundColor:"#101011",border:"solid",borderWidth:"1px",borderRadius:"3px"}} >
          <img
            src="https://cdn3.iconfinder.com/data/icons/photo-tools/65/upload-1024.png"
            alt="Upload Icon"
            style={{ width: '20px', height: '20px', marginRight: '8px',marginLeft:"3px",marginTop:"2px", backgroundColor: "white" }}
          />
          <span style={{ fontSize: '14px', marginRight: '2px', color: "white" }}><b>Upload</b></span></div>
       }
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadButton;