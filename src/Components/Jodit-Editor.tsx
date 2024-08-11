import React, { useRef, useEffect } from "react";
import JoditEditor from "jodit-react";

interface JoditEditorComponentProps {
  keyy: string;
  value: string;
  onChange: Function;
}

const JoditEditorComponent = ({
  keyy,
  value,
  onChange,
}: JoditEditorComponentProps) => {
  const editorRef = useRef(null);

  return (
    <JoditEditor
      ref={editorRef}
      value={value}
      config={{
        readonly: false, /// all options from https://xdsoft.net/jodit/doc/
      }}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => onChange(keyy, newContent)} // preferred to use only this option to update the content for performance reasons
    />
  );
};

export default JoditEditorComponent;
