import React, { useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorComponentProps {
  keyy: string;
  value: string;
  onChange: Function;
}
const QuillEditorComponent = ({
  keyy,
  value,
  onChange,
}: QuillEditorComponentProps) => {
  const editorRef = useRef<ReactQuill | null>(null);

  return (
    <ReactQuill
      ref={editorRef}
      value={value}
      onChange={(newContent) => onChange(keyy, newContent)}
      modules={{
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          ["link", "image"],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          ["clean"],
        ],
      }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "image",
        "align",
        "color",
        "background",
      ]}
    />
  );
};

export default QuillEditorComponent;
