import { set } from "date-fns";
import React, { useState, useEffect, ChangeEvent } from "react";

interface PdfUploadFormProps {
  setFormData: Function;
  formDataKey: string;
  setFlg: (value: boolean) => void;
  val: string; // Prop to pass the existing URL
}

const PdfUploadForm: React.FC<PdfUploadFormProps> = ({
  setFormData,
  formDataKey,
  setFlg,
  val,
}) => {
  const [existingUrl, setExistingUrl] = useState<string>(val);

  useEffect(() => {
    setExistingUrl(val);
  }, [val]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("Selected File:", file);
      // Call the submit function directly when a file is selected
      handleSubmit(file);
    }
  };

  const handleSubmit = (file: File) => {
    if (!file && !existingUrl) {
      alert("Please select a file or provide an existing URL!");
      return;
    }

    const urlToUse = file ? URL.createObjectURL(file) : existingUrl;

    // Update the formData in the main component
    setFormData(formDataKey, file);
    setExistingUrl(urlToUse);

    // Indicate that the resume file has been changed
    setFlg(true);

    console.log("Existing URL:", existingUrl);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="resume" className="text-gray-500 font-semibold">
          Resume
        </label>
        <input
          type="file"
          name="resume"
          id="resume"
          accept=".pdf"
          multiple={false}
          onChange={handleFileChange}
          className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-500 file:border-0 file:me-4 file:py-3 file:px-4 placeholder:text-gray-400"
        />
        {existingUrl && (
          <p className="mt-2 text-gray-600">
            Existing file URL:{" "}
            <a
              href={existingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {existingUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default PdfUploadForm;
